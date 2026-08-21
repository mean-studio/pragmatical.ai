import { CONTENT } from '../data/content.js';

const page = {
  tag: 'page-not-found',
  children: [
    ['s-sc', '@band=nf', [['s-cn', [
      ['h1', '@rg=nf-code', `=${CONTENT.notFound.title}`],
      ['s-l', '@rg=nf-msg', `=${CONTENT.notFound.message}`],
      ['s-cn', '@rg=band-action', [
        ['s-b', '@c=pr', '~cl:nav:/', [['span', `=${CONTENT.notFound.back}`]]],
        ['s-b', '@v=ol', '~cl:nav:/products', [['span', '=See the products']]],
      ]],
    ]]]],
  ],
  css: `
page-not-found { display: block; }
page-not-found s-sc[band=nf] { display: block; padding: 140px 24px; text-align: center; }
page-not-found s-sc[band=nf] > s-cn { display: block; max-width: var(--site-max); margin: 0 auto; }
page-not-found h1[rg=nf-code] { margin: 0; font-family: var(--font-display); font-size: clamp(4rem, 3rem + 6vw, 7rem); font-weight: 400; color: var(--c-text-muted); line-height: 1; }
page-not-found label[is=s-l][rg=nf-msg] { display: block; margin-top: 18px; font-size: 1.125rem; color: var(--c-text-secondary); }
page-not-found s-cn[rg=band-action] { display: flex; gap: 12px; justify-content: center; margin-top: 32px; }
`,
};

export const notFoundDefs = [page];
