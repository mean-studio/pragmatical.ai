// Per-request head metadata: the one thing this site needs getServerData for.
//
// Imported by serve-prod.js AND worker/index.js rather than written twice. The
// flagship site duplicates this body between its two entry points with a
// comment on each saying it matches the other, which is a promise rather than a
// mechanism.
import { CONTENT } from './content.js';
import { navigationState } from './navigation.js';

const PAGE_META = {
  '/': { title: 'Pragmatical AI — Foundations and tools for AI-first software', description: 'The company behind Cherga and Contract Vetting. Building AI-first interfaces, connected services and agent workflows.' },
  '/work': { title: 'Our work — Pragmatical AI', description: 'Explore Cherga, our integrated AI-first platform direction, and Contract Vetting, our flagship domain product.' },
  '/approach': { title: 'Our approach — Pragmatical AI', description: 'Structured interfaces, system understanding and connected execution. How we approach AI-first software.' },
  '/implementation': CONTENT.implementation.meta,
  '/legacy-to-model': CONTENT.legacyToModel.meta,
  '/agentic-commerce': CONTENT.commerce.meta,
  '/process-automation': CONTENT.automation.meta,
  '/internal-ai': CONTENT.internalAi.meta,
  '/products': CONTENT.products.meta,
  '/about': CONTENT.about.meta,
  '/contact': CONTENT.contact.meta,
};

const FALLBACK = {
  title: `${CONTENT.brand.name} — ${CONTENT.brand.motto}`,
  description: CONTENT.home.meta.description,
};

export function docMetaFor(url = '/', params = {}) {
  const path = String(url).split('?')[0].replace(/\/+$/, '') || '/';

  // A product page is named after its product, so the tab and the link preview
  // say which one — five routes, one component, five different titles.
  const product = path.startsWith('/products/')
    ? CONTENT.products.items.find((p) => p.href === path)
    : null;
  const meta = product
    ? { title: `${product.name} — ${CONTENT.brand.name}`, description: product.body }
    : PAGE_META[path] || FALLBACK;

  return {
    ...navigationState(path),
    docRootAttrs: { lang: 'en' },
    docTitle: meta.title,
    docDescription: meta.description,
    // The shell highlights the current nav item from this, so the first paint
    // is already on the right one.
    route: path,
    // Path params are published by the client router as `router.<name>` — but
    // the SSR serializer deliberately DROPS `route` and every `router.*` key
    // from the embedded state, on the assumption the client republishes them.
    // It does, and too late: hydration evaluates the page's conditionals first,
    // finds no key, and removes the branch the server had correctly rendered.
    // Every product page was blank on a direct load, a hard refresh, and to a
    // crawler, while working fine when reached by a click.
    //
    // So the param travels under its own name, which IS serialized, and
    // main.js mirrors router.pid onto it for client-side navigation.
    ...Object.fromEntries(Object.entries(params || {}).map(([k, v]) => [k, v])),
  };
}
