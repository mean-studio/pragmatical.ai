// Illustrative review, not a live legal assessment. Native SWC state and controls.
export const contractPreview = { tag: 'contract-preview', props: ['@view'], children: [
  ['s-cn', '@l=row', '@rg=review-toolbar', [
    ['strong', '=Supplier agreement'],
    ['s-tgb-g', '@v=line', '@aria-label=$t.a11y.contractViews', ':dataField=value', ':dataSource=contractView', '~ch:set:contractView:$detail.value', [
      ['s-tgb', '@value=draft', '=The change'], ['s-tgb', '@value=context', '=The context'],
    ]],
    ['span', '=Illustrative review / In build'],
  ]],
  ['s-cn', '@l=fg', '@rg=review-stage', [
    ['s-cn', '@rg=document-sheet', [
      ['s-cn', '@l=row', '@rg=document-meta', [['span', '=MASTER SERVICES AGREEMENT'], ['span', '=03']]],
      ['p', '@rg=document-section', '=8. Term and renewal'],
      ['s-cn', '@panel=draft', [
        ['h3', '=A familiar clause.\nA different obligation.'],
        ['p', '@rg=clause-text', [['span', '=Either party may prevent automatic renewal by giving written notice at least '], ['del', '=30'], ['span', '= '], ['ins', '=90'], ['span', '= days before the end of the current term.']]],
        ['p', '@rg=document-note', '=Returned draft · Change from the previous version'],
      ]],
      ['s-cn', '@panel=context', [
        ['h3', '=The document is only\npart of the picture.'],
        ['p', '@rg=clause-text', '=The negotiation record requested a 30-day notice period. The returned draft now requires 90 days.'],
        ['p', '@rg=document-note', '=Prior draft + negotiation note + current version'],
      ]],
      ['s-cn', '@l=row', '@rg=document-footer', [['span', '=Clause 8.2'], ['span', '=Review example · Sample content']]],
    ]],
    ['s-cn', '@rg=review-margin', [
      ['s-l', '@rg=eyebrow', '=Keep the context attached'],
      ['s-cn', '@rg=review-observation', [['span', '=01'], ['h4', '=What changed'], ['p', '=The notice window moved from 30 to 90 days.']]],
      ['s-cn', '@rg=review-observation', [['span', '=02'], ['h4', '=Why it needs attention'], ['p', '=The edit differs from the position recorded in the negotiation.']]],
      ['s-cn', '@rg=review-observation', [['span', '=03'], ['h4', '=Who decides'], ['p', '=The reviewer resolves the difference. The decision stays with this round.']]],
      ['s-l', '@rg=review-status', '=Awaiting reviewer decision'],
    ]],
  ]],
] };
