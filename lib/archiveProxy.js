const DEFAULT_CANONICAL_ORIGIN = 'https://www.ncrtces-msit.in';

function archivePath(path, prefix) {
  if (path === prefix || path.startsWith(`${prefix}/`)) return path;
  return `${prefix}${path === '/' ? '/' : path.startsWith('/') ? path : `/${path}`}`;
}

function rewriteLocalUrl(value, prefix, archiveHosts) {
  if (value.startsWith('/') && !value.startsWith('//')) return archivePath(value, prefix);
  if (!/^https?:\/\//i.test(value)) return value;

  try {
    const url = new URL(value);
    if (!archiveHosts.has(url.hostname)) return value;
    return `${archivePath(url.pathname, prefix)}${url.search}${url.hash}`;
  } catch {
    return value;
  }
}

function rewriteCanonicalUrl(value, prefix, archiveHosts, canonicalOrigin) {
  const localUrl = rewriteLocalUrl(value, prefix, archiveHosts);
  if (localUrl.startsWith('http')) return localUrl;
  return `${canonicalOrigin}${localUrl}`;
}

function routePath(req, prefix, apiPrefix) {
  const pathname = new URL(req.url, 'https://archive-proxy.invalid').pathname;
  // Vercel passes named rewrite parameters through req.query when the
  // destination does not include them in its path.
  let value = req.query?.__archiveProxyPath ?? req.query?.archivePath ?? req.query?.path;

  if (pathname === apiPrefix || pathname.startsWith(`${apiPrefix}/`)) {
    const pathFromUrl = pathname.slice(apiPrefix.length);
    if (pathFromUrl) value = pathFromUrl;
  } else if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
    const pathFromUrl = pathname.slice(prefix.length);
    if (pathFromUrl) value = pathFromUrl;
  }

  const segments = Array.isArray(value) ? value : value ? [value] : [];
  const decoded = segments
    .flatMap((segment) => String(segment).split('/'))
    .map((segment) => decodeURIComponent(segment));

  if (decoded.some((segment) => segment === '.' || segment === '..' || segment.includes('\\') || segment.includes('\0'))) {
    throw new Error('Invalid archive path');
  }

  return decoded.filter(Boolean).map(encodeURIComponent).join('/');
}

function rewriteSrcset(value, prefix) {
  return value.replace(/(^|,\s*)(\/(?!\/)[^\s,]+)/g, (_match, separator, url) => `${separator}${archivePath(url, prefix)}`);
}

