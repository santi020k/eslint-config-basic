import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'

const base = process.env.DOCS_BASE ?? '/'
const site = process.env.DOCS_SITE_URL ?? 'https://eslint.santi020k.com'
const siteName = 'ESLint Config'

const siteDescription =
  'Production-ready ESLint flat-config documentation for JavaScript and TypeScript teams using React, Next.js, Astro, Vue, Svelte, Solid, Angular, NestJS, Hono, Expo, Qwik, Remix, and opt-in integrations.'

const siteKeywords =
  'ESLint flat config, JavaScript linting, TypeScript linting, React ESLint, Next.js ESLint, Astro ESLint, Vue ESLint, Svelte ESLint, Solid ESLint, Angular ESLint, NestJS ESLint, Hono ESLint, Expo ESLint, Qwik ESLint, Remix ESLint, developer experience'

const socialImage = new URL('/cover.webp', site).toString()

const sidebar = [
  {
    label: 'Current Docs (v2)',
    items: [
      {
        label: 'Start Here',
        items: [
          { label: 'Overview', link: '/' },
          { label: 'Getting Started', slug: 'guide/getting-started' },
          { label: 'Installation', slug: 'guide/installation' },
          { label: 'Configuration', slug: 'guide/configuration' },
          { label: 'Migration v1 to v2', slug: 'guide/migration-v1-to-v2' }
        ]
      },
      {
        label: 'Frameworks',
        items: [
          { label: 'TypeScript', slug: 'frameworks/typescript' },
          { label: 'React', slug: 'frameworks/react' },
          { label: 'Next.js', slug: 'frameworks/next' },
          { label: 'Astro', slug: 'frameworks/astro' },
          { label: 'Vue', slug: 'frameworks/vue' },
          { label: 'Svelte', slug: 'frameworks/svelte' },
          { label: 'Solid', slug: 'frameworks/solid' },
          { label: 'Angular', slug: 'frameworks/angular' },
          { label: 'NestJS', slug: 'frameworks/nest' },
          { label: 'Hono', slug: 'frameworks/hono' },
          { label: 'Expo', slug: 'frameworks/expo' },
          { label: 'Qwik', slug: 'frameworks/qwik' },
          { label: 'Remix', slug: 'frameworks/remix' }
        ]
      },
      {
        label: 'Tooling',
        items: [
          { label: 'Overview', slug: 'tooling/overview' },
          { label: 'Libraries', slug: 'tooling/libraries' },
          { label: 'Testing', slug: 'tooling/testing' },
          { label: 'Formats', slug: 'tooling/formats' },
          { label: 'Tools', slug: 'tooling/tools' },
          { label: 'Extensions', slug: 'tooling/extensions' }
        ]
      },
      {
        label: 'Packages and API',
        items: [
          { label: 'Basic', slug: 'packages/basic' },
          { label: 'Core', slug: 'packages/core' },
          { label: 'Integrations', slug: 'packages/integrations' },
          { label: 'Playground', slug: 'packages/playground' },
          { label: 'Tests', slug: 'packages/tests' },
          { label: 'API Overview', slug: 'api' },
          { label: 'Generated Reference', slug: 'api/reference' }
        ]
      }
    ]
  },
  {
    label: 'Frozen Docs (v1)',
    collapsed: true,
    items: [
      {
        label: 'Start Here',
        items: [
          { label: 'Overview', slug: 'v1' },
          { label: 'Getting Started', slug: 'v1/guide/getting-started' },
          { label: 'Installation', slug: 'v1/guide/installation' },
          { label: 'Configuration', slug: 'v1/guide/configuration' }
        ]
      },
      {
        label: 'Frameworks',
        items: [
          { label: 'TypeScript', slug: 'v1/frameworks/typescript' },
          { label: 'React', slug: 'v1/frameworks/react' },
          { label: 'Next.js', slug: 'v1/frameworks/next' },
          { label: 'Astro', slug: 'v1/frameworks/astro' },
          { label: 'Vue', slug: 'v1/frameworks/vue' },
          { label: 'Svelte', slug: 'v1/frameworks/svelte' },
          { label: 'Solid', slug: 'v1/frameworks/solid' },
          { label: 'Angular', slug: 'v1/frameworks/angular' },
          { label: 'NestJS', slug: 'v1/frameworks/nest' },
          { label: 'Hono', slug: 'v1/frameworks/hono' },
          { label: 'Expo', slug: 'v1/frameworks/expo' },
          { label: 'Qwik', slug: 'v1/frameworks/qwik' },
          { label: 'Remix', slug: 'v1/frameworks/remix' }
        ]
      },
      {
        label: 'Tooling',
        items: [
          { label: 'Overview', slug: 'v1/tooling/overview' },
          { label: 'Libraries', slug: 'v1/tooling/libraries' },
          { label: 'Testing', slug: 'v1/tooling/testing' },
          { label: 'Formats', slug: 'v1/tooling/formats' },
          { label: 'Tools', slug: 'v1/tooling/tools' },
          { label: 'Extensions', slug: 'v1/tooling/extensions' }
        ]
      },
      {
        label: 'Packages and API',
        items: [
          { label: 'Basic', slug: 'v1/packages/basic' },
          { label: 'Core', slug: 'v1/packages/core' },
          { label: 'Integrations', slug: 'v1/packages/integrations' },
          { label: 'Playground', slug: 'v1/packages/playground' },
          { label: 'Tests', slug: 'v1/packages/tests' },
          { label: 'API Overview', slug: 'v1/api' },
          { label: 'Generated Reference', slug: 'v1/api/reference' }
        ]
      }
    ]
  }
]

