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

    // The problems as a BENTO rather than six identical cards: two of them
    // carry twice the width because they carry twice the story, and the mixed
    // rhythm is what stops a page of grids reading as one long grid. The cells
    // are hand-authored DSL, so they serialize — s-blk-bento's data path would
    // not have.
    band('pains', [
      sectionHead(H.pains.title, H.pains.sub),
      ['s-blk-bento', '@rg=pain-bento', H.pains.items.map((it) => (
        ['s-cn', '@rg=s-blk-bento-c', ...(it.wide ? ['@wide='] : []), [
          ['s-cn', '@rg=bento-top', [
            ['s-cn', '@rg=bento-icon', [['s-ic', `@n=${it.icon}`]]],
            ['span', '@rg=bento-status', [it.tag]],
          ]],
          ['s-cn', '@rg=bento-title', [it.title]],
          ['s-cn', '@rg=bento-desc', [it.body]],
          ['s-cn', '@rg=bento-tags', [
            it.href.startsWith('http')
              ? outbound(it.tool, it.href)
              : ['s-b', '@v=tx', '@rg=pain-in', `~cl:nav:${it.href}`, [['span', `=${it.tool}`], ['s-ic', '@n=arrow-right']]],
          ]],
        ]]
      ))],
      ['s-cn', '@rg=band-action', [
        ['s-b', '@v=ol', '~cl:nav:/products', [['span', `=${H.products.cta}`], ['s-ic', '@n=arrow-right']]],
      ]],
    ], { alt: true }),

    // Two engagements that are not a product: implementation, and setting the
    // organisation up to use AI internally.
    band('services', [
      sectionHead(H.services.title),
      ['s-fx-glow', [['s-cn', '@rg=svc-grid', H.services.items.map((it) => (
        ['s-cn', '@rg=fx-glow-card', [['s-c', '@rg=pain', [
          ['s-ic', `@n=${it.icon}`],
          ['h3', '@rg=pain-title', `=${it.title}`],
          ['s-l', '@rg=pain-body', `=${it.body}`],
          ['s-b', '@v=tx', '@rg=pain-in', `~cl:nav:${it.href}`, [['span', `=${it.cta}`], ['s-ic', '@n=arrow-right']]],
        ]]]]
      ))]]],
    ], { tint: true }),

    // The four guarantees as a ruled strip: they are one statement in four
    // parts, and four separate cards had been presenting them as four separate
    // ideas. Beams behind it, because this is the band that has to feel solid.
    band('regulated', [
      ['s-fx-beam', '@aria-hidden=true'],
      sectionHead(H.regulated.title, H.regulated.sub),
      ['s-cn', '@rg=guarantees', H.regulated.items.map((it) => (
        ['s-cn', '@rg=guarantee', [
          ['s-ic', `@n=${it.icon}`],
          ['h3', '@rg=guarantee-t', `=${it.title}`],
          ['s-l', '@rg=guarantee-d', `=${it.body}`],
        ]]
      ))],
    ]),

    // Three steps, numbered — the one place on the page where numbering is
    // true rather than decorative: extraction has to happen before
    // confirmation, and confirmation before training. A rule runs through them
    // so the order reads as a path rather than as three more cards.
    band('offer', [
      sectionHead(H.offer.title, H.offer.sub),
      ['s-cn', '@rg=steps', H.offer.steps.map((st, i) => (
        ['s-cn', '@rg=step', [
          ['s-cn', '@rg=step-n', [['span', `=${i + 1}`]]],
          ['s-cn', '@rg=step-b', [
            ['h3', '@rg=step-t', `=${st.title}`],
            ['s-l', '@rg=step-d', `=${st.body}`],
          ]],
        ]]
      ))],
      ['s-cn', '@rg=band-action', [
        ['s-b', '@c=pr', '~cl:nav:/legacy-to-model', [['span', `=${H.offer.cta}`], ['s-ic', '@n=arrow-right']]],
      ]],
    ], { tint: true }),

    ctaBind({ headline: H.close.headline, sub: H.close.sub, action: { label: H.close.cta, route: '/contact' } }),
  ],
  css: `
page-home { display: block; }
${SECTION_CSS}

/* ── hero ─────────────────────────────────────────────────────────────── */
page-home s-sc[band=hero] { overflow: hidden; padding-top: 116px; padding-bottom: 108px; }
page-home h1[rg=hero-title] { display: grid; grid-template-columns: minmax(0, 1fr); gap: 2px; }
page-home span[rg=hero-line] { display: block; min-width: 0; }
page-home s-fx-rot { --fx-rot-color: #38bdf8; flex-wrap: wrap; max-width: 100%; }
page-home s-fx-rot [rg=fx-rot-box] { justify-items: start; max-width: 100%; }
page-home label[is=s-l][rg=hero-sub] { display: block; margin-top: 26px; max-width: var(--site-text); font-size: 1.1875rem; line-height: 1.6; color: var(--c-text-secondary); }
page-home s-sc[band=hero] s-cn[rg=band-action] { margin-top: 38px; }

/* ── the bento: mixed cell sizes, glass over the ground ───────────────── */
/* dense: six cells of two widths never tile a three-column grid exactly, and
   without backfilling, a double-width cell that cannot fit leaves a hole in
   the middle of the row above it. Dense puts a later single into the gap and
   moves the wide one down, so the only empty space is at the end, where it
   reads as the edge of the set rather than as a mistake. */
page-home s-blk-bento[rg=pain-bento] { gap: 16px; grid-auto-flow: dense; }
page-home s-blk-bento [rg=s-blk-bento-c] { padding: 26px; gap: 12px; border-radius: var(--radius-box); border-color: var(--c-border); background: rgb(148 163 253 / .06); backdrop-filter: var(--glass); -webkit-backdrop-filter: var(--glass); }
page-home s-blk-bento [rg=s-blk-bento-c]:hover { box-shadow: none; border-color: var(--c-border-strong); background: rgb(148 163 253 / .1); }
page-home s-blk-bento [rg=bento-icon] { width: 40px; height: 40px; border-radius: 12px; background: rgb(129 140 248 / .16); color: var(--c-primary-hover); }
page-home s-blk-bento [rg=bento-icon] s-ic { width: 19px; height: 19px; }
page-home s-blk-bento [rg=bento-status] { font-family: var(--font-mono); font-size: 0.625rem; letter-spacing: 0.1em; text-transform: uppercase; background: transparent; border: 1px solid var(--c-border); color: var(--c-text-muted); padding: 4px 9px; }
page-home s-blk-bento [rg=bento-title] { font-family: var(--font-display); font-size: 1.125rem; font-weight: 700; letter-spacing: -0.02em; color: var(--c-text); }
page-home s-blk-bento [rg=bento-desc] { font-size: 0.9375rem; line-height: 1.62; color: var(--c-text-muted); }
page-home s-blk-bento [rg=bento-tags] { padding-top: 8px; }

/* ── the two engagements: wide panels, not cards ──────────────────────── */
page-home s-cn[rg=svc-grid] { display: grid; grid-template-columns: 1fr; gap: 18px; }
@media (min-width: 860px) { page-home s-cn[rg=svc-grid] { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
page-home s-cn[rg=svc-grid] s-cn[rg=fx-glow-card] { display: flex; --fx-glow-r: var(--radius-box); --fx-glow-c1: #818cf8; --fx-glow-c2: #38bdf8; --fx-glow-c3: #c4b5fd; --fx-glow-c4: #22d3ee; }
page-home s-c[rg=pain] { flex: 1; display: flex; flex-direction: column; align-items: flex-start; gap: 14px; padding: 34px; }
page-home s-c[rg=pain] > s-ic { width: 26px; height: 26px; color: var(--c-primary); }
page-home h3[rg=pain-title] { margin: 0; font-family: var(--font-display); font-size: 1.375rem; font-weight: 700; letter-spacing: -0.02em; }
page-home label[is=s-l][rg=pain-body] { flex: 1; font-size: 1rem; line-height: 1.62; color: var(--c-text-muted); }
page-home button[rg=pain-in] { padding: 0; background: transparent; border: 0; box-shadow: none; color: var(--c-primary-hover); font-weight: 600; font-size: 0.875rem; display: inline-flex; align-items: center; gap: 6px; }
page-home button[rg=pain-in]:hover { text-decoration: underline; background: transparent; }
page-home button[rg=pain-in] s-ic { width: 13px; height: 13px; }

/* ── the guarantees strip: one statement in four parts ────────────────── */
page-home s-sc[band=regulated] { overflow: hidden; }
page-home s-cn[rg=guarantees] { display: grid; grid-template-columns: 1fr; gap: 0; border-top: 1px solid var(--c-border); }
@media (min-width: 900px) { page-home s-cn[rg=guarantees] { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
/* Five guarantees, so five columns once there is room — four left the fifth
   sitting alone on a second row, which read as an afterthought. */
@media (min-width: 1180px) { page-home s-cn[rg=guarantees] { grid-template-columns: repeat(5, minmax(0, 1fr)); } }
page-home s-cn[rg=guarantee] { display: grid; gap: 10px; align-content: start; padding: 28px 24px 28px 0; border-bottom: 1px solid var(--c-border); }
@media (min-width: 900px) {
  page-home s-cn[rg=guarantee] { border-bottom: 0; border-left: 1px solid var(--c-border); padding: 28px 24px; }
  page-home s-cn[rg=guarantee]:first-child { border-left: 0; padding-left: 0; }
}
page-home s-cn[rg=guarantee] s-ic { width: 20px; height: 20px; color: var(--c-primary); }
page-home h3[rg=guarantee-t] { margin: 0; font-size: 1rem; font-weight: 600; letter-spacing: -0.01em; }
page-home label[is=s-l][rg=guarantee-d] { font-size: 0.875rem; line-height: 1.6; color: var(--c-text-muted); }

/* ── the sequence: numbers that mean something ────────────────────────── */
page-home s-cn[rg=steps] { display: grid; grid-template-columns: 1fr; gap: 0; }
@media (min-width: 860px) { page-home s-cn[rg=steps] { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 28px; } }
page-home s-cn[rg=step] { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 18px; align-items: start; padding: 22px 0; position: relative; }
page-home s-cn[rg=step-n] { display: inline-flex; align-items: center; justify-content: center; width: 42px; height: 42px; border-radius: 999px; border: 1px solid var(--c-primary); color: var(--c-primary-hover); font-family: var(--font-mono); font-size: 0.9375rem; }
/* The rule that turns three steps into a path. */
@media (min-width: 860px) {
  page-home s-cn[rg=step]::after { content: ''; position: absolute; left: 42px; right: -28px; top: 43px; height: 1px; background: linear-gradient(90deg, var(--c-border-strong), transparent); }
  page-home s-cn[rg=step]:last-child::after { display: none; }
}
page-home h3[rg=step-t] { margin: 0 0 6px; font-family: var(--font-display); font-size: 1.125rem; font-weight: 700; letter-spacing: -0.02em; }
page-home label[is=s-l][rg=step-d] { font-size: 0.9375rem; line-height: 1.62; color: var(--c-text-muted); }
`,
};

export const homeDefs = [page];
