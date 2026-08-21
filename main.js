// Browser entry. The whole app is app-config.js — this file exists to hand it
// to CreateApp and to seed the framework's accessible-name strings the same way
// the SSR store does, so a pruned t.a11y.* key still has a value after
// hydration.
import '@swc-js/components';
import { CreateApp, store } from '@swc-js/core';
import { A11Y_DEFAULT_STRINGS } from '@swc-js/core/core/a11y-strings.js';
import { appConfig } from './app-config.js';

store.setValues(A11Y_DEFAULT_STRINGS);
CreateApp(appConfig);
