// /approach — the method, and the reading we did before selling it.
import { bind as heroBind } from '@swc-js/composites/marketing/hero.js';
import { bind as featuresBind } from '@swc-js/composites/marketing/features.js';
import { bind as statsBind } from '@swc-js/composites/marketing/stats-band.js';
import { bind as ctaBind } from '@swc-js/composites/marketing/cta.js';
import { CONTENT } from '../data/content.js';
import { band, eyebrow, sectionHead, SECTION_CSS } from '../components/section.js';

const P = CONTENT.approach;

const page = {
  tag: 'page-approach',
  children: [
    band('hero', [
      eyebrow(P.hero.eyebrow),
      heroBind({ headline: P.hero.headline, sub: P.hero.sub }),
    ]),
    band('principles', [featuresBind({ title: P.principles.title, items: P.principles.items })], { alt: true }),
    band('failures', [featuresBind({ title: P.failures.title, items: P.failures.items })]),
    band('corpus', [
      sectionHead(P.corpus.title, P.corpus.sub),
      statsBind({ stats: P.corpus.stats }),
    ], { tint: true }),
    ctaBind({ headline: P.close.headline, action: { label: P.close.cta, route: '/contact' } }),
  ],
  css: `
page-approach { display: block; }
${SECTION_CSS}
page-approach s-sc[band=hero] { padding-bottom: 24px; }
page-approach s-sc[band=hero] s-hro { padding-top: 8px; }
`,
};

export const approachDefs = [page];
