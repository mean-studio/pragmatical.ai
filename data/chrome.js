// Site chrome: header, navigation, footer. One bind, used as the app layout.
//
// Product navigation and the appearance control share the framework shell.
import { bind as shellBind, def as shellDef } from '@swc-js/composites/shells/shell-marketing.js';
import { siteNavigation } from '../components/site-navigation.js';
import { CONTENT } from './content.js';

export const NAV = [
  { label: 'Our work', route: '/work' },
  { label: 'Approach', route: '/approach' },
  { label: 'Company', route: '/about' },
];

const appearance = {
  tag: 'site-appearance',
  children: [['s-b', '@v=ic', '@aria-label=$t.a11y.themeAction', '@title=$t.a11y.themeAction', '~cl:call:toggleAppearance', [
    ['s-ic', ':dataField=n', ':dataSource=appearanceIcon'],
  ]]],
  methods: {
    toggleAppearance() {
      this.store.setValue('appearance', this.store.getValue('appearance') === 'dark' ? 'light' : 'dark');
    },
  },
};

// Extend the shipped marketing shell declaratively, retaining its navigation,
// projection, skip link and footer. Theme controls are another SWC component.
export const chromeDefs = [appearance, siteNavigation, {
  ...shellDef,
  children: [shellDef.children[0],
    ['s-hd', '@l=row', [
      ['s-ln', '@href=/', '@rg=brand-home', [
        ['img', '@src=/shots/pragmatical-symbol.svg', '@alt=', '@width=36', '@height=36'],
        ['span', '@rg=wordmark', '=pragmatical'], ['span', '@rg=wordmark-ai', '=ai'],
      ]],
      ['site-appearance'],
      ['site-navigation', ':dataField=expanded', ':dataSource=menuOpen'],
    ]],
    shellDef.children[2],
  ],
}];

export const FOOTER = {
  columns: [
    { title: 'Our work', links: [
      { label: 'Cherga', route: '/work#cherga' },
      { label: 'Contract Vetting', route: '/products/contract-vetting' },
      { label: 'UI framework', route: '/products/swc' },
    ] },
    { title: 'Pragmatical AI', links: [
      { label: 'Our approach', route: '/approach' },
      { label: 'Company', route: '/about' },
      { label: 'Get in touch', route: '/contact' },
    ] },
    { title: 'Explore further', links: [
      { label: 'Existing tools', route: '/products' },
      { label: 'Implementation', route: '/implementation' },
    ] },
  ],
  legal: CONTENT.brand.legal,
};

// `route` is passed at bind time on the server (see data/meta.js) so the first
// paint highlights the right nav item; the shell keeps it current after that.
export function chrome(route = '') {
  return shellBind({
    nav: NAV,
    brand: { label: CONTENT.brand.name, icon: 'boxes' },
    cta: { label: 'Get in touch', route: '/contact' },
    footer: FOOTER,
    ...(route ? { route } : {}),
  });
}
