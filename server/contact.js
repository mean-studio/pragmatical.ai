// Local contact intake: append to a JSONL file. The production path is D1 (see
// worker/contact.js); this exists so the form is exercisable in development
// rather than only after a deploy.
import { appendFileSync } from 'node:fs';

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { 'content-type': 'application/json' },
});

export function registerContact(router, file) {
  router.post('/swc/contact', async (ctx) => {
    const body = (await ctx.body()) || {};
    if (!body.email || !body.context) return json({ error: 'Email and context are required.' }, 400);
    // A filled hidden field is a bot. Answer as if it worked: telling a
    // scraper it was caught teaches it to try again differently.
    if ((body.company_website || '').trim()) return json({ ok: true });
    appendFileSync(file, `${JSON.stringify({ at: new Date().toISOString(), ...body })}\n`);
    return json({ ok: true });
  });
}
