// A non-modal disclosure. SWC owns rendering/state; refs handle focus only.
import { navigationState } from '../data/navigation.js';
export const siteNavigation = {
  tag: 'site-navigation', props: ['@expanded'],
  children: [
    ['s-b', '@v=ic', '@rg=menu-toggle', ':ref=toggle', '@aria-label=$t.a11y.menu', '@aria-controls=primary-navigation', '@aria-expanded=$menuOpen', '~cl:call:toggleMenu', [
      ['s-ic', '@n=menu'],
    ]],
    ['nav', '@id=primary-navigation', '@aria-label=$t.a11y.primaryNavigation', '@l=row', ':ref=panel', [
      ['a', ':ref=firstLink', '@href=/work', '@aria-current=$navigation.work', '~cl:call:closeMenu', '=Platform'],
      ['a', '@href=/approach', '@aria-current=$navigation.approach', '~cl:call:closeMenu', '=Approach'],
      ['a', '@href=/about', '@aria-current=$navigation.about', '~cl:call:closeMenu', '=Company'],
      ['a', '@href=/contact', '@aria-current=$navigation.contact', '@rg=nav-contact', '~cl:call:closeMenu', '=Get in touch'],
    ]],
  ],
  callbacks: {
    connected() {
      this._escape = (event) => {
        if (event.key === 'Escape' && this.store.getValue('menuOpen') === 'true') {
          event.preventDefault(); this.closeMenu();
        }
      };
      this.addEventListener('keydown', this._escape);
      this._viewport = matchMedia('(min-width: 761px)');
      this._resize = () => {
        const focused = this.contains(document.activeElement);
        this.store.setValue('menuOpen', 'false');
        if (focused) {
          if (this._viewport.matches) this.refs.firstLink?.focus();
          else this.refs.toggle?.focus();
        }
      };
      this._viewport.addEventListener('change', this._resize);
      const sub = this.store.subscribe('route', (route) => {
        this.store.setValues(navigationState(route));
        this.closeMenu();
      });
      this._subs.push({ sub });
    },
    disconnected() {
      this.removeEventListener('keydown', this._escape);
      this._viewport?.removeEventListener('change', this._resize);
    },
  },
  methods: {
    toggleMenu() { this.store.setValue('menuOpen', this.store.getValue('menuOpen') === 'true' ? 'false' : 'true'); },
    closeMenu() {
      if (this.store.getValue('menuOpen') !== 'true') return;
      this.store.setValue('menuOpen', 'false');
      this.refs.toggle?.focus();
    },
  },
};
