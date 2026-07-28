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
have its config package installed, and integration options require
`@santi020k/eslint-config-integrations`.

```sh
pnpm add -D @santi020k/eslint-config-react
pnpm add -D @santi020k/eslint-config-integrations
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

The TypeScript `projectService` rejects files not covered by any `tsconfig.json`. Solutions:

1. Make sure your `tsconfig.json` includes the file (check `include`/`exclude` patterns).
2. Set `tsconfigRootDir` explicitly:

```js
export default await defineConfig({
  tsconfigRootDir: import.meta.dirname,
  typescript: true
})
```

3. In integration tests with virtual file paths, pass `typescript: false` to skip type-aware rules.

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
SYNCKIT_TIMEOUT=60000 eslint .
```

---

## Monorepo Issues

### Detection reads the wrong `package.json`

Set `detectRootDir` explicitly:

```js
export default await defineConfig({
  detectRootDir: process.cwd()
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

Make sure you are on ESLint extension v3.0+ and add to `.vscode/settings.json`:

```json
{
  "eslint.useFlatConfig": true
}
```

---

## General Issues

### `eslintConfig is not a function` or import error

The named v3 factory is `defineConfig`:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig()
```

For zero-config projects, prefer the one-line `/recommended` entry. Integration
factories must be imported from `@santi020k/eslint-config-integrations` or
`@santi020k/eslint-config-full`, not from the lean `basic` root.

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
