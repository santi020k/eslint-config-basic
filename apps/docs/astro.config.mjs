import { defineConfig } from 'astro/config'

import starlight from '@astrojs/starlight'

const base = process.env.DOCS_BASE ?? '/'
const site = process.env.DOCS_SITE_URL ?? 'https://eslint.santi020k.com'
const siteName = 'ESLint Config'

const siteDescription =
  'Production-ready ESLint flat-config documentation for JavaScript and TypeScript teams using React, Next.js, Astro, Vue, Nuxt, Svelte, Solid, Angular, NestJS, Hono, Expo, Qwik, Remix, React Router, TanStack Start, Lit, and opt-in integrations.'

const siteKeywords =
  'ESLint flat config, JavaScript linting, TypeScript linting, React ESLint, Next.js ESLint, Astro ESLint, Vue ESLint, Nuxt ESLint, Svelte ESLint, Solid ESLint, Angular ESLint, NestJS ESLint, Hono ESLint, Expo ESLint, Qwik ESLint, Remix ESLint, React Router ESLint, TanStack Start ESLint, Lit ESLint, developer experience'

const socialImage = new URL('/cover.webp', site).toString()

const sidebar = [
  {
    items: [
      {
        items: [
          { label: 'Introduction', link: '/' },
          { label: 'Quick Start', slug: 'guide/getting-started' },
          { label: 'Installation', slug: 'guide/installation' },
          { label: 'Configuration', slug: 'guide/configuration' },
          { label: 'Presets', slug: 'guide/presets' },
          { label: 'Runtime', slug: 'guide/runtime' },
          { label: 'Monorepo', slug: 'guide/monorepo' },
          { badge: { text: 'Beta', variant: 'caution' }, label: 'AI & Agents', slug: 'guide/ai-agents' },
          { badge: { text: 'Migration', variant: 'tip' }, label: 'Migrate from v1', slug: 'guide/migration-v1-to-v2' }
        ],
        label: 'Getting Started'
      },
      {
        items: [
          { badge: { text: 'Core', variant: 'success' }, label: 'TypeScript', slug: 'frameworks/typescript' },
          { label: 'React', slug: 'frameworks/react' },
          { label: 'Next.js', slug: 'frameworks/next' },
          { label: 'Astro', slug: 'frameworks/astro' },
          { label: 'Vue', slug: 'frameworks/vue' },
          { label: 'Svelte', slug: 'frameworks/svelte' },
          { label: 'Solid', slug: 'frameworks/solid' },
          { label: 'Angular', slug: 'frameworks/angular' },
          { label: 'NestJS', slug: 'frameworks/nest' },
          { label: 'Nuxt', slug: 'frameworks/nuxt' },
          { label: 'Hono', slug: 'frameworks/hono' },
          { label: 'Expo', slug: 'frameworks/expo' },
          { label: 'Qwik', slug: 'frameworks/qwik' },
          { label: 'Remix', slug: 'frameworks/remix' },
          { label: 'React Router', slug: 'frameworks/react-router' },
          { label: 'TanStack Start', slug: 'frameworks/tanstack-start' },
          { label: 'Lit', slug: 'frameworks/lit' },
          { label: 'Vite', slug: 'frameworks/vite' },
          { label: 'Slidev', slug: 'frameworks/slidev' }
        ],
        label: 'Frameworks'
      },
      {
        items: [
          { label: 'Ecosystem Overview', slug: 'tooling/overview' },
          { label: 'Testing Tools', slug: 'tooling/testing' },
          { label: 'Formatters', slug: 'tooling/formats' },
          { label: 'Libraries', slug: 'tooling/libraries' },
          { label: 'Utilities', slug: 'tooling/tools' },
          { label: 'Extensions', slug: 'tooling/extensions' }
        ],
        label: 'Tooling & Integrations'
      },
      {
        items: [
          { label: 'Architecture Notes', slug: 'guide/architecture' },
          { label: 'Development Guide', slug: 'guide/development' },
          { label: 'Inspector', slug: 'guide/inspector' },
          { label: 'Playgrounds', slug: 'guide/playgrounds' },
          { label: 'CLI Reference', slug: 'guide/cli' },
          { badge: { text: 'Main', variant: 'note' }, label: 'Core Config', slug: 'packages/basic' },
          { label: 'Base Rules', slug: 'packages/core' },
          { label: 'Integrations', slug: 'packages/integrations' },
          { label: 'Playground', slug: 'packages/playground' },
          { label: 'Testing Suite', slug: 'packages/tests' },
          { label: 'API Reference', slug: 'api' },
          { label: 'Generated Types', slug: 'api/reference' },
          { badge: { text: 'New', variant: 'success' }, label: 'Troubleshooting', slug: 'guide/troubleshooting' },
          { label: 'Thank You', slug: 'guide/acknowledgements' }
        ],
        label: 'Architecture & API'
      }
    ],
    label: 'Current Docs (v2)'
  },
  {
    items: [
      { label: 'Overview', slug: 'v1' },
      { label: 'Getting Started', slug: 'v1/guide/getting-started' },
      { label: 'Installation', slug: 'v1/guide/installation' },
      { label: 'Configuration', slug: 'v1/guide/configuration' },
      {
        collapsed: true,
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
        ],
        label: 'Frameworks'
      },
      {
        collapsed: true,
        items: [
          { label: 'Overview', slug: 'v1/tooling/overview' },
          { label: 'Libraries', slug: 'v1/tooling/libraries' },
          { label: 'Testing', slug: 'v1/tooling/testing' },
          { label: 'Formats', slug: 'v1/tooling/formats' },
          { label: 'Tools', slug: 'v1/tooling/tools' },
          { label: 'Extensions', slug: 'v1/tooling/extensions' }
        ],
        label: 'Tooling'
      },
      {
        collapsed: true,
        items: [
          { label: 'Basic', slug: 'v1/packages/basic' },
          { label: 'Core', slug: 'v1/packages/core' },
          { label: 'Integrations', slug: 'v1/packages/integrations' },
          { label: 'Playground', slug: 'v1/packages/playground' },
          { label: 'Tests', slug: 'v1/packages/tests' },
          { label: 'API Overview', slug: 'v1/api' },
          { label: 'Generated Reference', slug: 'v1/api/reference' }
        ],
        label: 'Packages and API'
      }
    ],
    label: 'Frozen Docs (v1)'
  }
]

