---
name: docs-updater
description: Checklist and guidance for keeping apps/docs in sync after adding a new framework or integration.
---

# Updating Documentation

Documentation lives in `apps/docs/src/content/docs/`. After any release-worthy addition, update the relevant files below. Use `pnpm run docs:dev` to preview changes locally.

## After Adding a New Framework

### 1. Create the framework guide

`apps/docs/src/content/docs/frameworks/{name}.md` — follow the structure of an existing guide (e.g., `hono.md` for minimal, `svelte.md` for frameworks with virtual script files):

```md
---
title: "{Name}"
description: "ESLint config for {Name} projects."
---

Brief intro sentence.

## Usage

\`\`\`js
import { eslintConfig } from '@santi020k/eslint-config-basic'
export default await eslintConfig({ frameworks: { {name}: true } })
\`\`\`

## Peer Dependencies

\`\`\`bash
npm install -D eslint-plugin-{name}
\`\`\`

## Rules
(describe notable rules or link to plugin docs)
```

### 2. Register in the sidebar

`apps/docs/astro.config.mjs` — add to the `frameworks` sidebar group (keep alphabetical order):

```js
{ label: '{Name}', link: '/frameworks/{name}/' }
```

### 3. Update the installation matrix

`apps/docs/src/content/docs/guide/installation.md` — add a row in the framework table.

### 4. Update the configuration guide

`apps/docs/src/content/docs/guide/configuration.md` — add an example showing `frameworks: { {name}: true }`.

### 5. Update counts/copy

- `apps/docs/src/content/docs/index.mdx` — update the framework count if the landing page lists it
- `README.md` — add to the public framework list

### 6. Generate package READMEs

```bash
pnpm run docs:sync-readmes
```

---

## After Adding a New Integration

### 1. Update the category tooling page

| Category | File |
|----------|------|
| Library | `apps/docs/src/content/docs/tooling/libraries.md` |
| Tool | `apps/docs/src/content/docs/tooling/tools.md` |
| Format | `apps/docs/src/content/docs/tooling/formats.md` |
| Extension | `apps/docs/src/content/docs/tooling/extensions.md` |
| Testing | `apps/docs/src/content/docs/tooling/testing.md` |

Add a new row to the integration table in the right file:

```md
| {Name} | `Library.{Name}` | When to use it. | Yes/No |
```

### 2. Update the overview

`apps/docs/src/content/docs/tooling/overview.md` — update the count if the overview lists totals per category.

### 3. Update counts/copy

`apps/docs/src/content/docs/index.mdx` — update the integration count if listed on the landing page.

---

## Build and Validate

```bash
# Preview locally
pnpm run docs:dev

# Build to catch broken links / MDX errors
pnpm run docs:build
```

The docs build runs as part of `pnpm -w run release:check` — don't skip it before releasing.
