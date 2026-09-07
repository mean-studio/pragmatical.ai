// Shared by server metadata and the client route subscription.
export function navigationState(route = '/') {
  const path = String(route).split(/[?#]/)[0].replace(/\/+$/, '') || '/';
  return Object.fromEntries(['work', 'approach', 'about', 'contact'].map((page) => [
    `navigation.${page}`, path === `/${page}` ? 'page' : 'false',
  ]));
}
