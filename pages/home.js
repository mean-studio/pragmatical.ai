import { homeSectionDefs } from '../components/home-sections.js';

// Composition only: declarative sections read their content from the store.
export const homeDefs = [...homeSectionDefs, {
  tag: 'page-home',
  children: [['home-intro'], ['home-foundation'], ['home-studio'], ['home-automation'], ['home-modernisation'], ['home-edge'], ['home-contracts'], ['home-engagement']],
}];
