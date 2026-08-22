// /about — four walls, four products. The story is the proof: no logos, no
// named institutions, per the house decision that the work speaks.
import { bind as heroBind } from '@swc-js/composites/marketing/hero.js';
import { bind as faqBind } from '@swc-js/composites/marketing/faq.js';
import { bind as featuresBind } from '@swc-js/composites/marketing/features.js';
import { bind as statsBind } from '@swc-js/composites/marketing/stats-band.js';
import { bind as ctaBind } from '@swc-js/composites/marketing/cta.js';
import { CONTENT } from '../data/content.js';
import { band, eyebrow, sectionHead, SECTION_CSS } from '../components/section.js';

const P = CONTENT.about;

const page = {
  tag: 'page-about',
  children: [
    band('hero', [
      eyebrow(P.hero.eyebrow),
      heroBind({ headline: P.hero.headline, sub: P.hero.sub }),
    ]),
    band('story', [faqBind({ title: P.story.title, items: P.story.items })], { alt: true }),
    band('principles', [featuresBind({ title: P.principles.title, items: P.principles.items })]),
    band('corpus', [
      sectionHead(P.corpus.title, P.corpus.sub),
      statsBind({ stats: P.corpus.stats }),
    ], { tint: true }),
    ctaBind({ headline: P.close.headline, action: { label: P.close.cta, route: '/contact' } }),
  ],
  css: `
page-about { display: block; }
${SECTION_CSS}
page-about s-sc[band=hero] { padding-bottom: 24px; }
page-about s-sc[band=hero] s-hro { padding-top: 8px; }
`,
};

export const aboutDefs = [page];
