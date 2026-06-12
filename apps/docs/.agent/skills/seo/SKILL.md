---
name: seo
description: SEO optimization for eslint.santi020k.com (Astro Starlight). Use this skill when working on page metadata, Open Graph tags, structured data (JSON-LD), sitemaps, robots.txt, Core Web Vitals, image optimization, or any task related to search engine visibility. Trigger on mentions of SEO, search ranking, meta description, canonical URL, schema markup, page speed, Lighthouse score, or discoverability.
---

# SEO Skill — eslint.santi020k.com (Starlight)

The docs site is built with Astro Starlight. Starlight handles the majority of `<head>` generation — the primary SEO levers here are frontmatter fields, `astro.config.mjs` head injection, the sitemap integration, and structured data via component overrides.

## Quick Reference

| Concern | Where it lives |
|---|---|
| Site-wide title / description | `astro.config.mjs` → `starlight({ title, description })` |
| Per-page title + description | MDX frontmatter `title`, `description` |
| Canonical URL | Starlight sets it automatically from `Astro.url` |
| Open Graph image | `astro.config.mjs` → `starlight({ social })` + per-page `hero.image` |
| Custom `<head>` injection | `astro.config.mjs` → `head: [...]` array |
| Sitemap | `@astrojs/sitemap` in `astro.config.mjs` integrations |
| robots.txt | `astro-robots-txt` in `astro.config.mjs` integrations |
| Structured data | Starlight `Head` component override in `src/components/` |
| Analytics | `@vercel/analytics` + `@vercel/speed-insights` via head injection |

---

## Frontmatter Fields (Per-Page SEO)

Starlight generates `<title>`, `<meta name="description">`, and OG tags from these fields:

```md
---
title: React ESLint Configuration          # Required — also used as <h1>
description: >                             # 140–160 chars for SERP snippet
  Set up ESLint for React projects using
  @santi020k/eslint-config-basic with
  automatic hooks and JSX rules.
sidebar:
  label: React                             # Shorter label shown in nav (optional)
  order: 3                                 # Controls position in sidebar group
head:
  - tag: meta                              # Per-page head injection (optional)
    attrs:
      property: og:image
      content: https://eslint.santi020k.com/cover.webp
---
```

**Title length**: 50–60 chars (Starlight appends ` | {site title}`, so keep page titles ≤ 45 chars).
**Description**: 140–160 chars. Write it as a concrete benefit statement, not a heading repetition.

---

## Site-Wide Head Injection

Global `<head>` additions go in `astro.config.mjs` under `starlight({ head: [...] })`:

```js
// astro.config.mjs
starlight({
  head: [
    // JSON-LD — SoftwareApplication schema for the whole site
    {
      attrs: { type: 'application/ld+json' },
      content: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        applicationCategory: 'DeveloperApplication',
        author: { '@type': 'Person', name: 'santi020k', url: 'https://santi020k.com' },
        description: 'Composable ESLint flat-config for JavaScript and TypeScript teams',
        name: '@santi020k/eslint-config-basic',
        operatingSystem: 'Node.js',
        url: 'https://eslint.santi020k.com'
      }),
      tag: 'script'
    },
    // Global OG image fallback
    {
      attrs: { content: 'https://eslint.santi020k.com/cover.webp', property: 'og:image' },
      tag: 'meta'
    },
    // Twitter card
    {
      attrs: { content: 'summary_large_image', name: 'twitter:card' },
      tag: 'meta'
    },
    {
      attrs: { content: '@santi020k', name: 'twitter:creator' },
      tag: 'meta'
    }
  ]
})
```

---

## Structured Data (JSON-LD) for Docs Pages

For framework/guide pages, inject an Article or TechArticle schema via a Starlight Head override:

```astro
---
// src/components/Head.astro — Starlight Head override
import Default from '@astrojs/starlight/components/Head.astro'

const { entry } = Astro.props
const isGuide = Astro.url.pathname.startsWith('/guide') ||
                Astro.url.pathname.startsWith('/frameworks')

const schema = isGuide ? {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: entry.data.title,
  description: entry.data.description,
  url: new URL(Astro.url.pathname, Astro.site).href,
  author: { '@type': 'Person', name: 'santi020k', url: 'https://santi020k.com' },
  publisher: {
    '@type': 'Organization',
    name: 'Santi020k',
    url: 'https://santi020k.com'
  }
} : null
---

<Default {...Astro.props}><slot /></Default>
{schema && (
  <script type="application/ld+json" set:html={JSON.stringify(schema)} />
)}
```

Register the override in `astro.config.mjs`:
```js
starlight({
  components: {
    Head: './src/components/Head.astro'
  }
})
```

---

## Sitemap

Controlled by `@astrojs/sitemap` in `astro.config.mjs`. To exclude pages (e.g. auto-generated API reference, v1 archive):

```js
sitemap({
  changefreq: 'weekly',
  filter: (page) =>
    !page.includes('/api/reference') &&
    !page.includes('/v1/'),
  lastmod: new Date(),
  priority: 0.7
})
```

---

## Content SEO

- **Heading hierarchy**: Starlight sets the `<h1>` from frontmatter `title`. MDX content starts at `##`. Never use `#` inside MDX files.
- **Internal linking**: Each guide page should link to 2–3 related pages. Use descriptive anchor text (`[React config](/frameworks/react)` not `[click here]`).
- **URL slugs**: Starlight derives slugs from file paths. Keep filenames lowercase, hyphen-separated, and keyword-relevant (e.g. `frameworks/react.md`, not `frameworks/react-eslint-config-guide.md`).
- **Code examples**: Use Expressive Code's `title` attribute on code fences — it improves SERP snippet quality for technical queries:
  ````md
  ```js title="eslint.config.js"
  import { eslintConfig } from '@santi020k/eslint-config-basic'
  
  export default await eslintConfig()
  ```
  ````

---

## Core Web Vitals

The site uses `@vercel/speed-insights` for real-user monitoring. When making changes:

- **LCP**: Hero images in `public/` should be `cover.webp` (WebP for fast delivery). Ensure `fetchpriority="high"` on the splash page hero visual.
- **CLS**: Set explicit `width`/`height` on any `<Image>` in MDX content to reserve layout space.
- **INP**: Starlight's JS is minimal. Keep any custom `<script>` tags deferred or `is:inline` only for critical path code.

---

## SEO Audit Checklist

Run on any new page or when updating existing content:

- [ ] Frontmatter `title` ≤ 45 chars (Starlight appends site name)
- [ ] Frontmatter `description` is 140–160 chars and benefit-focused
- [ ] Page appears in sitemap (or is intentionally excluded)
- [ ] `og:image` resolves to a valid absolute URL (`cover.webp` or page-specific)
- [ ] No duplicate `##` headings on the same page
- [ ] All images have `alt` text
- [ ] Internal links use descriptive anchor text
- [ ] Lighthouse SEO score ≥ 95 on the page
- [ ] Structured data valid at [schema.org/validator](https://validator.schema.org/)
