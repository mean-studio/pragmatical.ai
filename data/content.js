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
    motto: 'AI-first tools for real-world work.',
    legal: '© 2026 Pragmatical AI Ltd.',
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
      title: 'Pragmatical AI — AI-first tools for real-world work',
      description: 'We build AI-first tools: AI Studio for creating applications, Smart Web Components for their foundation, and practical tools for complex work.',
    },
    hero: {
      eyebrow: 'Applied AI',
      // Static. A claim you rotate is a claim you do not hold — and the
      // rotating word was the most-copied startup device in circulation.
      headline: 'AI, put to work on the problem you actually have.',
      sub: 'The migration nobody wants to start. The contract that comes back changed every round. The process that runs on people copying between systems. We build the tools, and we have done it inside banks and government.',
      cta: 'Start an assessment',
      cta2: 'See the tools',
    },

    // The signature: what the work actually produces. A machine reads the
    // estate or the draft and proposes a finding; a person confirms what it
    // meant; the confirmation is recorded. That sentence is the whole pitch,
    // and until now it was a 14px line in a muted paragraph.
    //
    // Every fragment below is INVENTED. Real ledgers stay inside the client's
    // boundary, which is the point the caption makes — a company that will not
    // show you another client's code is the company a bank hires.
    ledger: {
      caption: 'Illustration. Real findings stay inside your boundary; ours receives audit metadata only.',
      cols: ['Ref', 'Read from', 'What it means', 'State'],
      rows: [
        { ref: '0412', src: 'PROC 3200-CALC-PENALTY', meaning: 'Late-payment penalty is waived for accounts flagged H — undocumented since 2009', state: 'confirmed', label: 'Confirmed' },
        { ref: '0871', src: 'TRIGGER trg_acct_close', meaning: 'Closing an account rewrites six months of history', state: 'confirmed', label: 'Confirmed' },
        { ref: '1104', src: 'cl. 14.3 · round 22', meaning: 'Liability cap returned, reworded, not flagged in the summary', state: 'confirmed', label: 'Confirmed' },
        { ref: '1150', src: 'cl. 9.1 · round 22', meaning: '—', state: 'awaiting', label: 'Awaiting' },
      ],
    },

    // What we are actually hired for, said as the problem rather than as the
    // capability. Each one names the tool that does it, and every tool has its
    // own site — the links open there.
    pains: {
      title: 'Six problems we are hired for.',
      sub: 'Different problems, one method: find what is really happening, agree it with the people who know, then build the part that changes it. The tool under each is ours, which is why the estimate is a build rather than a discovery phase.',
      items: [
        {
          icon: 'scan-search',
          title: 'A system we cannot migrate off',
          body: 'Twenty years of behaviour, no documentation, and a vendor quote priced for the risk. Code Doctor reads the estate — source and database — and hands you the rulebook the migration runs on.',
          tool: 'Code Doctor', href: 'https://codedoctor.ai', tag: 'Legacy',
        },
        {
          icon: 'scale',
          title: 'A contract that comes back different every round',
          body: 'Clause creep: you struck it in round nineteen, and by round twenty-two it was back, reworded, with no summary flagging it. Contract Vetting reads every returned draft against the last one — and against case law, official guidance and your own commercial rules.',
          tool: 'Contract Vetting', href: 'https://contractvetting.com', wide: true, tag: 'Clause creep',
        },
        {
          icon: 'workflow',
          title: 'A process that runs on people copying between systems',
          body: 'The work is real. The copying is not. Define the events, let agents do the work between them, and keep a person on the gate.',
          tool: 'agent-stack', href: '/products/agent-stack', tag: 'Human in the loop',
        },
        {
          icon: 'shopping-bag',
          title: 'A shop no assistant can read',
          body: 'Customers ask ChatGPT what to buy before they open a browser tab. shop2gpt puts your catalogue where the question is being answered.',
          tool: 'shop2gpt', href: 'https://shop2gpt.com', tag: 'Agentic commerce',
        },
        {
          icon: 'globe-lock',
          title: 'An app for every market you are regulated in',
          body: 'Each one wants its own language and its own answer about where the data was processed. SWC gives you both in one app, rendered at the edge. This site runs on it.',
          tool: 'SWC', href: 'https://smartwebcomponents.com', wide: true, tag: 'Data residency',
        },
        {
          icon: 'landmark',
          title: 'A public service that has to pass assessment',
          body: 'Describe the journey and watch it build with the real GOV.UK design system — inside your own boundary, on the model you choose.',
          tool: 'GDS Playground', href: 'https://gdsplayground.com', tag: 'GOV.UK',
        },
      ],
    },

    // The two engagements that do not come in a box. They were missing
    // entirely: the site listed six tools and never said that setting an
    // organisation up to USE AI internally is work we do.
    services: {
      title: 'And two things that do not come in a box.',
      items: [
        {
          icon: 'boxes',
          title: 'End-to-end implementation',
          body: 'Discovery, extraction, the replacement, and equivalence proved before cutover — with our own tools doing the expensive parts.',
          cta: 'How an engagement runs', href: '/implementation',
        },
        {
          icon: 'brain',
          title: 'Internal AI enablement',
          body: 'The plumbing and the screens that let your own people use AI on your own data: the dataflow, the gateway that governs it, and the interfaces the humans in the loop work in.',
          cta: 'Setting up internal AI', href: '/internal-ai',
        },
      ],
    },

    // The experience claim, stated as sectors rather than client names — the
    // house rule is no logos and no named institutions.
    regulated: {
      title: 'We have done this where it is hard.',
      sub: 'Banks and government organisations: environments where the system cannot be switched off, the auditor will ask how you knew, and "we let the model decide" is not an answer. Everything below is a working property, not a promise.',
      items: [
        { icon: 'shield', title: 'Your source stays yours', body: 'Read statically, never executed. Artefacts stay in your environment; our infrastructure receives audit metadata only.' },
        { icon: 'globe-lock', title: 'Your jurisdiction, your cloud', body: 'AWS including GovCloud, Azure including Government, Google Vertex with Assured Workloads, or self-hosted and air-gapped.' },
        { icon: 'languages', title: 'Every market, in its own language', body: 'Localisation is a compliance question before it is a marketing one: the locale is in the URL and in the server render, right-to-left is a supported direction rather than a retrofit, and each market is served from the regions you permit.' },
        { icon: 'user-check', title: 'A human holds the pen', body: 'AI surfaces the pattern; a person confirms what it meant, and the confirmation is recorded. Delivery waits for someone to open the gate.' },
        { icon: 'key', title: 'You own what comes out', body: 'The corpus, the rulebook, the model and the code. Leaving us costs you the engagement and nothing else.' },
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
      sub: 'Six tools, each one the answer to a wall we hit doing this work. You can hire us to point them at your problem, or use them yourself.',
      cta: 'All six, with status and links',
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
      headline: 'Find the right tool. Build the next thing.',
      sub: 'Explore the products, or talk to us about putting them to work with your team.',
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
    close: { headline: 'Let’s build something useful.', cta: 'Talk to us' },
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

  // ── /internal-ai ─────────────────────────────────────────────────────────
  internalAi: {
    meta: {
      title: 'Internal AI enablement — Pragmatical AI',
      description: 'The dataflow, the governance and the interfaces that let your own people use AI on your own data — with a gateway in front of every model call.',
    },
    hero: {
      eyebrow: 'Work with us',
      headline: 'Everyone has a chatbot. Nobody has the plumbing.',
      sub: 'Using AI internally is not a licence decision. It is a question of what the model may see, who may ask it, what each answer costs, what happens to the corrections, and where the humans in the loop actually do their work. We build that.',
      cta: 'Start an assessment',
    },
    flow: {
      title: 'The dataflow, end to end.',
      items: [
        { icon: 'database', title: 'Where the knowledge is', body: 'Systems, documents, databases and the process knowledge that was never written down. The same extraction we use on a legacy estate, pointed at your operations.' },
        { icon: 'file-check', title: 'What the model may see', body: 'A corpus scoped by permission rather than a folder somebody shared. Retrieval that answers from your material and cites which document it came from.' },
        { icon: 'user-check', title: 'Who is in the loop', body: 'Corrections, confirmations and refusals captured as data rather than lost in a chat window — the raw material for the next improvement.' },
        { icon: 'brain', title: 'What comes back', body: 'A model tuned to your domain on the corpus you own, deployed in your jurisdiction, answering in your terms rather than in general ones.' },
      ],
    },
    control: {
      title: 'A gateway in front of every model call.',
      sub: 'The control point most internal rollouts discover they needed after the first invoice or the first incident. It is built, it runs on Node or at the edge unchanged, and it is the single place cost and permission are known.',
      items: [
        { q: 'Who may use which model', a: 'Per-team allow-lists, evaluated at the gateway rather than trusted to each application. A team gets the models it is approved for and nothing else.' },
        { q: 'What it costs, as it happens', a: 'A usage ledger in tokens and computed cost, a monthly spend cap, and a request rate limit. The cap is enforced where prices are known, so an application cannot spend around it.' },
        { q: 'A kill switch', a: 'One switch stops model traffic for a tenant. Not a support ticket to a vendor — a control you hold.' },
        { q: 'Whose keys', a: 'Bring your own provider credentials; they are stored encrypted and handed to the runtime at call time. Changing provider is a configuration change rather than a migration.' },
        { q: 'What happened, and who started it', a: 'RBAC is evaluated before every tool and connector call, and write or destructive actions are denied unless something explicitly grants them. Every action is recorded with its initiator — a person, a scheduled job, a webhook, or another tool.' },
      ],
    },
    interfaces: {
      title: 'The people in the loop need somewhere to work.',
      sub: 'This is the part most AI programmes leave until last and then improvise: the screens where a person reviews, confirms, corrects, labels or rejects what the model produced. They are the difference between a pilot and a process.',
      items: [
        { icon: 'layout-dashboard', title: 'Review and confirmation', body: 'Queues that put one decision in front of one person with the evidence beside it, and record the answer against the thing it explains. Code Doctor’s intent validation is this, shipped.' },
        { icon: 'clipboard-check', title: 'Labelling and evaluation', body: 'The screens that turn expert judgement into training data, and the ones that tell you whether the last change made the model better or only different.' },
        { icon: 'globe-lock', title: 'Built to the same standard as the rest', body: 'On SWC, so they are server-rendered, quick, localised where they need to be, and accessible because the build refuses to ship them otherwise.' },
      ],
    },
    close: { headline: 'Start with one team and one question they ask all day.', cta: 'Talk to us' },
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
      description: 'Explore AI Studio, Smart Web Components and our tools for modernisation, agent workflows, contracts, commerce and government services.',
    },
    hero: {
      eyebrow: 'Products',
      headline: 'Tools to build with. Intelligence to work with.',
      sub: 'Start with AI Studio and Smart Web Components, then explore tools built for specific kinds of work. Availability is shown for every product.',
    },
    statusLabels: { live: 'Live', partners: 'Design partners', preview: 'Internal preview', building: 'In build' },
    // href is the page on this site; site is the product's own site, opened in
    // a new tab so a reader comparing tools does not lose their place here.
    items: [
      { id: 'ai-studio', name: 'AI Studio', status: 'preview', href: '/products/ai-studio', site: '',
        body: 'From a brief to flows, wireframes, screens and data. A guided app-building experience on Smart Web Components.' },
      { id: 'code-doctor', name: 'Code Doctor', status: 'partners', href: '/products/code-doctor', site: 'https://codedoctor.ai',
        body: 'Migrate off the system you cannot describe. Estate discovery, extraction from source and database, intent confirmed by your engineers, and a rulebook you own.' },
      { id: 'contract-vetting', name: 'Contract Vetting', status: 'building', href: '/products/contract-vetting', site: 'https://contractvetting.com',
        body: 'Review a contract against case law, official guidance and your own commercial rules — then track every round, including the clauses that quietly come back.' },
      { id: 'agent-stack', name: 'agent-stack', status: 'preview', href: '/products/agent-stack', site: '',
        body: 'Build harnesses for AI data flows: connect sources, carry context between steps and keep a human on the gate. The infrastructure behind Contract Vetting.' },
      { id: 'shop2gpt', name: 'shop2gpt', status: 'live', href: '/products/shop2gpt', site: 'https://shop2gpt.com',
        body: 'Expose your shop to agentic shopping. Your catalogue as MCP, so ChatGPT, Claude and the assistants after them can browse it and buy from it.' },
      { id: 'swc', name: 'Cherga UI (currently SWC)', status: 'live', href: '/products/swc', site: 'https://smartwebcomponents.com',
        body: 'The foundation for AI-powered apps: server-rendered, no build step, no dependencies, localised per market and distributed globally on the edge.' },
      { id: 'gds-playground', name: 'GDS Playground', status: 'preview', href: '/products/gds-playground', site: 'https://gdsplayground.com',
        body: 'Lovable and Cursor, specialised for the GDS cohort. Describe a government service, build it with the real design system, keep every version in git.' },
    ],
  },

  // ── /products/:pid ───────────────────────────────────────────────────────
  // One page shape per product: what it is, why it exists, what it does in
  // specifics, who it is for, and how to get it. Every capability line here is
  // one I can point at a file for — see the claims note at the top of this
  // file. Status labels are the truth on the day.
  productPages: {
    'ai-studio': {
      eyebrow: 'Product · app creation',
      headline: 'Your idea, with a path to an application.',
      sub: 'AI Studio — called SWC Studio in the project — brings the building process into one guided workspace: describe the app, review its flow, refine its wireframes, then work through screens and data.',
      why: { title: 'Make the thinking visible.', body: 'An application is more than a generated screen. Its journey, structure and data need to make sense together. Studio gives each of those decisions a place to be reviewed.' },
      does: { title: 'From context to something concrete.', items: [
        { icon: 'file-check', title: 'Start with context', body: 'Begin with a description and supporting material such as screenshots, a repository or API documentation.' },
        { icon: 'workflow', title: 'Review the flow', body: 'Inspect the screens and the connections between them before refining the interface.' },
        { icon: 'layout-dashboard', title: 'Shape the wireframes', body: 'Work with shells, layouts and named components rather than an unstructured canvas.' },
        { icon: 'database', title: 'Connect screens and data', body: 'Review the entities, services and state that the interface depends on.' },
      ] },
      who: 'People and teams turning an application idea into a structured, reviewable software project.',
      status: 'preview',
      access: 'An internal preview, built on SWC and agent-stack. Contact us to discuss access and the current workflow. Public self-service access is not yet advertised.',
      cta: 'Ask about Studio access', site: null,
    },
    'code-doctor': {
      eyebrow: 'Product · legacy modernisation',
      headline: 'Migrate off the system nobody can describe.',
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
      shot: { src: '/shots/code-doctor.jpg', alt: 'The Code Doctor pipeline: topology discovery, pattern extraction, intent validation, rulebook, parallel-run verification.', caption: 'codedoctor.ai — the pipeline, from estate to proven cutover.' },
    },
    swc: {
      eyebrow: 'Product · the UI layer',
      headline: 'The foundation for AI-powered apps that are fast everywhere.',
      sub: 'Server-rendered components with no build step and a runtime with no dependencies, deployed to the edge and authored from a DSL a model can write. It is what our own apps are built on, including this site.',
      why: {
        title: 'Why it exists.',
        body: 'We were spending more of every engagement on screens than on the thinking behind them. A component library that a model can target — and a server that renders it without a build step — turned the interface from the slowest part of a delivery into the fastest.',
      },
      does: {
        title: 'What it does.',
        items: [
          { icon: 'boxes', title: '103 primitives', body: 'The whole vocabulary of an application interface, each one carrying its own accessibility contract rather than leaving it to the page.' },
          { icon: 'layout-dashboard', title: '91 composite screens', body: 'Whole sections and 20 full-page templates — a mailbox, a dashboard, a storefront — as one component fed one payload.' },
          { icon: 'server', title: 'Server-rendered, no build step', body: 'Pages arrive as HTML with their content in them. The runtime has no dependencies and deploys to the edge, so the same app is close to a user in Frankfurt and one in Singapore.' },
          { icon: 'languages', title: 'Localisation in the framework, not bolted on', body: 'The locale rides the URL (/:locale, or country and language separately), the server renders in it, and direction and lang are set from it — right-to-left included, which is a layout decision the whole component library already makes. Six languages ship on our own site, Arabic among them.' },
          { icon: 'globe-lock', title: 'Regional by deployment', body: 'It runs as an edge worker, so which regions execute it is a deployment decision rather than a rewrite — the lever a data-residency obligation actually needs.' },
          { icon: 'shield-check', title: 'Accessibility enforced by lint', body: 'An icon-only button with no accessible name fails the build. Zero WCAG 2.1 A/AA violations across 62 automated scans.' },
          { icon: 'git-compare', title: 'Migration converters', body: 'Deterministic conversion from Next.js, WordPress and Shopify catalogues, with every finding classed as mapped, approximate or unmapped.' },
        ],
      },
      who: 'Teams building AI-facing products who want the interface to be a solved layer, and anyone modernising onto a stack they will still own in five years.',
      status: 'live',
      access: 'Free to use, with a commercial licence for code-generation products. The full component catalogue and documentation are on the product site.',
      site: { label: 'smartwebcomponents.com', href: 'https://smartwebcomponents.com' },
      shot: { src: '/shots/swc-templates.jpg', alt: 'The SWC template gallery: seventeen full-page application templates.', caption: 'Seventeen full-page templates, each one payload-driven and server-rendered.' },
    },
    shop2gpt: {
      eyebrow: 'Product · agentic commerce',
      headline: 'Put your shop where the shopping is happening.',
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
    'contract-vetting': {
      eyebrow: 'Product · contract and document review',
      headline: 'Read it against everything that should govern it.',
      sub: 'A contract is checked against four things at once: the law and guidance that bind it, the facts it asserts, the commercial rules you actually run on, and the version of itself you agreed last round. Doing three of those by hand is why review is slow, and why the fourth gets skipped.',
      why: {
        title: 'Why it exists.',
        body: 'One negotiation ran to twenty-six rounds. In each one the counterparty reworded something we had already struck — never the same way twice, never flagged in the summary. A person reading a fresh redline at eleven at night is being asked to remember nineteen previous drafts. Nobody can, and everybody is expected to.',
      },
      does: {
        title: 'What it does.',
        items: [
          { icon: 'file-diff', title: 'Every round, against the last', body: 'What you asked for and got. What you asked for and did not get. And what appeared that nobody asked for — the clause creep that survives because it arrives reworded rather than restored.' },
          { icon: 'gavel', title: 'Against case law and guidance', body: 'Clauses read against the authorities that decide them and the official guidance that applies, with the citation attached rather than a confidence score.' },
          { icon: 'file-check', title: 'Against the facts', body: 'The same reading applied to any document, not only contracts: the claims it makes, checked against sources you can open.' },
          { icon: 'settings-2', title: 'Against your commercial rules', body: 'Your rules, written once and applied to every draft: what a payment term delay costs you, what a liability cap does to margin, whether the engagement sits inside IR35.' },
          { icon: 'workflow', title: 'The round trip, tracked', body: 'Upload, review, send the amendments, and receive the reply into the same thread — so the record of what was agreed lives with the document rather than in an inbox.' },
        ],
      },
      who: 'Anyone negotiating commercial contracts in rounds — procurement, in-house counsel, and the finance people who find out later what the terms actually cost.',
      status: 'building',
      access: 'In build. Design partners with a live negotiation to point it at are the ones shaping it.',
      site: { label: 'contractvetting.com', href: 'https://contractvetting.com' },
    },
    'agent-stack': {
      eyebrow: 'Product · the workflow layer',
      headline: 'The harness around the intelligence.',
      sub: 'Connect sources, carry context through agent steps, keep the outputs and pause where judgement belongs. Contract Vetting gives this a concrete purpose: a review flow that connects documents, knowledge, negotiation history and human sign-off.',
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
      headline: 'Lovable for government delivery.',
      sub: 'The prompt-to-app experience of Lovable or Cursor, specialised for the GDS cohort: describe the journey, watch it build with the real GOV.UK design system, and keep every version in git. A prototype that survives assessment rather than being thrown away at it.',
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

  // ── /about ───────────────────────────────────────────────────────────────
  about: {
    meta: {
      title: 'About — Pragmatical AI',
      description: 'A UK-based applied-AI company. We built the tools we kept wishing existed, in the order the work demanded them.',
    },
    hero: {
      eyebrow: 'About',
      headline: 'We built the tools we kept wishing existed.',
      sub: 'Pragmatical AI is a UK-based applied-AI company. Every product we ship started as a wall we hit doing the work, in the order we hit them.',
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
    // The reading we did before selling anything — a company credential rather
    // than a methodology essay standing on its own page.
    corpus: {
      title: 'We did the reading first.',
      sub: 'Before talking to a customer we built and analysed corpora at estate scale, because a method that has only seen one codebase is an anecdote.',
      stats: [
        { value: '6,254', label: 'Legacy repositories, licence-checked, with provenance' },
        { value: '18,227', label: 'UK public-sector repositories catalogued' },
        { value: '7,053', label: 'Cloned with full history' },
        { value: '4,515', label: 'Projects analysed' },
      ],
    },

    close: { headline: 'Let’s build something useful.', cta: 'Talk to us' },
  },

  // ── /contact ─────────────────────────────────────────────────────────────
  contact: {
    meta: {
      title: 'Ask Pragmatical AI — Cherga, automation and modernisation',
      description: 'Talk with our AI assistant about the Cherga framework, AI Studio, automation and system modernisation.',
    },
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
