// /implementation — the spine service.
import { bind as heroBind } from '@swc-js/composites/marketing/hero.js';
import { bind as featuresBind } from '@swc-js/composites/marketing/features.js';
import { bind as statsBind } from '@swc-js/composites/marketing/stats-band.js';
import { bind as faqBind } from '@swc-js/composites/marketing/faq.js';
import { bind as ctaBind } from '@swc-js/composites/marketing/cta.js';
import { CONTENT } from '../data/content.js';
import { band, eyebrow, sectionHead, SECTION_CSS } from '../components/section.js';

const P = CONTENT.implementation;

const page = {
  tag: 'page-implementation',
  children: [
    band('hero', [
      eyebrow(P.hero.eyebrow),
      heroBind({ headline: P.hero.headline, sub: P.hero.sub, cta: { label: P.hero.cta, route: '/contact' } }),
    ]),
    band('stages', [featuresBind({ title: P.stages.title, items: P.stages.items })], { alt: true }),
    band('bring', [
      sectionHead(P.bring.title, P.bring.sub),
      statsBind({ stats: P.bring.stats }),
    ], { tint: true }),
    band('shapes', [faqBind({ title: P.shapes.title, items: P.shapes.items })]),
    ctaBind({ headline: P.close.headline, action: { label: P.close.cta, route: '/contact' } }),
  ],
  css: `
page-implementation { display: block; }
${SECTION_CSS}
page-implementation s-sc[band=hero] { padding-bottom: 24px; }
page-implementation s-sc[band=hero] s-hro { padding-top: 8px; }
/* Five stages read as a sequence: a four-column grid would break them into
   two rows and imply a pairing that is not there. */
page-implementation s-sc[band=stages] s-fea s-cn[rg=fea-grid] { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
`,
};

export const implementationDefs = [page];