export default defineConfig({
  site,
  base,
  integrations: [
    starlight({
      title: siteName,
      description: siteDescription,
      favicon: '/favicon.svg',
      logo: {
        light: './src/assets/logo-santi020k.svg',
        dark: './src/assets/logo-santi020k-dark.svg',
        alt: 'Santi020k'
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/santi020k/eslint-config-basic'
        }
      ],
      editLink: {
        baseUrl: 'https://github.com/santi020k/eslint-config-basic/edit/main/packages/docs/'
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 3
      },
      lastUpdated: true,
      credits: false,
      customCss: ['./src/styles/starlight.css'],
      sidebar,
      head: [
        { tag: 'meta', attrs: { name: 'application-name', content: siteName } },
        { tag: 'meta', attrs: { name: 'author', content: 'Santiago Molina' } },
        { tag: 'meta', attrs: { name: 'keywords', content: siteKeywords } },
        { tag: 'meta', attrs: { name: 'theme-color', content: '#6319BE' } },
        { tag: 'meta', attrs: { property: 'og:image', content: socialImage } },
        { tag: 'meta', attrs: { property: 'og:image:alt', content: 'Santi020k ESLint cover artwork' } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: socialImage } },
        {
          tag: 'script',
          attrs: { is: 'inline' },
          content:
            "(() => { const HIDE_CLASS = 's2k-version-hidden'; const applyVersionSidebar = () => { const isV1 = window.location.pathname.startsWith('/v1/'); document.documentElement.dataset.docsVersion = isV1 ? 'v1' : 'v2'; for (const section of document.querySelectorAll('.sidebar-content details')) { const summary = section.querySelector(':scope > summary'); if (!summary) continue; const label = summary.textContent?.trim(); const isCurrentGroup = label === 'Current Docs (v2)'; const isFrozenGroup = label === 'Frozen Docs (v1)'; if (!isCurrentGroup && !isFrozenGroup) continue; const shouldHide = (isCurrentGroup && isV1) || (isFrozenGroup && !isV1); section.classList.toggle(HIDE_CLASS, shouldHide); section.setAttribute('aria-hidden', shouldHide ? 'true' : 'false'); } }; if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', applyVersionSidebar, { once: true }); } else { applyVersionSidebar(); } document.addEventListener('astro:page-load', applyVersionSidebar); })();"
        },
        {
          tag: 'script',
          attrs: { is: 'inline' },
          content:
            "(() => { const VERSION_ID = 's2k-version-switcher'; const getVersionTarget = version => { const { pathname, search, hash } = window.location; const isV1 = pathname.startsWith('/v1/'); if (version === 'v1') { const nextPath = isV1 ? pathname : `/v1${pathname === '/' ? '/' : pathname}`; return `${nextPath}${search}${hash}`; } const nextPath = isV1 ? pathname.replace(/^\\/v1/, '') || '/' : pathname; return `${nextPath}${search}${hash}`; }; const ensureSwitcher = () => { const header = document.querySelector('.header .right-group'); if (!header) return; let wrapper = document.getElementById(VERSION_ID); if (!wrapper) { wrapper = document.createElement('label'); wrapper.id = VERSION_ID; wrapper.className = 's2k-version-switcher'; wrapper.setAttribute('aria-label', 'Select docs version'); const select = document.createElement('select'); select.innerHTML = '<option value=\"v2\">v2</option><option value=\"v1\">v1</option>'; select.addEventListener('change', () => { window.location.assign(getVersionTarget(select.value)); }); wrapper.appendChild(select); header.prepend(wrapper); } const select = wrapper.querySelector('select'); if (!select) return; select.value = window.location.pathname.startsWith('/v1/') ? 'v1' : 'v2'; }; if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', ensureSwitcher, { once: true }); } else { ensureSwitcher(); } document.addEventListener('astro:page-load', ensureSwitcher); })();"
        }
      ]
    })
  ]
})
