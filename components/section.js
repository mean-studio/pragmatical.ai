// Band helpers. Every page is a stack of full-width bands with a centred
// column, so the padding, the hairline between bands and the tinted variants
// are decided once here rather than restated per page.
//
// These are DSL builders, not components: a band has no behaviour, and a
// component with no behaviour is a stylesheet wearing a costume.

export function band(name, children, { alt = false, tint = false, tight = false } = {}) {
  return ['s-sc', `@band=${name}`, ...(alt ? ['@alt='] : []), ...(tint ? ['@tint='] : []),
    ...(tight ? ['@tight='] : []), [['s-cn', children]]];
}

export function eyebrow(text) {
  return text ? ['s-l', '@rg=eyebrow', `=${text}`] : null;
}

// A heading and its standfirst, for bands built by hand rather than by a
// composite that owns its own title.
export function sectionHead(title, sub) {
  return ['s-cn', '@rg=head', [
    ['h2', '@rg=head-title', `=${title}`],
    ...(sub ? [['s-l', '@rg=head-sub', `=${sub}`]] : []),
  ]];
}

// An outbound link to a product's own site. Always a new tab: a reader
// comparing five tools should not lose this page to do it, and rel=noopener is
// the price of target=_blank.
export function outbound(label, href) {
  return ['s-ln', `@href=${href}`, '@target=_blank', '@rel=noopener noreferrer', '@rg=out', [
    ['span', `=${label}`],
    ['s-ic', '@n=arrow-up-right'],
  ]];
}

export const SECTION_CSS = `
/* Two columns, not a stack: the heading and its standfirst sit side by side
   over a hairline, which reclaims the empty right gutter and stops five bands
   opening with the identical left-aligned block. */
s-cn[rg=head] { display: grid; grid-template-columns: 1fr; gap: 14px; max-width: none; margin: 0 0 40px; padding-bottom: 22px; border-bottom: 1px solid var(--c-border); }
@media (min-width: 900px) { s-cn[rg=head] { grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 48px; align-items: baseline; } }
h2[rg=head-title] { margin: 0; font-family: var(--font-display); font-weight: 700; letter-spacing: -0.015em; font-size: clamp(1.9rem, 1.3rem + 2vw, 3rem); line-height: 1.06; text-wrap: balance; }
label[is=s-l][rg=head-sub] { display: block; max-width: var(--site-text); margin-top: 0; font-size: 1rem; line-height: 1.62; color: var(--c-text-secondary); }
s-cn[rg=band-action] { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 36px; }
s-cn[rg=band-action] button[is=s-b] s-ic { width: 15px; height: 15px; margin-left: 8px; }
s-ln[rg=out] a { display: inline-flex; align-items: center; gap: 6px; color: var(--c-primary-hover); font-weight: 600; font-size: 0.875rem; text-decoration: none; }
s-ln[rg=out] a:hover { text-decoration: underline; }
s-ln[rg=out] s-ic { width: 13px; height: 13px; }
`;
