// /internal-ai — setting an organisation up to use AI on its own data.
//
// The capability the site was missing entirely: it listed six tools and never
// said that the dataflow, the governance around it and the screens the humans
// in the loop work in are things we build.
import { bind as heroBind } from '@swc-js/composites/marketing/hero.js';
import { bind as featuresBind } from '@swc-js/composites/marketing/features.js';
import { bind as faqBind } from '@swc-js/composites/marketing/faq.js';
import { bind as ctaBind } from '@swc-js/composites/marketing/cta.js';
import { CONTENT } from '../data/content.js';
import { band, eyebrow, sectionHead, SECTION_CSS } from '../components/section.js';

const P = CONTENT.internalAi;

const page = {
  tag: 'page-internal-ai',
  children: [
    band('hero', [
      eyebrow(P.hero.eyebrow),
      heroBind({ headline: P.hero.headline, sub: P.hero.sub, cta: { label: P.hero.cta, route: '/contact' } }),
    ]),
    band('flow', [featuresBind({ title: P.flow.title, items: P.flow.items })], { alt: true }),
    band('control', [
      sectionHead(P.control.title, P.control.sub),
      faqBind({ items: P.control.items }),
    ]),
    band('interfaces', [featuresBind({ title: P.interfaces.title, sub: P.interfaces.sub, items: P.interfaces.items })], { alt: true }),
    ctaBind({ headline: P.close.headline, action: { label: P.close.cta, route: '/contact' } }),
  ],
  css: `
page-internal-ai { display: block; }
${SECTION_CSS}
page-internal-ai s-sc[band=hero] { padding-bottom: 24px; }
page-internal-ai s-sc[band=hero] s-hro { padding-top: 8px; }
`,
};

export const internalAiDefs = [page];
