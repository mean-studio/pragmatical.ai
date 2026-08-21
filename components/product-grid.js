// The product grid: name, status, one sentence, a link.
//
// Written by hand rather than bound to s-fea because a status is not decoration
// — it is the first thing a buyer needs, and it belongs in the same visual
// breath as the name. A features grid has nowhere to put it that does not read
// as a subtitle.

// The grid is wrapped in s-fx-glow: one controller lights whichever card the
// pointer is NEAR, which is the difference between a hover state and a surface
// that feels lit. Each card carries the contract's marker, and the controller
// is display:contents so the grid below is still the grid.
export function productGridDSL(items, labels) {
  return ['s-fx-glow', [['s-cn', '@rg=prod-grid', items.map((p) => (
    ['s-cn', '@rg=fx-glow-card', [['s-c', '@rg=prod', `~cl:nav:${p.href}`, [
      ['s-cn', '@rg=prod-top', [
        ['h3', '@rg=prod-name', `=${p.name}`],
        ['s-cn', '@rg=pill', `@state=${p.status === 'live' ? 'live' : p.status}`, [
          ['s-l', `=${labels[p.status] || p.status}`],
        ]],
      ]],
      ['s-l', '@rg=prod-body', `=${p.body}`],
      ['s-cn', '@rg=prod-foot', [
        ['s-cn', '@rg=prod-more', [['s-l', '=Read more'], ['s-ic', '@n=arrow-right']]],
        ...(p.site ? [['s-ln', `@href=${p.site}`, '@target=_blank', '@rel=noopener noreferrer', '@rg=prod-site', [
          ['span', `=${p.site.replace('https://', '')}`], ['s-ic', '@n=arrow-up-right'],
        ]]] : []),
      ]],
    ]]]]
  ))]]];
}

export const PRODUCT_GRID_CSS = `
/* Three columns, not auto-fit: six products in four columns strands two on a
   second row, which reads as an afterthought rather than a set. */
s-cn[rg=prod-grid] { display: grid; grid-template-columns: 1fr; gap: 18px; }
@media (min-width: 720px) { s-cn[rg=prod-grid] { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (min-width: 1080px) { s-cn[rg=prod-grid] { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
s-cn[rg=prod-grid] s-cn[rg=fx-glow-card] { display: flex; --fx-glow-r: var(--radius-box); --fx-glow-c1: #818cf8; --fx-glow-c2: #38bdf8; --fx-glow-c3: #c4b5fd; --fx-glow-c4: #22d3ee; }
s-cn[rg=prod-grid] s-cn[rg=fx-glow-card] > s-c { flex: 1; }
s-c[rg=prod] { display: flex; flex-direction: column; gap: 12px; padding: 24px; background: var(--c-surface); border: 1px solid var(--c-border); border-radius: var(--radius-box); cursor: pointer; transition: border-color 150ms ease, transform 150ms ease; }
s-c[rg=prod]:hover { border-color: var(--c-primary); transform: translateY(-2px); }
s-c[rg=prod]:focus-visible { outline: var(--focus-width, 2px) solid var(--focus-color, var(--c-primary)); outline-offset: 2px; }
/* The status sits ABOVE the name rather than beside it: side by side, a
   two-word product name wrapped around the pill on every narrow card. */
s-cn[rg=prod-top] { display: flex; flex-direction: column-reverse; align-items: flex-start; gap: 10px; }
h3[rg=prod-name] { margin: 0; font-family: var(--font-display); font-size: 1.25rem; font-weight: 700; letter-spacing: -0.02em; }
label[is=s-l][rg=prod-body] { font-size: 0.9375rem; line-height: 1.6; color: var(--c-text-secondary); flex: 1; }
s-cn[rg=prod-more] { display: flex; align-items: center; gap: 6px; font-size: 0.8125rem; font-weight: 600; color: var(--c-primary); }
s-cn[rg=prod-more] s-ic { width: 14px; height: 14px; }
/* The card links two ways: in to our page on it, out to the product's own site
   in a new tab. The outbound one is quieter — it leaves. */
s-cn[rg=prod-foot] { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px; }
s-ln[rg=prod-site] a { display: inline-flex; align-items: center; gap: 5px; font-size: 0.75rem; color: var(--c-text-muted); text-decoration: none; }
s-ln[rg=prod-site] a:hover { color: var(--c-primary-hover); }
s-ln[rg=prod-site] s-ic { width: 12px; height: 12px; }
`;
