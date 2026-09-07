# Pragmatical AI: company story and platform capabilities

6 September 2026 · Content baseline for review before further website implementation

This document supersedes the emphasis and homepage hierarchy in `website-plan.md`. It explains the company and the intended platform, before choosing a visual composition. It does not claim that all consolidation work has shipped. Further UI implementation is paused while this baseline is reviewed.

## 1. What the company is building

Pragmatical AI is building a coherent environment for creating, modernising, automating and running AI-first applications.

The ambition is a crafted platform whose capabilities work together: the framework that expresses the interface, the workspace that helps create it, the understanding of the existing system, the services and flows that perform the work, and the infrastructure that runs the result.

Cherga is the platform and technology family. AI Studio is its primary creation and modernisation workspace. The UI framework is fundamental to the proposition, with a direct developer entry point under ChergaJS. Code Doctor contributes system discovery and modernisation; agent-stack contributes agent and workflow execution. These are responsibilities within a whole, rather than a shopping list the customer must integrate.

Contract Vetting is a domain product demonstrating the approach. It should occupy approximately 10–15% of the corporate site's main narrative and visual attention. It is the candidate for a future independent product/company, not the central definition of Pragmatical AI.

### Working company positioning

> We build the platform for AI-first applications—from the interface to the work behind it.

Supporting explanation:

> Create new software, understand and modernise existing systems, and connect services, agents and automation in one working environment. Built around an AI-first framework, with Cloudflare as the first integrated deployment target.

These are copy directions. The public version must distinguish the platform we are building from capabilities already available.

## 2. The problem: too much assembly between intention and operation

A team can generate a screen and still be a long way from having a working application. It must connect the interface to data, permissions and services; define automations; integrate agent execution; deploy the result; and keep these pieces consistent as requirements change.

The problem is particularly visible when people move between a coding assistant or app builder, a UI/application framework, workflow automation, and cloud deployment. Each transition can lose context and create another integration responsibility.

The founder's references—Cursor, Lovable, n8n, React and Next.js—name the tool categories people recognise. The proposed alternative is one deliberate path through those responsibilities. This is a positioning argument about the integrated experience, not a verified feature-by-feature claim against those products.

| Responsibility a customer needs | How the Cherga platform should accommodate it |
| --- | --- |
| AI-assisted creation and editing, associated here with Cursor/Lovable | Studio helps shape and refine the application with its structure and context available throughout the work |
| UI and application structure, associated here with React/Next.js | An AI-first framework with its own structured vocabulary, components, data bindings and application conventions |
| Workflow automation, associated here with n8n | Services, events, deterministic flows, agent tasks and human checkpoints integrated into the application |
| Understanding and changing existing software | Code Doctor's discovery of topology, patterns and intent informs a system-level migration |
| Publishing and operating the result | A built-in deployment path, initially designed around Cloudflare's distributed infrastructure |

The website should communicate: **you should not have to chase and stitch together a new stack for every application.** It should not claim that customers can never use another tool, that every external integration disappears, or that Cherga already replaces every capability of the named products.

## 3. The lightweight SSR Worker framework is a central differentiator

Cherga's foundation includes a lightweight server-side rendering framework designed to run in a Worker environment. This must appear in the main platform explanation, not be reduced to a deployment footnote or described as merely a UI component collection.

The founder's claimed distinction is the combination: **SEO-oriented server rendering and AI capabilities within the same framework.** The site should explain why the combination matters:

- People receive rendered application content before client-side code takes over.
- Search crawlers can receive meaningful HTML and route-specific metadata.
- AI-assisted creation uses the framework's structured application vocabulary.
- The broader platform connects AI execution to application services and workflows.
- The deployment model is designed around Workers and distributed delivery.

The existing SSR renderer, semantic-output documentation, and this site's Worker metadata handling support the server-rendering part of the story. The exact meaning of the framework's AI-facing capability—authoring, machine-readable representation, callable capabilities, or a combination—must be described against the actual supported interfaces. Do not silently equate SSR with AI tool access, or readable HTML with guaranteed search rankings or AI discovery.

