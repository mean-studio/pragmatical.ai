// Corporate pages are declarative compositions. Product detail stays on its own destination.
const link = (label, href) => ['s-ln', `@href=${href}`, `=${label}`];
const section = (region, children) => ['s-sc', `@rg=${region}`, [['s-cn', '@rg=home-wrap', '@l=vertical', children]]];
const opening = (eyebrow, title, body) => section('corporate-opening', [
  ['s-l', '@rg=eyebrow', `=${eyebrow}`], ['h1', `=${title}`], ['p', '@rg=lead', `=${body}`],
]);
const essay = (number, title, body, detail) => ['s-cn', '@l=fg', '@rg=essay', [
  ['s-cn', [['s-l', '@rg=eyebrow', `=${number}`], ['h2', `=${title}`]]],
  ['s-cn', '@rg=essay-copy', [['p', '@rg=lead-small', `=${body}`], ['p', `=${detail}`]]],
]];
export const corporateDefs = [
  { tag: 'page-work', children: [
    opening('Our work', 'The foundation for\nyour AI applications.', 'Cherga joins an AI-first framework to Studio, automation, system modernisation and distributed execution. Build new applications and bring existing systems into the same architecture.'),
    ['home-foundation'], ['home-studio'], ['home-automation'], ['home-modernisation'], ['home-edge'], ['home-contracts'],
    section('work-examples', [
      ['s-l', '@rg=eyebrow', '=In practice'], ['h2', '=One foundation. Different contexts.'],
      ['p', '@rg=lead-small', '=GDS Playground is an example of a white-labelled AI Studio, shaped around public-service design. It shows how a common foundation can support a specific working environment.'],
      link('Explore GDS Playground', '/products/gds-playground'),
      ['p', '@rg=built-with', '=Our existing tools remain available through their current product pages as we bring the Cherga platform together.'],
      link('Existing tools and availability', '/products'),
    ]), ['home-engagement'],
  ] },
  { tag: 'page-approach', children: [
    opening('Our architecture', 'One foundation.\nFrom interface to execution.', 'Cherga connects an AI-first UI framework, data services and a shared execution runtime. Studio creates against that architecture. Code Doctor brings existing systems into it. Cloudflare is our first integrated delivery target.'),
    section('architecture-overview', [
      ['s-l', '@rg=eyebrow', '=How the platform fits together'],
      ['h2', '=Every layer has a job.\nThe connections are designed in.'],
      ['p', '@rg=lead-small', '=The router, store, HTTP service and enterprise components form the application foundation. Authentication and access rules run through it. The shared runner connects the application to automation, agents and human decisions.'],
      ['architecture-map'],
    ]),
    section('application-lifecycle', [
      ['s-l', '@rg=eyebrow', '=A concrete example / A service-request workspace'],
      ['h2', '=Follow the data.\nSee what you no longer scaffold.'],
      ['p', '@rg=lead-small', '=A team needs a workspace that loads service requests, streams an AI summary and sends exceptions for approval. Here is how that application maps onto Cherga.'],
      ['s-cn', '@rg=lifecycle-flow', '@l=fg', [
        ['s-cn', [['strong', '=01 / Route'], ['p', '=Open /requests. The route selects the workspace and triggers its declared data service.']]],
        ['s-cn', [['strong', '=02 / HTTP service'], ['p', '=The service calls the configured endpoint and writes result, loading and error state to named store keys.']]],
        ['s-cn', [['strong', '=03 / Store + UI'], ['p', '=The request table binds to those keys. Data and status changes update the interface.']]],
        ['s-cn', [['strong', '=04 / Action + flow'], ['p', '=An authorised action calls a service backed by the runner. Agent work, retries and review gates belong to that flow.']]],
      ]],
      ['p', '@rg=lifecycle-return', '=The return path: services send results and streamed updates to the store; bound components update the interface.'],
      ['s-cn', '@rg=responsibility-grid', '@l=fg', [
        ['s-cn', [['h3', '=You define the application.'], ['p', '=The request fields, endpoint contracts, component configuration, access policies and approval rules. The model generates this product-specific definition against existing framework capabilities.']]],
        ['s-cn', [['h3', '=The foundation supplies the machinery.'], ['p', '=Routing, reactive bindings, HTTP handling, streaming support, reusable UI, authentication foundations and permission states. The runner supplies flow execution and retry handling.']]],
      ]],
      ['p', '@rg=platform-note', '=Illustrated application flow. UI permission rules control available actions; endpoints independently enforce authorisation.'],
    ]),
    section('approach-essays', [
      essay('AI-first / By construction', 'Generate the application. Reuse the implementation.', 'Cherga applications are declarative compositions of components, routes, state bindings and services. Those definitions give a model concrete building blocks and explicit places to connect data.', 'A table, an authentication flow or a streaming service does not need a fresh implementation on every generation. The model concentrates on the application definition and business-specific work. Shared implementations reduce the boilerplate to generate, review and maintain.'),
      essay('Research / 100,000 repositories', 'Common problems became framework decisions.', 'We analysed 100,000 repositories to understand recurring structures, common mistakes and the scaffolding teams repeatedly write.', 'That research informs the component library and application conventions. Reusing a defined capability takes less generation work than recreating its internals. Reducing that repeated code is central to our token-efficiency design and to keeping mundane engineering out of every new project.'),
      essay('Studio + modernisation', 'Create new software. Carry existing knowledge forward.', 'AI Studio is the integrated authoring workspace around Cherga: shape the interface, connect services, compose flows and prepare the application for delivery. Direct framework users work with the same foundation through ChergaJS.', 'Code Doctor supplies topology discovery across repositories, services and infrastructure, plus validated intent and a reusable rulebook. Studio can use that system context to plan migration into connected services and flows, preserving the process that the old code served.'),
      essay('Automation + shared execution', 'One runner behind the work.', 'The agent-stack runner is the execution layer within the platform. Application events and service calls connect to deterministic steps, agent tasks, retries and human review gates.', 'The integration target is one crafted environment for creating the app and defining what it does. Domain-specific harnesses add data contracts, tools and review rules to the shared runner, so every application does not need a separate execution foundation.'),
      essay('Worker SSR + distributed applications', 'Search-visible pages. AI-capable applications.', 'The lightweight SSR framework renders HTML and metadata in a Worker. Browser components and streaming services bring the interactive AI experience to that same application.', 'Our Cloudflare-first delivery architecture combines CDN assets, Worker execution and suitable content cached at the edge. Cache policy follows the data and its access requirements. Services and flows connect the distributed interface to the systems doing the work.'),
    ]),
    section('architecture-principle', [
      ['s-l', '@rg=eyebrow', '=The engineering choice'],
      ['h2', '=Own the connections.\nBuild on the foundation.'],
      ['p', '@rg=lead-small', '=Every separately assembled layer adds decisions about state, identity, data and execution. Cherga makes those connections part of the platform design. Our ambition is an enduring foundation for your AI journey—from the first application to enterprise automation and whole-system modernisation.'],
    ]), ['home-engagement'],
  ] },
  { tag: 'page-about', children: [
    opening('The company', 'Practical questions.\nIndependent thinking.', 'Pragmatical AI is a UK-based applied-AI company. We build the foundations and tools we want to use ourselves: software that connects the interface, the system and the work.'),
    section('company-story', [
      essay('Our conviction', 'AI belongs in the design.', 'We believe the next generation of software should be designed around what AI makes possible, with a coherent experience for the people using it.', 'That means building the framework as well as the tools around it. It means understanding existing systems, and giving agent work a clear place within them.'),
      essay('Our direction', 'A platform. A shared foundation.', 'We are bringing our UI framework, Studio, Code Doctor and agent-stack together under Cherga. The goal is one crafted platform for creating applications and evolving existing systems.', 'Cherga.com is planned as the main platform destination, with a dedicated ChergaJS entry point for people who want to use the UI framework directly. Cloudflare is our first intended integrated deployment target.'),
      essay('Our product work', 'Depth in the domain.', 'Contract Vetting is our flagship domain product. It applies our work on connected data flows and agent execution to the realities of document review.', 'It has a distinct identity and product direction. Alongside Cherga, it demonstrates our commitment to building both useful foundations and the tools that put them to work.'),
    ]), ['home-engagement'],
  ] },
];
