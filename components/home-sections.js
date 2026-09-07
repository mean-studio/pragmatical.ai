import { platformMap } from './platform-map.js';
import { architectureMap } from './architecture-map.js';
const feature = { tag: 'home-feature', children: [['s-cn', '@l=vertical', '@rg=feature', [['h3', '^title'], ['p', '^body']]]] };
const intro = { tag: 'home-intro', children: [['s-sc', '@rg=intro', [
  ['s-cn', '@rg=home-wrap', '@l=vertical', [
    ['s-cn', '@l=fg', '@rg=hero-grid', [
      ['s-cn', '@rg=hero-copy', [
        ['s-l', '@rg=eyebrow', '=AI-first framework. One connected platform.'],
        ['h1', [['span', '=Build the app.'], ['span', '=We built'], ['span', '=the foundation.']]],
        ['p', '@rg=lead', '=An AI-first framework with routing, state, streaming services and enterprise components built in.'],
        ['p', '@rg=hero-detail', '=Lightweight Worker SSR for search-visible applications. Studio, automation and modernisation for the work beyond the interface.'],
        ['s-cn', '@l=row', '@rg=actions', [
          ['s-b', '@c=pr', '~cl:nav:/work', [['span', '=Explore the platform'], ['s-ic', '@n=arrow-up-right']]],
          ['s-ln', '@href=/approach', '=How we build'],
        ]],
      ]],
      ['s-cn', '@rg=hero-visual', [['platform-map']]],
    ]],
    ['s-cn', '@l=fg', '@rg=capability-strip', [
      ['s-cn', [['span', '=01'], ['h3', '=Create'], ['p', '=Studio + direct framework use']]],
      ['s-cn', [['span', '=02'], ['h3', '=Automate'], ['p', '=Services, agents and decisions']]],
      ['s-cn', [['span', '=03'], ['h3', '=Modernise'], ['p', '=Discover topology and intent']]],
      ['s-cn', [['span', '=04'], ['h3', '=Run'], ['p', '=Distributed, Cloudflare-first']]],
    ]],
  ]],
]]] };
const foundation = { tag: 'home-foundation', children: [['s-sc', '@rg=foundation', '@id=cherga', [
  ['s-cn', '@rg=home-wrap', '@l=vertical', [
    ['s-l', '@rg=eyebrow', '=Cherga / The platform we are building'],
    ['s-cn', '@l=fg', '@rg=section-intro', [
      ['h2', '=Enterprise foundations.\nReady for your data.'],
      ['s-cn', [
        ['p', '@rg=lead-small', '=Cherga is built from the architecture up: router, store, streaming HTTP services, authentication and permission-aware enterprise components. Configure the application around your data and business rules.'],
        ['p', '@rg=body-note', '=The interface, data layer and execution model share a deliberate architecture. AI composes application definitions against that foundation; your team supplies the data, rules and behaviour that make the product yours.'],
      ]],
    ]],
    ['architecture-map'],
    ['s-ls', '@l=fg', '@rg=capabilities', ':dataSource=home.framework', ':itemRenderer=home-feature'],
    ['s-cn', '@l=fg', '@rg=research-proof', [
      ['s-cn', [['strong', '=100,000'], ['p', '=repositories analysed']]],
      ['s-cn', [['h3', '=Generate the difference. Reuse the foundation.'], ['p', '=We studied recurring patterns and common mistakes to identify the scaffolding applications repeatedly need. Reusable components and shared behaviour give AI less boilerplate to generate—and teams less boilerplate to maintain.'], ['s-ln', '@href=/approach', '=Why we built a new foundation']]],
    ]],
    ['s-cn', '@l=row', '@rg=platform-foot', [
      ['p', '=Our existing SWC framework is becoming Cherga. Platform integration is underway.'],
      ['s-ln', '@href=/products/swc', '=Use the UI framework'],
    ]],
  ]],
]]] };
const studio = { tag: 'home-studio', children: [['s-sc', '@rg=studio', [
  ['s-cn', '@rg=home-wrap', '@l=vertical', [
    ['s-cn', '@l=fg', '@rg=section-intro', [
      ['s-cn', [['s-l', '@rg=eyebrow', '=AI Studio'], ['h2', '=Start with an idea.\nOr what already exists.']]],
      ['s-cn', [
        ['p', '@rg=lead-small', '=Studio is the workspace we are building around Cherga. Shape the journeys and screens, connect data and services, define the work behind them, and publish through the platform.'],
        ['p', '@rg=body-note', '=Bring a brief, a repository or existing system context. The goal is one continuous environment for creating, migrating and improving an application.'],
        ['s-ln', '@href=/products/ai-studio', '=Explore the Studio direction'],
      ]],
    ]],
    ['s-cn', '@rg=product-capture', [
      ['s-cn', '@l=row', '@rg=capture-heading', [['strong', '=A workspace shaped for its context'], ['span', '=GDS Playground / Studio example']]],
      ['img', '@src=/shots/gds-playground.jpg', '@alt=GDS Playground, a white-labelled AI Studio experience for public-service design', '@loading=lazy', '@width=2160', '@height=1350'],
      ['s-cn', '@l=row', '@rg=capture-caption', [['p', '=A white-labelled Studio experience for public-service design.'], ['s-ln', '@href=/products/gds-playground', '=Explore the example']]],
    ]],
  ]],
]]] };
const automation = { tag: 'home-automation', children: [['s-sc', '@rg=automation', [
  ['s-cn', '@rg=home-wrap', '@l=vertical', [
    ['s-cn', '@l=fg', '@rg=section-intro', [
      ['s-cn', [['s-l', '@rg=eyebrow', '=Automation + agents'], ['h2', '=The screen starts it.\nThe system carries it through.']]],
      ['p', '@rg=lead-small', '=Connect application events, service calls, agent tasks and human decisions. Our runner provides the shared execution foundation, so automation is part of the application experience.'],
    ]],
    ['s-cn', '@rg=process-visual', [
      ['s-l', '@rg=eyebrow', '=Illustrated workflow / A service request'],
      ['s-ls', '@l=fg', '@rg=process-steps', ':dataSource=home.automation', ':itemRenderer=home-feature'],
      ['p', '@rg=process-caption', '=Deterministic rules where they fit. AI where interpretation helps. People where judgement matters.'],
    ]],
    ['s-ln', '@href=/approach', '=How we connect execution'],
  ]],
]]] };
const modernisation = { tag: 'home-modernisation', children: [['s-sc', '@rg=modernisation', [
  ['s-cn', '@rg=home-wrap', '@l=fg', [
    ['s-cn', [
      ['s-l', '@rg=eyebrow', '=System understanding + modernisation'], ['h2', '=Understand the estate.\nThen change it.'],
      ['p', '@rg=lead-small', '=Code Doctor brings topology discovery and validated intent into Cherga. Understand how repositories, services, infrastructure and business processes depend on one another before deciding what to migrate.'],
      ['p', '@rg=body-note', '=Preserve what works. Restructure what needs to change. Turn useful capabilities into connected services and flows, with decisions recorded in a reusable rulebook.'],
      ['s-ln', '@href=/products/code-doctor', '=Inside Code Doctor'],
    ]],
    ['s-cn', '@rg=topology-visual', [
      ['s-l', '@rg=eyebrow', '=From discovery to an integrated target'],
      ['s-cn', '@l=row', '@rg=topology-sources', [['span', '=Repositories'], ['span', '=Infrastructure'], ['span', '=Running services']]],
      ['s-cn', '@rg=topology-core', [['strong', '=Topology + intent'], ['p', '=Relationships, constraints and validated knowledge']]],
      ['s-cn', '@l=row', '@rg=topology-targets', [['span', '=Interfaces'], ['span', '=Services'], ['span', '=Flows']]],
      ['p', '=Conceptual migration path · One connected system model'],
    ]],
  ]],
]]] };
const edge = { tag: 'home-edge', children: [['s-sc', '@rg=edge', [
  ['s-cn', '@rg=home-wrap', '@l=vertical', [
    ['s-l', '@rg=eyebrow', '=Cloudflare-first'],
    ['s-cn', '@l=fg', '@rg=section-intro', [
      ['h2', '=Build for the network.\nPublish as a whole.'],
      ['p', '@rg=lead-small', '=We are designing the deployment path around distributed applications: interfaces delivered through the CDN, suitable content cached at the edge, and services and workflows connected behind them.'],
    ]],
    ['s-ls', '@l=fg', '@rg=edge-layers', ':dataSource=home.edge', ':itemRenderer=home-feature'],
    ['p', '@rg=platform-note', '=Cloudflare is our first intended integrated target. Cache policies depend on content and access requirements; private application state remains a separate responsibility.'],
  ]],
]]] };
const contracts = { tag: 'home-contracts', children: [['s-sc', '@rg=contracts', '@id=contract-vetting', [
  ['s-cn', '@rg=home-wrap', '@l=fg', [
    ['s-cn', [['s-l', '@rg=eyebrow', '=Applied in the domain / Contract Vetting'], ['h2', '=Context across\nevery review.'], ['p', '@rg=lead-small', '=Our domain product connects document rounds, evidence, agent work and reviewer decisions. A concrete application of the data-flow harnesses we build.'], ['s-ln', '@href=/products/contract-vetting', '=Explore Contract Vetting']]],
    ['s-cn', '@rg=contract-note', [
      ['s-l', '@rg=eyebrow', '=Illustrative example / Product in build'], ['h3', '=A clause returns.\nIts history should too.'],
      ['p', '=Returned draft · previous position · supporting context · reviewer decision'],
      ['p', '@rg=body-note', '=Contract Vetting has its own product identity and direction.'],
    ]],
  ]],
]]] };
const engagement = { tag: 'home-engagement', children: [['s-sc', '@rg=engagement', [
  ['s-cn', '@rg=home-wrap', '@l=row', [
    ['s-cn', [['s-l', '@rg=eyebrow', '=Pragmatical AI'], ['h2', '=What are you building?']]],
    ['s-b', '@c=pr', '~cl:nav:/contact', [['span', '=Start a conversation'], ['s-ic', '@n=arrow-up-right']]],
  ]],
]]] };
export const homeSectionDefs = [architectureMap, platformMap, feature, intro, foundation, studio, automation, modernisation, edge, contracts, engagement];
