---
title: "Full Package"
description: "Package: @santi020k/eslint-config-full"
---

`@santi020k/eslint-config-full` is the explicit batteries-included v3 bundle.
It depends on the lean composer, every supported framework config, and all five
feature packs.

```sh
npm install -D eslint @santi020k/eslint-config-full
```

```js
export { default } from '@santi020k/eslint-config-full/recommended'
```

“Batteries included” means every supported framework and feature-pack dependency
is available to load. It does not enable every rule pack. The recommended entry
uses the same auto-detection as Basic and activates only behavior detected for
the current project.

For example, installing Full does not enable the security extension by itself.
A directive for `security/*` is invalid until that feature is active. Remove a
stale directive or enable the owning feature deliberately:

```js
import { defineConfig } from '@santi020k/eslint-config-full'

export default await defineConfig({
  features: { security: true }
})
```

Pass local flat-config overrides to this factory as additional arguments. This
keeps declaration inference on Full's package-owned public type boundary under
pnpm and TypeScript 6:

```js
export default defineConfig({}, {
  files: ['scripts/**/*.js'],
  rules: { 'no-console': 'off' }
})
```

Minor and patch versions are released independently across the v3 package
family. The resolved Basic version is authoritative for composer behavior, even
when Full has a different minor version; compatible v3 dependency ranges keep
the aggregate working.

## Support matrix

| Dependency | Supported range | Packed-consumer release check |
| :--- | :--- | :--- |
| ESLint | `^10.0.0` | Exact `10.0.0` and the latest matching release |
| TypeScript | `>=5.0.0 <7.0.0` (optional) | Earliest published 5.x release (`5.0.2`) and pinned TypeScript 6 (`6.0.3`) |
| Node.js | `>=22.19.0` | Package engines plus `compatibility` range validation |

Both ESLint/TypeScript matrix edges must install Full, emit portable declarations
for recommended and composed configs, load the one-line recommended config, lint
detected React source, resolve the actual Basic composer in `compatibility`, and
pass peer health without unowned warnings.
Peer warnings from dependencies that Full installs but detection does not
activate are attributed to their owning companion package and tracked with an
explicit removal condition; they are not presented as active framework support.

Use it when the simplest install is more valuable than a smaller dependency
tree. Use [`@santi020k/eslint-config-basic`](/packages/basic/) when audit
surface, install time, or dependency ownership matters.
