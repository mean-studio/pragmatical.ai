// /products — the index. Five cards, one status each.
import { bind as heroBind } from '@swc-js/composites/marketing/hero.js';
import { bind as ctaBind } from '@swc-js/composites/marketing/cta.js';
import { CONTENT } from '../data/content.js';
import { productGridDSL, PRODUCT_GRID_CSS } from '../components/product-grid.js';
import { band, eyebrow, SECTION_CSS } from '../components/section.js';

const P = CONTENT.products;

const page = {
  tag: 'page-products',
  children: [
    band('hero', [
      eyebrow(P.hero.eyebrow),
      heroBind({ headline: P.hero.headline, sub: P.hero.sub }),
    ]),
    band('grid', [productGridDSL(P.items, P.statusLabels)], { alt: true }),
    ctaBind({
      headline: CONTENT.home.close.headline,
      sub: CONTENT.home.close.sub,
      action: { label: CONTENT.home.close.cta, route: '/contact' },
    }),
  ],
  css: `
page-products { display: block; }
${SECTION_CSS}
${PRODUCT_GRID_CSS}
page-products s-sc[band=hero] { padding-bottom: 24px; }
page-products s-sc[band=hero] s-hro { padding-top: 8px; }
`,
};

export const productsDefs = [page];
