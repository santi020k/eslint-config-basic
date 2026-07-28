import { unified } from '@astrojs/markdown-remark'
import starlight from '@astrojs/starlight'
import { santi020kShikiThemes } from '@santi020k/theme/shiki'
import { defineConfig } from 'astro/config'

const rehypeTableFocusable = () => tree => {
  const visit = node => {
    if (node.type === 'element' && node.tagName === 'table') {
      node.properties = node.properties ?? {}

      node.properties.tabIndex = 0
    }

    if (node.children) {
      for (const child of node.children) visit(child)
    }
  }

  visit(tree)
}

const base = process.env.DOCS_BASE ?? '/'
const site = process.env.DOCS_SITE_URL ?? 'https://eslint.santi020k.com'
const siteName = 'ESLint Config'

const siteDescription =
  'Production-ready ESLint flat-config documentation for JavaScript and TypeScript teams using React, Next.js, Astro, Vue, Nuxt, Svelte, Solid, Angular, NestJS, Hono, Expo, Preact, Qwik, Remix, React Router, TanStack Start, Lit, and opt-in integrations.'

const siteKeywords =
  'ESLint flat config, JavaScript linting, TypeScript linting, React ESLint, Next.js ESLint, Astro ESLint, Vue ESLint, Nuxt ESLint, Svelte ESLint, Solid ESLint, Angular ESLint, NestJS ESLint, Hono ESLint, Expo ESLint, Preact ESLint, Qwik ESLint, Remix ESLint, React Router ESLint, TanStack Start ESLint, Lit ESLint, developer experience'

const sidebarLinks = items => items.map(item => {
  if ('slug' in item) {
    const { slug, ...linkItem } = item

    return { ...linkItem, link: `/${slug}/` }
  }

  if ('items' in item) {
    return { ...item, items: sidebarLinks(item.items) }
  }

  return item
})

