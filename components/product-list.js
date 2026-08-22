// The product inventory as a list: name, status, one line, two ways in.
//
// Six products are a catalogue, and a catalogue is read by scanning down a
// column of names — not by comparing six cards of equal weight. The list also
// makes room for the thing cards had nowhere to put: both destinations, the
// page here and the product's own site.
import { outbound } from './section.js';

export function productListDSL(items, labels) {
  return ['s-cn', '@rg=inv', items.map((p) => (
    ['s-cn', '@rg=inv-row', [
      ['s-cn', '@rg=inv-name', [
        ['h3', `=${p.name}`],
        ['s-cn', '@rg=pill', `@state=${p.status}`, [['s-l', `=${labels[p.status]}`]]],
      ]],
      ['s-l', '@rg=inv-body', `=${p.body}`],
      ['s-cn', '@rg=inv-links', [
        ['s-b', '@v=tx', '@rg=inv-in', `~cl:nav:${p.href}`, [['span', '=Read more'], ['s-ic', '@n=arrow-right']]],
        ...(p.site ? [outbound(p.site.replace('https://', ''), p.site)] : []),
      ]],
    ]]
  ))];
}

export const PRODUCT_LIST_CSS = `
/* One grid for the whole ledger, rows on subgrid — each row was its own grid
   container, so every row computed its own column widths and the description
   column wandered by 60px down the list. A ledger whose columns wander is not
   a ledger. */
s-cn[rg=inv] { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.6fr) auto; border-top: 1px solid var(--c-border-strong); }
s-cn[rg=inv-row] { grid-column: 1 / -1; display: grid; grid-template-columns: subgrid; align-items: center; gap: 28px; padding: 22px 4px; border-bottom: 1px solid var(--c-border); transition: background 160ms ease; }
s-cn[rg=inv-row]:hover { background: rgb(148 163 253 / .05); }
s-cn[rg=inv-name] { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
s-cn[rg=inv-name] h3 { margin: 0; font-family: var(--font-display); font-size: 1.25rem; font-weight: 700; letter-spacing: -0.02em; }
label[is=s-l][rg=inv-body] { font-size: 0.9375rem; line-height: 1.55; color: var(--c-text-muted); }
s-cn[rg=inv-links] { display: flex; align-items: center; gap: 18px; justify-content: flex-end; }
button[rg=inv-in] { padding: 0; background: transparent; border: 0; box-shadow: none; color: var(--c-primary-hover); font-weight: 600; font-size: 0.875rem; display: inline-flex; align-items: center; gap: 6px; }
button[rg=inv-in]:hover { text-decoration: underline; background: transparent; }
button[rg=inv-in] s-ic { width: 13px; height: 13px; }
@media (max-width: 900px) {
  s-cn[rg=inv] { grid-template-columns: 1fr; }
  s-cn[rg=inv-row] { grid-template-columns: 1fr; gap: 10px; padding: 20px 4px; }
  s-cn[rg=inv-links] { justify-content: flex-start; }
}
`;
