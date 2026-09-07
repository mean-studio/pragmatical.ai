export const contactPageDefs = [{
  tag: 'page-contact',
  children: [
    ['s-sc', '@rg=chat-page', [
      ['s-cn', '@rg=home-wrap', '@l=vertical', [
        ['s-l', '@rg=eyebrow', '=Pragmatical AI assistant'],
        ['h1', '=What are you\nbuilding next?'],
        ['p', '@rg=lead-small', '=Explore the framework. Work through an automation idea. Find a starting point for modernisation.'],
        ['primary-assistant'],
        ['noscript', [['p', '=Enable JavaScript to use the assistant. You can still explore the platform and architecture pages.'], ['s-ln', '@href=/approach', '=Explore the architecture']]],
      ]],
    ]],
  ],
}];