const sidebar = sidebarLinks([
  {
    items: [
      {
        items: [
          { label: 'Introduction', link: '/' },
          { label: 'Quick Start', link: '/guide/getting-started/' },
          { label: 'Installation', slug: 'guide/installation' },
          { label: 'Configuration', slug: 'guide/configuration' },
          { badge: { text: 'New', variant: 'success' }, label: 'Config Builder', slug: 'guide/config-builder' },
          { badge: { text: 'v3', variant: 'tip' }, label: 'Migrate from v2', slug: 'guide/migration-v2-to-v3' },
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
          { label: 'Preact', slug: 'frameworks/preact' },
          { label: 'Hono', slug: 'frameworks/hono' },
          { label: 'Expo', slug: 'frameworks/expo' },
          { label: 'Qwik', slug: 'frameworks/qwik' },
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
          { badge: { text: 'New', variant: 'success' }, label: 'Doctor Report Viewer', slug: 'guide/doctor-report' },
          { badge: { text: 'New', variant: 'success' }, label: 'Release Center', slug: 'guide/releases' },
          { badge: { text: 'Main', variant: 'note' }, label: 'Core Config', slug: 'packages/basic' },
          { badge: { text: 'Full', variant: 'tip' }, label: 'Full Config', slug: 'packages/full' },
          { badge: { text: 'Lite', variant: 'tip' }, label: 'Lite Config', slug: 'packages/lite' },
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
    label: 'Current Docs (v3)'
  },
  {
    items: [
      { label: 'Overview', slug: 'v2' },
      { label: 'Getting Started', slug: 'v2/guide/getting-started' },
      { label: 'Installation', slug: 'v2/guide/installation' },
      { label: 'Configuration', slug: 'v2/guide/configuration' },
      { label: 'Config Builder', slug: 'v2/guide/config-builder' },
      { label: 'Migrate from v1', slug: 'v2/guide/migration-v1-to-v2' },
      {
        collapsed: true,
        items: [
          { label: 'TypeScript', slug: 'v2/frameworks/typescript' },
          { label: 'React', slug: 'v2/frameworks/react' },
          { label: 'Next.js', slug: 'v2/frameworks/next' },
          { label: 'Astro', slug: 'v2/frameworks/astro' },
          { label: 'Vue', slug: 'v2/frameworks/vue' },
          { label: 'Svelte', slug: 'v2/frameworks/svelte' },
          { label: 'Solid', slug: 'v2/frameworks/solid' },
          { label: 'Angular', slug: 'v2/frameworks/angular' },
          { label: 'NestJS', slug: 'v2/frameworks/nest' },
          { label: 'Nuxt', slug: 'v2/frameworks/nuxt' },
          { label: 'Preact', slug: 'v2/frameworks/preact' },
          { label: 'Hono', slug: 'v2/frameworks/hono' },
          { label: 'Expo', slug: 'v2/frameworks/expo' },
          { label: 'Qwik', slug: 'v2/frameworks/qwik' },
          { label: 'Remix', slug: 'v2/frameworks/remix' },
          { label: 'React Router', slug: 'v2/frameworks/react-router' },
          { label: 'TanStack Start', slug: 'v2/frameworks/tanstack-start' },
          { label: 'Lit', slug: 'v2/frameworks/lit' },
          { label: 'Vite', slug: 'v2/frameworks/vite' },
          { label: 'Slidev', slug: 'v2/frameworks/slidev' }
        ],
        label: 'Frameworks'
      },
      {
        collapsed: true,
        items: [
          { label: 'Overview', slug: 'v2/tooling/overview' },
          { label: 'Libraries', slug: 'v2/tooling/libraries' },
          { label: 'Testing', slug: 'v2/tooling/testing' },
          { label: 'Formats', slug: 'v2/tooling/formats' },
          { label: 'Tools', slug: 'v2/tooling/tools' },
          { label: 'Extensions', slug: 'v2/tooling/extensions' }
        ],
        label: 'Tooling'
      },
      {
        collapsed: true,
        items: [
          { label: 'Presets', slug: 'v2/guide/presets' },
          { label: 'Runtime', slug: 'v2/guide/runtime' },
          { label: 'Monorepo', slug: 'v2/guide/monorepo' },
          { label: 'CLI', slug: 'v2/guide/cli' },
          { label: 'Troubleshooting', slug: 'v2/guide/troubleshooting' },
          { label: 'Basic', slug: 'v2/packages/basic' },
          { label: 'Lite', slug: 'v2/packages/lite' },
          { label: 'Core', slug: 'v2/packages/core' },
          { label: 'Integrations', slug: 'v2/packages/integrations' },
          { label: 'API Overview', slug: 'v2/api' },
          { label: 'Generated Reference', slug: 'v2/api/reference' }
        ],
        label: 'Packages and API'
      }
    ],
    label: 'Frozen Docs (v2)'
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
])

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
      expressiveCode: {
        themes: [santi020kShikiThemes.dark, santi020kShikiThemes.light]
      },
      favicon: '/favicon.svg',
      components: {
        Footer: './src/components/Footer.astro',
        Head: './src/components/Head.astro',
        PageFrame: './src/components/PageFrame.astro'
      },
      head: [
        { attrs: { content: siteName, name: 'application-name' }, tag: 'meta' },
        { attrs: { content: 'Santiago Molina', name: 'author' }, tag: 'meta' },
        { attrs: { content: siteKeywords, name: 'keywords' }, tag: 'meta' },
        { attrs: { content: 'summary_large_image', name: 'twitter:card' }, tag: 'meta' },
        {
          attrs: { is: 'inline' },
          content: `(() => {
            const HIDE_CLASS = 's2k-version-hidden';
            const labels = {
              v1: 'Frozen Docs (v1)',
              v2: 'Frozen Docs (v2)',
              v3: 'Current Docs (v3)'
            };
            const getVersion = () => {
              if (window.location.pathname === '/v1' || window.location.pathname.startsWith('/v1/')) return 'v1';
              if (window.location.pathname === '/v2' || window.location.pathname.startsWith('/v2/')) return 'v2';
              return 'v3';
            };
            const applyVersionSidebar = () => {
              const version = getVersion();
              document.documentElement.dataset.docsVersion = version;
              for (const section of document.querySelectorAll('.sidebar-content details')) {
                const summary = section.querySelector(':scope > summary');
                const label = summary?.textContent?.trim();
                if (!label || !Object.values(labels).includes(label)) continue;
                const shouldHide = label !== labels[version];
                section.classList.toggle(HIDE_CLASS, shouldHide);
                section.setAttribute('aria-hidden', shouldHide ? 'true' : 'false');
              }
            };
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', applyVersionSidebar, { once: true });
            } else {
              applyVersionSidebar();
            }
            document.addEventListener('astro:page-load', applyVersionSidebar);
          })();`,
          tag: 'script'
        },
        {
          attrs: { is: 'inline' },
          content: `(() => {
            const VERSION_ID = 's2k-version-switcher';
            const getVersion = () => {
              if (window.location.pathname === '/v1' || window.location.pathname.startsWith('/v1/')) return 'v1';
              if (window.location.pathname === '/v2' || window.location.pathname.startsWith('/v2/')) return 'v2';
              return 'v3';
            };
            const getVersionTarget = version => {
              const { pathname, search, hash } = window.location;
              const relativePath = pathname.replace(/^\\/v[12](?=\\/|$)/, '') || '/';
              const prefix = version === 'v3' ? '' : '/' + version;
              return prefix + relativePath + search + hash;
            };
            const getVersionHome = version => version === 'v3' ? '/' : '/' + version + '/';
            const ensureSwitcher = () => {
              const header = document.querySelector('.header .right-group');
              if (!header) return;
              let wrapper = document.getElementById(VERSION_ID);
              if (!wrapper) {
                wrapper = document.createElement('label');
                wrapper.id = VERSION_ID;
                wrapper.className = 's2k-version-switcher';
                wrapper.setAttribute('aria-label', 'Select docs version');
                const select = document.createElement('select');
                select.innerHTML =
                  '<option value="v3">v3 (current)</option>' +
                  '<option value="v2">v2 (archive)</option>' +
                  '<option value="v1">v1 (archive)</option>';
                select.addEventListener('change', () => {
                  const target = getVersionTarget(select.value);
                  fetch(target, { method: 'HEAD' })
                    .then(response => window.location.assign(response.ok ? target : getVersionHome(select.value)))
                    .catch(() => window.location.assign(getVersionHome(select.value)));
                });
                wrapper.appendChild(select);
                header.prepend(wrapper);
              }
              const select = wrapper.querySelector('select');
              if (select) select.value = getVersion();
            };
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', ensureSwitcher, { once: true });
            } else {
              ensureSwitcher();
            }
            document.addEventListener('astro:page-load', ensureSwitcher);
          })();`,
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
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeTableFocusable]
    })
  },
  site
})
