// Every word on the site, in one place.
//
// Copy lives here rather than inside page DSL for two reasons: a page becomes a
// layout decision instead of a writing decision, and a second language later is
// additive (add a pack, add a locale key) rather than a rewrite of pages/.
// Flattened to `t.*` store keys at config time — pages bind `:dataSource=t.…`.
//
// CLAIMS DISCIPLINE. Every number here is traceable to a file on disk. The
// figures our own product sites publish (500M lines, 27,000 repos, 48
// government organisations) are NOT reproduced: nothing on disk substantiates
// them, and a number a buyer's technical reviewer cannot be shown the working
// for is worth less than a smaller number they can. Certifications are not
// claimed — none are held. No customer is named, and no employer logo is shown.

export const CONTENT = {
  brand: {
    name: 'Pragmatical AI',
    motto: 'End-to-end AI implementation.',
    legal: '© 2026 Pragmatical AI Ltd. London.',
    response: 'Response time: two working days',
  },

  nav: {
    work: 'Work with us',
    products: 'Products',
    approach: 'Approach',
    about: 'About',
    contact: 'Contact',
    cta: 'Start an assessment',
  },

  // ── / ────────────────────────────────────────────────────────────────────
  home: {
    meta: {
      title: 'Pragmatical AI — end-to-end AI implementation',
      description: 'We implement AI end to end, because we built the layers ourselves: the interface a model writes into, the workflow agents run in, and the modernisation platform that reads the system you already have.',
    },
    hero: {
      eyebrow: 'London · end-to-end AI implementation',
      // ONE promise, before any mention of a layer or a product. The earlier
      // version led with the four things we built, and the first word a skimmer
      // read was "interfaces" — which told a director with a twenty-year-old
      // estate that we are a front-end shop. What we sell is the whole job.
      headline: 'We rebuild the systems nobody can fully describe.',
      // The rotating half now names the STAGES we deliver, not our internal
      // layers: scope of work, not scope of components. Single words, because
      // the rotating box is always as wide as its longest option.
      lead: 'End to end:',
      words: ['the estate map.', 'the rebuild.', 'the cutover.', 'the model.'],
      sub: 'Database logic, services, data, interfaces, deployment — and a model trained on the knowledge we recover on the way through. For estates that cannot be switched off while the work happens.',
      cta: 'Start an assessment',
      cta2: 'See the products',
    },

    // The band that has to arrive before anything else: what end to end covers.
    // Without it the products below read as a catalogue of parts, and a reader
    // decides for themselves which one part we do.
    scope: {
      title: 'The whole system. Not the front of it.',
      sub: 'A modernisation stalls where the estate stops being legible: the stored procedure nobody owns, the nightly job with no runbook, the rule that exists because of one customer in 2011. That is where we start, and we do not stop until the replacement is running.',
      items: [
        { icon: 'database', title: 'The data and the logic in it', body: 'Stored procedures, triggers, scheduled jobs and view DDL, lifted into the same model as the application code. Most of your business rules live here, and source-only tools never see them.' },
        { icon: 'server', title: 'The services behind the screen', body: 'Routes, integrations, batch, queues and the undocumented paths between them, mapped across the estate rather than sampled from the repository somebody remembered.' },
        { icon: 'layout-dashboard', title: 'The interface, once the rest is true', body: 'Screens generated from the confirmed model, so what the user sees and what the system does cannot drift apart. It is the last layer we build, and the one most often mistaken for the whole job.' },
        { icon: 'globe-lock', title: 'The deployment and the model', body: 'Running in your cloud, your region, your rules — with a model trained on the corpus we extracted, answering questions about your business in your terms.' },
      ],
    },

    // The ground-up claim, made concrete. Four layers, four products, one
    // sentence each — a reader should be able to tell what we built and why we
    // built it without leaving the page.
    // Why we can claim the whole job: we own the machinery for each part of it.
    // Ordered the way the WORK runs, not the way we happened to build them, and
    // every card ends in what it changes for the reader's system.
    layers: {
      title: 'We own the machinery for every stage.',
      sub: 'Each of these exists because an engagement hit a wall where a product should have been. They are why a fixed-scope rebuild is possible at all: the expensive parts are already built, so the work is your domain rather than our scaffolding.',
      items: [
        { icon: 'scan-search', title: 'Reading the estate', body: 'Code Doctor maps the topology, lifts deterministic facts from four languages and two database engines, and records where every one came from. You get an inventory you can argue with in week one.' },
        { icon: 'workflow', title: 'Doing the work', body: 'agent-stack runs the long jobs and delivers changes into your repositories behind a gate a person opens. Nothing lands in your code because a model was confident.' },
        { icon: 'layout-dashboard', title: 'Shipping the system', body: 'SWC turns the confirmed model into working screens with no build step and no dependency tree to maintain. The interface stops being the part of the programme that slips.' },
        { icon: 'landmark', title: 'Meeting the standard', body: 'GDS Playground builds to the GOV.UK service standard with the real design system, so a public service passes assessment rather than being rebuilt for it.' },
      ],
    },

    offer: {
      title: 'The knowledge leaves with the people. Unless it is extracted first.',
      sub: 'The engagement that pays for itself twice: the extraction that makes the rebuild possible also produces a corpus you own — and a model trained on it that answers questions about your business the way your longest-serving engineer would.',
      steps: [
        { icon: 'database', title: 'Extract', body: 'Deterministic facts from source and from the database — stored procedures, triggers, scheduled jobs. The logic source-only tools never see.' },
        { icon: 'user-check', title: 'Confirm', body: 'Structured intent capture with the engineers who remember why. AI surfaces the pattern; a human confirms the meaning. Nothing is assumed.' },
        { icon: 'brain', title: 'Train', body: 'A model trained on your corpus, running in your jurisdiction on your cloud — or air-gapped. The corpus and the model are yours.' },
      ],
      cta: 'How the extraction works',
    },

    products: {
      title: 'The tools we built to do it.',
      sub: 'Five products, each one the answer to a wall we hit doing this work. You can hire us to use them on your estate, or use them yourself.',
      cta: 'All products',
    },

    services: {
      title: 'Two places it lands first.',
      items: [
        { icon: 'shopping-bag', title: 'Agentic commerce', body: 'Your catalogue, answerable by any assistant. shop2gpt converts a Shopify or WooCommerce store into MCP so a model can browse it, choose from it and buy.' },
        { icon: 'settings-2', title: 'Process automation', body: 'The documented process and the real one are different. We find the real one the same way we read a legacy estate, then automate what is safe to automate.' },
      ],
    },

    airtight: {
      title: 'Built for estates that cannot take risks.',
      sub: 'Regulated, sovereign and safety-critical systems are the normal case here. Four commitments, each one a technical property rather than a promise.',
      items: [
        { icon: 'shield', title: 'Your source stays yours', body: 'Source is read statically and never executed. Artefacts never leave your environment; our infrastructure receives audit metadata only.' },
        { icon: 'globe-lock', title: 'Your jurisdiction, your cloud', body: 'The model runs where your data is allowed to be — AWS including GovCloud, Azure including Government, Google Vertex, or self-hosted and air-gapped.' },
        { icon: 'user-check', title: 'Humans confirm intent', body: 'A machine may propose what a system does. A person who knows confirms it. Every confirmation is recorded, and every one is reversible.' },
        { icon: 'key', title: 'You own the output', body: 'The corpus, the rulebook and the model are your assets. Leaving us costs you the engagement, not the knowledge.' },
      ],
    },

    close: {
      headline: 'The first step is always an assessment of what you already have.',
      sub: 'A short conversation, then a scoped assessment of one estate, one process or one store.',
      cta: 'Talk to us',
    },
  },

  // ── /implementation ──────────────────────────────────────────────────────
  implementation: {
    meta: {
      title: 'End-to-end AI implementation — Pragmatical AI',
      description: 'From the estate you have to the system you meant to build: discovery, intent, target stack, and equivalence proved before cutover.',
    },
    hero: {
      eyebrow: 'Work with us',
      headline: 'From the estate you have to the system you meant to build.',
      sub: 'End-to-end means the parts nobody wants to own: finding what is there, recovering why it was built that way, building the replacement, and proving it behaves the same before anything is switched over.',
      cta: 'Start an assessment',
    },
    stages: {
      title: 'What end to end covers.',
      items: [
        { icon: 'scan-search', title: 'Discovery', body: 'Estate-wide mapping. Repositories, services, databases, schedules and the integrations nobody documented. The output is an inventory you can argue with.' },
        { icon: 'git-compare', title: 'Extraction', body: 'Deterministic facts, lifted at machine scale from source and database alike. Facts first, reasoning second — a model that guesses about a payment path is worse than no model.' },
        { icon: 'user-check', title: 'Intent', body: 'The half that is not in the code: why the exception exists, which customer it was for, what breaks if it goes. Captured from people, in a structured flow, on the record.' },
        { icon: 'boxes', title: 'Build', body: 'A target stack generated from the confirmed model, using our own component and workflow layers where they fit — which is most of the interface and most of the plumbing.' },
        { icon: 'check-check', title: 'Proof', body: 'The new system runs beside the old one and is measured against it. Equivalence is demonstrated under real load before anything is switched over.' },
      ],
    },
    bring: {
      title: 'What we bring pre-built.',
      sub: 'The reason an engagement is not a from-scratch build: four layers already exist, so the work is your domain rather than our scaffolding.',
      stats: [
        { value: '103', label: 'UI primitives, server-rendered' },
        { value: '91', label: 'Composite screens' },
        { value: '20', label: 'Full-page templates' },
        { value: '4', label: 'Source analysers' },
      ],
    },
    shapes: {
      title: 'Three ways this starts.',
      items: [
        { q: 'Assessment', a: 'A scoped read of one estate, one process or one store. You get an inventory, the risk map, and a plan you own — whether or not you continue with us.' },
        { q: 'Design partnership', a: 'We build the first modernised slice with your engineers in the room, and the method transfers to your team as it goes. Design partners shape the roadmap of the products they use.' },
        { q: 'Delivery', a: 'Full implementation against a confirmed model: build, parallel run, cutover, handover. You own the rulebook and everything generated from it.' },
      ],
    },
    close: { headline: 'Tell us about what you already have.', cta: 'Talk to us' },
  },

  // ── /legacy-to-model ─────────────────────────────────────────────────────
  legacyToModel: {
    meta: {
      title: 'Legacy process extraction to a custom model — Pragmatical AI',
      description: 'We extract what your systems do into a machine-readable corpus you own, then train a model on it that runs inside your jurisdiction.',
    },
    hero: {
      eyebrow: 'Flagship engagement',
      headline: 'Your processes are documented in the heads of people who are leaving.',
      sub: 'Every organisation with a system older than its staff has the same problem: the operating model is undocumented behaviour, and the code is only its residue. That knowledge is trainable — once somebody does the hard part and extracts it.',
      cta: 'Start an assessment',
    },
    problem: {
      title: 'Why the documentation never helped.',
      items: [
        { icon: 'file-question-mark', title: 'The document describes the intention', body: 'It was written before the exceptions. The exceptions are the business.' },
        { icon: 'database', title: 'The behaviour lives in the database', body: 'Stored procedures, triggers and scheduled jobs carry decisions no application file mentions. Source-only tools never see them.' },
        { icon: 'users', title: 'The reasons live in people', body: 'Why a rule exists is not recoverable from the rule. It is recoverable from whoever put it there — while they are still here.' },
      ],
    },
    pipeline: {
      title: 'Extract first. Reason second.',
      items: [
        { q: 'What gets extracted', a: 'Deterministic facts at machine scale: routes, services, data flows, jobs, integration points, and database-resident logic including stored procedures and triggers. Every fact carries the source location it was lifted from.' },
        { q: 'How intent is captured', a: 'The extraction surfaces patterns and open questions; a structured flow puts them in front of the engineers who know, one confirmation at a time. Every answer is recorded against the fact it explains. A machine never assumes.' },
        { q: 'What the corpus is', a: 'A structured, machine-readable description of how your business operates, versioned like code, queryable, and owned outright by you. It is the durable asset — it survives this engagement, the next migration, and us.' },
        { q: 'What the model is', a: 'A model trained on that corpus, so it answers in your domain rather than in general. It runs on your infrastructure: AWS Bedrock including GovCloud, Azure OpenAI including Government, Google Vertex with Assured Workloads, or self-hosted and air-gapped.' },
        { q: 'What it is used for', a: 'Onboarding an engineer in days rather than quarters. Impact analysis before a change. Answering "what breaks if we turn this off". Planning a migration against what the system does rather than what the wiki claims.' },
      ],
    },
    corpus: {
      title: 'We proved the method on a corpus before selling it.',
      sub: 'Before talking to any customer we built and analysed corpora at estate scale, because a method that has only seen one codebase is an anecdote.',
      stats: [
        { value: '6,254', label: 'Legacy repositories, licence-checked, with provenance' },
        { value: '18,227', label: 'UK public-sector repositories catalogued' },
        { value: '7,053', label: 'Cloned with full history' },
        { value: '4,515', label: 'Projects analysed' },
      ],
    },
    boundaries: {
      title: 'What never leaves.',
      sub: 'This section is the offer itself. If any of it were untrue the engagement would be impossible in a regulated estate.',
      items: [
        { icon: 'shield', title: 'Source is read, never run', body: 'Static analysis only. Nothing executes your code, and nothing needs production access to do the extraction.' },
        { icon: 'server', title: 'Artefacts stay inside', body: 'The corpus, the model and everything generated from them live in your environment. Our infrastructure receives audit metadata — what ran, when, against which source reference.' },
        { icon: 'globe-lock', title: 'The model runs where you say', body: 'Your cloud, your region, your chosen base model — including fully air-gapped, where nothing leaves the building at all.' },
      ],
    },
    close: { headline: 'Start with one system and one week of somebody’s memory.', cta: 'Talk to us' },
  },

  // ── /agentic-commerce ────────────────────────────────────────────────────
  commerce: {
    meta: {
      title: 'Agentic commerce — Pragmatical AI',
      description: 'Make your catalogue answerable by any assistant. shop2gpt converts a Shopify or WooCommerce store into MCP so a model can browse it, choose from it and buy.',
    },
    hero: {
      eyebrow: 'Work with us',
      headline: 'Your catalogue, answerable by any assistant.',
      sub: 'Customers have started asking a model what to buy before they open a shop. A store an assistant cannot read is a store that is not in the answer.',
      cta: 'See shop2gpt',
      cta2: 'Talk to us',
    },
    what: {
      title: 'What has to be true for an assistant to sell for you.',
      items: [
        { icon: 'plug', title: 'It can read the catalogue', body: 'Products, variants, stock and price exposed as a protocol a model speaks — MCP — rather than a page it has to guess at.' },
        { icon: 'search-check', title: 'It can answer honestly', body: 'Availability and price come from your store at the moment of asking. An assistant that recommends a sold-out product costs you the customer twice.' },
        { icon: 'shield-check', title: 'You keep control', body: 'Pricing, stock, promotions and fulfilment stay in your systems. The assistant gets a read model and a checkout hand-off. Your systems keep the keys.' },
      ],
    },
    how: {
      title: 'How we do it.',
      items: [
        { q: 'Shopify and WooCommerce', a: 'shop2gpt connects to the store you already run and derives the MCP surface from your live catalogue. No re-platforming, no second source of truth for stock or price.' },
        { q: 'Anything else', a: 'Any store with a catalogue API or an export can be mapped. Where a platform is unusual, the mapping is part of the engagement rather than a blocker.' },
        { q: 'The storefront too, if you want it', a: 'The same conversion machinery that reads your catalogue can rebuild the storefront on our component layer — server-rendered, fast, and yours. Optional, and separately scoped.' },
      ],
    },
    close: { headline: 'Point us at your store.', cta: 'Talk to us' },
  },

  // ── /process-automation ──────────────────────────────────────────────────
  automation: {
    meta: {
      title: 'Process automation — Pragmatical AI',
      description: 'Automate the work that never got written down: find the real process, then automate the part that is safe to automate.',
    },
    hero: {
      eyebrow: 'Work with us',
      headline: 'Automate the work that never got written down.',
      sub: 'Automation projects fail on the gap between the documented process and the real one. We start by finding the real one — the same way we read a legacy estate, because it is the same problem wearing different clothes.',
      cta: 'Start an assessment',
    },
    method: {
      title: 'Find it, then automate it.',
      items: [
        { icon: 'scan-search', title: 'Observe the actual path', body: 'What the systems record, what the spreadsheets carry, what the exceptions do. The real process is visible in its traces even when nobody can describe it.' },
        { icon: 'user-check', title: 'Confirm with the people doing it', body: 'The person who does the work knows which step is load-bearing and which is habit. That distinction is the whole difference between an automation that holds and one that gets switched off.' },
        { icon: 'split', title: 'Automate the safe part', body: 'Deterministic steps become code. Judgement steps keep a human, with the model preparing the decision rather than making it. Where the line falls is a decision we make with you, in writing.' },
        { icon: 'clipboard-check', title: 'Hand it over', body: 'You get the automation, the map of the process it implements, and the reasoning for every place a human stayed in the loop.' },
      ],
    },
    close: { headline: 'Bring us the process nobody wants to describe.', cta: 'Talk to us' },
  },

  // ── /products ────────────────────────────────────────────────────────────
  products: {
    meta: {
      title: 'Products — Pragmatical AI',
      description: 'Five products: Code Doctor, SWC, shop2gpt, agent-stack and GDS Playground. The layers we built to implement AI end to end.',
    },
    hero: {
      eyebrow: 'Products',
      headline: 'Five products. One conviction.',
      sub: 'The bottleneck is not generating more software. It is understanding the software you already run — and having somewhere solid to put what you learn. Each product below is one answer to that.',
    },
    statusLabels: { live: 'Live', partners: 'Design partners', preview: 'Internal preview' },
    items: [
      { id: 'code-doctor', name: 'Code Doctor', status: 'partners', body: 'Legacy modernisation that rebuilds rather than patches. Estate discovery, deterministic extraction from source and database, human-confirmed intent, and a rulebook you own.', href: '/products/code-doctor' },
      { id: 'swc', name: 'SWC', status: 'live', body: 'The UI layer for AI-powered apps: server-rendered components with no build step and a runtime with no dependencies, authored from a compact DSL a model can write.', href: '/products/swc' },
      { id: 'shop2gpt', name: 'shop2gpt', status: 'live', body: 'Any store, converted to MCP, so an assistant can browse your catalogue and buy from it. Shopify and WooCommerce.', href: '/products/shop2gpt' },
      { id: 'agent-stack', name: 'agent-stack', status: 'preview', body: 'The workflow layer: durable agent runs, connectors, and delivery into your repositories behind a human confirm gate.', href: '/products/agent-stack' },
      { id: 'gds-playground', name: 'GDS Playground', status: 'preview', body: 'Design a GOV.UK service by conversation and see it rendered with the real design system, with every project version-controlled.', href: '/products/gds-playground' },
    ],
  },

  // ── /products/:pid ───────────────────────────────────────────────────────
  // One page shape per product: what it is, why it exists, what it does in
  // specifics, who it is for, and how to get it. Every capability line here is
  // one I can point at a file for — see the claims note at the top of this
  // file. Status labels are the truth on the day.
  productPages: {
    'code-doctor': {
      eyebrow: 'Product · legacy modernisation',
      headline: 'Legacy modernisation that rebuilds, not patches.',
      sub: 'Most enterprise transformation is cosmetic: a new interface wrapped around forty-year-old behaviour. Code Doctor is for the other kind — it maps the estate, recovers the intent nobody wrote down, and hands you a rulebook the next migration starts from.',
      why: {
        title: 'Why it exists.',
        body: 'Every modernisation we were brought into stalled in the same place: nobody could describe the system being replaced. Not the vendor, not the incumbent team, not the documentation. So the first thing we built was the thing that reads what is already there.',
      },
      does: {
        title: 'What it does.',
        items: [
          { icon: 'scan-search', title: 'Estate topology', body: 'Repositories, services, routes, jobs and the integrations between them, mapped across the estate rather than sampled from one repo.' },
          { icon: 'git-compare', title: 'Deterministic extraction', body: 'Facts lifted at machine scale from Java and Spring, .NET, Python and TypeScript — each one carrying the source location it came from.' },
          { icon: 'database', title: 'Database logic', body: 'Postgres and SQL Server introspection: stored procedures, triggers, functions and scheduled jobs. The decisions source-only tools never see.' },
          { icon: 'user-check', title: 'Intent validation', body: 'A structured flow that puts open questions in front of the engineers who still know, and records the answer against the fact it explains.' },
          { icon: 'key', title: 'The rulebook', body: 'A machine-readable description of the system, owned by you, versioned like code, and reusable by the next migration.' },
          { icon: 'check-check', title: 'Equivalence before cutover', body: 'The generated system is measured against the original rather than declared finished. Demonstrated end to end on a reference pair.' },
        ],
      },
      who: 'Regulated and public-sector estates where the system cannot be switched off, the behaviour cannot be guessed at, and the auditors will ask how you knew.',
      status: 'partners',
      access: 'Onboarding a small number of design partners. An assessment is the first step and the output is yours regardless of what follows.',
      site: { label: 'codedoctor.ai', href: 'https://codedoctor.ai' },
    },
    swc: {
      eyebrow: 'Product · the UI layer',
      headline: 'The interface layer for software a model helps write.',
      sub: 'Generated interfaces look plausible and then do not work, and every fix costs another model call. SWC encodes what to show and how, so a model authors the shape once and the data is afterwards just data.',
      why: {
        title: 'Why it exists.',
        body: 'We were spending more of every engagement on screens than on the thinking behind them. A component library that a model can target — and a server that renders it without a build step — turned the interface from the slowest part of a delivery into the fastest.',
      },
      does: {
        title: 'What it does.',
        items: [
          { icon: 'boxes', title: '103 primitives', body: 'The whole vocabulary of an application interface, each one carrying its own accessibility contract rather than leaving it to the page.' },
          { icon: 'layout-dashboard', title: '91 composite screens', body: 'Whole sections and 20 full-page templates — a mailbox, a dashboard, a storefront — as one component fed one payload.' },
          { icon: 'server', title: 'Server-rendered, no build step', body: 'Pages arrive as HTML with their content in them. The runtime has no dependencies and deploys to the edge.' },
          { icon: 'shield-check', title: 'Accessibility enforced by lint', body: 'An icon-only button with no accessible name fails the build. Zero WCAG 2.1 A/AA violations across 62 automated scans.' },
          { icon: 'git-compare', title: 'Migration converters', body: 'Deterministic conversion from Next.js, WordPress and Shopify catalogues, with every finding classed as mapped, approximate or unmapped.' },
        ],
      },
      who: 'Teams building AI-facing products who want the interface to be a solved layer, and anyone modernising onto a stack they will still own in five years.',
      status: 'live',
      access: 'Free to use, with a commercial licence for code-generation products. The full component catalogue and documentation are on the product site.',
      site: { label: 'smartwebcomponents.com', href: 'https://smartwebcomponents.com' },
    },
    shop2gpt: {
      eyebrow: 'Product · agentic commerce',
      headline: 'Any store, readable by any assistant.',
      sub: 'Customers ask a model what to buy before they open a shop. shop2gpt turns your catalogue into MCP — the protocol assistants speak — so your products are in the answer rather than behind a page a model has to guess at.',
      why: {
        title: 'Why it exists.',
        body: 'Every commerce client asked the same question in the same month: how do we appear when a customer asks an assistant instead of a search engine. The honest answer needed a live, queryable view of the catalogue. A feed export cannot answer a question.',
      },
      does: {
        title: 'What it does.',
        items: [
          { icon: 'plug', title: 'Store to MCP', body: 'Products, variants, price and stock exposed as a protocol a model can query directly, derived from the store you already run.' },
          { icon: 'shopping-bag', title: 'Shopify and WooCommerce', body: 'Connects to the platform you are on. No re-platforming, and no second source of truth for stock or price.' },
          { icon: 'search-check', title: 'Answers from live data', body: 'Availability and price are read at the moment of asking, so an assistant never recommends what you cannot ship.' },
          { icon: 'shield-check', title: 'You keep the controls', body: 'Pricing, promotions, stock and fulfilment stay in your systems. The assistant gets a read model and a checkout hand-off.' },
        ],
      },
      who: 'Retailers and brands whose customers have started shopping through assistants, and anyone whose catalogue is their most valuable and least machine-readable asset.',
      status: 'live',
      access: 'Connect a store and the MCP surface is generated from your catalogue.',
      site: { label: 'shop2gpt.com', href: 'https://shop2gpt.com' },
    },
    'agent-stack': {
      eyebrow: 'Product · the workflow layer',
      headline: 'Where an agent’s reasoning lands.',
      sub: 'A chat window that recommends a change and cannot make it has moved the work onto you. agent-stack gives agent runs somewhere to finish: connectors, durable state, and delivery into your repositories behind a gate a human opens.',
      why: {
        title: 'Why it exists.',
        body: 'The gap between an agent that can explain a migration and an agent that can perform one is all plumbing — auth, state, retries, and the question of who is accountable when it writes. We built the plumbing rather than demoing around it.',
      },
      does: {
        title: 'What it does.',
        items: [
          { icon: 'workflow', title: 'Durable agent runs', body: 'Runs, schedules and a run bus, so a job that takes an hour survives the tab being closed.' },
          { icon: 'git-compare', title: 'Deterministic migration seam', body: 'Wraps the same conversion pipeline the framework ships, so the result of a conversion is reproducible rather than re-generated on each attempt.' },
          { icon: 'user-check', title: 'A confirm gate before anything is pushed', body: 'The run pauses before it touches a repository. Delivery is a decision a person makes, every time.' },
          { icon: 'server', title: 'One codebase, two runtimes', body: 'Cloudflare Workers or Node from the same source, with storage adapters behind one interface.' },
        ],
      },
      who: 'Us, first — it is how the migration work gets delivered. Then teams who want agent work to arrive as reviewable pull requests rather than as advice.',
      status: 'preview',
      access: 'In internal use and not yet open. This page is its only documentation; talk to us if the shape is what you need.',
      site: null,
    },
    'gds-playground': {
      eyebrow: 'Product · government service delivery',
      headline: 'Design a GOV.UK service by describing it.',
      sub: 'Public services have a design system, a service standard and rules about where data may live. GDS Playground makes that context buildable: describe the journey, watch it render with the real components, and keep every version in git.',
      why: {
        title: 'Why it exists.',
        body: 'Government delivery has its own physics, and generic tooling ignores all of it. A prototype that is not built from the actual design system teaches a team the wrong thing and has to be thrown away at assessment.',
      },
      does: {
        title: 'What it does.',
        items: [
          { icon: 'landmark', title: 'Real GOV.UK components', body: 'Journeys render through govuk-frontend 6.1.0 macros — the same components the live services use, not a lookalike.' },
          { icon: 'workflow', title: 'Journeys from a conversation', body: 'Describe the service and the pages appear; refine by talking rather than by wiring a prototype together by hand.' },
          { icon: 'git-compare', title: 'Every project version-controlled', body: 'Each project is a git repository, so a journey has history and a change has an author.' },
          { icon: 'globe-lock', title: 'Sovereign by construction', body: 'Model-agnostic and deployable inside your own boundary, which is a requirement in this sector rather than a preference.' },
        ],
      },
      who: 'Departments and suppliers working to the service standard who need a prototype that survives contact with an assessment.',
      status: 'preview',
      access: 'In use internally on real journeys, with pilots by arrangement.',
      site: { label: 'gdsplayground.com', href: 'https://gdsplayground.com' },
    },
  },

  // ── /approach ────────────────────────────────────────────────────────────
  approach: {
    meta: {
      title: 'Approach — Pragmatical AI',
      description: 'Extract first, reason second. Five stages from estate to running system, and the principles that decide what a machine may assume.',
    },
    hero: {
      eyebrow: 'Approach',
      headline: 'Extract first. Reason second.',
      sub: 'A model asked to explain a system it has only read prose about will produce confident prose back. Everything here exists to make sure the reasoning starts from facts that were lifted, not guessed.',
    },
    principles: {
      title: 'Four principles, applied to every engagement.',
      items: [
        { icon: 'scan-search', title: 'Estate-first', body: 'Nothing starts from a sample. The unit of work is the estate, because the failure mode is always the system nobody remembered.' },
        { icon: 'user-check', title: 'Humans confirm intent', body: 'AI surfaces patterns at a scale people cannot. Only a person can say what a pattern meant. We never collapse those two jobs into one.' },
        { icon: 'globe-lock', title: 'Model-agnostic, jurisdiction-first', body: 'No engagement depends on one vendor’s model or one country’s cloud. Air-gapped is a supported configuration, not an exception.' },
        { icon: 'key', title: 'You own the output', body: 'The corpus and the rulebook are yours, in a documented format, from the first week. Lock-in is a business model we decided not to have.' },
      ],
    },
    failures: {
      title: 'Three failures, the same shape every time.',
      items: [
        { icon: 'eye-off', title: 'Estate blindness', body: 'The plan covers the systems people remembered. The programme is then re-planned around the ones they did not.' },
        { icon: 'file-question-mark', title: 'Intent loss', body: 'The rebuild reproduces the code and loses the reason. The exception that protected a customer relationship disappears in a refactor nobody questioned.' },
        { icon: 'chart-no-axes-column', title: 'Measurement distortion', body: 'Progress is measured in output — files moved, screens shipped — because nobody agreed what "equivalent" means. Equivalence has to be defined before it can be proved.' },
      ],
    },
    corpus: {
      title: 'We did the reading first.',
      sub: 'The corpora below were built and analysed before any client engagement, with licence provenance recorded per repository. They are why the extraction has already met the shapes your estate will show us.',
      stats: [
        { value: '6,254', label: 'Legacy repositories with provenance' },
        { value: '18,227', label: 'Public-sector repositories catalogued' },
        { value: '7,053', label: 'Cloned with full history' },
        { value: '4,515', label: 'Projects analysed' },
      ],
    },
    close: { headline: 'The method is the product. The engagement is where you meet it.', cta: 'Talk to us' },
  },

  // ── /about ───────────────────────────────────────────────────────────────
  about: {
    meta: {
      title: 'About — Pragmatical AI',
      description: 'A London applied-AI company. We built the tools we kept wishing existed, in the order the work demanded them.',
    },
    hero: {
      eyebrow: 'About',
      headline: 'We built the tools we kept wishing existed.',
      sub: 'Pragmatical AI is a London applied-AI company. Every product we ship started as a wall we hit doing the work, in the order we hit them.',
    },
    story: {
      title: 'Four walls, four products.',
      // Ordered by what a reader needs to know we do, not by the order we hit
      // them. Leading with the screens told everyone we were a front-end shop.
      items: [
        { q: 'The legacy estate would not be read', a: 'Every modernisation stalled in the same place — nobody could describe the system being replaced. Code Doctor makes that describable: topology across the estate, deterministic extraction from source and database, and the intent recovered from the people who still hold it.' },
        { q: 'The agent could reason but not deliver', a: 'A chat window that recommends a change and cannot make it puts the work back on you. agent-stack gave the reasoning somewhere to land: durable runs, connectors, and a GitHub App that opens the change behind a confirm gate. Nothing touches a repository without a person saying yes.' },
        { q: 'The screens took longer than the thinking', a: 'Generated interfaces looked plausible and did not work, and every fix cost another model call. So we built SWC: components that encode what to show and how, server-rendered, with a runtime that has no dependencies. A model authors the shape once; after that the data is just data.' },
        { q: 'Government work has its own physics', a: 'Public services have a design system, a service standard, and rules about where data may live. GDS Playground is that context made buildable: design a service by conversation, see it rendered with the real components, keep every version in git.' },
      ],
    },

    principles: {
      title: 'How we work.',
      items: [
        { icon: 'ruler', title: 'Practitioners, not a bench', body: 'The people who write the code are the people in the room. We do not staff an engagement with a layer of coordination.' },
        { icon: 'file-check', title: 'Assessment before proposal', body: 'We will not scope a transformation of a system we have not read. The first deliverable is an honest inventory, and it is yours either way.' },
        { icon: 'ban', title: 'What we will not do', body: 'No black-box transformation. No cosmetic modernisation that leaves the behaviour untouched. No architecture whose exit path runs through us.' },
      ],
    },
    close: { headline: 'Tell us about what you already have.', cta: 'Talk to us' },
  },

  // ── /contact ─────────────────────────────────────────────────────────────
  contact: {
    meta: {
      title: 'Contact — Pragmatical AI',
      description: 'Tell us about what you already have. A short form, and a reply within two working days.',
    },
    hero: {
      eyebrow: 'Contact',
      headline: 'Tell us about what you already have.',
      sub: 'The more concrete the better: the system that nobody wants to touch, the process nobody can describe, the store that needs to be readable by an assistant.',
    },
    form: {
      title: 'Start here',
      submit: 'Send',
      name: 'Name',
      email: 'Work email',
      organisation: 'Organisation',
      role: 'Role',
      interest: 'What is this about?',
      jurisdiction: 'Country or jurisdiction',
      context: 'Brief context',
      contextPlaceholder: 'What you have, what it is doing to you, and what you would like to be true instead.',
      sent: 'Thank you — that has reached us. We reply within two working days.',
      error: 'That did not send. Email us directly and we will pick it up.',
      // The form's fields are built client-side (the framework deliberately
      // does not server-render a form's authored fields), so the page needs a
      // way to reach us that works with no JavaScript at all.
      // OWNER: confirm this mailbox exists and is monitored before launch.
      fallbackLead: 'Prefer email, or scripts disabled?',
      email: 'hello@pragmatical.ai',
    },
    interests: [
      { value: 'legacy', text: 'A legacy estate' },
      { value: 'implementation', text: 'AI implementation' },
      { value: 'commerce', text: 'Commerce / shop2gpt' },
      { value: 'automation', text: 'Process automation' },
      { value: 'product', text: 'One of the products' },
      { value: 'press', text: 'Press' },
      { value: 'other', text: 'Something else' },
    ],
  },

  notFound: {
    title: '404',
    message: 'That page is not here. The products are, though.',
    back: 'Back to the homepage',
  },
};

// `t.a.b` from { a: { b } } — the same convention the framework's locale packs
// use, so adding a second language later means adding a pack, not touching a
// single page.
const isNested = ([, v]) => v && typeof v === 'object' && !Array.isArray(v);

export function flatten(obj, prefix = 't') {
  const out = {};
  const entries = Object.entries(obj).map(([k, v]) => [`${prefix}.${k}`, v]);
  entries.filter(isNested).forEach(([path, value]) => Object.assign(out, flatten(value, path)));
  entries.filter((e) => !isNested(e)).forEach(([path, value]) => { out[path] = value; });
  return out;
}

export const contentState = flatten(CONTENT);
