// The homepage: motto, the ground-up claim, the two doors.
//
// Sections come from the framework's marketing composites wherever one fits —
// this site is the product's own proof, so reaching for a bespoke component
// when s-hro or s-fea would do is an argument against our own library. The
// hand-written blocks below exist where the shape genuinely is not in the
// library: the product grid with its status pills, and the three-step offer.
import { bind as featuresBind } from '@swc-js/composites/marketing/features.js';
import { bind as ctaBind } from '@swc-js/composites/marketing/cta.js';
import { CONTENT } from '../data/content.js';
import { productGridDSL, PRODUCT_GRID_CSS } from '../components/product-grid.js';
import { band, eyebrow, sectionHead, SECTION_CSS } from '../components/section.js';

const H = CONTENT.home;

const page = {
  tag: 'page-home',
  children: [
    // Written by hand rather than bound to s-hro, because the hero does two
    // things the section composite has no contract for: an atmosphere layer
    // behind it, and a headline whose second line rotates through the four
    // layers the page is about. Both are framework composites — the fx tier —
    // so this is still assembly, not bespoke UI.
    ['s-sc', '@band=hero', [
      ['s-fx-aur', '@aria-hidden=true'],
      ['s-cn', [
        eyebrow(H.hero.eyebrow),
        ['h1', '@rg=hero-title', [
          ['span', '@rg=hero-line', `=${H.hero.headline}`],
          ['s-fx-rot', { ':lead': H.hero.lead, ':words': H.hero.words, ':interval': 2600 }],
        ]],
        ['s-l', '@rg=hero-sub', `=${H.hero.sub}`],
        ['s-cn', '@rg=band-action', [
          ['s-b', '@c=pr', '@sz=lg', '~cl:nav:/contact', [['span', `=${H.hero.cta}`], ['s-ic', '@n=arrow-right']]],
          ['s-b', '@v=ol', '@sz=lg', '~cl:nav:/products', [['span', `=${H.hero.cta2}`]]],
        ]],
      ]],
    ]],

    // Scope first. Everything below is proof; this is the claim.
    band('scope', [
      featuresBind({ title: H.scope.title, sub: H.scope.sub, items: H.scope.items }),
    ], { alt: true }),

    band('layers', [
      featuresBind({ title: H.layers.title, sub: H.layers.sub, items: H.layers.items }),
    ]),

    band('offer', [
      sectionHead(H.offer.title, H.offer.sub),
      featuresBind({ items: H.offer.steps }),
      ['s-cn', '@rg=band-action', [
        ['s-b', '@c=pr', '~cl:nav:/legacy-to-model', [['span', `=${H.offer.cta}`], ['s-ic', '@n=arrow-right']]],
      ]],
    ], { tint: true }),

    band('products', [
      sectionHead(H.products.title, H.products.sub),
      productGridDSL(CONTENT.products.items, CONTENT.products.statusLabels),
      ['s-cn', '@rg=band-action', [
        ['s-b', '@v=ol', '~cl:nav:/products', [['span', `=${H.products.cta}`], ['s-ic', '@n=arrow-right']]],
      ]],
    ]),

    band('services', [
      sectionHead(H.services.title),
      featuresBind({ items: H.services.items }),
      ['s-cn', '@rg=band-action', [
        ['s-b', '@v=ol', '~cl:nav:/agentic-commerce', [['span', '=Agentic commerce'], ['s-ic', '@n=arrow-right']]],
        ['s-b', '@v=ol', '~cl:nav:/process-automation', [['span', '=Process automation'], ['s-ic', '@n=arrow-right']]],
      ]],
    ], { alt: true }),

    band('airtight', [
      featuresBind({ title: H.airtight.title, sub: H.airtight.sub, items: H.airtight.items }),
    ]),

    ctaBind({ headline: H.close.headline, sub: H.close.sub, action: { label: H.close.cta, route: '/contact' } }),
  ],
  css: `
page-home { display: block; }
${SECTION_CSS}
${PRODUCT_GRID_CSS}
/* The offer's three steps are a sequence, so they read as one row of equal
   weight rather than a grid of cards competing for attention. */
page-home s-sc[band=offer] s-fea s-cn[rg=fea-grid] { gap: 28px; }
/* The hero: the aurora sits behind the copy, the headline stacks its fixed
   line above the rotating one. */
page-home s-sc[band=hero] { overflow: hidden; padding-top: 116px; padding-bottom: 108px; }
/* Grid rather than two block lines so the rotating half sits directly under the
   fixed one — but justify-items:start sizes a grid item to max-content,
   which is how a 390px phone ended up with a 632px-wide headline. Items stretch
   and the text wraps. */
page-home h1[rg=hero-title] { display: grid; grid-template-columns: minmax(0, 1fr); gap: 2px; }
page-home span[rg=hero-line] { display: block; min-width: 0; }
/* The rotating box is as wide as the WIDEST word by design (that is what stops
   the layout jumping on every rotation), so it needs permission to wrap onto
   its own line and to align left rather than centre under the fixed line. */
page-home s-fx-rot { --fx-rot-color: #38bdf8; flex-wrap: wrap; max-width: 100%; }
page-home s-fx-rot [rg=fx-rot-box] { justify-items: start; max-width: 100%; }
page-home s-fx-rot [rg=fx-rot-w] { max-width: 100%; }
page-home label[is=s-l][rg=hero-sub] { display: block; margin-top: 26px; max-width: var(--site-text); font-size: 1.1875rem; line-height: 1.6; color: var(--c-text-secondary); }
page-home s-sc[band=hero] s-cn[rg=band-action] { margin-top: 38px; }
`,
};

export const homeDefs = [page];
