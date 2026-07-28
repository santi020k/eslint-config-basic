---
title: "Switch from Basic to Lite"
description: "Move from @santi020k/eslint-config-basic to @santi020k/eslint-config-lite when a project needs manual dependency control."
---

Use `@santi020k/eslint-config-basic` by default. Switch to `@santi020k/eslint-config-lite` only when dependency size, audit scope, or CI cache pressure is worth managing framework and integration config packages manually.

## 1. Preview The Install

Run the doctor helper to print the install command for the current project:

```sh
basic-eslint doctor --lite-install
```

For JSON output:

```sh
basic-eslint doctor --lite-install --json
```

The command includes `@santi020k/eslint-config-lite`, `eslint`, detected framework config packages, `@santi020k/eslint-config-integrations` when optional integrations are detected, and `typescript` when TypeScript is detected but not declared.

## 2. Replace The Import

```diff
- import { defineConfig } from '@santi020k/eslint-config-basic'
+ import { defineConfig } from '@santi020k/eslint-config-lite'
```

Keep the same composer options:

```js
import { defineConfig } from '@santi020k/eslint-config-lite'

export default await defineConfig({
  frameworks: {
    react: true
  },
  typescript: true
})
```

## 3. Install Manual Packages

Use the generated command, or install packages directly:

```sh title="pnpm"
pnpm add -D @santi020k/eslint-config-lite @santi020k/eslint-config-react eslint
```

If you enable `libraries`, `testing`, `formats`, `tools`, or extension integrations, install the integrations package too:

```sh title="pnpm"
pnpm add -D @santi020k/eslint-config-integrations
```

## 4. Verify

```sh
basic-eslint doctor
```

Doctor warns when a lite config detects frameworks or integrations without their matching manual config packages.

## Preset.All

`Preset.All` enables every optional integration. It works with lite, but it requires `@santi020k/eslint-config-integrations` and removes much of lite's dependency benefit. Prefer enabling only the integrations your project actually uses.

## Roll Back

Switching back is just the reverse import:

```diff
- import { defineConfig } from '@santi020k/eslint-config-lite'
+ import { defineConfig } from '@santi020k/eslint-config-basic'
```

Then remove manual framework config packages that are no longer needed by your project.
