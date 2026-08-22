// Site chrome: header, navigation, footer. One bind, used as the app layout.
//
// The nav is the split the site is organised around — one door for people
// hiring us, one for people using what we built — so it is two entries, not
// eleven. The deeper pages are reachable from the page each door opens, and
// from the footer, which is where a site's real map lives.
import { bind as shellBind } from '@swc-js/composites/shells/shell-marketing.js';
import { CONTENT } from './content.js';

export const NAV = [
  { label: CONTENT.nav.work, route: '/implementation' },
  { label: CONTENT.nav.products, route: '/products' },
  { label: CONTENT.nav.about, route: '/about' },
];

export const FOOTER = {
  columns: [
    {
      title: CONTENT.nav.work,
      links: [
        { label: 'End-to-end implementation', route: '/implementation' },
        { label: 'Internal AI enablement', route: '/internal-ai' },
        { label: 'Legacy knowledge to a model', route: '/legacy-to-model' },
        { label: 'Agentic commerce', route: '/agentic-commerce' },
        { label: 'Process automation', route: '/process-automation' },
      ],
    },
    {
      title: CONTENT.nav.products,
      links: CONTENT.products.items.map((p) => ({ label: p.name, route: p.href })),
    },
    {
      title: 'Company',
      links: [
        { label: CONTENT.nav.about, route: '/about' },
        { label: CONTENT.nav.contact, route: '/contact' },
      ],
    },
  ],
  legal: `${CONTENT.brand.legal} · ${CONTENT.brand.response}`,
};

// `route` is passed at bind time on the server (see data/meta.js) so the first
// paint highlights the right nav item; the shell keeps it current after that.
export function chrome(route = '') {
  return shellBind({
    nav: NAV,
    brand: { label: CONTENT.brand.name, icon: 'boxes' },
    cta: { label: CONTENT.nav.cta, route: '/contact' },
    footer: FOOTER,
    ...(route ? { route } : {}),
  });
}
