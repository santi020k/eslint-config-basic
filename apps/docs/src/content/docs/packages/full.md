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

Minor and patch versions are released independently across the v3 package
family. The resolved Basic version is authoritative for composer behavior, even
when Full has a different minor version; compatible v3 dependency ranges keep
the aggregate working.

Use it when the simplest install is more valuable than a smaller dependency
tree. Use [`@santi020k/eslint-config-basic`](/packages/basic/) when audit
surface, install time, or dependency ownership matters.
