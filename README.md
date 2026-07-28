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
export { default } from '@santi020k/eslint-config-basic/recommended'
```

That is the complete zero-config setup. It detects JavaScript, TypeScript,
runtime, and installed optional features from the project where ESLint runs.

For a framework, add its config package to the same install:

```sh
npm install -D eslint @santi020k/eslint-config-basic @santi020k/eslint-config-react
```

For testing, formatting, Tailwind, or other optional tooling, add integrations:

```sh
npm install -D eslint @santi020k/eslint-config-basic @santi020k/eslint-config-integrations
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

Optional integrations require `@santi020k/eslint-config-integrations`:

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

`root` is the only path most projects need. It anchors dependency detection,
TypeScript, Tailwind, workspace packages, and `.gitignore` even when an editor
starts ESLint from another directory.

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
| `@santi020k/eslint-config-lite` | Existing v2 lite users | Compatibility path; migrate to `basic` in v3 |
| Individual framework packages | Custom composition | One framework and its plugin set |

## CLI

```sh
npx @santi020k/eslint-config-basic init
npx @santi020k/eslint-config-basic explain
npx @santi020k/eslint-config-basic doctor
```

`init` creates the one-line recommended config. `explain` shows detection, and
`doctor` reports missing optional packages and peer/version problems.

## Compatibility

- Node.js: `^20.19.0 || >=22.18.0`
- ESLint: `^10.0.0`
- TypeScript: `>=5.0.0` when enabled
- Package managers: npm, pnpm, Yarn, and Bun

See the [v2 → v3 migration guide](https://eslint.santi020k.com/guide/migration-v2-to-v3/)
for package moves and copy-paste commands.

MIT © [santi020k](https://santi020k.com)
