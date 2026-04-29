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

const normalizeDocsPath = (pathname: string): string => {
  const clean = pathname.split('#')[0]?.split('?')[0] ?? '/'

  if (clean === '/' || clean === '') {
    return '/'
  }

  return clean.endsWith('/') ? clean.slice(0, -1) : clean
}

/**
 * Maps the current URL to the same logical page in another edition (strip or add `/v1`).
 * Uses fallbacks when no mirrored page exists (e.g. v2-only migration guide).
 */
export const pathForEdition = (pathname: string, edition: 'v1' | 'v2'): string => {
  const norm = normalizeDocsPath(pathname)
  const onV1 = getDocsPrefix(pathname) === '/v1'

  if (edition === 'v2') {
    if (!onV1) {
      return norm === '/' ? '/' : norm
    }

    if (norm === '/v1') {
      return '/'
    }

    const rest = norm.startsWith('/v1/') ? norm.slice('/v1'.length) : norm.replace(/^\/v1$/, '')

    return rest.length > 0 ? rest : '/'
  }

  // edition === 'v1'
  if (onV1) {
    if (norm === '/v1') {
      return '/v1/'
    }

    if (norm.startsWith('/v1/')) {
      return norm
    }

    return '/v1/'
  }

  if (norm === '/guide/migration-v1-to-v2') {
    return '/v1/guide/getting-started'
  }

  if (norm === '/') {
    return '/v1/'
  }

  return `/v1${norm}`
}

/**
 * Top navigation for the default theme. Mirrors {@link buildThemeNav} in config for SSR baseline (v2).
 *
 * @param routePath — current location (e.g. `useRoute().path`) so the Versions menu keeps the same logical page when switching editions.
 */
export const buildThemeNav = (prefix: DocsPrefix, routePath = '/'): DefaultTheme.NavItem[] => {
  const p = (path: string) => withDocsPrefix(prefix, path)
  const pathForVersions = routePath.split('#')[0]?.split('?')[0] || '/'

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
        { text: 'v2', link: pathForEdition(pathForVersions, 'v2') },
        { text: 'v1', link: pathForEdition(pathForVersions, 'v1') }
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
