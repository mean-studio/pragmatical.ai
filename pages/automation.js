// /process-automation — the same extraction method, pointed at operations.
import { bind as heroBind } from '@swc-js/composites/marketing/hero.js';
import { bind as featuresBind } from '@swc-js/composites/marketing/features.js';
import { bind as ctaBind } from '@swc-js/composites/marketing/cta.js';
import { CONTENT } from '../data/content.js';
import { band, eyebrow, SECTION_CSS } from '../components/section.js';

const P = CONTENT.automation;

const page = {
  tag: 'page-automation',
  children: [
    band('hero', [
      eyebrow(P.hero.eyebrow),
      heroBind({ headline: P.hero.headline, sub: P.hero.sub, cta: { label: P.hero.cta, route: '/contact' } }),
    ]),
    band('method', [featuresBind({ title: P.method.title, items: P.method.items })], { alt: true }),
    ctaBind({ headline: P.close.headline, action: { label: P.close.cta, route: '/contact' } }),
  ],
  css: `
page-automation { display: block; }
${SECTION_CSS}
page-automation s-sc[band=hero] { padding-bottom: 24px; }
page-automation s-sc[band=hero] s-hro { padding-top: 8px; }
`,
};

export const automationDefs = [page];
