---
title: "Presets"
description: "Presets are named bundles of default options that give a project a sensible starting point without requiring every option to be listed explicitly."
---

Presets are named bundles of default options that give a project a sensible starting point without requiring every option to be listed explicitly. A preset sets defaults for `typescript`, `runtime`, `tools`, `extensions`, and `strict` — you can override any of those on top of it.

```js title="eslint.config.mjs"
import { defineConfig, Preset } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  preset: Preset.App
})
```

## Available Presets

| Preset | Enum | Best For |
| :--- | :--- | :--- |
| Basic | `Preset.Basic` | Plain JavaScript projects with no TypeScript. |
| Node | `Preset.Node` | TypeScript packages running in Node.js (CLIs, scripts, APIs). |
| Browser | `Preset.Browser` | TypeScript apps running in the browser without a meta-framework. |
| Worker | `Preset.Worker` | Edge runtimes, service workers, and Cloudflare Workers. |
| Library | `Preset.Library` | Published npm packages — adds Prettier and tightens type-safety rules. |
| App | `Preset.App` | Browser applications — TypeScript + Prettier + Vitest by default. |
| CI | `Preset.CI` | Stricter severities for CI environments (warnings become errors). |
| Monorepo | `Preset.Monorepo` | Root config for workspace repositories with mixed project types. |
| All | `Preset.All` | TypeScript + every optional integration. Useful for audits and evaluation. |

With the lean `basic` package, install the category packs selected by a preset.
`App` uses Testing and Tools; `Library`, `CI`, and `Monorepo` use Extensions
and/or Tools; `All` uses all five packs. `Node`, `Browser`, and `Worker` stay
within the core + TypeScript boundary. The `full` package includes every preset
dependency.

For an existing codebase, inspect the adoption delta before switching:

```sh
basic-eslint explain-preset app --file src/index.ts
```

Add `--analyze-source` to lint with the selected preset and run an in-memory
autofix preview:

```sh
basic-eslint explain-preset app --analyze-source --file "src/**/*.{ts,tsx}"
```

Without `--file`, source analysis targets the whole project. The report groups
current findings by rule, category, severity, file type, and fixability; calls
out non-formatting errors to resolve first; and estimates which files and lines
autofix would change. Fixable findings that remain after the preview are listed
as potential fix conflicts. No source files are written.

Add `--semantic-only` to exclude formatting-rule fixes from the preview. Once
that smaller report is reviewed, add `--write` to apply it. The CLI refuses
source writes without semantic-only mode. The same analysis lists candidate
file-reading scripts that use regular expressions, since those scripts may
depend on quote or object-key formatting during a later formatting pass.

Add `--compatibility` to generate a temporary override for newly enabled rules.
The report groups the delta by formatting, correctness, security, framework,
and domain rules so migration work can be planned independently. Compatibility
output preserves the current effective configuration; it does not suppress
pre-existing source violations from rules that were already enabled.

## What Each Preset Enables

### `Preset.Basic`

The minimum viable config — core JavaScript rules only. No TypeScript, no runtime globals beyond ECMAScript standard. Use this as a base when you want full manual control over everything else.

```js
import { defineConfig, Preset } from '@santi020k/eslint-config-basic'

export default await defineConfig({ preset: Preset.Basic })
```

### `Preset.Node`

TypeScript enabled, Node.js globals active (`process`, `__dirname`, Buffer, etc.). Suitable for CLIs, build scripts, and server-side packages that run directly in Node.

```js
import { defineConfig, Preset } from '@santi020k/eslint-config-basic'

export default await defineConfig({ preset: Preset.Node })
```

### `Preset.Browser`

TypeScript enabled, browser globals active (`window`, `document`, `navigator`, etc.). Use for front-end code that does not use a full meta-framework — for example a vanilla TypeScript library or a standalone Vite project.

```js
import { defineConfig, Preset } from '@santi020k/eslint-config-basic'

export default await defineConfig({ preset: Preset.Browser })
```

### `Preset.Worker`

TypeScript enabled, service worker and Fetch API globals active (`self`, `fetch`, `Request`, `Response`, `caches`, etc.). Use for Cloudflare Workers, edge functions, or any runtime that matches the WinterCG API surface.

```js
import { defineConfig, Preset } from '@santi020k/eslint-config-basic'

export default await defineConfig({ preset: Preset.Worker })
```

### `Preset.Library`

TypeScript enabled, Prettier applied, strict type-safety rules tightened. Designed for packages you publish to npm where you want a consistent, well-typed public API and no leftover debug output.

```js
import { defineConfig, Preset } from '@santi020k/eslint-config-basic'

export default await defineConfig({ preset: Preset.Library })
```

### `Preset.App`

TypeScript enabled, browser globals, Prettier applied, Vitest included. The recommended starting point for any single-page application or web app — pair with a `frameworks` option to add React, Next.js, Vue, or another UI layer.

```js
import { defineConfig, Preset } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  frameworks: { next: true },
  preset: Preset.App
})
```

### `Preset.CI`

Same as the project's detected/explicit defaults, but with all warnings promoted to errors. Drop this into a CI-specific config or use it as your single config if you prefer zero-warning builds everywhere.

```js
import { defineConfig, Preset } from '@santi020k/eslint-config-basic'

export default await defineConfig({ preset: Preset.CI })
```

> [!TIP]
> `Preset.CI` is equivalent to setting `strict: true` — but using the preset keeps the intent explicit and readable.

### `Preset.Monorepo`

Universal TypeScript defaults for a workspace root that lints many packages at once. Works best with the `projects` option so individual workspace packages can narrow their own preset and runtime.

```js
import { defineConfig, Preset, Runtime } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  preset: Preset.Monorepo,
  projects: {
    'apps/api': { preset: Preset.Node, runtime: Runtime.Node },
    'apps/web': { frameworks: { next: true }, preset: Preset.App }
  }
})
```

See the [Monorepo guide](/guide/monorepo) for a full walk-through.

### `Preset.All`

Enables TypeScript and every optional integration (all tools, libraries, testing frameworks, formats, and extensions). Intended for exploration and auditing — not recommended as a long-term production config because it includes integrations your project may not actually use.

With the lean `basic` package (or the compatibility `lite` package),
`Preset.All` requires all five category feature packs. Modular projects usually
get better dependency control by enabling only the specific features they need.

```js
import { defineConfig, Preset } from '@santi020k/eslint-config-basic'

export default await defineConfig({ preset: Preset.All })
```

## Presets and Frameworks

Presets do not activate framework configs. Frameworks come from auto-detection (enabled by default) or an explicit `frameworks` option. You can always add a `frameworks` key alongside any preset:

```js
import { defineConfig, Preset } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  frameworks: { svelte: true },
  preset: Preset.Browser
})
```

## Overriding Preset Defaults

Any explicit option you pass overrides the preset default for that field. List options (`libraries`, `testing`, `formats`, `tools`, `extensions`) are merged with preset defaults under `optionMergeStrategy: 'merge'` (the default). Use `optionMergeStrategy: 'replace'` when you want your explicit lists to fully replace what the preset provides.

Optional configs can be enabled with enum values, matching strings, or the `features` map. A `features` value of `false` removes that optional config after detection and preset defaults are merged.

```js
import { defineConfig, Preset } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  features: {
    prettier: false,
    zod: true
  },
  preset: Preset.App
})
```

## Related Pages

- [Configuration](/guide/configuration) — full option reference
- [Runtime](/guide/runtime) — runtime enum values
- [Monorepo](/guide/monorepo) — using presets across workspace packages
