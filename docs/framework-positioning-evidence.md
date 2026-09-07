# Framework positioning: architecture, generation and migration

7 September 2026. Copy evidence and editorial boundaries.

## Core argument

**Build your application. The foundation is already here.**

Cherga is an AI-first application framework designed from the architecture up. Routing, state, streaming HTTP services, authentication and permission-aware components belong to a shared foundation. Enterprise components accept the application's data and configuration, reducing the scaffolding that developers and models must repeatedly produce.

The broader platform joins that framework to Studio, the runner, automation, modernisation and Cloudflare-first deployment. The purpose is a durable foundation for a team's AI journey, not just an initial screen generator.

## Research and token-efficiency claims

The founder states that Pragmatical AI analysed 100,000 repositories to identify recurring structures, common mistakes and reusable enterprise scaffolding. This figure is founder-supplied on 7 September 2026; it has not been independently reproduced in this website task. Older local documents describe smaller, specific corpora. Do not sum those corpora or reinterpret them as validation of the new total.

Public company copy can use the supplied research figure. Before producing a research methodology page, obtain the corpus definition, analysis method, deduplication rules and reproducible inventory. Do not call the analysis an external benchmark.

The token-efficiency mechanism is concrete: reference existing components and shared behaviour instead of generating their implementation for every app. This is a design objective and architectural explanation. No percentage reduction, benchmark superiority or guarantee of fewer defects has been established here.

## Capability evidence

| Capability | Evidence inspected | Boundary |
| --- | --- | --- |
| Router and store | SWC core services and the current website | Shared primitives, not separate app dependencies |
| Streaming HTTP services | `../swc-js/docs/llm/06-http-services.md` and `core/services/http-client.js` | Streaming, lifecycle state, auth handling and cancellation are documented |
| Authentication | SWC auth composites, server auth/session modules, HTTP service auth documentation | Application configuration and backend enforcement still matter |
| Role-based access and permission-aware UI | `core/core/bindings/guards.js`; platform governance in agent-stack | UI guards are explicitly not a security boundary; endpoints enforce authorisation |
| Retry handling | Agent-stack workflow worker retry and step-lease implementation | Do not describe this as automatic retry of every HTTP request; request idempotency and stream semantics matter |
| Data-ready enterprise components | SWC components/composites, catalogue and declarative binding docs | Data and configuration remain required; “ready” does not mean every enterprise policy is preconfigured |
| Lightweight Worker SSR | SWC SSR modules, current website Worker integration | No universal performance ranking claimed |

## React: explain the work that falls to the application

React's own documentation explains that starting from scratch requires choices about routing, data fetching and other application concerns. It also recommends full-stack frameworks and recognises their role. Source: [React: build from scratch](https://react.dev/learn/build-a-react-app-from-scratch).

An illustrative maintenance chain: a team implements authentication around one router and caches data separately. A sign-out clears the session but leaves user-specific data in the cache. Another feature introduces streaming and needs cancellation on navigation. The team must coordinate session invalidation, cache ownership and request lifecycle. These are plausible integration failure modes, not measured incidents or inevitable React bugs.

The public argument is: **every convention left open becomes a decision somebody must own.** Cherga deliberately supplies more of those conventions. Do not say React has no templates, no reusable patterns or inevitably creates an endless stream of defects.

## Next.js: distinguish a version upgrade from an architectural migration

The founder requested Next.js 2→3. The [official Next.js 3.0 announcement](https://vercel.com/blog/next3), dated 8 August 2017, discusses features and fixes; it does not substantiate the proposed broad legacy-breakage claim. Do not relabel 12→13 as 2→3.

A documented example is Next.js 12→13: the release changed Link behaviour, updated the Image component and raised runtime requirements. Separately, adopting the App Router introduced different conventions for rendering, routing and data fetching. The Pages Router could remain in use; adopting App Router was not a mandatory rewrite caused by updating to 13. Sources: [Next.js 13 release](https://nextjs.org/blog/next-13), [App Router migration guide](https://nextjs.org/docs/15/pages/guides/migrating/app-router-migration).

Concrete migration example: moving a page that uses `getServerSideProps` into `app` requires a different data-fetching approach. Code using `next/router` also needs the App Router equivalents where applicable. This demonstrates migration work, not that all projects broke or that incremental adoption was unavailable.

## Vue 2.5-era applications moving to Vue 3

Vue documents the changes as Vue 2→3, not as a special direct 2.5→3 upgrade path. A 2.5-era application may encounter those changes as part of its migration.

- Component `v-model` changes its default prop/event contract from `value` / `input` to `modelValue` / `update:modelValue`. Custom form components and their callers need compatible changes. [Vue v-model migration](https://v3-migration.vuejs.org/breaking-changes/v-model.html)
- Instance event APIs such as `$on`, `$off` and `$once` are removed. Applications using a Vue instance as an event bus need another pattern or implementation. [Vue events migration](https://v3-migration.vuejs.org/breaking-changes/events-api.html)
- Render functions and associated libraries can need coordinated migration. Vue provides a compatibility build, with limitations, to support gradual adoption. [Vue migration build](https://v3-migration.vuejs.org/migration-build)

These are specific compatibility changes. They do not establish that Vue is generally defective or that Cherga will never have breaking changes.

## Angular and the broader category

Angular already provides an opinionated framework with routing, forms, dependency injection and update tooling. It should not be described as having React's exact assembly trade-off. Source: [Angular overview](https://angular.dev/docs).

The credible comparison is the design centre: Cherga combines a declarative AI-first authoring model, data-ready enterprise components and Worker SSR as one foundation, within the broader Studio/automation/modernisation platform. Explain that combination directly rather than calling every competing framework a patch.

## Tone rules

Use decisive statements about the actual architecture. Name included capabilities. Show where shared infrastructure reduces repetitive work. Use current/pending labels once where necessary rather than weakening every sentence with “we hope” or “we aim”.

Avoid “all enterprise needs solved”, “zero bugs”, “no future migrations”, unmeasured token-saving percentages and unsupported market exclusivity. The boldness should come from the engineering proposition and evidence.

## Enterprise migration burden and durable positioning

Public copy leads with the platform ambition and customer outcome; evidence qualifications stay here unless material to a purchasing decision. Capabilities still in development must not be presented as generally available.

AngularJS → Angular is an architectural migration, distinct from routine Angular upgrades. The official [upgrade guide](https://v17.angular.io/guide/upgrade) documents incremental hybrid operation and adaptation. Vue’s documented component and event API changes require affected code and dependencies to be revisited. The enterprise implication is engineering, regression testing and release work competing with business features. This is a qualitative inference from the migration requirements, not a quantified claim about every customer. Describe this as a burden Cherga aims to reduce; do not promise immunity from future compatibility changes.

## Website emphasis: architecture first

The public homepage and approach page explain Cherga through a shared architecture schema and an illustrative service-request lifecycle. The long competitor comparison has been removed from the website; its evidence remains in this document as background. Lead with the relationships between declarative authoring, router, shared store, HTTP streams, enterprise components, authentication/RBAC, Worker SSR and the shared runner. Explain what the customer defines and what the framework supplies. Studio and Code Doctor feed the same foundation; Cloudflare is the first integrated delivery target.
