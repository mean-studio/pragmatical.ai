# Go-live plan: pragmatical.ai on Cloudflare Workers (revision 4)

**Shape of the plan.** Deploy the committed artefacts from the laptop, verify on workers.dev, fix the workflow token and prove the workflow by manual dispatch, bind D1 with the first push. Inventory everything that answers on both hostnames before touching traffic, and record for each hostname two separate facts: which product owns its DNS record, and which object actually produces today's response. Put a Workers route in front of `www` first, then the apex, with every existing DNS record untouched. Then convert to Custom Domains one hostname at a time under explicit activation checks, or keep routes permanently as a documented alternative branch. Rollback procedures are keyed on the observable state of each hostname, and every restoration assertion is derived from the recorded responder, never from DNS ownership. Nothing is rebuilt in this release.

Every command runs from the repository root on the owner's laptop unless the step says "dashboard", "GitHub" or "workflow". Only the owner pushes, deploys, or changes account state.

## Where things stand

- **Remote already has the new structure.** The failed run on 2026-08-22 executed on `ec742ca`, so `origin/master` should match the clean local tree. Confirm before starting: `git fetch origin && git status -sb` prints `## master...origin/master` with no ahead or behind. Inferred from the run record until that command confirms it.
- **Artefacts are the release, and this release does not rebuild.** `worker/build-manifest.js` carries `VERSION '1abd66c0ec'`, `HAS_LEGACY_JS true`, `INLINE_CSS true`. `../swc-js` is on a feature branch with dirty files, so a rebuild today would inline that state. Rebuild guidance is in stage F.
- **Known baseline defects shipped as-is, with the smoke tests written to match them.**
  - *Soft 404.* Unknown paths return status 200 with the rendered not-found page, because `app-config.js:100` matches everything and the renderer returns 200 for any match (`dist-worker/index.js:19602`, preserved by `worker/index.js:88`). A real 404 needs a source change and a controlled rebuild (stage F). The smoke test asserts the rendered not-found *element*, not a 404 status.
  - *Favicon.* `index.html:8-9` links `/favicon.svg`, `tools/build-dist.mjs:41` ships only `shots`, and `worker/index.js:58` hands dotted paths to ASSETS with `not_found_handling: "none"`. `/favicon.svg` returns 404. The browser check allows exactly this one console error.
  - *Silent SSR fallback.* The catch at `worker/index.js:91-99` renders the empty shell with status 200 and logs nothing. Detector: the served HTML must contain `data-swc-ssr` (emitted only on the SSR path at `dist-worker/index.js:19560`).
