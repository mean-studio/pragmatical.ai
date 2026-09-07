import { flatten, CONTENT } from './content.js';

const copy = {
  eyebrow: 'Pragmatical AI',
  title: 'The foundations\nand tools for\nAI-first software.',
  intro: 'We build the frameworks and tools that turn AI into useful software. From the interface to the work behind it, designed to work as a whole.',
  primary: 'Explore our work', secondary: 'How we build',
  note: 'One connected experience. From the interface to the work behind it.',
  studio: {
    caption: 'Illustrative Studio workflow. Sample content, not a live generation.',
    brief: 'Create an onboarding app for a small team. Show new starters their tasks, documents and who can help.',
    briefLabel: 'Start with what you need',
    briefNote: 'A description, a screenshot, a repository or API docs. Give the idea some context.',
    flowTitle: 'Understand the journey',
    flowNote: 'Review how the screens connect before moving into the interface.',
    screensNote: 'Review the screens, refine the structure and connect the data.',
  },
  foundation: {
    eyebrow: '01 / Cherga', title: 'AI-first framework.\nBatteries included.',
    body: 'Cherga brings our interface framework, agent execution and system understanding into one platform. Studio is the workspace we are building around it: a connected way to create new applications and evolve existing systems.',
    note: 'Built on our existing SWC framework, becoming Cherga. Platform integration is underway; Cloudflare is our first intended deployment target.',
    link: 'Meet Cherga',
  },
  contracts: {
    eyebrow: '02 / Contract Vetting',
    title: 'Every draft. Every rule.\nOne connected review.',
    body: 'The clause you removed comes back reworded. The commercial context sits in another document. Contract Vetting brings the drafts, sources and your rules into a review that carries its context from one round to the next.',
    harnessTitle: 'Context that survives the next draft.',
    harness: 'We are building a review harness that connects sources, rules and agent work around the reviewer. Contract Vetting gives that engineering a demanding purpose: a clear, traceable review across negotiation rounds.',
    link: 'Explore Contract Vetting', secondary: 'Our approach',
    caption: 'Designed review flow · Contract Vetting is in build',
  },
  products: {
    eyebrow: 'Purpose-built intelligence', title: 'Different work.\nThe same practical thinking.',
    body: 'Tools for understanding systems, connecting commerce and delivering agent work. Each has a clear purpose and an honest status.',
    link: 'Explore the full portfolio',
  },
  principles: {
    eyebrow: 'Built for the real world', title: 'Powerful tools.\nPeople in control.',
    body: 'Useful AI needs more than a model. It needs a structured interface, the right context and a clear path from intention to execution.',
  },
  engagement: {
    eyebrow: 'Build with us', title: 'Have a problem\nworth solving?',
    body: 'We also work with teams to put AI into practice: from understanding an existing estate to building the interfaces and workflows around it.',
    primary: 'Tell us what you have in mind', secondary: 'Meet the company',
  },
};

export const homeState = {
  ...flatten(copy, 't.homepage'),
  't.a11y.architecture': 'Cherga platform architecture: authoring, application framework, execution and delivery',
  't.a11y.primaryNavigation': 'Primary navigation', menuOpen: 'false', 't.a11y.menu': 'Toggle navigation',
  studioStep: 'brief', contractView: 'draft', appearance: 'light',
  't.a11y.contractViews': 'Explore the contract review example',
  appearanceIcon: 'moon',
  't.a11y.themeAction': 'Switch to dark mode',
  't.a11y.switchToDark': 'Switch to dark mode',
  't.a11y.switchToLight': 'Switch to light mode',
  't.a11y.studioSteps': 'Explore the Studio workflow',
  'home.framework': [
    { title: 'Router: navigation has a data contract', body: 'Declare routes and the services they trigger. Pages receive the state they need through framework bindings, with a shared convention for how navigation starts data loading.' },
    { title: 'Store: one place for application state', body: 'Services write results, errors and loading status to declared store keys. Bound components respond to those changes, so each screen does not need its own synchronisation code.' },
    { title: 'HTTP service: streams included', body: 'Declare endpoints and destinations for their data. Reuse authentication headers, parsing, caching and request status. Stream AI responses into bound state without inventing another transport layer.' },
    { title: 'Authentication + RBAC: part of the design', body: 'Reuse session services and named permission rules. Interfaces can hide, redact or make fields read-only; service endpoints enforce access to the underlying data and actions.' },
    { title: 'Enterprise UI: configure, bind, compose', body: 'Forms, tables and workspaces already have an implementation. Give them data and configuration. AI selects and composes existing components instead of scaffolding every interaction from scratch.' },
    { title: 'SSR + AI: the same application', body: 'A lightweight Worker renders the page and metadata as HTML for search engines. The application adds interactive components and streaming AI services on that same foundation.' },
  ],
  'home.automation': [
    { title: '01 / Receive', body: 'A request arrives through the application or a connected event.' },
    { title: '02 / Prepare', body: 'Services retrieve context. An agent interprets or prepares the work.' },
    { title: '03 / Decide', body: 'Rules route the process. A person reviews an exception.' },
    { title: '04 / Complete', body: 'The record updates and the result returns to the application.' },
  ],
  'home.edge': [
    { title: 'Deliver', body: 'Application assets served through the CDN.' },
    { title: 'Execute', body: 'Worker-based application behaviour and connected services.' },
    { title: 'Cache deliberately', body: 'Reuse suitable responses with explicit freshness and access policies.' },
  ],
  'home.foundation': [
    { icon: 'boxes', title: 'Create something new', body: 'Build directly with the AI-first UI framework, or shape an application through Studio.' },
    { icon: 'scan-search', title: 'Bring what already exists', body: 'Code Doctor contributes topology discovery and validated intent, so migration fits the whole system.' },
    { icon: 'workflow', title: 'Work as one platform', body: 'Interfaces, services and agent flows share a connected experience. The runner is part of the foundation.' },
  ],
  'home.contractFlow': [
    { number: '01', icon: 'file-diff', title: 'Bring in the round', body: 'The returned draft, previous versions and negotiation context.' },
    { number: '02', icon: 'database', title: 'Ground the review', body: 'Relevant sources, dated references and your commercial rules.' },
    { number: '03', icon: 'scan-search', title: 'Trace what changed', body: 'Changes in meaning, supporting evidence and the questions to resolve.' },
    { number: '04', icon: 'user-check', title: 'Keep a person on the gate', body: 'A reviewer decides. The decision stays with the version.' },
  ],
  'home.products': CONTENT.products.items.filter((p) => ['code-doctor', 'shop2gpt', 'agent-stack'].includes(p.id))
    .map((p) => ({ ...p, statusLabel: CONTENT.products.statusLabels[p.status] })),
  'home.principles': [
    { icon: 'boxes', title: 'Designed for AI from the start', body: 'A structured framework gives AI a useful vocabulary and people a consistent interface.' },
    { icon: 'scan-search', title: 'Context before change', body: 'Understand behaviour, relationships and constraints before deciding what to transform.' },
    { icon: 'user-check', title: 'Visible decisions', body: 'Connect agent work with explicit data flows and human review where judgement matters.' },
  ],
};
