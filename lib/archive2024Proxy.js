import { createArchiveProxy } from './archiveProxy.js';

export default createArchiveProxy({
  origin: 'https://icai-website.vercel.app',
  prefix: '/conferences/2024',
  apiPrefix: '/api/archive-2024',
});