export default defineConfig({
  base,
  integrations: [
    starlight({
      credits: false,
      customCss: ['./src/styles/starlight.css'],
      description: siteDescription,
      editLink: {
        baseUrl: 'https://github.com/santi020k/eslint-config-basic/edit/main/apps/docs/'
      },
      favicon: '/favicon.svg',
      head: [
        { attrs: { content: siteName, name: 'application-name' }, tag: 'meta' },
        { attrs: { content: 'Santiago Molina', name: 'author' }, tag: 'meta' },
        { attrs: { content: siteKeywords, name: 'keywords' }, tag: 'meta' },
        { attrs: { content: '#6319BE', name: 'theme-color' }, tag: 'meta' },
        { attrs: { content: socialImage, property: 'og:image' }, tag: 'meta' },
        { attrs: { content: 'Santi020k ESLint cover artwork', property: 'og:image:alt' }, tag: 'meta' },
        { attrs: { content: 'summary_large_image', name: 'twitter:card' }, tag: 'meta' },
        { attrs: { content: socialImage, name: 'twitter:image' }, tag: 'meta' },
        {
          attrs: { is: 'inline' },
          content:
            '(() => { const HIDE_CLASS = \'s2k-version-hidden\'; const applyVersionSidebar = () => { const isV1 = window.location.pathname.startsWith(\'/v1/\'); document.documentElement.dataset.docsVersion = isV1 ? \'v1\' : \'v2\'; for (const section of document.querySelectorAll(\'.sidebar-content details\')) { const summary = section.querySelector(\':scope > summary\'); if (!summary) continue; const label = summary.textContent?.trim(); const isCurrentGroup = label === \'Current Docs (v2)\'; const isFrozenGroup = label === \'Frozen Docs (v1)\'; if (!isCurrentGroup && !isFrozenGroup) continue; const shouldHide = (isCurrentGroup && isV1) || (isFrozenGroup && !isV1); section.classList.toggle(HIDE_CLASS, shouldHide); section.setAttribute(\'aria-hidden\', shouldHide ? \'true\' : \'false\'); } }; if (document.readyState === \'loading\') { document.addEventListener(\'DOMContentLoaded\', applyVersionSidebar, { once: true }); } else { applyVersionSidebar(); } document.addEventListener(\'astro:page-load\', applyVersionSidebar); })();',
          tag: 'script'
        },
        {
          attrs: { is: 'inline' },
          content:
            '(() => { const VERSION_ID = \'s2k-version-switcher\'; const getVersionTarget = version => { const { pathname, search, hash } = window.location; const isV1 = pathname.startsWith(\'/v1/\'); if (version === \'v1\') { const nextPath = isV1 ? pathname : `/v1${pathname === \'/\' ? \'/\' : pathname}`; return `${nextPath}${search}${hash}`; } const nextPath = isV1 ? pathname.replace(/^\\/v1/, \'\') || \'/\' : pathname; return `${nextPath}${search}${hash}`; }; const ensureSwitcher = () => { const header = document.querySelector(\'.header .right-group\'); if (!header) return; let wrapper = document.getElementById(VERSION_ID); if (!wrapper) { wrapper = document.createElement(\'label\'); wrapper.id = VERSION_ID; wrapper.className = \'s2k-version-switcher\'; wrapper.setAttribute(\'aria-label\', \'Select docs version\'); const select = document.createElement(\'select\'); select.innerHTML = \'<option value="v2">v2</option><option value="v1">v1</option>\'; select.addEventListener(\'change\', () => { const target = getVersionTarget(select.value); fetch(target, { method: \'HEAD\' }).then(res => { if (res.ok) { window.location.assign(target); } else { window.location.assign(select.value === \'v1\' ? \'/v1/\' : \'/\'); } }).catch(() => window.location.assign(target)); }); wrapper.appendChild(select); header.prepend(wrapper); } const select = wrapper.querySelector(\'select\'); if (!select) return; select.value = window.location.pathname.startsWith(\'/v1/\') ? \'v1\' : \'v2\'; }; if (document.readyState === \'loading\') { document.addEventListener(\'DOMContentLoaded\', ensureSwitcher, { once: true }); } else { ensureSwitcher(); } document.addEventListener(\'astro:page-load\', ensureSwitcher); })();',
          tag: 'script'
        }
      ],
      lastUpdated: true,
      logo: {
        alt: 'Santi020k ESLint Config',
        dark: './src/assets/logo-santi020k-dark.svg',
        light: './src/assets/logo-santi020k.svg',
        replacesTitle: true
      },
      sidebar,
      social: [
        {
          href: 'https://github.com/santi020k/eslint-config-basic',
          icon: 'github',
          label: 'GitHub'
        }
      ],
      tableOfContents: {
        maxHeadingLevel: 3,
        minHeadingLevel: 2
      },
      title: siteName
    })
  ],
  site
})
