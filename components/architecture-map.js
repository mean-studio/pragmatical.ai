// A readable architecture schema, composed with native framework layouts.
const node = (title, body) => ['s-cn', '@rg=architecture-node', [
  ['strong', `=${title}`], ['p', `=${body}`],
]];
const layer = (number, title, description, nodes) => ['s-cn', '@rg=architecture-layer', '@l=vertical', [
  ['s-cn', '@rg=architecture-label', '@l=row', [['span', `=${number}`], ['strong', `=${title}`], ['p', `=${description}`]]],
  ['s-cn', '@rg=architecture-nodes', '@l=fg', nodes],
]];
export const architectureMap = { tag: 'architecture-map', children: [
  ['figure', '@rg=architecture-schema', '@aria-label=$t.a11y.architecture', [
    layer('01', 'Create + understand', 'Different starting points. The same application foundation.', [
      node('AI Studio', 'Shape screens, connect services and compose flows in one workspace.'),
      node('Code Doctor', 'Discover system topology and intent. Plan migration into services and flows.'),
      node('ChergaJS', 'Use the AI-first UI framework directly in your codebase.'),
    ]),
    ['s-cn', '@rg=architecture-connector', '@l=row', [['s-ic', '@n=arrow-down'], ['p', '=Application definitions · data bindings · business rules']]],
    layer('02', 'Cherga application framework', 'The reusable machinery every application needs.', [
      node('Enterprise components', 'Data-ready forms, tables and workspaces, composed declaratively.'),
      node('Router + store', 'Routes select the view. Shared state drives its bound components.'),
      node('Streaming HTTP service', 'Declared endpoints manage results, loading, errors and streamed updates.'),
    ]),
    ['s-cn', '@rg=architecture-policy', '@l=row', [
      ['strong', '=Authentication + RBAC'],
      ['p', '=Session and authentication services · named UI permission rules · authorisation enforced at service endpoints'],
    ]],
    ['s-cn', '@rg=architecture-connector', '@l=row', [['s-ic', '@n=arrow-down-up'], ['p', '=Service requests · application events · results']]],
    layer('03', 'Execute the work', 'A shared runtime for the interface and the process behind it.', [
      node('Lightweight Worker SSR', 'Render HTML and metadata for search. Connect interactive AI capabilities.'),
      node('Services + integrations', 'Connect business data, existing systems and model providers.'),
      node('Shared agent runner', 'Execute flows and agent tasks, with retry handling and human review gates.'),
    ]),
    ['s-cn', '@rg=architecture-connector', '@l=row', [['s-ic', '@n=arrow-down'], ['p', '=Distributed delivery · Worker execution']]],
    ['s-cn', '@rg=architecture-delivery', '@l=row', [
      ['strong', '=Cloudflare-first'],
      ['p', '=CDN-delivered assets · edge-rendered pages · policy-controlled caching · connected services and flows'],
    ]],
    ['figcaption', '=Platform architecture and integration direction. The framework is available today; Studio, modernisation and deployment are being brought together around it.'],
  ]],
] };