function rewriteArchiveReferences(source, contentType, config) {
  const { prefix, archiveHosts, canonicalOrigin } = config;

  if (contentType.includes('text/html')) {
    source = source.replace(
      /(\b(?:src|href|action|poster|data|manifest|content)\s*=\s*)(["'])([^"']*)\2/gi,
      (_match, attribute, quote, value) => `${attribute}${quote}${rewriteLocalUrl(value, prefix, archiveHosts)}${quote}`,
    );
    source = source.replace(
      /(\bsrcset\s*=\s*)(["'])([^"']*)\2/gi,
      (_match, attribute, quote, value) => `${attribute}${quote}${rewriteSrcset(value, prefix)}${quote}`,
    );
  }

  if (contentType.includes('javascript') || contentType.includes('ecmascript')) {
    source = source.replace(
      /(["'`])\/(?!\/)(?:assets\/|[^"'`?#]+\.(?:png|jpe?g|gif|svg|webp|ico|css|js|docx|pdf|woff2?))(?:[?#][^"'`]*)?\1/gi,
      (match, quote) => `${quote}${archivePath(match.slice(quote.length, -quote.length), prefix)}${quote}`,
    );
  }

  if (contentType.includes('text/css')) {
    source = source.replace(/url\((\s*["']?)\/(?!\/)([^)'"\s]+)(["']?\s*)\)/gi, (_match, before, path, after) => `url(${before}${archivePath(`/${path}`, prefix)}${after})`);
    source = source.replace(/@import\s+(?!url\()(\s*["'])\/(?!\/)([^"']+)(\1)/gi, (_match, quote, path) => `@import ${quote}${archivePath(`/${path}`, prefix)}${quote}`);
  }

  source = source.replace(/https?:\/\/[^/\s"'`<>)]*(?:\/[^\s"'`<>)]*)?/gi, (value) =>
    rewriteLocalUrl(value, prefix, archiveHosts),
  );

  if (contentType.includes('text/html')) {
    source = source.replace(/<link\b[^>]*\brel=(['"])canonical\1[^>]*>/gi, (tag) =>
      tag.replace(/(\bhref\s*=\s*)(['"])([^'"]*)\2/i, (_match, attribute, quote, value) => `${attribute}${quote}${rewriteCanonicalUrl(value, prefix, archiveHosts, canonicalOrigin)}${quote}`),
    );
    source = source.replace(/<meta\b[^>]*\b(?:property|name)=(['"])og:url\1[^>]*>/gi, (tag) =>
      tag.replace(/(\bcontent\s*=\s*)(['"])([^'"]*)\2/i, (_match, attribute, quote, value) => `${attribute}${quote}${rewriteCanonicalUrl(value, prefix, archiveHosts, canonicalOrigin)}${quote}`),
    );
  }

  return source;
}

async function fetchArchive(upstreamUrl, method, headers, archiveHosts, originUrl) {
  const visited = new Set();
  let currentUrl = upstreamUrl;

  for (let redirects = 0; redirects <= 5; redirects += 1) {
    const urlKey = currentUrl.toString();
    if (visited.has(urlKey)) throw new Error('Upstream archive redirect loop');
    visited.add(urlKey);

    const response = await fetch(currentUrl, { method, headers, redirect: 'manual' });
    const location = response.headers.get('location');
    if (!location || response.status < 300 || response.status >= 400) return response;

    const destination = new URL(location, currentUrl);
    if (!archiveHosts.has(destination.hostname)) return response;
    currentUrl = new URL(`${destination.pathname}${destination.search}`, originUrl);
  }

  throw new Error('Too many upstream archive redirects');
}

export function createArchiveProxy({ origin, prefix, apiPrefix, internalHosts = [], canonicalOrigin = DEFAULT_CANONICAL_ORIGIN }) {
  const originUrl = new URL(origin);
  if (originUrl.protocol !== 'https:') throw new Error('Archive upstreams must use HTTPS');

  const archiveHosts = new Set([
    originUrl.hostname,
    'ncrtces-msit.in',
    'www.ncrtces-msit.in',
    ...internalHosts,
  ]);
  const config = { prefix, apiPrefix, archiveHosts, canonicalOrigin };

  return async function proxyArchive(req, res) {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.setHeader('Allow', 'GET, HEAD');
      res.status(405).end('Method Not Allowed');
      return;
    }

    let path;
    try {
      path = routePath(req, prefix, apiPrefix);
    } catch {
      res.status(400).end('Invalid archive path');
      return;
    }

    const incomingUrl = new URL(req.url, 'https://archive-proxy.invalid');
    const upstreamUrl = new URL(path ? `/${path}` : '/', originUrl);
    // This rewrite parameter is internal; all actual user query values remain intact.
    incomingUrl.searchParams.delete('__archiveProxyPath');
    upstreamUrl.search = incomingUrl.search;

    try {
      const headers = new Headers();
      for (const name of ['accept', 'accept-language', 'if-modified-since', 'if-none-match', 'range']) {
        const value = req.headers[name];
        if (value) headers.set(name, Array.isArray(value) ? value.join(', ') : value);
      }

      const upstream = await fetchArchive(upstreamUrl, req.method, headers, archiveHosts, originUrl);
      const contentType = upstream.headers.get('content-type') || 'application/octet-stream';
      const transformed = /(?:text\/html|text\/css|javascript|ecmascript)/i.test(contentType);

      res.status(upstream.status);
      for (const name of ['content-type', 'content-disposition', 'cache-control', 'last-modified', 'accept-ranges', 'content-range', 'location']) {
        const value = upstream.headers.get(name);
        if (value) res.setHeader(name, value);
      }

      if (req.method === 'HEAD' || upstream.status === 204 || upstream.status === 304) {
        res.end();
        return;
      }

      const body = transformed
        ? rewriteArchiveReferences(await upstream.text(), contentType, config)
        : Buffer.from(await upstream.arrayBuffer());
      res.end(body);
    } catch (error) {
      console.error(`Archive proxy failed for ${prefix}`, error);
      res.status(502).end('The conference archive is temporarily unavailable.');
    }
  };
}
