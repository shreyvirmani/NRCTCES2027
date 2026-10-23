const ARCHIVE_ORIGIN = 'https://ncrtces-2026.vercel.app';
const ARCHIVE_PREFIX = '/conferences/2026';
const ARCHIVE_ORIGIN_URL = new URL(ARCHIVE_ORIGIN);
const ARCHIVE_HOSTS = new Set([
  ARCHIVE_ORIGIN_URL.hostname,
  'ncrtces-msit.in',
  'www.ncrtces-msit.in',
]);

function archivePath(path) {
  if (path === ARCHIVE_PREFIX || path.startsWith(`${ARCHIVE_PREFIX}/`)) return path;
  return `${ARCHIVE_PREFIX}${path === '/' ? '/' : path.startsWith('/') ? path : `/${path}`}`;
}

function rewriteLocalUrl(value) {
  if (value.startsWith('/') && !value.startsWith('//')) return archivePath(value);
  if (!/^https?:\/\//i.test(value)) return value;

  try {
    const url = new URL(value);
    if (!ARCHIVE_HOSTS.has(url.hostname)) return value;
    return `${archivePath(url.pathname)}${url.search}${url.hash}`;
  } catch {
    return value;
  }
}

function rewriteCanonicalUrl(value) {
  const localUrl = rewriteLocalUrl(value);
  if (localUrl.startsWith('http')) return localUrl;
  return `https://www.ncrtces-msit.in${localUrl}`;
}

function routePath(req) {
  const pathname = new URL(req.url, 'https://archive-proxy.invalid').pathname;
  const apiPrefix = '/api/archive-2026';
  // Vercel passes named rewrite parameters through req.query when the
  // destination does not include them in its path. Keep the older `path`
  // key as a fallback for direct function requests.
  let value = req.query?.archivePath ?? req.query?.path;

  if (pathname === apiPrefix || pathname.startsWith(`${apiPrefix}/`)) {
    const pathFromUrl = pathname.slice(apiPrefix.length);
    if (pathFromUrl) value = pathFromUrl;
  } else if (pathname === ARCHIVE_PREFIX || pathname.startsWith(`${ARCHIVE_PREFIX}/`)) {
    const pathFromUrl = pathname.slice(ARCHIVE_PREFIX.length);
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

function rewriteArchiveReferences(source, contentType) {
  if (contentType.includes('text/html')) {
    source = source.replace(
      /(\b(?:src|href|action|poster|data|manifest|content)\s*=\s*)(["'])([^"']*)\2/gi,
      (_match, attribute, quote, value) => `${attribute}${quote}${rewriteLocalUrl(value)}${quote}`,
    );
  }

  if (contentType.includes('javascript') || contentType.includes('ecmascript')) {
    source = source.replace(
      /(["'`])\/(?!\/)(?:assets\/|[^"'`?#]+\.(?:png|jpe?g|gif|svg|webp|ico|css|js|docx|pdf|woff2?))(?:[?#][^"'`]*)?\1/gi,
      (match, quote) => `${quote}${archivePath(match.slice(quote.length, -quote.length))}${quote}`,
    );
  }

  if (contentType.includes('text/css')) {
    source = source.replace(/url\((\s*["']?)\/(?!\/)([^)'"\s]+)(["']?\s*)\)/gi, (_match, before, path, after) => `url(${before}${archivePath(`/${path}`)}${after})`);
    source = source.replace(/@import\s+(?!url\()(\s*["'])\/(?!\/)([^"']+)(\1)/gi, (_match, quote, path) => `@import ${quote}${archivePath(`/${path}`)}${quote}`);
  }

  source = source.replace(
    /https?:\/\/(?:ncrtces-2026\.vercel\.app|www\.ncrtces-msit\.in|ncrtces-msit\.in)(?::\d+)?(?:\/[^\s"'`<>)]*)?/gi,
    rewriteLocalUrl,
  );

  if (contentType.includes('text/html')) {
    source = source.replace(/<link\b[^>]*\brel=(['"])canonical\1[^>]*>/gi, (tag) =>
      tag.replace(/(\bhref\s*=\s*)(['"])([^'"]*)\2/i, (_match, attribute, quote, value) => `${attribute}${quote}${rewriteCanonicalUrl(value)}${quote}`),
    );
    source = source.replace(/<meta\b[^>]*\b(?:property|name)=(['"])og:url\1[^>]*>/gi, (tag) =>
      tag.replace(/(\bcontent\s*=\s*)(['"])([^'"]*)\2/i, (_match, attribute, quote, value) => `${attribute}${quote}${rewriteCanonicalUrl(value)}${quote}`),
    );
  }

  return source;
}

async function fetchArchive(upstreamUrl, method, headers) {
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
    if (!ARCHIVE_HOSTS.has(destination.hostname)) return response;
    currentUrl = new URL(`${destination.pathname}${destination.search}`, ARCHIVE_ORIGIN_URL);
  }

  throw new Error('Too many upstream archive redirects');
}

export default async function proxyArchive2026(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    res.status(405).end('Method Not Allowed');
    return;
  }

  let path;
  try {
    path = routePath(req);
  } catch {
    res.status(400).end('Invalid archive path');
    return;
  }

  const incomingUrl = new URL(req.url, 'https://archive-proxy.invalid');
  const upstreamUrl = new URL(path ? `/${path}` : '/', ARCHIVE_ORIGIN);
  // `archivePath` is an internal route parameter, not an upstream query.
  // Forward every other incoming query parameter unchanged.
  incomingUrl.searchParams.delete('archivePath');
  upstreamUrl.search = incomingUrl.search;

  try {
    const headers = new Headers();
    for (const name of ['accept', 'accept-language', 'if-modified-since', 'if-none-match', 'range']) {
      const value = req.headers[name];
      if (value) headers.set(name, Array.isArray(value) ? value.join(', ') : value);
    }

    const upstream = await fetchArchive(upstreamUrl, req.method, headers);
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
      ? rewriteArchiveReferences(await upstream.text(), contentType)
      : Buffer.from(await upstream.arrayBuffer());
    res.end(body);
  } catch (error) {
    console.error('2026 archive proxy failed', error);
    res.status(502).end('The NCRTCES 2026 archive is temporarily unavailable.');
  }
}
