import { bind as conversation, defs as conversationDefs } from '@swc-js/composites/communication/conversation.js';
import { connectChat, chatState } from '../data/chat.js';

// Add a keyboard entry point to the shipped conversation's scroll region.
// This is a declarative extension; the composite still owns all chat behaviour.
const accessibleScroll = (value) => {
  if (!Array.isArray(value)) return value;
  const children = value.map(accessibleScroll);
  return value.includes('@rg=cnv-scroll')
    ? [...children, '@tabindex=0', '@role=log', '@aria-label=$t.a11y.chatHistory']
    : children;
};
const chatDefs = conversationDefs.map(def => def.tag === 's-cnv' ? { ...def, children: accessibleScroll(def.children) } : def);

// Persistent shell UI. Hiding the panel leaves the native conversation mounted.
export const assistantDefs = [...chatDefs, {
  tag: 'site-assistant',
  children: [
    ['s-cn', '@rg=assistant-panel', '@id=site-assistant-panel', '@role=dialog', '@aria-modal=false', '@aria-label=$t.a11y.chatConversation', ':dataField=hidden', ':dataSource=assistantHidden', '@l=vertical', [
      ['s-cn', '@rg=chat-heading', '@l=row', [
        ['img', '@src=/shots/pragmatical-symbol.svg', '@alt=', '@width=28', '@height=28'],
        ['s-cn', [['strong', '=Pragmatical AI'], ['p', '=AI assistant']]],
        ['s-b', '@v=ic', '@rg=chat-reset', '@aria-label=$t.a11y.chatReset', '~cl:call:newConversation', [['s-ic', '@n=rotate-ccw']]],
        ['s-b', '@v=ic', '@aria-label=$t.a11y.chatMinimise', '~cl:call:minimise', [['s-ic', '@n=minus']]],
      ]],
      conversation({
        map: { content: 'content', actor: 'actor', own: 'own' }, cancel: 'siteChat.send',
        store: { rows: 'chatRows', submit: 'chatSubmit', busy: 'chatBusy', suggestions: 'chatSuggestions', partial: 'chatPartial', status: 'chatStatus' },
      }),
      ['p', '?chatError', '@rg=chat-error', '@role=alert', '$chatError'],
      ['p', '@rg=chat-note', '=AI-generated answers. Avoid sharing sensitive information.'],
    ]],
    ['s-b', '@rg=assistant-launcher', '@c=pr', ':ref=launcher', '@aria-label=$assistantLauncherLabel', '@aria-controls=site-assistant-panel', '@aria-expanded=$assistantExpanded', '~cl:call:toggle', [
      ['s-ic', '@n=message-circle'], ['span', '=Ask AI'],
    ]],
  ],
  listeners: { keydown: 'onKeydown' },
  callbacks: {
    connected() {
      // Tab-local persistence also covers a full reload; nothing is published
      // into SSR state and no chat history is written to a public asset.
      try {
        const rows = JSON.parse(sessionStorage.getItem('pragmatical.chat') || 'null');
        if (Array.isArray(rows) && rows.length && rows.length <= 20 && rows.every(r => ['user','assistant'].includes(r.role) && typeof r.content === 'string' && r.content.length <= 10000)) {
          this.store.setValues({ chatRows: rows, chatSuggestions: rows.length > 1 ? [] : [...chatState.chatSuggestions] });
        }
      } catch { /* The current-page conversation still works. */ }
      connectChat(this);
      const rows = this.store.subscribe('chatRows', (value) => {
        try { sessionStorage.setItem('pragmatical.chat', JSON.stringify(value)); } catch { /* Storage can be disabled. */ }
      });
      const visible = this.store.subscribe('assistantHidden', (hidden) => {
        this.store.setValues({ assistantExpanded: hidden ? 'false' : 'true', assistantLauncherLabel: hidden ? 'Open AI assistant' : 'Hide AI assistant' });
        if (!hidden) requestAnimationFrame(() => this.getElementsByTagName('textarea')[0]?.focus());
      });
      this._subs.push({ sub: rows }, { sub: visible });
    },
  },
  methods: {
    toggle() { if (this.store.getValue('assistantHidden')) this.store.setValue('assistantHidden', false); else this.minimise(); },
    minimise() { this.store.setValue('assistantHidden', true); this.refs.launcher?.focus(); },
    onKeydown(event) { if (event.key === 'Escape' && !this.store.getValue('assistantHidden')) { event.preventDefault(); event.stopPropagation(); this.minimise(); } },
    newConversation() {
      this.store.setValue('http.cancel', 'siteChat.send');
      this.store.setValues({ chatRows: chatState.chatRows.map(r => ({ ...r })), chatSuggestions: [...chatState.chatSuggestions], chatPartial: '', chatError: '', chatBusy: false, chatSubmit: null, chatRequest: null });
      this.getElementsByTagName('textarea')[0]?.focus();
    },
  },
}];
