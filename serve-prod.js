// The only server. It runs the PROD pipeline — minified bundle, SSR, gzip — so
// what is seen locally is what deploys; a source-mode dev server would hide
// exactly the tree-shaking surprises that matter.
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { init } from '@cherga/server-node';
import config from './cherga.config.js';

const here = dirname(fileURLToPath(import.meta.url));

const { listen } = await init(join(here, 'main.js'), 'index.html', {
  mode: 'prod',
  api: config.api,
  inlineCss: config.css === 'inline',
  ssr: config.ssr,
});

listen(process.env.PORT || 4400);
