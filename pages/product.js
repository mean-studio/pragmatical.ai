// /products/:pid — five products, one component. They differ in content, not in
// shape, so a second page component per product would be four copies of a
// layout waiting to drift apart.
//
// The route parameter picks the content at render time, which is why this page
// is a `?pid=` conditional stack rather than a data lookup: the conditional is
// evaluated by both the server and the client from the same store key, so the
// right product is in the HTML rather than swapped in after hydration.
import { bind as featuresBind } from '@swc-js/composites/marketing/features.js';
import { bind as ctaBind } from '@swc-js/composites/marketing/cta.js';
import { CONTENT } from '../data/content.js';
import { band, eyebrow, sectionHead, SECTION_CSS } from '../components/section.js';

const STATUS = CONTENT.products.statusLabels;

function productSections(id, p) {
  return ['s-cn', `?router.pid=${id}`, '@rg=product', [
    band('hero', [
      eyebrow(p.eyebrow),
      ['s-cn', '@rg=prod-head', [
        ['h1', '@rg=prod-h1', `=${p.headline}`],
        ['s-cn', '@rg=pill', `@state=${p.status}`, [['s-l', `=${STATUS[p.status]}`]]],
      ]],
      ['s-l', '@rg=prod-sub', `=${p.sub}`],
      ['s-cn', '@rg=band-action', [
        ['s-b', '@c=pr', '~cl:nav:/contact', [['span', '=Talk to us about it'], ['s-ic', '@n=arrow-right']]],
        ...(p.site ? [['s-ln', `@href=${p.site.href}`, '@rg=prod-site', [
          ['span', `=${p.site.label}`], ['s-ic', '@n=external-link'],
        ]]] : []),
      ]],
    ]),
    band('why', [
      sectionHead(p.why.title),
      ['p', '@rg=prose', `=${p.why.body}`],
    ], { alt: true }),
    band('does', [featuresBind({ title: p.does.title, items: p.does.items })]),
    band('who', [
      sectionHead('Who it is for.'),
      ['p', '@rg=prose', `=${p.who}`],
      sectionHead('Status and access.'),
      ['p', '@rg=prose', `=${p.access}`],
    ], { tint: true }),
  ]];
}

const page = {
  tag: 'page-product',
  children: [
    ...Object.entries(CONTENT.productPages).map(([id, p]) => productSections(id, p)),
    ctaBind({
      headline: CONTENT.home.close.headline,
      action: { label: CONTENT.home.close.cta, route: '/contact' },
    }),
  ],
  css: `
page-product { display: block; }
${SECTION_CSS}
page-product s-cn[rg=prod-head] { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
page-product h1[rg=prod-h1] { margin: 0; font-family: var(--font-display); font-weight: 400; letter-spacing: -0.01em; font-size: clamp(2.25rem, 1.5rem + 3vw, 3.75rem); line-height: 1.06; text-wrap: balance; }
page-product label[is=s-l][rg=prod-sub] { display: block; margin-top: 20px; max-width: var(--site-text); font-size: 1.0625rem; line-height: 1.65; color: var(--c-text-secondary); }
page-product p[rg=prose] { margin: 0 0 20px; max-width: var(--site-text); font-size: 1.0625rem; line-height: 1.7; color: var(--c-text-secondary); }
page-product s-ln[rg=prod-site] { display: inline-flex; align-items: center; gap: 8px; font-weight: 600; color: var(--c-primary); }
page-product s-ln[rg=prod-site] s-ic { width: 14px; height: 14px; }
page-product s-sc[band=hero] { padding-bottom: 40px; }
`,
};

export const productDefs = [page];
