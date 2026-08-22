// Contact intake, production path. The development counterpart appends to a
// JSONL file (server/contact.js); this writes to D1. Same endpoint, same
// request shape, same answers — so the form is exercisable locally and behaves
// identically once deployed.

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { 'content-type': 'application/json' },
});

// Created on first use rather than by a migration step: one table, and a
// deploy that has to be followed by a manual command is a deploy that will one
// day not be.
let ensured = false;
async function ensureTable(db) {
  if (ensured) return;
  await db.prepare(`CREATE TABLE IF NOT EXISTS contact (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    at TEXT NOT NULL,
    email TEXT NOT NULL,
    name TEXT,
    company TEXT,
    context TEXT NOT NULL
  )`).run();
  ensured = true;
}

export async function handleContact(request, env) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);

  // SameSite=Lax already blocks cross-site form posts with cookies; this
  // backstops the paths where it does not, and blocks nothing legitimate
  // because the form is same-origin.
  const origin = request.headers.get('origin');
  if (origin) {
    try {
      if (new URL(origin).host !== new URL(request.url).host) {
        return json({ error: 'Cross-origin request rejected.' }, 403);
      }
    } catch { return json({ error: 'Cross-origin request rejected.' }, 403); }
  }

  let body = {};
  try { body = (await request.json()) || {}; } catch { /* validated below */ }

  if (!body.email || !body.context) return json({ error: 'Email and context are required.' }, 400);

  // A filled hidden field is a bot. Answer as if it worked: telling a scraper
  // it was caught teaches it to try again differently.
  if (String(body.company_website || '').trim()) return json({ ok: true });

  // No database bound yet: say so honestly rather than accepting a message
  // into nowhere. A form that reports success and drops the enquiry is worse
  // than one that reports failure.
  if (!env.DB) return json({ error: 'The contact form is not configured on this server.' }, 503);

  try {
    await ensureTable(env.DB);
    await env.DB.prepare(
      'INSERT INTO contact (at, email, name, company, context) VALUES (?, ?, ?, ?, ?)',
    ).bind(
      new Date().toISOString(),
      String(body.email),
      String(body.name || ''),
      String(body.company || ''),
      String(body.context),
    ).run();
  } catch {
    return json({ error: 'Could not record that — please email us instead.' }, 500);
  }

  return json({ ok: true });
}
