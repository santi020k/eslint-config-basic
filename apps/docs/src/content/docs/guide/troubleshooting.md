---
title: "Troubleshooting"
description: "Common problems and how to resolve them when using @santi020k/eslint-config-basic."
---

Common problems and how to resolve them.

## Diagnosis First

Before diving into specific issues, run the built-in diagnostics:

```sh
npx @santi020k/eslint-config-basic doctor
```

`doctor` checks for missing config files, configs that cannot be loaded, lingering v1 imports, missing lint scripts, workspace packages not covered by `projects`, and parallel ESLint version copies. It also checks whether Astro Doctor is paired with Astro and whether its installed package supports the current Node.js and ESLint versions.

For automation, use structured output:

```sh
npx @santi020k/eslint-config-basic doctor --json
```

```sh
npx @santi020k/eslint-config-basic explain
```

`explain` prints every detected input so you can confirm what the composer will receive before anything is written.

---

## Install Size

### Why is an optional package missing?

Version 3 keeps `@santi020k/eslint-config-basic` lean. A detected framework must
have its config package installed, and optional features require their category
packs.

```sh
pnpm add -D @santi020k/eslint-config-react
pnpm add -D @santi020k/eslint-config-libraries
```

The thrown error names the missing config package. Run `basic-eslint explain`
to see why it was detected. If you prefer every supported package to be
installed together, switch to `@santi020k/eslint-config-full`.

---

## Framework and Detection Issues

### A framework I did not enable is being linted

Auto-detection reads `package.json` and enables installed optional framework
configs for packages it finds. To disable this:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  autoFrameworks: false,
  frameworks: {
    react: true
  }
})
```

Or disable only framework detection while keeping other categories automatic:

```js
export default await defineConfig({
  detection: { frameworks: false },
  frameworks: { react: true }
})
```

### Detected frameworks override my explicit config

By default, detected and explicit values are **merged** (`optionMergeStrategy: 'merge'`). Use `'replace'` to make your explicit object the sole source:

```js
export default await defineConfig({
  frameworks: { react: true },
  optionMergeStrategy: 'replace'
})
```

---

## TypeScript Issues

### TypeScript parser rejects my file

The TypeScript `projectService` rejects files not covered by a `tsconfig.json`.

Make sure the file belongs in the project's `tsconfig.json` and check its
`include`/`exclude` patterns. Detection and TypeScript roots normally follow the
config directory; set `root` only when your project root differs.

For templates or tooling files that intentionally sit outside the TypeScript
project, use syntax-only linting for those files:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  typescript: {
    untypedFiles: ['templates/**/*.ts']
  }
})
```

TypeScript config files (`**/*.config.{ts,mts,cts}`) already receive this fallback.
Set `untypedFiles: false` when every TypeScript file must have type information.
See [project roots and syntax-only files](/guide/configuration/#project-root)
and [Monorepo](/guide/monorepo/) for package-specific roots.

---

## Tailwind CSS Issues

### ESLint times out with `Atomics.wait() failed: timed-out`

Tailwind CSS v4 uses a heavy initialization process in worker threads. Provide an explicit `entryPoint`:

```js
import { defineConfig, Library } from '@santi020k/eslint-config-basic'

export default [
  ...await defineConfig({ libraries: [Library.Tailwind] }),
  {
    name: 'project/tailwind-settings',
    settings: {
      'better-tailwindcss': {
        entryPoint: './src/index.css'
      }
    }
  }
]
```

If timeouts persist, increase the worker timeout:

```sh
SYNCKIT_TIMEOUT=60000 eslint . --max-warnings=0
```

---

## Monorepo Issues

### Detection reads the wrong `package.json`

Direct calls from `eslint.config.*` anchor detection to the config directory,
even when ESLint starts elsewhere. When the intended project root differs, set
`root` to that directory. For a config stored one folder below the project root:

```js
import { resolve } from 'node:path'

import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  root: resolve(import.meta.dirname, '..')
})
```

### Two ESLint versions are installed

`doctor` warns when two different ESLint copies are installed. The current release line supports ESLint 10, so align your app and workspace packages on the same ESLint 10 version. With pnpm, use overrides:

```json
{
  "pnpm": {
    "overrides": {
      "eslint": "$eslint"
    }
  }
}
```

Then run `pnpm install` to deduplicate.

---

## Editor Issues

### VS Code does not pick up flat config rules

Install the [Microsoft ESLint extension](https://github.com/microsoft/vscode-eslint)
and use the workspace's installed ESLint 10. Flat config is mandatory in
ESLint 10; the extension ignores `eslint.useFlatConfig` for this version.

Check the ESLint output channel for the loaded library, Node runtime, and config
errors. In a workspace with package-owned configs, configure working directories
as shown in the [editor and CI recipe](/guide/getting-started/#editor-and-ci).
After installing dependencies or changing settings, restart the ESLint server.

---

## General Issues

### `defineConfig is not a function` or import error

The named v3 factory is `defineConfig`:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default defineConfig()
```

The zero-argument call anchors detection to this config file, independently of
the ESLint process's working directory. Feature factories must be imported from
their category package, the compatibility
`@santi020k/eslint-config-integrations` aggregate, or
`@santi020k/eslint-config-full`—not from the lean `basic` root.

### ESLint cannot find the plugin for an override rule

Pass overrides to `defineConfig()` so the composer can attach already-loaded
plugins to the rule blocks that reference them:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({}, {
  files: ['src/**/*.ts'],
  rules: { '@typescript-eslint/no-unused-vars': 'error' }
})
```

The example assumes TypeScript is detected and enabled. If you append overrides
after composition, wrap the final array with `attachReferencedPlugins()`.
That helper reuses plugins registered in the array; a new plugin still needs an
explicit import and `plugins` registration. See
[local overrides](/guide/configuration/#local-overrides) for both patterns.

### A rule I disabled keeps coming back

Use the inspector to find which config block sets the rule last:

```sh
pnpm run inspector
```

---

## Related Pages

- [CLI](/guide/cli) — `doctor`, `explain`, `inspect` command reference
- [Configuration](/guide/configuration) — full option reference
- [Monorepo](/guide/monorepo) — monorepo-specific setup guidance
- [Migration v1 to v2](/guide/migration-v1-to-v2)
