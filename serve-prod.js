// The only server. It runs the PROD pipeline — minified bundle, SSR, gzip — so
// what is seen locally is what deploys; a source-mode dev server would hide
// exactly the tree-shaking surprises that matter.
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { init } from '@swc-js/server';
import { ApiRouter } from '@swc-js/server/api-router.js';
import { appConfig } from './app-config.js';
import { docMetaFor } from './data/meta.js';

const here = dirname(fileURLToPath(import.meta.url));

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

const { listen } = await init(join(here, 'main.js'), 'index.html', {
  mode: 'prod',
  api,
  inlineCss: appConfig.inlineCss,
  ssr: {
    appConfig,
    getServerData: (url, params) => docMetaFor(url, params),
  },
});

listen(process.env.PORT || 4400);
