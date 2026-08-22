// /agentic-commerce — the service line shop2gpt delivers.
import { bind as heroBind } from '@swc-js/composites/marketing/hero.js';
import { bind as featuresBind } from '@swc-js/composites/marketing/features.js';
import { bind as faqBind } from '@swc-js/composites/marketing/faq.js';
import { bind as ctaBind } from '@swc-js/composites/marketing/cta.js';
import { CONTENT } from '../data/content.js';
import { band, eyebrow, SECTION_CSS } from '../components/section.js';

const P = CONTENT.commerce;

const page = {
  tag: 'page-commerce',
  children: [
    band('hero', [
      eyebrow(P.hero.eyebrow),
      heroBind({
        headline: P.hero.headline,
        sub: P.hero.sub,
        cta: { label: P.hero.cta, route: '/products/shop2gpt' },
        cta2: { label: P.hero.cta2, route: '/contact' },
      }),
    ]),
    band('what', [featuresBind({ title: P.what.title, items: P.what.items })], { alt: true }),
    band('how', [faqBind({ title: P.how.title, items: P.how.items })]),
    ctaBind({ headline: P.close.headline, action: { label: P.close.cta, route: '/contact' } }),
  ],
  css: `
page-commerce { display: block; }
${SECTION_CSS}
page-commerce s-sc[band=hero] { padding-bottom: 24px; }
page-commerce s-sc[band=hero] s-hro { padding-top: 8px; }
`,
};

export const commerceDefs = [page];
