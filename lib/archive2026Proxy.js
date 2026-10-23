import { createArchiveProxy } from './archiveProxy.js';

export default createArchiveProxy({
  origin: 'https://ncrtces-2026.vercel.app',
  prefix: '/conferences/2026',
  apiPrefix: '/api/archive-2026',
});
