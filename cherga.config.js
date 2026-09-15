// CLI build and production-mode local preview. The deployed Worker keeps its
// existing handler in worker/index.js; the build hook bundles that handler.
import { ApiRouter } from '@cherga/server/api-router.js';
import { appConfig } from './app-config.js';
import { docMetaFor } from './data/meta.js';

// The local SSR preview forwards chat to Wrangler on port 4401, using the
// same Worker handler and remote AI binding as production.
const api = new ApiRouter();
api.post('/swc/chat', async (ctx) => {
  try {
    return await fetch('http://127.0.0.1:4401/swc/chat', {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(await ctx.body()),
    });
  } catch { return Response.json({ error: 'The local AI preview is not running.' }, { status: 503 }); }
});

export default {
  entry: './main.js',
  html: './index.html',
  mode: 'prod',
  port: 4400,
  host: '0.0.0.0',
  css: appConfig.inlineCss ? 'inline' : 'linked',
  api,
  ssr: {
    appConfig,
    getServerData: (url, params) => docMetaFor(url, params),
  },
  build: {
    outDir: './dist',
    // The CLI's generic worker is intermediate; preserve our custom Worker.
    workerDir: './.cherga-p5/cli-worker',
    static: ['shots', 'fonts'],
    emit: './tools/build-dist.mjs',
  },
};
