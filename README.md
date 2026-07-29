# @santi020k/eslint-config-basic

DX-first ESLint 10 flat config for JavaScript and TypeScript, with auto-detection
and opt-in framework packages.

[Documentation](https://eslint.santi020k.com/) ·
[npm](https://www.npmjs.com/package/@santi020k/eslint-config-basic) ·
[Migration to v3](https://eslint.santi020k.com/guide/migration-v2-to-v3/)

## Quick start

Install the lean package and ESLint:

```sh
npm install -D eslint @santi020k/eslint-config-basic
```

Create `eslint.config.mjs`:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default defineConfig()
```

That is the complete zero-config setup. It detects JavaScript, TypeScript,
runtime, and installed optional features relative to the config file, even when
an editor starts ESLint from another working directory.

For a framework, add its config package to the same install:

```sh
npm install -D eslint @santi020k/eslint-config-basic @santi020k/eslint-config-react
```

For optional behavior, add only the corresponding feature packs:

```sh
npm install -D @santi020k/eslint-config-testing @santi020k/eslint-config-tools
npm install -D @santi020k/eslint-config-libraries
```

If install size is not a concern, the batteries-included package keeps the same
one-line config:

```sh
npm install -D eslint @santi020k/eslint-config-full
```

```js
export { default } from '@santi020k/eslint-config-full/recommended'
```

## Why v3 changed dependency ownership

`@santi020k/eslint-config-basic` no longer installs every supported framework
and integration. Its production boundary is limited to the composer, core rules,
TypeScript support, and a small runtime utility. Frameworks and integrations are
optional peers loaded only when detected or selected.

This gives projects:

- fewer transitive dependencies and audit paths by default;
- no Angular, Expo, Storybook, GraphQL, Cypress, or Tailwind packages unless used;
- actionable errors naming an optional config package when it is missing;
- a full-package escape hatch for teams that prefer one dependency.

The lean security boundary is checked during release and has direct-dependency
budgets to prevent accidental growth.

## Custom configuration

Use the named factory when auto-detection needs an override:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  root: import.meta.dirname,
  frameworks: { react: true },
  strict: 'ci',
  typescript: 'strict'
})
```

Optional features require their granular category package:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  features: {
    playwright: true,
    prettier: true,
    tailwind: true
  }
})
```

The factory also accepts local flat-config overrides after the options object:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({}, {
  files: ['scripts/**/*.js'],
  rules: { 'no-console': 'off' }
})
```

Direct calls from `eslint.config.*` automatically anchor dependency detection,
TypeScript, Tailwind, workspace packages, and `.gitignore` to that file. Set
`root` only when the intended project root differs from the config directory.

Type-aware projects can keep generated, template, or other out-of-project files
on syntax-only linting without importing `typescript-eslint`:

```js
export default await defineConfig({
  root: import.meta.dirname,
  typescript: {
    untypedFiles: ['templates/**/*.ts']
  }
})
```

TypeScript config files (`**/*.config.{ts,mts,cts}`) use this syntax fallback
automatically. Set `untypedFiles: false` to require type information everywhere.

## Package choice

| Package | Use it when | Dependency model |
| --- | --- | --- |
| `@santi020k/eslint-config-basic` | Default for applications and libraries | Lean core; frameworks and integrations are optional |
| `@santi020k/eslint-config-full` | Install simplicity matters more than footprint | Every supported framework and integration |
| `@santi020k/eslint-config-lite` | Existing v2 lite users | Deprecated v3 compatibility path; removed in v4 |
| `@santi020k/eslint-config-integrations` | Existing aggregate-package users | Deprecated v3 compatibility path; removed in v4 |
| Individual framework packages | Custom composition | One framework and its plugin set |

## CLI

```sh
npx @santi020k/eslint-config-basic init
npx @santi020k/eslint-config-basic explain no-console --file src/index.ts
npx @santi020k/eslint-config-basic doctor --fix
npx @santi020k/eslint-config-basic compatibility
npx @santi020k/eslint-config-basic migrate --to v3
npx @santi020k/eslint-config-basic baseline --preset pedantic
npx @santi020k/eslint-config-basic profile --max-warnings 0
npx @santi020k/eslint-config-basic snapshot
npx @santi020k/eslint-config-basic diff
```

`init` creates the zero-argument config. `explain` shows detection or traces an
effective rule, `doctor --fix` repairs safe setup issues with backups, and
`compatibility` validates runtime and peer ranges. The remaining commands
automate v3 migration, incremental strict-mode adoption, budgeted performance
profiling, and effective-rule change review.

## Compatibility

- Node.js: `>=22.19.0`
- ESLint: `^10.0.0`
- TypeScript: `>=5.0.0` when enabled
- Package managers: npm, pnpm, Yarn, and Bun

See the [v2 → v3 migration guide](https://eslint.santi020k.com/guide/migration-v2-to-v3/)
for package moves and copy-paste commands. The
[planned v4 removals](https://eslint.santi020k.com/guide/v4-removals/) page
tracks compatibility APIs that are deprecated during v3.

MIT © [santi020k](https://santi020k.com)
