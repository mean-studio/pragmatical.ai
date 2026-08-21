// The only server. It runs the PROD pipeline — minified bundle, SSR, gzip — so
// what is seen locally is what deploys; a source-mode dev server would hide
// exactly the tree-shaking surprises that matter.
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { init } from '@swc-js/server';
import { ApiRouter } from '@swc-js/server/api-router.js';
import { appConfig } from './app-config.js';
import { docMetaFor } from './data/meta.js';
import { registerContact } from './server/contact.js';

const here = dirname(fileURLToPath(import.meta.url));

// D1 has no Node stand-in, so local submissions land in a file. One endpoint
// path, two storage backends — the alternative is a form that cannot be tested
// without deploying it.
const api = new ApiRouter();
registerContact(api, join(here, 'contact.jsonl'));

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
