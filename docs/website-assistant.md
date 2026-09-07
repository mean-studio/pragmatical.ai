# Website assistant

The shared marketing shell mounts one `site-assistant`. It stays mounted across client navigation and when minimised. The panel is a non-modal dialog so visitors can continue using the website; Escape minimises it and returns focus to its launcher. The contact page opens this same panel. Recent conversation history is kept in sessionStorage in the current tab, with a New conversation control to clear it. The server does not save transcripts or submit enquiries.

The UI uses SWC's `communication/conversation` composite. The application adds a declarative keyboard-accessible log region to its history. The native composer publishes to the store; the declared HTTP streaming service calls `/swc/chat`. Application logic supplies bounded recent history. Responses stream through the framework's store bindings. The existing agent-stack full chat suite requires identity and storage capabilities beyond this public website assistant.

The Worker uses the Cloudflare AI binding with `@cf/meta/llama-3.3-70b-instruct-fp8-fast`. Its server-side company context covers Cherga, Studio, the runner, modernisation, SSR and Contract Vetting. The assistant has no tools, account access or inbox access and cannot claim that it contacted the team. There is no public company email address in the content or client bundle.

The endpoint validates request origin, JSON size, message roles, history length and message length. The Cloudflare rate-limit binding allows eight requests per IP per minute per Cloudflare location. Responses are uncached, output is bounded to 600 tokens, and failures produce a recoverable message. Model inference uses the account's Workers AI allocation. [AI binding](https://developers.cloudflare.com/workers-ai/configuration/bindings/) · [Model](https://developers.cloudflare.com/workers-ai/models/llama-3.3-70b-instruct-fp8-fast/) · [Rate limiter](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/).

## Local verification

Build with `npm run build`, then run `npx wrangler dev --port 4401` for the Worker with remote AI. `npm start` serves the SSR preview on 4400 and forwards chat requests to the local Worker. `npm run check:chat-api` exercises input validation, streaming and failures without inference. `npm run check:assistant` checks panel interactions, persistence, responsive layout, local font requests and failure recovery with deterministic network fixtures. Real inference is checked separately before deployment.

## Fonts

Inter and Space Grotesk are stored under `fonts/`, including their SIL Open Font Licences. `fonts/fonts.css` uses content-hashed local URLs. The build copies the files into `dist/fonts/`. No Google Fonts stylesheet, preconnect or font-file request is used at runtime.
