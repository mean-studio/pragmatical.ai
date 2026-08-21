// Per-request head metadata: the one thing this site needs getServerData for.
//
// Imported by serve-prod.js AND worker/index.js rather than written twice. The
// flagship site duplicates this body between its two entry points with a
// comment on each saying it matches the other, which is a promise rather than a
// mechanism.
import { CONTENT } from './content.js';

const PAGE_META = {
  '/': CONTENT.home.meta,
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
    docTitle: meta.title,
    docDescription: meta.description,
    // The shell highlights the current nav item from this, so the first paint
    // is already on the right one.
    route: path,
    // Path params are `router.<name>` store keys on the client (the router
    // publishes them on every navigation); SSR has to seed the same keys or a
    // `?router.pid=` conditional renders nothing at all server-side — which for
    // a product page means the page is blank until hydration.
    ...Object.fromEntries(Object.entries(params || {}).map(([k, v]) => [`router.${k}`, v])),
  };
}
