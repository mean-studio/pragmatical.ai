// An illustrative product story, entirely SWC DSL. Interaction writes to state.
export const studioPreviewDefs = [{
  tag: 'studio-preview',
  props: ['@stage'],
  children: [
    ['s-cn', '@l=row', '@rg=preview-bar', [
      ['s-ic', '@n=layout-dashboard'], ['strong', '=AI Studio'], ['span', '@rg=preview-label', '=Workflow preview'],
    ]],
    ['s-cn', '@l=vertical', '@rg=preview-inner', [
      ['s-tgb-g', '@v=line', '@aria-label=$t.a11y.studioSteps', ':dataField=value', ':dataSource=studioStep', '~ch:set:studioStep:$detail.value', [
        ['s-tgb', '@value=brief', '=01 Brief'], ['s-tgb', '@value=flow', '=02 Flow'], ['s-tgb', '@value=screens', '=03 Screens'],
      ]],
      ['s-cn', '@step=brief', '@l=vertical', '@rg=preview-stage', [
        ['s-l', '@rg=mini-label', '=YOUR IDEA'], ['h3', ':dataSource=t.homepage.studio.briefLabel'],
        ['s-cn', '@l=vertical', '@rg=prompt', [
          ['p', ':dataSource=t.homepage.studio.brief'],
          ['s-b', '@c=pr', '~cl:set:studioStep:flow', [['span', '=Explore the flow'], ['s-ic', '@n=arrow-right']]],
        ]],
        ['p', '@rg=preview-help', ':dataSource=t.homepage.studio.briefNote'],
        ['s-cn', '@l=row', '@rg=source-types', [['span', '=Description'], ['span', '=Screenshots'], ['span', '=API docs']]],
      ]],
      ['s-cn', '@step=flow', '@l=vertical', '@rg=preview-stage', [
        ['s-l', '@rg=mini-label', '=THE PLAN'], ['h3', ':dataSource=t.homepage.studio.flowTitle'],
        ['s-cn', '@l=vertical', '@rg=flow-example', [
          ['s-cn', '@l=row', [['s-ic', '@n=users'], ['strong', '=Welcome to the team'], ['span', '=01']]],
          ['s-cn', '@l=row', [['s-ic', '@n=clipboard-check'], ['strong', '=Your onboarding checklist'], ['span', '=02']]],
          ['s-cn', '@l=row', [['s-ic', '@n=file-check'], ['strong', '=Documents & support'], ['span', '=03']]],
        ]],
        ['p', '@rg=preview-help', ':dataSource=t.homepage.studio.flowNote'],
        ['s-b', '@v=tx', '~cl:set:studioStep:screens', [['span', '=See the screen'], ['s-ic', '@n=arrow-right']]],
      ]],
      ['s-cn', '@step=screens', '@l=vertical', '@rg=preview-stage', [
        ['s-l', '@rg=mini-label', '=THE INTERFACE'],
        ['s-cn', '@l=vertical', '@rg=app-example', [
          ['s-cn', '@l=row', [['s-ic', '@n=boxes'], ['strong', '=TEAMSPACE'], ['span', '=Sample app']]],
          ['h3', '=A good first day starts here.'], ['p', '=Welcome, Alex. Here is your next step.'],
          ['s-cn', '@l=row', '@rg=sample-task', [['s-ic', '@n=check-check'], ['span', '=Meet your team'], ['strong', '=Complete']]],
          ['s-cn', '@l=row', '@rg=sample-task', [['s-ic', '@n=file-check'], ['span', '=Read the team handbook'], ['strong', '=Up next']]],
        ]],
        ['p', '@rg=preview-help', ':dataSource=t.homepage.studio.screensNote'],
        ['s-ln', '@href=/products/ai-studio', '=Explore AI Studio'],
      ]],
    ]],
    ['s-cn', '@l=row', '@rg=preview-footer', [['s-ic', '@n=boxes'], ['span', '=Built on Smart Web Components']]],
  ],
}];
