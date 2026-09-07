export const contactPageDefs = [{
  tag: 'page-contact',
  children: [
    ['s-sc', '@rg=chat-page', [
      ['s-cn', '@rg=home-wrap', '@l=vertical', [
        ['s-l', '@rg=eyebrow', '=Pragmatical AI assistant'],
        ['h1', '=What are you\nbuilding next?'],
        ['p', '@rg=lead-small', '=Explore the framework. Work through an automation idea. Find a starting point for modernisation.'],
        ['s-b', '@c=pr', '@rg=open-assistant', '~cl:call:openAssistant', [['span', '=Talk to the AI assistant'], ['s-ic', '@n=message-circle']]],
        ['p', '@rg=chat-note', '=Keep exploring while we talk. Minimise the assistant and pick up your conversation from any page.'],
        ['noscript', [['p', '=Enable JavaScript to use the assistant. You can still explore the platform and architecture pages.'], ['s-ln', '@href=/approach', '=Explore the architecture']]],
      ]],
    ]],
  ],
  methods: { openAssistant() { this.store.setValue('assistantHidden', false); } },
}];