Suggested public wording:

> A lightweight Worker framework. Server-rendered for the web. Designed for AI.
>
> Cherga brings search-visible pages and AI-first application structure into one foundation, with services and workflows connected through the platform.

“The one and only in the field” is the founder's competitive hypothesis. It should remain in the internal positioning record until a comparison establishes the precise combination, competing products, and evidence. The architectural combination can lead the story without a premature exclusivity claim. Likewise, “lightweight” should ultimately have a defined measure—runtime size, dependencies, execution cost or another reproducible metric—before publishing numerical comparisons.

### AI-first has two meanings here

### Software that AI can help build coherently

The framework gives AI a structured vocabulary for interfaces and behaviour. Studio should work with application concepts—screens, journeys, entities, services, flows and constraints—rather than treating the project as unrelated generated files.

The intended result is an application whose parts remain connected as it changes. Editing a journey should carry consequences into the relevant screens and services. This consistency is a platform objective; it needs demonstrable examples before being advertised as an established guarantee.

### Applications that can use AI as part of their work

AI-first also describes the generated application. Agents can work with business capabilities, relevant context and explicit permissions, alongside conventional application logic. A useful experience may include a form, a document, a queue, a dashboard or a review screen; conversation is one possible interface.

Deterministic logic remains deterministic where appropriate. AI can extract, interpret or propose; services can validate, store or transact; people can review consequential choices. Making those responsibilities work together is the platform's role.

Public explanation:

> A framework AI can build with. Applications AI can work through. Interfaces people can understand.

## 4. AI Studio is a central capability

Studio must be visible in the corporate story, not buried beneath a framework screenshot. It is the intended workspace for moving from an idea or an existing system into an application that can run.

### Create new

Describe the outcome and supply relevant context. Shape the journeys, screens and information. Connect services and flows, review the implementation, then publish through the platform's deployment path.

### Bring existing

Import the relevant source and system context. Discover topology and dependencies, recover and validate intent, choose the target design, and migrate useful capabilities into connected interfaces, services and flows.

### Continue developing

Inspect the application, refine its behaviour and improve it using the same workspace. The goal is continuity between creation, changes and operation, with shared application context rather than repeated handoffs.

White-labelled Studio experiences belong within this story. GDS Playground is an example of a Studio experience shaped for a specific domain, not a separate peer platform.

The corporate site needs one clear Studio explanation and a meaningful visual of this journey. Detailed authoring controls and workflow documentation belong on the later Cherga site.

## 5. Automation is part of the application

Automation deserves an explicit section. Generic references to “agent workflows” are insufficient.

The platform direction includes connecting triggers, data, service calls, agent tasks, decisions and human review. An automation can start from an application action or an external event and update the application as work progresses. The interface and the process should describe the same work.

Illustrative business sequence:

1. A customer submits a service request through the application.
2. A service validates the information and retrieves the existing account context.
3. An agent classifies the request or prepares a proposed response where interpretation is useful.
4. A deterministic rule routes it to the appropriate next step.
5. A person reviews an exception when required.
6. The system updates the record and communicates the outcome through connected services.

The runner provides the shared execution machinery. Product-specific logic supplies context, rules and tools. A separate agent loop or competing state system per feature would undermine the intended integrated experience.

Be precise with the word “flow”: screen navigation, business-process execution and AI generation stages are related but different concepts. The corporate story should use examples to explain them rather than imply that all are the same mechanism.

## 6. Modernisation starts with understanding the whole system

Code Doctor's strongest contribution is topology discovery, not syntax translation or a generic code-quality score.

Its documented direction includes reconciling infrastructure definitions, deployed resources, services and dependencies; discovering patterns across repositories; validating business intent with people; and retaining decisions and provenance in a reusable rulebook.

That understanding informs what the target should become:

- What should remain and be integrated?
- What should become a service with an explicit interface?
- What should become a deterministic flow or a business rule?
- Where can an agent add useful interpretation?
- Which interface gives people the right view and control?
- Which dependencies, side effects and operational constraints must be preserved?

Illustrative distinction: translating three applications independently can preserve three incompatible authentication or validation approaches. A topology- and intent-informed migration can identify the relationship, decide what should be shared, and plan the connected change. That is an intended outcome to demonstrate, not a universal claim about competing products.

Modernisation is one major entry path into the platform. New AI-first application creation remains equally visible. Both paths converge on the same framework and operating model.

## 7. Distributed applications, designed for the edge

Cloudflare is the first intended integrated deployment target. It should appear as an architectural choice, not a small hosting footnote.

The product ambition is to create and publish a distributed application directly onto the network that serves it: interface assets delivered through the CDN, appropriate content cached at the edge, and dynamic application behaviour executed through the platform's compute and data services.

This expands the meaning of “publish”: the goal is a connected deployment of the interface, services and flows, rather than exporting frontend files and leaving the customer to assemble the rest.

### What “cached at the edge” should mean

Static assets can be distributed and cached. Suitable public or reusable responses can have deliberate caching policies. Private, personalised and changing state need the appropriate access controls, freshness and data handling. Running a workflow and persisting business state are different responsibilities from caching content.

