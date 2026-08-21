// /legacy-to-model — the flagship offer, and the page a procurement reviewer
// will read hardest. Its boundaries section is the credibility, not the
// small print, so it is a full band rather than a footnote.
import { bind as heroBind } from '@swc-js/composites/marketing/hero.js';
import { bind as featuresBind } from '@swc-js/composites/marketing/features.js';
import { bind as statsBind } from '@swc-js/composites/marketing/stats-band.js';
import { bind as faqBind } from '@swc-js/composites/marketing/faq.js';
import { bind as ctaBind } from '@swc-js/composites/marketing/cta.js';
import { CONTENT } from '../data/content.js';
import { band, eyebrow, sectionHead, SECTION_CSS } from '../components/section.js';

const P = CONTENT.legacyToModel;

const page = {
  tag: 'page-legacy',
  children: [
    band('hero', [
      eyebrow(P.hero.eyebrow),
      heroBind({ headline: P.hero.headline, sub: P.hero.sub, cta: { label: P.hero.cta, route: '/contact' } }),
    ]),
    band('problem', [featuresBind({ title: P.problem.title, items: P.problem.items })], { alt: true }),
    band('pipeline', [faqBind({ title: P.pipeline.title, items: P.pipeline.items })]),
    band('corpus', [
      sectionHead(P.corpus.title, P.corpus.sub),
      statsBind({ stats: P.corpus.stats }),
    ], { tint: true }),
    band('boundaries', [featuresBind({ title: P.boundaries.title, sub: P.boundaries.sub, items: P.boundaries.items })], { alt: true }),
    ctaBind({ headline: P.close.headline, action: { label: P.close.cta, route: '/contact' } }),
  ],
  css: `
page-legacy { display: block; }
${SECTION_CSS}
page-legacy s-sc[band=hero] { padding-bottom: 24px; }
page-legacy s-sc[band=hero] s-hro { padding-top: 8px; }
`,
};

export const legacyDefs = [page];