- **Whole-document text greps prove nothing about the page rendered.** `app-config.js:54-55` seeds the entire copy deck into state, and `dist-worker/index.js:19601` embeds that state in every page. So the homepage headline and the not-found message are present as JSON on every URL. Every content assertion in this plan is therefore scoped to a rendered element, and each positive assertion has a negative control.
- **Config-only commits do not rebuild.** The watch list at `tools/pre-commit:22` covers app sources, `worker/`, `tools/build-dist.mjs` and `package.json`, not `wrangler.jsonc` or `.github/`. So the D1 and routes commits run no hook. Restoring `worker/build-manifest.js` from history does match the list; R4 handles that with `--no-verify`, which the hook documents at `tools/pre-commit:31`.
- **Manual dispatch exists** (`.github/workflows/deploy.yml:20`). Pushes to master also deploy (`deploy.yml:18-19`), with a concurrency group that queues rather than cancels (`deploy.yml:22-24`). Every push to master after stage B is a deploy, and disabling the workflow does not stop a run already queued or running.
- **Settings to keep.** `wrangler.jsonc:16-17` `not_found_handling: "none"` and `run_worker_first: true` are required by the design. `wrangler.jsonc:27` enables observability. `dist/_headers` is generated at `tools/build-dist.mjs:85` and covers only `/shots/*`; edit the generator, never the file. `wrangler.jsonc` does not set `workers_dev`; stage E sets it explicitly when routes are added.
- **Source map.** `dist/bundle.js.map` exists on disk, is gitignored (`.gitignore:6`), and Wrangler's asset upload does not consult `.gitignore`. Stage A removes it before the laptop deploy so both deploy paths upload the same asset set. A later build regenerates it (`tools/build-dist.mjs:74`).
- **Worker HTML is not edge-cached by construction.** `worker/index.js:62-89` makes no subrequest and no Cache API call, so `cf-cache-status` on HTML is expected to be absent, `DYNAMIC`, `NONE` or `UNKNOWN`. Cloudflare documents `HIT`, `STALE` and `UPDATING` as responses served from cache, and `MISS`, `EXPIRED`, `REVALIDATED` and `BYPASS` as responses that went through the cache path. Any of those on HTML means something in the zone is caching the Worker's output and must be explained before the gate passes.
- **DNS ownership and the responder are different facts.** A zone route on another Worker answers a hostname whose DNS record belongs to Pages (E0 row 1). So the plan records, per hostname, a **DNS state** (P or W) and a **responder** (which object produces today's body), and rollback restores the responder.
- **Corrections to Luna's analysis** stand as in round 1: the source map exists; the favicon finding is confirmed; the merge-commit message claim was not verified.

## Shared smoke tests

Run at every stage marked "smoke". `BASE` is the origin under test. Expected values for the contact POST change at stage C. After E6, S1 and S2 run on workers.dev and the canonical hostname only; the non-canonical hostname is verified by the **E6 redirect assertions** block in E6, never by S1 or S2.

**S1, curl set.** `V` is read from the checked-out manifest, never typed, so the same script is valid for any restored release (R4).

```sh
BASE=https://pragmatical-ai.<subdomain>.workers.dev
V=$(sed -n "s/^export const VERSION = '\([0-9a-f]*\)';\$/\1/p" worker/build-manifest.js)
echo "$V"
#   expect for this release: 1abd66c0ec  (a restored release prints its own value; that is correct)
SAFARI='Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15'
CHROME='Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36'
HOME_H1='<h1 [^>]*rg="hero-title"[^>]*>AI, put to work on the problem you actually have\.'
NF_PAGE='<page-not-found[ >]'
NF_MSG='<label [^>]*rg="nf-msg"[^>]*>That page is not here\.'

# 1. homepage renders server-side, as the homepage
curl -s -o /dev/null -w '%{http_code} %{content_type}\n' "$BASE/"
#   expect: 200 text/html; charset=utf-8
curl -s "$BASE/" > /tmp/home.html
grep -q 'data-swc-ssr' /tmp/home.html && echo ssr-ok || echo ssr-FAIL
#   expect: ssr-ok   (FAIL = the silent fallback at worker/index.js:91 fired)
grep -Eq "$HOME_H1" /tmp/home.html && echo home-ok || echo home-FAIL
#   expect: home-ok   (the rendered hero heading, pages/home.js:25)
grep -Eq "$NF_PAGE|$NF_MSG" /tmp/home.html && echo neg-FAIL || echo neg-ok
#   expect: neg-ok    (negative control: the homepage must not contain the not-found elements)

# 2. product page has its own title
curl -s "$BASE/products/swc" | grep -o '<title>[^<]*'
#   expect: <title>SWC — Pragmatical AI

# 3. unknown path: documented soft 404, asserted on the rendered element
curl -s -o /dev/null -w '%{http_code}\n' "$BASE/no-such-page"
#   expect: 200   (baseline defect, see "Where things stand")
curl -s "$BASE/no-such-page" > /tmp/nf.html
grep -Eq "$NF_PAGE" /tmp/nf.html && grep -Eq "$NF_MSG" /tmp/nf.html && echo nf-ok || echo nf-FAIL
#   expect: nf-ok     (pages/not-found.js:4-8 rendered)
grep -Eq "$HOME_H1" /tmp/nf.html && echo neg-FAIL || echo neg-ok
#   expect: neg-ok    (negative control: a homepage served at the unknown URL fails here)

# 4. bundle selection by user agent, repeated to catch a cached wrong variant
for ua in "$CHROME" "$SAFARI" "$CHROME" "$SAFARI"; do
  curl -s -A "$ua" "$BASE/" | grep -o 'src="/bundle[^"]*"'
done
#   expect, in order: src="/bundle.js?v=$V", src="/bundle.safari.js?v=$V", and the same pair again
curl -s -o /dev/null -w '%{http_code} %{content_type}\n' "$BASE/bundle.js?v=$V"
curl -s -o /dev/null -w '%{http_code} %{content_type}\n' "$BASE/bundle.safari.js?v=$V"
#   expect: 200 and a javascript content type, twice

# 5. HTML is not served from the edge cache; imagery is immutable
curl -sI "$BASE/" | grep -iE '^(cf-cache-status|cache-control|vary)'
#   expect: a vary: user-agent line; no cache-control line
CS=$(curl -sI "$BASE/" | awk 'tolower($1)=="cf-cache-status:"{print toupper($2)}' | tr -d '\r')
case "${CS:-ABSENT}" in
  ABSENT|DYNAMIC|NONE|UNKNOWN) echo "cache-ok ($CS)" ;;
  *) echo "cache-INVESTIGATE ($CS)" ;;
esac
#   expect: cache-ok. Only absent, DYNAMIC, NONE or UNKNOWN pass. Every other value, including
#   HIT, STALE, UPDATING, MISS, EXPIRED, REVALIDATED and BYPASS, prints cache-INVESTIGATE and the
#   gate does not pass until E3's diagnosis has explained it. Also fail on a missing vary line or a
#   cache-control line on HTML.
curl -sI "$BASE/shots/swc.jpg" | grep -i '^cache-control'
#   expect: public, max-age=31536000, immutable   (proves _headers is honoured)

# 6. contact endpoint
curl -s -o /dev/null -w '%{http_code}\n' "$BASE/swc/contact"
#   expect: 405
curl -s -w '\n%{http_code}\n' -X POST "$BASE/swc/contact" -H 'content-type: application/json' \
  -H 'origin: https://evil.example' -d '{"email":"t@example.com","context":"smoke"}'
#   expect: 403
curl -s -w '\n%{http_code}\n' -X POST "$BASE/swc/contact" -H 'content-type: application/json' \
  -d '{"email":"t@example.com","context":"smoke"}'
#   expect before stage C: 503 containing "not configured"; after stage C: {"ok":true} and 200

# 7. documented favicon defect (informational)
curl -s -o /dev/null -w '%{http_code}\n' "$BASE/favicon.svg"
#   expect: 404
```

The `HOME_H1`, `NF_PAGE` and `NF_MSG` patterns are derived from the renderer code, not from a captured response. Stage A1 runs them against the local render first, so they are proven against real markup before they gate any account change. For a restored release (R4), check that the release's page sources still carry the `rg=hero-title` and `rg=nf-msg` markers (`git show <sha>:pages/home.js`, `git show <sha>:pages/not-found.js`) and take the expected copy from `git show <sha>:data/content.js`.

**S2, zone-hostname additions.** Run only when `BASE` is `https://pragmatical.ai` or `https://www.pragmatical.ai`, after stage D has recorded the zone settings. After E6, run it on the canonical hostname only.

```sh
HOST=pragmatical.ai   # then www.pragmatical.ai (until E6; afterwards the canonical host only)
# plain HTTP, path and query preserved
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' "http://$HOST/products/swc?x=1"
#   expect if Always Use HTTPS is on (stage D):  301 https://$HOST/products/swc?x=1
#   expect if it is off:                         200
# TLS and HSTS
curl -sSv "https://$HOST/" -o /dev/null 2>&1 | grep -E 'SSL certificate verify ok|subject: CN'
#   expect: "SSL certificate verify ok" and a CN or SAN covering $HOST
curl -sI "https://$HOST/" | grep -i '^strict-transport-security'
#   expect: present if and only if stage D recorded HSTS as enabled
```

**S3, browser set.** Owner, any desktop browser, plus Safari once.

1. Open `$BASE/`, click every nav item and one product card. Console shows no errors except the single `/favicon.svg` 404.
2. Open `$BASE/products/swc` by typing the URL, then hard-refresh. The product content stays visible after hydration and the tab title is `SWC — Pragmatical AI`. This exercises the hydration path described at `data/meta.js:44-54`.
3. Repeat step 2 in Safari. Network tab shows `bundle.safari.js` loaded.
4. Open `$BASE/contact`, fill name, email `t@example.com`, context `smoke`, submit. Before stage C: the error alert appears and the mailto fallback is visible. After stage C: a success alert appears whose text **begins with** "Thank you — that has reached us." (the full string at `data/content.js:627` continues with a second sentence). This exercises `data/contact-glue.js:10-25`.

## The plan

**Stage A: first deploy from the laptop (owner, terminal)**

1. **Local proof of the committed artefacts, and of the smoke patterns.** Run `npx wrangler dev`. `wrangler.jsonc:8-9` selects the committed bundle with `no_bundle`, so no framework checkout is needed. Exit: S1 passes with `BASE=http://localhost:8787` (item 5 prints `cache-ok (ABSENT)` locally, the contact POST returns 503), including both negative controls printing `neg-ok`. If `home-ok` or `nf-ok` fails locally, inspect `/tmp/home.html` and `/tmp/nf.html`, adjust the pattern to the actual element markup, and record the change; do not proceed with a pattern that has not passed locally.
2. **Parity with the workflow.** Run `rm -f dist/bundle.js.map`. Exit: `git status` is clean and `ls dist` shows no `.map` file.
3. **workers.dev subdomain.** Dashboard: Compute (Workers & Pages), Overview, right-hand panel "Your subdomain". Register one if none exists. Exit: the panel shows `<subdomain>.workers.dev`.
4. **Deploy with the OAuth login.** Run `npx wrangler deploy`. Exit: the output prints the workers.dev URL, and `npx wrangler deployments list` shows one deployment with a version ID. Record that version ID as `V_A`.
5. **Smoke with logs open.** Second terminal: `npx wrangler tail pragmatical-ai --format pretty`. Run S1 and S3 against the workers.dev URL. Exit: S1 and S3 pass, requests appear in the tail, no exceptions.

**Stage B: workflow credentials (owner, dashboard and GitHub)**

1. **Create the token.** Dashboard: profile icon, My Profile, API Tokens, Create Token, template "Edit Cloudflare Workers". Account Resources: Include, "Denis@mean.studio's Account" only. Zone Resources: Include, Specific zone, `pragmatical.ai`. Add the permission Account, D1, Edit (the template lacks it). Confirm the list shows Workers Scripts Edit, Workers Routes Edit for the zone, and Account Settings Read. Name it `github-actions pragmatical.ai deploy`. Copy once; store in the owner's password manager and the GitHub secret only. Exit: the token appears in the list with those permissions.
2. **Verify the token from the laptop.** Exit:

```sh
curl -s https://api.cloudflare.com/client/v4/user/tokens/verify -H "Authorization: Bearer $CF_TOKEN"
#   expect: "status":"active" and "success":true
CLOUDFLARE_API_TOKEN=$CF_TOKEN CLOUDFLARE_ACCOUNT_ID=9454bee9303d820d0bd8f3b120e68a34 npx wrangler deployments list
#   expect: the stage A deployment is listed (env vars take precedence over the OAuth login)
```

3. **Set the repository secrets.** GitHub: `mean-studio/pragmatical.ai`, Settings, Secrets and variables, Actions. Update `CLOUDFLARE_API_TOKEN` with the new token. Update `CLOUDFLARE_ACCOUNT_ID` to the value below even if it looks right, since it cannot be read back.

```
9454bee9303d820d0bd8f3b120e68a34
```

4. **Prove the workflow without a push.** GitHub: Actions, Deploy, Run workflow, branch `master`. Or `gh workflow run deploy.yml --ref master && gh run watch`. Exit: the run is green, the Deploy step prints the workers.dev URL, `npx wrangler deployments list` shows a second deployment, and S1 passes on the workers.dev URL.
5. **Retire the old token.** Only after step 4 is green and the owner confirms no other consumer: My Profile, API Tokens, delete the 2025-10-08 token. Exit: it no longer appears in the list.

**Stage C: D1 contact database (owner, terminal, then workflow)**

Recommendation: bind D1 before traffic moves, so the form works from the first visitor. The 503 at `worker/contact.js:54` is honest but visible.

1. **Create the database.** Run `npx wrangler d1 create pragmatical-contact`. Exit: the output prints a `database_id`; record it as `DB_ID`.
2. **Bind it.** Uncomment `wrangler.jsonc:24-26`, paste the id, stage the file. Exit before committing: `git diff --cached --stat` lists only `wrangler.jsonc`. Commit. Exit after committing: `git show --stat HEAD` lists only `wrangler.jsonc`, and `git status` is clean (no hook ran, no artefact changed).
3. **Push.** `git push origin master`. This is the first push under the plan. Exit: the Deploy run triggered by the push is green.
4. **Verify writes and record the known-good version.**

```sh
BASE=https://pragmatical-ai.<subdomain>.workers.dev
curl -s -w '\n%{http_code}\n' -X POST "$BASE/swc/contact" -H 'content-type: application/json' \
  -d '{"email":"t@example.com","context":"smoke"}'
#   expect: {"ok":true} and 200
npx wrangler d1 execute pragmatical-contact --remote --command "SELECT id, at, email FROM contact"
#   expect: one row with email t@example.com
npx wrangler d1 execute pragmatical-contact --remote --command "DELETE FROM contact WHERE email='t@example.com'"
npx wrangler deployments list
#   note the newest deployment's Version ID (the one carrying 100% of traffic); record it as V_GOOD
npx wrangler versions view <V_GOOD>
#   expect: the bindings section lists DB as a D1 database whose database_id equals DB_ID
```

Exit: S1 and S3 pass fully (contact success path included) on workers.dev, `V_GOOD` is recorded, and `versions view` shows the `DB` binding. `V_GOOD` is the operational rollback target from here on, because it carries the D1 binding.

**Stage D: inventory and preflight, nothing changes (owner, dashboard and terminal)**

Record every item below in the release notes before stage E. Do not stop at the first hit; record all of them. Items 1 and 8 produce two separate records per hostname: the **DNS state** and the **responder**.

1. **DNS.** Websites, `pragmatical.ai`, DNS, Records. For `pragmatical.ai` and `www.pragmatical.ai` record type, content, proxy status, TTL. A type "Worker" record means a Custom Domain on some Worker. A proxied CNAME to `pragmaticalai.pages.dev` means Pages owns the record. Also record the Zone ID from Websites, `pragmatical.ai`, Overview, right-hand API panel. Exit: both hostnames and the Zone ID written down, and each hostname's **DNS state** classified as **State P** (Pages CNAME), **State W** (Worker record owned by another Worker), or **other** (stop and investigate before stage E). This classification says who owns the record; it does not say who answers.
2. **Zone Workers routes, all of them.** Websites, `pragmatical.ai`, Workers Routes. Record every route whose pattern can match either hostname, including patterns with a path suffix and routes whose Worker is "None" (exclusion routes: matching requests bypass all Workers and go to the origin). More-specific patterns win over broader ones. Exit: a complete list with pattern and Worker name for each, or an explicit "no routes".
3. **Custom Domains across all Workers.** Compute, Workers & Pages. For every Worker other than `pragmatical-ai`: Settings, Domains & Routes, record any entry naming either hostname. Also record each such Worker's Triggers (cron), Bindings, and whether any other Worker lists it as a service binding. Exit: a list of Workers with domains or routes on the zone, and their triggers, bindings, and consumers.
4. **Rules.** Websites, `pragmatical.ai`: Rules, Redirect Rules; Rules, Page Rules; Rules, Origin Rules; Rules, Transform Rules; Rules, Snippets; Bulk Redirects (account level). Record every rule whose expression can match either hostname. Exit: a list, or an explicit "none".
5. **Zone settings that shape the smoke expectations.** SSL/TLS, Overview: encryption mode. SSL/TLS, Edge Certificates: Always Use HTTPS, HSTS (enabled or not), Automatic HTTPS Rewrites, minimum TLS, and the Universal certificate's hostnames (expect `pragmatical.ai` and `*.pragmatical.ai`). Caching, Configuration: caching level, Browser Cache TTL. Caching, Cache Rules: any rule that caches HTML or sets "cache everything" for either hostname. Exit: each value written down, and the S2 plain-HTTP expectation chosen (301 or 200).
6. **Pages project state and the rollback target.** Compute, Workers & Pages, `pragmaticalai`, Custom domains: record the status shown for each of `pragmatical.ai` and `www.pragmatical.ai` (Active, Inactive, Pending, or not listed). Then verify the rollback target serves the expected old release:

```sh
curl -s -o /dev/null -w '%{http_code}\n' https://pragmaticalai.pages.dev/
#   expect: 200
curl -s https://pragmaticalai.pages.dev/ | grep -c 'Beyond the Hype'
#   expect: 1
```

Exit: statuses recorded and both commands return the expected values.

7. **Fingerprint both hostnames as served today.**

```sh
for h in pragmatical.ai www.pragmatical.ai; do
  curl -sI "https://$h/" | grep -iE '^(HTTP|server|content-type|cf-cache-status|cf-ray|strict-transport-security|location)'
  curl -s "https://$h/" | head -c 600; echo
  curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' "http://$h/products/swc?x=1"
done
#   expect: apex 200 text/html from the old site; www 200 text/plain "Hello World!"; record everything printed
```

Exit: output saved in the release notes.

8. **Name the responder for each hostname, separately from DNS.** From items 1 to 4, write one line per hostname with three values:
   - `RESP`: the object that produces the body seen in item 7. One of `pages` (the Pages CNAME with no route or rule in front of it), `other-worker-route` (a zone route on another Worker, regardless of what DNS says), `other-worker-domain` (another Worker's Custom Domain, a type "Worker" record), or `rule` (a redirect, page rule or snippet answers first). A `State P` hostname can have `RESP=other-worker-route`; that is the E0 row 1 case, and its rollback restores the route, not Pages.
   - `RESP_NAME`: the Worker or rule name from items 2 to 4.
   - `PREV_GREP`: a string present in item 7's body for that hostname. Expected today: `Beyond the Hype` for the apex, `Hello World` for `www`. If item 7 shows something else, take a string from that body.

   The "Hello World!" text is the Wrangler starter template's output, so a Worker route or Worker Custom Domain is the likely type; this is inferred until item 2 or 3 names it. If items 1 to 4 name nothing that explains a hostname's body, stop here and investigate further (Cloudflare support, or the `server` and product headers from item 7) before stage E. Exit: each hostname has a recorded DNS state (P or W), a `RESP`, a `RESP_NAME` and a `PREV_GREP`, or the plan stops. Every R1 and R2 restoration assertion below uses `PREV_GREP`; nothing in rollback infers the responder from the DNS record.

**Stage E: domain hand-over (owner, dashboard), www first, then apex**

Principle: put a Workers route for `pragmatical-ai` in front of each hostname while its existing DNS record stays untouched. A zone route executes before the DNS-selected origin, and a route on a hostname takes precedence over a Worker Custom Domain on the same hostname (Cloudflare's routing documentation, confirmed by Astra; E1's exit verifies it here). Custom Domains come last, under explicit activation checks. No step in this stage claims a bounded outage; DNS caching and certificate activation are outside the plan's control.

**E0. Replacement action per responder found in stage D item 8.** Apply the matching rows in E1 and E2. The Rollback column is what step U in the rollback section performs, in reverse order of application.

| Responder (`RESP`) or object on the hostname | Action to serve the new site | Rollback (step U) |
|---|---|---|
| Route `<host>/*` on another Worker (`other-worker-route`) | Edit the route: Websites, `pragmatical.ai`, Workers Routes, edit, Worker `pragmatical-ai` | Repoint the route to `RESP_NAME` |
| More-specific route or exclusion route ("None") matching a path | Delete it, after recording pattern and Worker | Recreate from the record |
| Custom Domain on another Worker (`other-worker-domain`, DNS State W) | Leave DNS. Add a route `<host>/*` on `pragmatical-ai`, which precedes the Custom Domain | Delete the route; the other Worker answers again |
| Redirect Rule, Bulk Redirect, or Page Rule forwarding (`rule`) | Disable the rule after recording its expression and target; these evaluate before Workers routes (inferred) | Re-enable |
| Snippet | Disable its rule after recording code and expression | Re-enable |
| Origin Rule or Transform Rule | Record; leave in place if E1's smoke passes, else disable | Re-enable |
| Pages CNAME with nothing in front (`pages`, DNS State P) | Add a route `<host>/*` on `pragmatical-ai` | Delete the route; Pages answers again |

1. **www via route.** Apply E0 for every object recorded against `www` in stage D, then ensure exactly one route `www.pragmatical.ai/*` exists and points to `pragmatical-ai` (`pragmatical-ai`, Settings, Domains & Routes, Add, Route, zone `pragmatical.ai`, pattern `www.pragmatical.ai/*`, or the edited existing route). Exit: S1, S2 and S3 pass with `BASE=https://www.pragmatical.ai`, and `curl -s https://www.pragmatical.ai/ | grep -c "$PREV_GREP"` prints `0` using the `www` value from stage D item 8. Rollback: R1.
2. **Apex via route.** Apply E0 for any object recorded against the apex, then add the route `pragmatical.ai/*` on `pragmatical-ai`. The Pages CNAME stays. Exit: S1, S2 and S3 pass with `BASE=https://pragmatical.ai`, and `curl -s https://pragmatical.ai/ | grep -c "$PREV_GREP"` prints `0` using the apex value. Rollback: R1.
3. **Soak and cache check.** Leave both routes in place. Check real browsers, a link preview, and Compute, `pragmatical-ai`, Observability for exceptions. Re-run S1 items 4 and 5 on both hostnames. The Worker builds HTML without a subrequest or Cache API call (`worker/index.js:62-89`), so only an absent header, `DYNAMIC`, `NONE` or `UNKNOWN` is normal. If item 5 prints `cache-INVESTIGATE` with any other value (`HIT`, `STALE` and `UPDATING` are served from cache; `MISS`, `EXPIRED`, `REVALIDATED` and `BYPASS` show the response passed through the cache path), or the alternating-UA loop returns a wrong variant, investigate before changing anything: confirm the response is the new Worker's (the S1 element assertions pass on that same response and `cf-ray` is present), then check the Cache Rules and Page Rules recorded in stage D item 5 and Caching, Configuration for a rule whose expression matches the hostname and HTML. If such a rule is found, scope it to `/shots/*` or disable it, then Caching, Configuration, Purge Everything, then re-run items 4 and 5. If no matching rule is found, change nothing, record the observation with the `cf-ray` and the status value, and raise it with Cloudflare support before proceeding. Exit: no exceptions in Observability, item 5 prints `cache-ok` on both hostnames, and the bundle-selection loop passes on both hostnames.
4. **Choose the hand-over branch.** Recommended: E4a, Custom Domains, because the binding then lives in the repository, Cloudflare manages the certificate, and no placeholder DNS is needed. Alternative: E4b, permanent routes. Exactly one branch runs; E5 codifies whichever ran. Both branches are written per hostname and per DNS state (P or W from stage D item 1). The responder recorded in item 8 does not change the steps here; it decides the rollback rows.

   **E4a. Convert to Custom Domains, one hostname at a time, `www` first, at a time the owner chooses.** Preconditions per hostname: its route from E1/E2 serves the new site, stage D item 6 passed, and the owner has four tabs open: DNS Records, Pages Custom domains, `pragmatical-ai` Settings, Domains & Routes, and (for State W) the other Worker's Domains & Routes.

   *State P, the hostname has a proxied CNAME to `pragmaticalai.pages.dev`:*
   1. DNS: delete the CNAME. The record's content is already in the stage D notes. (Rollback from here: R2, row P1.)
   2. Pages, `pragmaticalai`, Custom domains, Remove domain for the hostname. (Rollback from here: R2, row P2.)
   3. `pragmatical-ai`, Domains & Routes, Add, Custom Domain, enter the hostname, Add. (Rollback from here: R2, row P3.)
   4. Wait for all of: DNS Records shows a record of type "Worker" for the hostname owned by `pragmatical-ai`; Domains & Routes shows the domain as Active, not Initializing or Pending; SSL/TLS, Edge Certificates lists an active certificate covering the hostname. Exit for this sub-step: all three visible.
   5. Verify resolution and TLS, then smoke:

   ```sh
   dig +short <hostname>
   #   expect: at least one address (Cloudflare proxied)
   ```
   followed by S1, S2 and S3 with `BASE=https://<hostname>`. Exit: all pass.
   6. Delete the temporary route `<hostname>/*` on `pragmatical-ai`. If that route was an edited one that belonged to `RESP_NAME` (E0 row 1), this also removes the other Worker's old route; the stage D item 2 record is what step U recreates from. Re-run S1 and S2. Exit: all pass with the route gone. (Rollback from here: R2, row P3.)

   *State W, the hostname has a type "Worker" record owned by another Worker's Custom Domain:*
   1. Pages, `pragmaticalai`, Custom domains, Remove domain for the hostname if listed (it cannot be active while another product owns the record). (Rollback before this step: R1. Rollback from here: R2, row W1.)
   2. Other Worker, Settings, Domains & Routes, delete the Custom Domain for the hostname. This removes the Worker record; the temporary route keeps `pragmatical-ai` bound but the hostname has no DNS record until step 3 completes. (Rollback from here: R2, row W2.)
   3. `pragmatical-ai`, Domains & Routes, Add, Custom Domain, enter the hostname, Add. (Rollback from here: R2, row W3.)
   4. to 6. As in State P. (Rollback from any of them: R2, row W3.)

   Between deleting the old record and the new Worker record becoming active there is no DNS record for the hostname. Requests that cannot resolve fail during that window. The plan does not bound it.

   **E4b. Keep routes permanently.** The route from E1/E2 keeps serving as long as the hostname stays proxied, so the goal is a proxied placeholder record that no product owns. Per hostname, by DNS state:

   *State P:*
   1. DNS: delete the Pages CNAME. (Rollback from here: R2, row P1.)
   2. DNS: Add record, type `AAAA`, name the hostname, content `100::`, proxy status Proxied. This is Cloudflare's documented placeholder for route-only hostnames. (Rollback from here: R2, row B1.)
   3. Pages, `pragmaticalai`, Custom domains, Remove domain for the hostname. (Rollback from here: R2, row B2.)
   4. Activation checks: DNS Records shows the proxied `AAAA`; `dig +short <hostname>` returns Cloudflare addresses; `curl -sSv https://<hostname>/ -o /dev/null 2>&1 | grep -c 'SSL certificate verify ok'` prints `1` (the zone's Universal certificate recorded in stage D item 5 covers the hostname); S1 and S2 pass. Exit: all four.

   *State W:*
   1. Pages, `pragmaticalai`, Custom domains, Remove domain for the hostname if listed. (Rollback before this step: R1. Rollback from here: R2, row W1.)
   2. Other Worker, Settings, Domains & Routes, delete the Custom Domain for the hostname. The Worker record disappears; the hostname has no record until step 3. (Rollback from here: R2, row W2.)
   3. DNS: Add record, type `AAAA`, name the hostname, content `100::`, Proxied. (Rollback from here: R2, row B3.)
   4. Activation checks as in State P step 4. (Rollback from here: R2, row B3.)

   There is a window between the delete and the add in which the hostname has no record; the plan does not bound it. On this branch, skip E4a and use the E5b configuration.

5. **Codify in the repository.** One config-only commit; no hook runs (`wrangler.jsonc` is not watched). Include `workers_dev` explicitly: adding `routes` makes Wrangler infer `workers_dev: false` on the next deploy, which would remove the verification URL used throughout this plan. Default: keep it (decision list).

   **E5a, after E4a:**

   ```jsonc
   "workers_dev": true,
   "routes": [
     { "pattern": "pragmatical.ai", "custom_domain": true },
     { "pattern": "www.pragmatical.ai", "custom_domain": true }
   ],
   ```

   **E5b, after E4b** (Zone ID from stage D item 1; `zone_id` avoids a zone lookup the token may not be allowed):

   ```jsonc
   "workers_dev": true,
   "routes": [
     { "pattern": "pragmatical.ai/*", "zone_id": "<zone id>" },
     { "pattern": "www.pragmatical.ai/*", "zone_id": "<zone id>" }
   ],
   ```

   Exit before committing: `git diff --cached --stat` lists only `wrangler.jsonc`. Exit after committing: `git show --stat HEAD` lists only `wrangler.jsonc`. Push. Exit: the Deploy run is green, the dashboard still lists both domains (E5a) or both routes (E5b), the workers.dev URL still passes S1, and both hostnames pass S1 and S2. If the run fails with an authentication error naming a permission, add that permission to the stage B token and re-run by dispatch; do not widen the token beyond what the error names.

6. **Canonical redirect (after the owner's decision).** The example below makes the apex canonical; swap the two hostnames if `www` is chosen. Dashboard: Websites, `pragmatical.ai`, Rules, Redirect Rules (or Rules, Overview, Create rule, Redirect Rule), Create rule. Name `canonical host`. When incoming requests match: Custom filter expression `(http.host eq "www.pragmatical.ai")`. Then: Type **Dynamic**, Expression `concat("https://pragmatical.ai", http.request.uri.path)`, Status code **301**, tick **Preserve query string**. Deploy. The Rules language has no `if()` function; query preservation is the checkbox, not part of the expression. The redirected host keeps its Custom Domain or route so it stays proxied with a valid certificate.

   **E6 redirect assertions.** From this step on, this block is the only test run against the non-canonical hostname. S1 and S2 run on workers.dev and the canonical hostname. This split applies everywhere below: E7, R0, R3 step 6 (unless the rule was toggled off in R3 step 3), R4, and stage F.

```sh
# HTTPS, empty and non-empty query, path preserved
for u in 'https://www.pragmatical.ai/' 'https://www.pragmatical.ai/products/swc' 'https://www.pragmatical.ai/products/swc?x=1&y=2'; do
  curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' "$u"
done
#   expect: 301 https://pragmatical.ai/
#           301 https://pragmatical.ai/products/swc
#           301 https://pragmatical.ai/products/swc?x=1&y=2
# plain HTTP on the non-canonical host
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' 'http://www.pragmatical.ai/products/swc?x=1'
#   expect: 301, with redirect_url either https://pragmatical.ai/products/swc?x=1 (the rule fired first)
#           or https://www.pragmatical.ai/products/swc?x=1 (Always Use HTTPS fired first); record which
curl -sL -o /dev/null -w '%{url_effective} %{http_code} %{num_redirects}\n' 'http://www.pragmatical.ai/products/swc?x=1'
#   expect: https://pragmatical.ai/products/swc?x=1 200 and num_redirects of 1 or 2, never more
# the non-canonical host still terminates TLS with a valid certificate
curl -sSv https://www.pragmatical.ai/ -o /dev/null 2>&1 | grep -c 'SSL certificate verify ok'
#   expect: 1
# canonical host is untouched
curl -s -o /dev/null -w '%{http_code}\n' 'https://pragmatical.ai/products/swc?x=1'
#   expect: 200
```
   Exit: every line above matches, and the canonical host passes S1 and S2.

7. **Stray Worker disposition.** Default: retain it, detached. Deletion is not needed for this cutover. Delete only if all of the following are recorded in stage D item 3: its purpose is identified as the starter template, it has no cron triggers, no bindings, no service-binding consumers, and no remaining domains or routes. Then run `npx wrangler delete --name <stray-name>`. If Wrangler reports dependencies or asks to force the deletion, answer no and stop; retain the Worker and record why. Exit if deleted: it no longer appears in Compute, Workers & Pages. Exit if retained: its Domains & Routes tab is empty. Deleting it removes the `other-worker-*` rollback target for good; the Pages target remains.

## Rollback procedures

Two different goals exist, and the procedures name which one they reach:

- **Recorded responder.** Whatever answered the hostname before stage E, as recorded in stage D item 8: `RESP`, `RESP_NAME` and `PREV_GREP`. For today's hostnames that is Pages on the apex and the "Hello World!" Worker on `www`, but the procedures use the record, not this sentence.
- **Pages.** The old site on the hostname regardless of its recorded responder. For a hostname whose responder was another Worker this is a change, not a restoration. If the other Worker owns the DNS record (State W), its Custom Domain must be detached before Pages can attach; the rows below say so explicitly.

Verification strings: the recorded responder is `grep -c "$PREV_GREP"` printing a number greater than `0`; the Pages target is `grep -c 'Beyond the Hype'` printing a number greater than `0`; the new site is `grep -Eq "$HOME_H1"` from S1. Every hostname check below is a non-following `curl -s https://<hostname>/`.

**Step U, undo E0 for one hostname.** Reverse every E0 row applied to the hostname, latest first: delete the route `<hostname>/*` that E1/E2 added; repoint an edited route back to `RESP_NAME`; recreate any route deleted in E0 or in E4a step 6 from the stage D item 2 record; re-enable any rule disabled in E0. Exit: Websites, `pragmatical.ai`, Workers Routes shows the same set of routes for the hostname as stage D item 2, and `pragmatical-ai` has no route or domain on the hostname.

**Step V, verification for every rollback row.**
```sh
curl -s -o /dev/null -w '%{http_code}\n' https://pragmaticalai.pages.dev/     # expect 200 (Pages target only)
curl -s https://<hostname>/ | grep -c "$PREV_GREP"                             # expect > 0 for the recorded-responder target
curl -s https://<hostname>/ | grep -c 'Beyond the Hype'                        # expect > 0 for the Pages target
curl -s https://<hostname>/ | grep -Eq "$HOME_H1" && echo new-site-STILL-LIVE || echo new-site-gone
#                                                                                 expect new-site-gone
curl -sSv https://<hostname>/ -o /dev/null 2>&1 | grep -c 'SSL certificate verify ok'   # expect 1
```
Exit: the expected line for the chosen target, and `new-site-gone`.

**R0. Operational rollback of the Worker code (any time after stage C).** Use an explicit version target, never `git revert` of sources.

```sh
npx wrangler versions list
#   locate V_GOOD (stage C) or the last version that passed S1
npx wrangler rollback <version-id> --message "rollback to V_GOOD"
npx wrangler deployments list
#   expect: the newest deployment carries <version-id> at 100%
npx wrangler versions view <version-id>
#   expect: the bindings section lists DB as a D1 database with database_id DB_ID
```

Rollback selects a deployed version's code and its recorded bindings. It does not touch Git, DNS, routes, Custom Domains, or D1 contents. A target older than `V_GOOD` has no DB binding and returns 503 on the form. Exit: S1 passes on workers.dev and on every hostname currently bound to `pragmatical-ai`; after E6, S1 runs on workers.dev and the canonical hostname only, and the non-canonical hostname passes the E6 redirect assertions.

**R1. During the route phase (E1 to E3), goal: recorded responder.** The DNS record is untouched in this phase, so removing `pragmatical-ai` from the hostname restores what stage D item 8 recorded.
1. Step U for the hostname.
2. Exit: step V with the recorded-responder line, using that hostname's `PREV_GREP`. This holds whatever the DNS state is: a State P hostname with `RESP=other-worker-route` must show `Hello World` again, not the old site, because step U repointed the route.
3. If the owner wants Pages on a hostname whose recorded responder is another Worker, that is R2 row W1's Pages alternative (State W) or simply step U with the route left deleted rather than repointed (State P with `RESP=other-worker-route`; then Pages answers through its CNAME and step V uses the Pages line). Record which was chosen.

**R2. During or after a partial conversion (E4a or E4b, before E5).** First read the hostname's actual state in the four tabs (DNS Records; Pages Custom domains; `pragmatical-ai` Domains & Routes; the other Worker's Domains & Routes). Then choose the row whose observed state matches, and inside it the action for the target. Several rows are observationally identical and are told apart only by the stage D item 1 DNS state and item 8 responder; that record decides. Each row ends with step U, then step V. Step U runs last so the hostname is unresolvable no longer than necessary; if the new site must stop answering immediately, run step U first and accept the gap.

| Row | Observed state of the hostname | Stage D record | Action for the recorded responder | Pages alternative (if the responder was not Pages) |
|---|---|---|---|---|
| P1 | DNS has no record; Pages still lists the hostname; route present | State P | DNS: Add record, type CNAME, name the hostname, target `pragmaticalai.pages.dev`, Proxied (content from stage D item 1). Wait until Pages shows the hostname Active; if it stays Inactive, Remove domain in Pages and Add a custom domain again. Step U. If `RESP=other-worker-route`, step U repoints the route and that Worker answers again over the restored CNAME. | Same DNS actions; in step U delete the route instead of repointing it. |
| P2 | DNS has no record; Pages does not list the hostname; route present | State P | Pages, `pragmaticalai`, Custom domains, Add a custom domain, enter the hostname; Cloudflare recreates the CNAME. Wait until Pages shows Active. Step U (repoint if `RESP=other-worker-route`). | Same; step U deletes the route instead of repointing. |
| P3 | DNS has a Worker record owned by `pragmatical-ai` (Custom Domain created, Active or not); route present or already deleted | State P | `pragmatical-ai`, Domains & Routes: delete the Custom Domain. Confirm DNS Records shows no record for the hostname. Then row P2. | Then row P2's Pages alternative. |
| B1 | DNS has the `AAAA 100::` placeholder; Pages still lists the hostname; route present | State P | DNS: delete the placeholder. Confirm no record. Then row P1. | Then row P1's Pages alternative. |
| B2 | DNS has the placeholder; Pages does not list the hostname; route present | State P | DNS: delete the placeholder. Confirm no record. Then row P2. | Then row P2's Pages alternative. |
| B3 | DNS has the placeholder; Pages does not list the hostname; the other Worker has no Custom Domain on the hostname; route present | State W (placeholder created in E4b State W step 3) | DNS: delete the placeholder. Confirm no record. Other Worker, Domains & Routes, Add, Custom Domain, the hostname. Wait until it shows Active and DNS Records shows a Worker record owned by `RESP_NAME`. Step U (delete the route). | DNS: delete the placeholder. Confirm no record. Then row P2's Pages alternative (Pages Add a custom domain, wait Active, step U deletes the route). |
| W1 | DNS has the other Worker's record; Pages does not list the hostname; route present | State W | Step U (delete the route). The other Worker's Custom Domain answers again. | Step U (delete the route). Other Worker, Domains & Routes, delete the Custom Domain. Confirm DNS Records shows no record for the hostname. Only then row P2's Pages alternative. |
| W2 | DNS has no record; Pages does not list the hostname; other Worker has no Custom Domain; route present | State W | Other Worker, Domains & Routes, Add, Custom Domain, the hostname. Wait Active and the Worker record owned by `RESP_NAME`. Step U (delete the route). | Row P2's Pages alternative. |
| W3 | DNS has a Worker record owned by `pragmatical-ai`; route present or deleted | State W | `pragmatical-ai`: delete the Custom Domain. Confirm no record. Then row W2. | Then row W2's Pages alternative. |

Exit for every row: step V with the line for the chosen target. The owner's default for a hostname whose responder was another Worker is the recorded responder (decision list).

**R3. After codification (E5 done), and after E6 if it ran.** A push or dispatch while the dashboard is being rolled back would re-apply the repository's routes or domains, and a run that is already queued or running is not stopped by disabling the workflow (`deploy.yml:22-24` only queues). So:
1. GitHub: Actions, Deploy, "..." menu, Disable workflow. Exit: the workflow shows as disabled.
2. Stop in-flight runs:
```sh
gh run list --workflow deploy.yml --status in_progress
gh run list --workflow deploy.yml --status queued
gh run cancel <run-id>          # for every run listed above
gh run list --workflow deploy.yml --status in_progress --json databaseId --jq length   # expect 0
gh run list --workflow deploy.yml --status queued --json databaseId --jq length        # expect 0
```
   A cancelled run may already have executed `wrangler deploy`. Exit: both counts are `0`, and `npx wrangler deployments list` plus the `pragmatical-ai` Domains & Routes tab have been re-read so the R2 row is chosen from the actual state, not the expected one.
3. If E6 ran: Rules, Redirect Rules, toggle the `canonical host` rule off. Exit: `curl -s -o /dev/null -w '%{http_code}\n' https://www.pragmatical.ai/` prints `200`, not `301`. Both hostnames are now directly verifiable.
4. Perform R2 per hostname: the E5a state maps to row P3 or W3 by the stage D DNS state; the E5b state maps to row B1, B2 or B3. Exit: step V per hostname for the chosen target.
5. Reconcile the repository: remove the `routes` array from `wrangler.jsonc` (keep `workers_dev: true` and the D1 binding), commit as a config-only change, check `git show --stat HEAD` lists only `wrangler.jsonc`.
6. GitHub: Enable workflow, then push. Exit: the Deploy run is green, workers.dev passes S1, and both hostnames still pass step V for their chosen target. The `canonical host` rule stays off; re-enabling it is a new E6 after a new E1 to E5.

**R4. Restoring a historical release into Git without an uncontrolled rebuild.** Needed only when the repository must again match a previously deployed artefact set. The smoke expectations follow the restored release, not this one.

```sh
git checkout <good-sha> -- dist dist-worker worker/build-manifest.js
git diff --cached --stat
#   expect: only paths under dist/, dist-worker/, worker/build-manifest.js
git commit --no-verify -m "Restore artefacts of <good-sha> (swc-js <framework sha if known>)"
#   --no-verify skips the hook, which would otherwise rebuild from ../swc-js (tools/pre-commit:22-48)
git diff <good-sha> HEAD --stat -- dist dist-worker worker/build-manifest.js
#   expect: empty
V=$(sed -n "s/^export const VERSION = '\([0-9a-f]*\)';\$/\1/p" worker/build-manifest.js); echo "$V"
#   expect: the VERSION of <good-sha>; S1 now uses this value in the script URLs and asset requests
grep -E "^export const (INLINE_CSS|HAS_LEGACY_JS)" worker/build-manifest.js
#   if INLINE_CSS is false for that release, add to S1: curl -s -o /dev/null -w '%{http_code}\n' "$BASE/bundle.css?v=$V"  → 200
git show <good-sha>:pages/home.js | grep -c 'rg=hero-title'      # expect 1, else adapt HOME_H1 to that release's marker
git show <good-sha>:pages/not-found.js | grep -c 'rg=nf-msg'     # expect 1, else adapt NF_MSG
git show <good-sha>:data/content.js | grep -E "headline:|message:" | head   # take the expected copy from here
git status
#   expect: clean; no rebuilt files appeared
```

`wrangler.jsonc` is not touched, so the D1 binding and the codified routes stay. Run `npx wrangler dev` and S1 locally with the values read above, then push. Exit: the Deploy run is green and S1 passes with the restored release's `V` and copy on workers.dev and on every hostname bound to `pragmatical-ai`; after E6, S1 runs on workers.dev and the canonical hostname only, and the non-canonical hostname passes the E6 redirect assertions.

## Stage F: after go-live

- **Observability.** Compute, `pragmatical-ai`, Observability shows logs and metrics; `npx wrangler tail pragmatical-ai --format pretty` streams live. Because the SSR catch logs nothing, put an external check on the canonical hostname's `/` that asserts `data-swc-ssr` **and** the rendered hero heading with the `HOME_H1` pattern (an element match, since the headline text alone is present in the state JSON of every page). A second external check on the non-canonical hostname asserts a 301 to the canonical host.
- **Next rebuild, when a source change is needed.** `package.json:18-21` links `../swc-js`. Before committing any watched file: put `../swc-js` on the chosen framework ref (recommended `main` at a recorded SHA), stash or discard its dirty files, run `npm run build`, run `npx wrangler dev` and S1, and record the swc-js SHA in the commit message. Bundle these pending fixes into that rebuild:
  - Ship the favicon: add `favicon.svg` to `STATIC_ASSETS` at `tools/build-dist.mjs:41` and commit the file. Then remove the favicon allowance from S1 item 7 and S3.
  - Log in the SSR catch at `worker/index.js:91`.
  - Hard 404 for unknown paths. The framework honours an `ssrStatus` key from `getServerData` (`dist-worker/index.js:19418`), but that path renders nothing (`dist-worker/index.js:19517-19535`), so a status-only signal would lose the not-found page. The fix needs the worker to detect the not-found route (`result.route.component === 'page-not-found'`) and set status 404 while keeping the rendered body. Then change S1 item 3 to expect 404.
- **Retire the Pages project** only when the owner decides; it is the Pages rollback target for R2 and R3 and costs nothing idle.

## Decisions for the owner

- **Canonical host.** Both hostnames serve identical content until E6. Choose apex or `www`; E6 follows from it.
- **D1 before or after cutover.** The plan assumes before. If after, go live with the 503 on the form and set `V_GOOD` at the first post-D1 deploy instead.
- **Who reads contact rows.** D1 has no notification path. Decide who queries it and how often, or schedule a notification feature for the next rebuild.
- **Hand-over branch.** E4a Custom Domains is recommended; E4b permanent routes is the alternative. Confirm before E4.
- **Rollback target for a hostname whose recorded responder is another Worker.** Recorded responder ("Hello World!") or Pages. R1 and R2 default to the recorded responder; the Pages alternative column is the other choice.
- **workers.dev after cutover.** The plan keeps it as the verification and rollback-check URL. If it should disappear instead, set `"workers_dev": false` in E5 and drop the workers.dev checks from E5 and R0 to R4.
- **Pages project lifetime.** Keep `pragmaticalai` until a point the owner chooses.
- **Framework ref for future builds.** Confirm `main` of swc-js at a recorded SHA, or name a tag.
- **Old token.** Confirm the 2025-10-08 token has no other consumer before B5 deletes it.

## Review trail

Written by Fable 5.1 (`claude-fable-5-1` through the `claude` CLI) and cross-reviewed by Astra (`gpt-6-astra` through the `codex` CLI) in four rounds, the way the Duet harness pairs them. The repository was first analysed by Luna (`gpt-5.6-luna` through `codex`). Astra verified its findings against the source, the installed wrangler code and Cloudflare documentation, and by invoking the committed Worker bundle directly in Node. Round 4 ended with the verdict **revise** and the three findings below still open. The harness's round limit was reached, so they are recorded here for the owner to apply by hand, or to run another round.

Findings per round: 10, then 8, then 4, then 3.

## Outstanding findings from Astra's final review

Apply these to the plan before executing the rollback procedures they name.

- **A4 — major — Target: D8; step U; R2 rows B3/W1/W2/W3 and Pages alternatives.**  
  **Evidence:** DNS ownership and response ownership are now recorded separately, but State W recovery still assumes they identify the same Worker. B3 and W2 require recreating a Custom Domain owned by `RESP_NAME`, then deleting the route. A Custom Domain can belong to Worker A while Worker B’s route produces the response; Cloudflare explicitly supports this configuration. The supplied recovery would restore the wrong domain owner and discard the route responder. Separately, Pages alternatives only override restoration of the main route: step U still recreates more-specific routes and re-enables forwarding rules, which can prevent Pages from answering. [Route precedence](https://developers.cloudflare.com/workers/configuration/routing/routes/).  
  **Requested change:** Record the Custom Domain owner separately as `DNS_OWNER`. Restore State W domains to `DNS_OWNER`, then reverse the recorded route/rule changes to restore the responder. For the Pages target, leave **all** intercepting routes and response-producing rules detached or disabled; do not run unconditional step U.

- **D1 — major — Target: R4 historical artefact restoration command.**  
  **Evidence:** `git checkout <good-sha> -- dist dist-worker worker/build-manifest.js` uses overlay mode, which does not remove tracked files absent from the historical release. For example, restoring today’s release after stage F adds `dist/favicon.svg` leaves that newer asset behind, so R4’s required empty diff fails after the restoration commit. [Git checkout documentation](https://git-scm.com/docs/git-checkout#Documentation/git-checkout.txt---overlay).  
  **Requested change:** Use `git restore --source=<good-sha> --staged --worktree -- dist dist-worker worker/build-manifest.js`. Before committing, require `git diff --cached <good-sha> --exit-code -- dist dist-worker worker/build-manifest.js` to succeed. Retain the hook bypass and post-commit verification.

- **D2 — major — Target: R0 operational code rollback.**  
  **Evidence:** R0 permits rollback at any time after C without stopping deployments. The workflow deploys on pushes and manual dispatch, and its concurrency setting does not coordinate with laptop Wrangler commands (`.github/workflows/deploy.yml:18–24,49`). A queued or running deployment can therefore replace the rollback immediately. R3 addresses this race only for domain recovery.  
  **Requested change:** Apply R3 steps 1–2 before R0’s rollback command: disable the workflow, cancel queued/running runs, verify completion, and reread deployment state. Keep deployment automation disabled until the repository contains the intended release or a corrected successor; then explicitly resume it.

## What Astra confirmed

- Zone routes intercept proxied Pages hostnames and precede Worker Custom Domains. E4a’s conversion order and acknowledged DNS gap are correct. [Routes](https://developers.cloudflare.com/workers/configuration/routing/routes/), [Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).
- The token template includes Workers Scripts, zone Workers Routes, and Account Settings Read; adding D1 is necessary. Both workflow secrets are correctly named. [Token templates](https://developers.cloudflare.com/fundamentals/api/reference/template/).
- Installed Wrangler supports the stated delete, rollback, remote D1 execution, tail-format, deployment-list and version-view forms. Local development honors `no_bundle` (`node_modules/wrangler/wrangler-dist/cli.js:324572`).
- Direct bundle invocation confirmed the element assertions and negative controls, product title, soft 404, UA-selected bundles, `Vary: user-agent`, and contact 405/403/503/200 expectations. The browser success prefix matches `data/content.js:627`.
- A7’s cache gate and C1’s post-redirect test split are corrected. E6’s dynamic redirect and query-preservation setting are valid. [Cache responses](https://developers.cloudflare.com/cache/concepts/cache-responses/), [Redirect settings](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/settings/).
- Source-map removal fixes this release’s laptop/CI asset parity. Config-only commits avoid rebuilding. workers.dev registration, explicit `workers_dev`, TLS/HSTS inventory, retained Pages access, owner-only account changes, and the prohibition on calendar estimates are covered.
