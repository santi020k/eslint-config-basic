import type { DefaultTheme } from 'vitepress'

/** Edition prefix for duplicated docs under `/v1/`. Root (unversioned) is current v2. */
export type DocsPrefix = '' | '/v1'

/**
 * Returns `/v1` when the route is the v1 docs tree; otherwise root v2 (`''`).
 */
export const getDocsPrefix = (pathname: string): DocsPrefix => pathname === '/v1' || pathname.startsWith('/v1/') ? '/v1' : ''

/**
 * Prefixes an internal docs path for the active edition. Leaves `http(s):` links unchanged.
 */
export const withDocsPrefix = (prefix: DocsPrefix, path: string): string => {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  return prefix ? `${prefix}${path}` : path
}

/**
 * Home link for the navbar logo: v2 → `/`, v1 → `/v1/`.
 */
export const logoLinkForPrefix = (prefix: DocsPrefix): string => (prefix === '/v1' ? '/v1/' : '/')

/**
 * Top navigation for the default theme. Mirrors {@link buildThemeNav} in config for SSR baseline (v2).
 */
export const buildThemeNav = (prefix: DocsPrefix): DefaultTheme.NavItem[] => {
  const p = (path: string) => withDocsPrefix(prefix, path)

  return [
    { text: 'Guide', link: p('/guide/getting-started') },
    { text: 'Frameworks', link: p('/frameworks/typescript') },
    { text: 'Tooling', link: p('/tooling/overview') },
    { text: 'Packages', link: p('/packages/basic') },
    { text: 'API', link: p('/api/') },
    { text: 'Changelog', link: p('/guide/changelog') },
    {
      text: 'Versions',
      items: [
        { text: 'v2', link: '/guide/getting-started' },
        { text: 'v1', link: '/v1/guide/getting-started' }
      ]
    },
    {
      text: 'More',
      items: [
        { text: 'GitHub', link: 'https://github.com/santi020k/eslint-config-basic' },
        { text: 'NPM', link: 'https://www.npmjs.com/package/@santi020k/eslint-config-basic' },
        { text: 'Website', link: 'https://santi020k.com' }
      ]
    }
  ]
}
