// The confirmation ledger — the site's signature.
//
// It is the deliverable of the work, drawn: a machine reads an estate or a
// returned draft and proposes a finding; a person confirms what it meant; the
// confirmation is recorded, and one line is always still open. The homepage
// claims "AI surfaces the pattern, a person confirms what it meant" — this is
// that sentence as an object rather than as a muted paragraph.
//
// Hand-authored DSL, so it server-renders. Mono for what the machine read, sans
// for what a person concluded: the type carries the distinction the product is
// built on.
export function ledgerDSL(l) {
  return ['s-cn', '@rg=ledger-w', [
    ['s-cn', '@rg=ledger', [
      ['s-cn', '@rg=ledger-hd', l.cols.map((c) => ['s-l', `=${c}`])],
      ...l.rows.map((r) => (
        ['s-cn', '@rg=ledger-row', `@state=${r.state}`, [
          ['s-l', '@rg=led-ref', `=${r.ref}`],
          ['s-l', '@rg=led-src', `=${r.src}`],
          ['s-l', '@rg=led-mean', `=${r.meaning}`],
          ['s-cn', '@rg=pill', `@state=${r.state}`, [['s-l', `=${r.label}`]]],
        ]]
      )),
    ]],
    ['s-l', '@rg=ledger-cap', `=${l.caption}`],
  ]];
}

export const LEDGER_CSS = `
s-cn[rg=ledger-w] { display: block; margin-top: 52px; }
s-cn[rg=ledger] { display: grid; grid-template-columns: 4.5rem minmax(0, 1.05fr) minmax(0, 1fr) 8.5rem; border-top: 1px solid var(--c-border-strong); }
/* subgrid, not display:contents — contents destroys the row box, and with it
   the hover, the rule and any focus ring the row would carry. */
s-cn[rg=ledger-hd], s-cn[rg=ledger-row] { grid-column: 1 / -1; display: grid; grid-template-columns: subgrid; align-items: baseline; column-gap: 24px; padding: 14px 0; border-bottom: 1px solid var(--c-border); }
s-cn[rg=ledger-hd] { padding: 10px 0; border-bottom-color: var(--c-border-strong); }
s-cn[rg=ledger-hd] label[is=s-l] { font-family: var(--font-mono); font-size: 0.625rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--c-text-muted); }
/* mono is the machine's reading, sans is the human's meaning */
label[is=s-l][rg=led-ref], label[is=s-l][rg=led-src] { font-family: var(--font-mono); font-variant-numeric: tabular-nums; font-size: 0.8125rem; color: var(--c-text-secondary); }
label[is=s-l][rg=led-ref] { color: var(--c-text-muted); }
label[is=s-l][rg=led-mean] { font-size: 0.9375rem; line-height: 1.5; color: var(--c-text); }
s-cn[rg=ledger-row][state=awaiting] label[is=s-l][rg=led-mean] { color: var(--c-text-muted); }
label[is=s-l][rg=ledger-cap] { display: block; margin-top: 14px; font-size: 0.75rem; color: var(--c-text-muted); }
@media (max-width: 860px) {
  s-cn[rg=ledger] { grid-template-columns: 3.5rem minmax(0, 1fr); }
  s-cn[rg=ledger-hd] { display: none; }
  s-cn[rg=ledger-row] { grid-template-columns: 3.5rem minmax(0, 1fr); row-gap: 4px; }
  label[is=s-l][rg=led-src] { grid-column: 2; }
  label[is=s-l][rg=led-mean] { grid-column: 2; }
  s-cn[rg=ledger-row] s-cn[rg=pill] { grid-column: 2; justify-self: start; margin-top: 4px; }
}
`;
