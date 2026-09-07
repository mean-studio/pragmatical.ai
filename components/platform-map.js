// Responsive explanatory diagram: semantic text, not labels baked into an image.
export const platformMap = { tag: 'platform-map', children: [
  ['s-cn', '@rg=platform-map', '@l=vertical', [
    ['p', '@rg=map-caption', '=One foundation / Multiple capabilities'],
    ['s-cn', '@rg=map-inputs', '@l=fg', [
      ['span', '=AI Studio'], ['span', '=Code Doctor'],
    ]],
    ['s-cn', '@rg=map-core', [
      ['strong', '=Cherga'], ['p', '=Router · store · enterprise components'],
    ]],
    ['s-cn', '@rg=map-outputs', '@l=fg', [
      ['s-cn', [['strong', '=Worker SSR'], ['p', '=HTML + metadata']]],
      ['s-cn', [['strong', '=HTTP service'], ['p', '=Data + AI streams']]],
      ['s-cn', [['strong', '=Shared runner'], ['p', '=Flows + retries']]],
    ]],
    ['s-cn', '@rg=map-network', [['strong', '=Cloudflare'], ['p', '=Delivery · execution · edge cache']]],
    ['p', '@rg=map-caption', '=Conceptual architecture · integration in progress'],
  ]],
] };
