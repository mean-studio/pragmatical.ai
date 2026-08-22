// The contact form's one piece of glue: the composite publishes the submitted
// values to a store key, this posts them and moves the page into its sent or
// failed state. Kept out of the page def so the page stays declarative and this
// stays testable on its own.
let wired = false;

export function wireContact(store) {
  if (wired) return;
  wired = true;
  store.subscribe('ctSubmit', async (payload) => {
    if (!payload || !payload.email) return;
    store.setValue('ctError', '');
    try {
      const res = await fetch('/swc/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      store.setValue('ctSent', true);
    } catch {
      // The message is the copy deck's, not the exception's: a visitor cannot
      // act on "HTTP 500", and the fallback address in it is something they can.
      store.setValue('ctError', 'failed');
    }
  });
}
