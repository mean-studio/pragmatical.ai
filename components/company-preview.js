// An illustrative application, composed entirely from native SWC primitives.
export const companyPreview = { tag: 'company-preview', children: [
  ['s-cn', '@l=vertical', '@rg=system-visual', [
    ['s-cn', '@l=row', '@rg=system-bar', [['s-ic', '@n=boxes'], ['strong', '=An idea, connected.'], ['span', '=CHERGA']]],
    ['s-cn', '@l=vertical', '@rg=system-ui', [
      ['s-l', '@rg=system-label', '=01 / INTERFACE'],
      ['h2', '=Good morning, Alex.'], ['p', '=Your workspace. Everything ready for the next step.'],
      ['s-cn', '@l=row', '@rg=system-task', [['s-ic', '@n=file-check'], ['strong', '=Review supplier agreement'], ['span', '=Ready for you']]],
      ['s-cn', '@l=row', '@rg=system-task', [['s-ic', '@n=check-check'], ['strong', '=Prepare onboarding'], ['span', '=Complete']]],
    ]],
    ['s-cn', '@l=row', '@rg=system-connection', [['s-ic', '@n=workflow'], ['span', '=One experience. Connected underneath.']]],
    ['s-cn', '@l=fg', '@rg=system-layers', [
      ['s-cn', '@rg=system-layer', [['s-l', '@rg=system-label', '=02 / SERVICE'], ['h3', '=Context, in place.'], ['p', '=Documents · permissions · data']]],
      ['s-cn', '@rg=system-layer', [['s-l', '@rg=system-label', '=03 / FLOW'], ['h3', '=Work, moving forward.'], ['p', '=Gather · prepare · review']]],
    ]],
    ['p', '@rg=system-foot', '=Interfaces people use. Capabilities AI can work with.'],
  ]],
] };
