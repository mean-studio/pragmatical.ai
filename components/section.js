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

export const SECTION_CSS = `
s-cn[rg=head] { display: block; max-width: var(--site-text); margin: 0 0 40px; }
h2[rg=head-title] { margin: 0; font-family: var(--font-display); font-weight: 400; letter-spacing: -0.01em; font-size: clamp(1.9rem, 1.3rem + 2vw, 3rem); line-height: 1.1; text-wrap: balance; }
label[is=s-l][rg=head-sub] { display: block; margin-top: 14px; font-size: 1.0625rem; line-height: 1.65; color: var(--c-text-secondary); }
s-cn[rg=band-action] { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 36px; }
s-cn[rg=band-action] button[is=s-b] s-ic { width: 15px; height: 15px; margin-left: 8px; }
`;
