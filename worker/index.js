// Cloudflare Worker: server-renders every HTML request with the framework's
// SSR path (the same renderToString + buildDocument serve-prod.js uses) and
// serves the built bundles and imagery from the ASSETS binding.
//
// SSR is the reason this is a Worker rather than Pages: a static host can only
// serve the shell, so every page would arrive empty to a crawler, a link
// preview or a reader on a slow connection.
//
// The render path is pure JS with no Node builtins, so it runs in workerd
// unchanged. tools/build-dist.mjs inlines this file and every import — the
// framework included — into dist-worker/index.js before the commit.

import { renderToString } from '@swc-js/server/ssr/render.js';
import { buildDocument } from '@swc-js/server/html-document.js';
import { appConfig } from '../app-config.js';
import { docMetaFor } from '../data/meta.js';
import { handleContact } from './contact.js';
import { VERSION, HAS_ICONS_JS, HAS_LEGACY_JS, META, INLINE_CSS, CSS_TEXT, CSS_LEGACY_TEXT } from './build-manifest.js';

// css carries a REF when linking and the actual BYTES when inlining: with
// inlineCss on, buildDocument embeds whatever `css` holds, so passing the
// 'bundle' marker would write <style>bundle</style>. The bytes come from the
// build manifest because the worker has no filesystem at request time. Both
// values derive from appConfig.inlineCss, so that one switch governs the
// deployed document too.
//
// jsSafari must be truthy alongside js: buildDocument picks activeJs from
// jsSafari when isSafari, and an empty one emits NO main script at all.
const assetsFor = (isSafari) => ({
  css: INLINE_CSS ? CSS_TEXT : 'bundle',
  cssLegacy: INLINE_CSS ? CSS_LEGACY_TEXT : Boolean(CSS_LEGACY_TEXT),
  js: 'bundle',
  jsSafari: 'bundle',
  jsLegacy: HAS_LEGACY_JS ? 'bundle' : '',
  iconsJs: HAS_ICONS_JS ? 'bundle' : '',
  version: VERSION,
  inlineCss: INLINE_CSS,
  isSafari,
});

const isSafariUA = (request) => {
  const ua = request.headers.get('user-agent') || '';
  return /Safari/.test(ua) && !/Chrome|Chromium|Edg|OPR|Firefox|SamsungBrowser/.test(ua);
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const p = url.pathname;

    // The API first: /swc/contact carries no dot, so any later branch would
    // send it into the SSR path and the form would "succeed" against an HTML
    // document.
    if (p === '/swc/contact') return handleContact(request, env);

    // Static files (bundles, imagery, favicon): anything with a file extension
    // goes straight to the assets binding.
    if (p.includes('.')) return env.ASSETS.fetch(request);

    const assets = assetsFor(isSafariUA(request));
    try {
      const result = await renderToString({
        appConfig,
        // Path + query: routing strips the search internally; getServerData
        // gets the full string so query-dependent pages render correctly.
        url: p + url.search,
        getServerData: (u, params) => docMetaFor(u, params),
      });
      const st = result.state || {};
      // docTitle/docDescription localise the head per request, layered over the
      // shell's static meta (META, extracted from index.html at build time).
      const ssrMeta = {};
      if (st.docTitle) ssrMeta.title = st.docTitle;
      if (st.docDescription) ssrMeta.description = st.docDescription;
      const html = buildDocument({
        meta: META,
        assets,
        ssr: {
          html: result.html,
          stateScript: result.stateScript,
          iconCss: result.iconCss,
          componentCss: result.componentCss,
          meta: ssrMeta,
          rootAttrs: st.docRootAttrs || null,
        },
      });
      return new Response(html, {
        status: result.status === 404 ? 404 : 200,
        headers: { 'content-type': 'text/html; charset=utf-8', 'vary': 'user-agent' },
      });
    } catch {
      // Fall back to the un-rendered document so the client still boots. A
      // render fault should cost the SSR benefit, not the page.
      const html = buildDocument({ meta: META, assets });
      return new Response(html, {
        status: 200,
        headers: { 'content-type': 'text/html; charset=utf-8', 'vary': 'user-agent' },
      });
    }
  },
};
