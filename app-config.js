// The single source of truth for components, routes and seeded state. The
// browser entry (main.js), the node server (serve-prod.js) and the Cloudflare
// worker all read this same object, so there is exactly one description of the
// app and the three cannot disagree.
//
// Everything imported here must be import-safe in Node AND in workerd: defs and
// data only, no DOM at module scope, no node builtins. This file is on the SSR
// path, which runs at the edge.
import { chromeDefs } from './data/chrome.js';
import { homeState } from './data/home.js';
import { chatState, chatServices } from './data/chat.js';
import { defs as heroDefs } from '@swc-js/composites/marketing/hero.js';
import { defs as featureDefs } from '@swc-js/composites/marketing/features.js';
import { defs as statsDefs } from '@swc-js/composites/marketing/stats-band.js';
import { defs as faqDefs } from '@swc-js/composites/marketing/faq.js';
import { defs as ctaDefs } from '@swc-js/composites/marketing/cta.js';
import { CONTENT, contentState } from './data/content.js';
import { chrome } from './data/chrome.js';
import { docMetaFor } from './data/meta.js';
import { homeDefs } from './pages/home.js';
import { implementationDefs } from './pages/implementation.js';
import { legacyDefs } from './pages/legacy-to-model.js';
import { commerceDefs } from './pages/commerce.js';
import { automationDefs } from './pages/automation.js';
import { internalAiDefs } from './pages/internal-ai.js';
import { productsDefs } from './pages/products.js';
import { productDefs } from './pages/product.js';
import { corporateDefs } from './pages/corporate.js';
import { contactPageDefs } from './pages/contact.js';
import { notFoundDefs } from './pages/not-found.js';

export const appConfig = {
  appId: 'pragmatical',

  defineComponents: [
    ...chromeDefs, ...heroDefs, ...featureDefs, ...statsDefs, ...faqDefs, ...ctaDefs,
    ...homeDefs, ...implementationDefs, ...legacyDefs, ...commerceDefs, ...automationDefs, ...internalAiDefs,
    ...productsDefs, ...productDefs, ...corporateDefs, ...contactPageDefs, ...notFoundDefs,
  ],

  // Copy is seeded as flat t.* keys; the contact form's own keys start empty so
  // the first render has something definite to show rather than a blank that
  // fills in later.
  state: {
    ...contentState,
    ...homeState,
    ...chatState,
  },

  // The header is layout (renders before the outlet), the footer is an overlay
  // (after it) — s-shm is one component that supplies both, using display:
  // contents so its header and footer become rows around the routed view.
  layout: [chrome()],

  // Icon names that arrive as DATA rather than as a literal @n= token are
  // invisible to the bundler's icon tree-shaker, which scans source. Every icon
  // in data/content.js is listed here for that reason; a missing name is not an
  // error, it is a silently absent icon.
  icons: [
    'sun', 'moon', 'menu',
    'layout-dashboard', 'workflow', 'scan-search', 'landmark',
    'database', 'user-check', 'brain', 'shopping-bag', 'settings-2',
    'shield', 'globe-lock', 'key', 'git-compare', 'boxes', 'check-check',
    'file-question-mark', 'users', 'server', 'plug', 'search-check',
    'shield-check', 'split', 'clipboard-check', 'eye-off', 'scale', 'gavel', 'file-diff',
    'chart-no-axes-column', 'ruler', 'file-check', 'ban',
    'arrow-right', 'arrow-up-right', 'languages', 'mail', 'external-link', 'circle',
  ],

  inlineCss: true,
  services: chatServices,

  routes: [
    { path: '/', component: 'page-home' },
    { path: '/work', component: 'page-work' },
    { path: '/approach', component: 'page-approach' },

    // Work with us
    { path: '/implementation', component: 'page-implementation' },
    { path: '/legacy-to-model', component: 'page-legacy' },
    { path: '/agentic-commerce', component: 'page-commerce' },
    { path: '/process-automation', component: 'page-automation' },
    { path: '/internal-ai', component: 'page-internal-ai' },

    // Products. The index and one detail route — five products, one component,
    // because they differ in content rather than in shape.
    { path: '/products', component: 'page-products' },
    ...Object.keys(CONTENT.productPages).map((id) => ({ path: `/products/${id}`, component: `page-product-${id}` })),

    { path: '/about', component: 'page-about' },
    { path: '/contact', component: 'page-contact' },

    { path: '*', component: 'page-not-found' },
  ],
};

// Per-request head metadata. Passed to the renderer by BOTH servers from this
// one place, so the node server and the worker cannot drift apart on what a
// page is called.
export { docMetaFor };
