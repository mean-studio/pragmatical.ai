export const chatState = {
  assistantHidden: true, assistantExpanded: 'false', assistantLauncherLabel: 'Open AI assistant',
  't.a11y.chatHistory': 'Chat history',
  't.a11y.chatMinimise': 'Minimise AI assistant', 't.a11y.chatReset': 'New conversation',
  chatRows: [{ role: 'assistant', actor: 'Pragmatical AI', content: 'Tell me what you want to build or improve. I can explain how Cherga, AI Studio, automation and system modernisation fit your project.' }],
  chatSubmit: null, chatRequest: null, chatPartial: '', chatStatus: '', chatError: '', chatBusy: false,
  chatSuggestions: ['What does Cherga include?', 'How would you modernise an existing system?', 'How do apps connect to agent workflows?'],
  't.a11y.send': 'Send message', 't.a11y.stop': 'Stop response', 't.a11y.jumpLatest': 'Jump to latest message',
  't.a11y.chatConversation': 'Conversation with the Pragmatical AI assistant',
};

export const chatServices = [['siteChat', '', [{
  name: 'send', url: '/swc/chat', method: 'POST', storeKey: 'chatRequest',
  responseType: 'stream', stream: { protocol: 'sse', textKey: 'chatPartial' },
  timeout: 45000, idleTimeout: 45000,
  statusStoreKey: 'chatStatus', errorStoreKey: 'chatError',
  transformFn: (_done, store) => finishChatTurn(store),
}]]];

function finishChatTurn(store) {
  const content = store.getValue('chatPartial');
  if (content) store.setValue('chatRows', [...(store.getValue('chatRows') || []), { role: 'assistant', actor: 'Pragmatical AI', content }]);
  store.setValues({ chatPartial: '', chatBusy: false });
}

// The native composer publishes a message. Application logic adds conversation
// context; the declared HTTP service owns transport, streaming and cancellation.
export function connectChat(component) {
  const store = component.store;
  const submit = store.subscribe('chatSubmit', (payload) => {
    const message = String(payload?.message || '').trim();
    if (!message || store.getValue('chatBusy')) return;
    store.setValue('chatSubmit', null);
    if (message.length > 2000) { store.setValue('chatError', 'Please keep each message under 2,000 characters.'); return; }
    const rows = [...(store.getValue('chatRows') || []), { role: 'user', actor: 'You', own: true, content: message }].slice(-20);
    store.setValues({ chatRows: rows, chatBusy: true, chatSuggestions: [] });
    store.setValue('chatRequest', { messages: rows.slice(-12).map(({ role, content }) => ({ role, content: content.slice(0, 2000) })) });
  });
  const status = store.subscribe('chatStatus', (value) => {
    if (value === 'aborted' || value === 'error') finishChatTurn(store);
  });
  component._subs.push({ sub: submit }, { sub: status });
}
