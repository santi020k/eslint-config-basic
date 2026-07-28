---
title: "Integrations Compatibility Package"
description: "Compatibility aggregate: @santi020k/eslint-config-integrations"
---

`@santi020k/eslint-config-integrations` is the v3 compatibility aggregate for
the five category feature packs. It preserves the direct factory imports and
category subpaths from earlier versions, but no longer owns plugin
implementations.

New lean installations should install only the categories they use:

| Category | Package |
| :--- | :--- |
| Extensions | `@santi020k/eslint-config-extensions` |
| Formats | `@santi020k/eslint-config-formats` |
| Libraries | `@santi020k/eslint-config-libraries` |
| Testing | `@santi020k/eslint-config-testing` |
| Tools | `@santi020k/eslint-config-tools` |

The `full` package installs every category. Existing direct imports remain
available:

```js
import { tailwind, vitest } from '@santi020k/eslint-config-integrations'
```

Prefer the owning packages for new code:

```js
import { tailwind } from '@santi020k/eslint-config-libraries'
import { vitest } from '@santi020k/eslint-config-testing'
```
