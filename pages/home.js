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
import { band, eyebrow, sectionHead, outbound, SECTION_CSS } from '../components/section.js';

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

    // The five problems, each naming the tool that solves it and linking to
    // that tool's own site. Written out rather than bound to s-fea because the
    // features composite has no slot for a per-card link, and the link is the
    // point: every one of these is a product a reader can go and look at.
    band('pains', [
      sectionHead(H.pains.title, H.pains.sub),
      ['s-fx-glow', [['s-cn', '@rg=pain-grid', H.pains.items.map((it) => (
        ['s-cn', '@rg=fx-glow-card', [['s-c', '@rg=pain', [
          ['s-ic', `@n=${it.icon}`],
          ['h3', '@rg=pain-title', `=${it.title}`],
          ['s-l', '@rg=pain-body', `=${it.body}`],
          it.href.startsWith('http')
            ? outbound(it.tool, it.href)
            : ['s-b', '@v=tx', '@rg=pain-in', `~cl:nav:${it.href}`, [['span', `=${it.tool}`], ['s-ic', '@n=arrow-right']]],
        ]]]]
      ))]]],
    ], { alt: true }),

    band('products', [
      sectionHead(H.products.title, H.products.sub),
      productGridDSL(CONTENT.products.items, CONTENT.products.statusLabels),
      ['s-cn', '@rg=band-action', [
        ['s-b', '@v=ol', '~cl:nav:/products', [['span', `=${H.products.cta}`], ['s-ic', '@n=arrow-right']]],
      ]],
    ]),

    band('regulated', [
      featuresBind({ title: H.regulated.title, sub: H.regulated.sub, items: H.regulated.items }),
    ], { alt: true }),

    band('offer', [
      sectionHead(H.offer.title, H.offer.sub),
      featuresBind({ items: H.offer.steps }),
      ['s-cn', '@rg=band-action', [
        ['s-b', '@c=pr', '~cl:nav:/legacy-to-model', [['span', `=${H.offer.cta}`], ['s-ic', '@n=arrow-right']]],
      ]],
    ], { tint: true }),

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
/* The problem cards: a taller card than a feature tile, because each one has a
   problem, an answer and a way out to the tool that does it. */
/* Masonry, not a grid: six cards whose copy is honestly different lengths
   should be different heights. CSS columns pack them by height with no
   stretching, so there is no dead space under the short ones — the price is
   that reading order runs down each column rather than across, which for a
   set of peers is no price at all. */
/* display: block matters — s-cn is a grid by default, and the columns
   property does nothing to a grid container. */
page-home s-cn[rg=pain-grid] { display: block; columns: 1; column-gap: 18px; }
@media (min-width: 720px) { page-home s-cn[rg=pain-grid] { columns: 2; } }
@media (min-width: 1100px) { page-home s-cn[rg=pain-grid] { columns: 3; } }
page-home s-cn[rg=pain-grid] s-cn[rg=fx-glow-card] { display: block; break-inside: avoid; margin-bottom: 18px; --fx-glow-r: var(--radius-box); --fx-glow-c1: #818cf8; --fx-glow-c2: #38bdf8; --fx-glow-c3: #c4b5fd; --fx-glow-c4: #22d3ee; }
page-home s-c[rg=pain] { display: flex; flex-direction: column; align-items: flex-start; gap: 12px; padding: 26px; }
/* One spacer before the link so every card's link sits on the bottom edge,
   whatever the copy above it does. */
page-home s-c[rg=pain] > :nth-last-child(2) { margin-bottom: auto; }
page-home s-c[rg=pain] > s-ic { width: 22px; height: 22px; color: var(--c-primary); }
page-home h3[rg=pain-title] { margin: 0; font-family: var(--font-display); font-size: 1.0625rem; font-weight: 600; letter-spacing: -0.01em; }
page-home label[is=s-l][rg=pain-body] { flex: 0 0 auto; font-size: 0.9375rem; line-height: 1.62; color: var(--c-text-muted); }
page-home button[rg=pain-in] { padding: 0; background: transparent; border: 0; box-shadow: none; color: var(--c-primary-hover); font-weight: 600; font-size: 0.875rem; display: inline-flex; align-items: center; gap: 6px; }
page-home button[rg=pain-in]:hover { text-decoration: underline; background: transparent; }
page-home button[rg=pain-in] s-ic { width: 13px; height: 13px; }
page-home s-cn[rg=pain-points] { display: grid; gap: 9px; margin-top: 4px; }
page-home s-cn[rg=pain-point] { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 10px; align-items: start; }
page-home s-cn[rg=pain-point] s-ic { width: 14px; height: 14px; margin-top: 3px; color: var(--c-primary); }
page-home s-cn[rg=pain-point] label[is=s-l] { font-size: 0.875rem; line-height: 1.55; color: var(--c-text-secondary); }
`,
};

export const homeDefs = [page];