Cloudflare documents uploading static assets alongside Worker code and handling their caching and delivery. It also documents edge application execution and programmable cache behaviour. These establish the infrastructure possibilities; they do not prove Cherga has implemented every integration. Sources: [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/), [web application architecture](https://developers.cloudflare.com/use-cases/web-apps/), [cache behaviour](https://developers.cloudflare.com/workers/reference/how-the-cache-works/).

Public copy direction:

> Build for the network. Publish through one platform.
>
> We are designing Cherga around distributed delivery and execution, starting with Cloudflare: interfaces served through the CDN, suitable content cached at the edge, and services and workflows connected behind them.

Avoid suggesting that all data is globally replicated, all requests are cached, every task executes next to every user, or every legacy workload can be moved unchanged. Those would require specific architectural evidence. The exact selection of Cloudflare execution, workflow and storage products belongs in the platform architecture work, not in invented corporate-site promises.

## 8. One crafted platform, with a framework developers can use directly

The integrated experience is the primary promise. Customers should not need to assemble Studio, an execution harness, a UI library and a migration engine before useful work begins.

Internally, the system can have modules with clear responsibilities. That is an engineering choice, not a requirement to market each module as a separate product.

The direct framework route is also important. Developers who want to use Cherga as their primary UI framework should have a clear ChergaJS destination. Direct adoption should not make the framework appear secondary or merely an implementation detail of the builder.

| Destination | Job |
| --- | --- |
| pragmatical.ai | Explain the company vision, the connected platform capabilities, and credible examples of the work |
| cherga.com | Explain the complete platform, Studio, creation, automation, modernisation and operation in depth |
| ChergaJS destination, exact URL pending | Serve developers adopting the UI framework directly |
| Contract Vetting's dedicated destination | Explain the domain product and its own access or commercial offering |

The corporate site should provide enough technical substance to make the vision intelligible. Referring visitors to Cherga is not a reason to omit the platform's capabilities from Pragmatical AI's story.

## 9. Contract Vetting: evidence, at the right scale

Contract Vetting demonstrates how context, agent work, data flow and human judgement can support a demanding domain. A short, concrete review example is appropriate.

It should occupy one compact case-study section, approximately 10–15% of the main homepage's content and visual attention. This is an editorial target, not a rigid pixel calculation at every viewport. It should not dominate the hero, receive a second extended explanation elsewhere on the homepage, or become the general visual identity of the company.

The other 85–90% must make room for the company and its platform: AI-first creation, the framework, Studio, automation, modernisation and distributed operation.

## 10. Proposed corporate homepage narrative

The percentages below are a starting content budget, excluding navigation and footer. They guide relative emphasis; shared visuals may explain more than one capability.

| Share | Section | What the visitor must understand |
| --- | --- | --- |
| 10% | Company proposition | Pragmatical AI is building a complete environment for AI-first applications |
| 15% | One platform, an AI-first framework | Lightweight Worker SSR, search-visible output and AI capabilities in one foundation; direct framework adoption matters |
| 20% | AI Studio: create and evolve | A substantive workspace for new applications and existing systems, not just a prompt-to-screen builder |
| 15% | Automation and agents | Services, deterministic work, agent tasks and people participate in the application process |
| 15% | System understanding and modernisation | Topology and validated intent guide coherent migration, not isolated code translation |
| 10% | Distributed by design | Cloudflare-first deployment, CDN delivery, deliberate edge caching and connected execution |
| 10% | Contract Vetting | One concrete domain example; a distinct product with future independence |
| 5% | Company and invitation | Who is behind the work and how to engage |

This is not an instruction to produce eight identical marketing bands. A single application journey can connect Studio, automation and edge deployment. A second example can show how an existing system enters the same environment. Design follows this content hierarchy.

### What the visuals need to explain

- Platform: the connected whole and what responsibility each capability serves.
- Studio: a meaningful creation/evolution sequence, using genuine captures where available and labelled illustrations otherwise.
- Automation: an event moving through services, agent work and review, with the outcome returning to the application.
- Modernisation: discovered relationships informing a target design; not a before/after code snippet alone.
- Edge: distinguish distribution, caching, execution and state in a simple diagram.
- Contract Vetting: one concise example with context and a reviewer decision.

Avoid abstract dashboards that could advertise any SaaS product. Aesthetic restraint must not turn into informational shallowness.

## 11. Evidence boundaries before public copy

| Topic | Basis currently available | Public treatment |
| --- | --- | --- |
| AI-first UI and SSR Worker framework | Existing SWC source, semantic SSR documentation, working applications and Worker metadata handling | Lead with the combination of server-rendered web delivery and AI-first structure; verify the precise AI interfaces and any exclusivity or performance claim |
| Studio stages and white-labelling | Studio repository and design specification; GDS Playground context supplied by founder | Describe the experience; verify the particular end-to-end stages shown |
| Agent/workflow runner | Inspected agent loop, workflow worker, governance and Studio API integration | Explain its role without implying audited reliability or feature parity with CrewAI |
| Topology and modernisation | Code Doctor overview, walkthrough and supporting design/source files | Preserve the depth of the proposition; validate demonstrated scope separately |
| Unified Cherga platform | Founder direction; current products are still being consolidated | Use “building” or “bringing together” where needed |
| Cloudflare-first complete deployment | Founder direction plus existing platform deployment foundations | Present the intended architecture; substantiate complete generated-app operation before claiming it |
| Contract Vetting | Founder direction and current product content | Keep its in-build status accurate and its prominence proportional |

The older Code Doctor content describes an AWS-first roadmap; the current consolidated direction is Cloudflare-first. This document follows the founder's current direction. It does not silently treat the older roadmap as proof of Cloudflare capability.

## 12. Source material and next step

Local sources reviewed:

- `../codedoctor.ai/product-overview.md`
- `../codedoctor.ai/talk-product-walkthrough.md`
- `../codedoctor.ai/docs/extraction-composition.md`
- `../ai-studio/README.md`
- `../ai-studio/docs/superpowers/specs/2026-08-22-swc-studio-design.md`
- `../ai-studio/worker/platform/agent-client.js`
- `../agent-stack/packages/chat/server/agent.js`
- `../agent-stack/packages/chat/server/platform/worker.js`
- Existing SWC framework documentation and this website's implementation.

Next step is review of this explanation and hierarchy, followed by concrete page copy and an evidence/visual outline. Only then should the website implementation resume. The earlier two-flagship composition and the latest unfinished editorial iteration are not the approved content baseline.
