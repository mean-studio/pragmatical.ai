// /contact — one short form, stored in our own database.
//
// The framework's contact composite is schema-driven: fields in, form out, the
// submit value published to a store key. data/contact-glue.js turns that key
// into the POST, so the page itself stays declarative.
import { bind as contactBind } from '@swc-js/composites/marketing/contact.js';
import { CONTENT } from '../data/content.js';
import { band, eyebrow, SECTION_CSS } from '../components/section.js';
import { wireContact } from '../data/contact-glue.js';

const P = CONTENT.contact;

const page = {
  tag: 'page-contact',
  children: [
    band('hero', [
      eyebrow(P.hero.eyebrow),
      ['h1', '@rg=ct-h1', `=${P.hero.headline}`],
      ['s-l', '@rg=ct-sub', `=${P.hero.sub}`],
    ], { tight: true }),
    band('form', [
      // Sent and failed states replace the form rather than sitting above it:
      // a form still on screen after a successful send invites a second one.
      ['s-al', '@type=success', '@show-icon=', '@open=', '?ctSent', [['s-l', `=${P.form.sent}`]]],
      ['s-al', '@type=error', '@show-icon=', '@open=', '?ctError', [['s-l', `=${P.form.error}`]]],
      // Works without a line of script: the address is in the HTML.
      ['s-cn', '@rg=ct-fallback', [
        ['s-l', `=${P.form.fallbackLead}`],
        ['s-ln', `@href=mailto:${P.form.email}`, [['span', `=${P.form.email}`]]],
      ]],
      ['s-cn', '?!ctSent', [
        contactBind({
          title: P.form.title,
          submitLabel: P.form.submit,
          fields: [
            { name: 'name', label: P.form.name, required: true },
            { name: 'email', label: P.form.email, type: 'email', required: true, format: 'email' },
            { name: 'organisation', label: P.form.organisation },
            { name: 'role', label: P.form.role },
            { name: 'interest', label: P.form.interest, type: 'select', options: CONTENT.contact.interests },
            { name: 'jurisdiction', label: P.form.jurisdiction },
            { name: 'context', label: P.form.context, type: 'textarea', required: true, placeholder: P.form.contextPlaceholder },
          ],
          store: { submit: 'ctSubmit' },
        }),
      ]],
    ], { alt: true }),
  ],
  css: `
page-contact { display: block; }
${SECTION_CSS}
page-contact h1[rg=ct-h1] { margin: 0; font-family: var(--font-display); font-weight: 400; letter-spacing: -0.01em; font-size: clamp(2.25rem, 1.5rem + 3vw, 3.75rem); line-height: 1.06; text-wrap: balance; }
page-contact label[is=s-l][rg=ct-sub] { display: block; margin-top: 18px; max-width: var(--site-text); font-size: 1.0625rem; line-height: 1.65; color: var(--c-text-secondary); }
page-contact s-al { margin-bottom: 24px; }
page-contact s-cn[rg=ct-fallback] { display: flex; flex-wrap: wrap; align-items: baseline; gap: 8px; margin-bottom: 28px; font-size: 0.9375rem; color: var(--c-text-secondary); }
page-contact s-cn[rg=ct-fallback] s-ln { font-weight: 600; color: var(--c-primary); }
`,
  callbacks: {
    connected() { wireContact(this.store); },
  },
};

export const contactPageDefs = [page];
