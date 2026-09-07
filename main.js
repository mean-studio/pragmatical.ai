// Browser entry. The whole app is app-config.js — this file exists to hand it
// to CreateApp and to seed the framework's accessible-name strings the same way
// the SSR store does, so a pruned t.a11y.* key still has a value after
// hydration.
import '@swc-js/components';
import { CreateApp, store, router } from '@swc-js/core';
import { A11Y_DEFAULT_STRINGS } from '@swc-js/core/core/a11y-strings.js';
import { appConfig } from './app-config.js';

store.setValues(A11Y_DEFAULT_STRINGS);

// The router publishes path params as `router.<name>`, and those keys are
// stripped from the SSR state by design — so pages bind the plain name and the
// server seeds it (data/meta.js). This mirrors the router's value onto it, so a
// client-side navigation between two product pages updates the same key the
// server-rendered one is bound to.
store.subscribe('router.pid', (value) => store.setValue('pid', value || ''));

CreateApp(appConfig);

// Keep native same-origin links inside the framework router. This preserves
// shell services (including a running chat stream) across every site page.
const sitePaths = new Set(appConfig.routes.map(route => route.path));
document.addEventListener('click', (event) => {
  const link = event.target.closest?.('a[href]');
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
  const target = new URL(link.href, location.href);
  if (target.origin !== location.origin || !sitePaths.has(target.pathname)) return;
  if (target.hash && target.pathname === location.pathname && target.search === location.search) return;
  event.preventDefault();
  router.navigateTo(target.pathname + target.search);
  if (target.hash) requestAnimationFrame(() => {
    history.replaceState(history.state, '', target.pathname + target.search + target.hash);
    try { document.getElementById(decodeURIComponent(target.hash.slice(1)))?.scrollIntoView(); } catch { /* An invalid fragment has no scroll target. */ }
  });
  else window.scrollTo(0, 0);
});


// Platform integration only: the control itself is declarative SWC, and the
// selected preference lives in the store. Persist just this preference, never
// contact fields or the application's content/state.
let savedAppearance = 'light';
try { savedAppearance = localStorage.getItem('pragmatical.appearance') || 'light'; } catch { /* Storage can be unavailable. */ }
// Resolve the previous three-way preference once; the UI now has two modes.
if (savedAppearance === 'system') savedAppearance = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
store.setValue('appearance', savedAppearance === 'dark' ? 'dark' : 'light');
store.subscribe('appearance', (value) => {
  const dark = value === 'dark';
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  store.setValues({
    appearanceIcon: dark ? 'sun' : 'moon',
    't.a11y.themeAction': store.getValue(dark ? 't.a11y.switchToLight' : 't.a11y.switchToDark'),
  });
  try { localStorage.setItem('pragmatical.appearance', value); } catch { /* The control still works without persistence. */ }
});
