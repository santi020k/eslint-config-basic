<p align="center">
  <a href="https://eslint.santi020k.com/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/santi020k/eslint-config-basic/main/assets/readme/hero-dark.svg">
      <img src="https://raw.githubusercontent.com/santi020k/eslint-config-basic/main/assets/readme/hero-light.svg" alt="ESLint Config Basic — Less setup. Clearer feedback." width="1200" height="360">
    </picture>
  </a>
</p>

<h1 align="center">Full configuration</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@santi020k/eslint-config-full"><img src="https://img.shields.io/npm/v/@santi020k/eslint-config-full?style=flat-square&amp;color=6319be" alt="Published npm version"></a>
  <a href="https://github.com/santi020k/eslint-config-basic/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-13967e?style=flat-square" alt="License: MIT"></a>
</p>

<p align="center">
  <a href="https://eslint.santi020k.com/">Documentation</a> ·
  <a href="https://www.npmjs.com/package/@santi020k/eslint-config-full">npm</a> ·
  <a href="https://github.com/santi020k/eslint-config-basic/tree/main/packages/full">Source</a>
</p>

**On this page:** [Install](#install) · [Usage](#usage) · [Runtime support](#runtime-support) · [Resources](#resources)

The batteries-included v3 package. It installs every supported framework and
integration config for teams that prefer one dependency over a smaller install.

## Install

```bash
pnpm add -D eslint @santi020k/eslint-config-full
```

## Usage

```js
export { default } from '@santi020k/eslint-config-full/recommended'
```

“Batteries included” describes dependency availability, not rule activation.
The recommended entry uses the same composer and detection as Basic, so it
enables only the frameworks and feature packs detected for the current project.
Use explicit `features` or `frameworks` options when detection should not decide.
A disable directive for an inactive plugin rule is invalid ESLint configuration;
remove stale directives or explicitly enable the feature that owns the rule.

Compose local overrides through Full's package-owned factory so TypeScript can
name the exported config type portably under isolated package managers:

```js
import { defineConfig } from '@santi020k/eslint-config-full'

export default defineConfig({}, {
  files: ['scripts/**/*.js'],
  rules: { 'no-console': 'off' }
})
```

Package minor and patch versions are independent within the v3 family. The
resolved `@santi020k/eslint-config-basic` version determines composer behavior,
even when the Full package has a different minor version.

## Runtime support

| Dependency | Supported range | Release verification |
| --- | --- | --- |
| ESLint | `^10.0.0` | Exact `10.0.0` and the latest matching release |
| TypeScript | `>=5.0.0 <7.0.0` (optional) | Earliest published 5.x release (`5.0.2`) and pinned TypeScript 6 (`6.0.3`) |
| Node.js | `>=22.19.0` | Enforced by package engines and compatibility checks |

The packed-consumer release gate installs both ESLint/TypeScript matrix edges,
emits declarations for recommended and composed configs, loads the one-line
recommended config, lints a detected React file, verifies Full's resolved Basic
composer, and applies the repository's narrowly owned upstream peer-warning
policy. An accepted warning is not treated as active feature support: Full
installs every companion package, while detection decides which configurations
execute.

Use `@santi020k/eslint-config-basic` for the lean, modular default.

## Resources

[Package family](https://github.com/santi020k/eslint-config-basic) ·
[Migration guide](https://eslint.santi020k.com/guide/migration-v2-to-v3/) ·
[Changelog](https://github.com/santi020k/eslint-config-basic/blob/main/packages/full/CHANGELOG.md) ·
[License](https://github.com/santi020k/eslint-config-basic/blob/main/LICENSE)
