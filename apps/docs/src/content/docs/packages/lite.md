---
title: "Lite Package"
description: "The v2 modular package, retained as a v3 compatibility path."
---

`@santi020k/eslint-config-lite` remains available for existing projects, but it
is no longer the recommended entry. The v3 `basic` package now has the same
modular dependency model and also provides the CLI and one-line recommended
entry.

```diff
- import { defineConfig } from '@santi020k/eslint-config-lite'
+ import { defineConfig } from '@santi020k/eslint-config-basic'
```

New projects should follow [Installation](/guide/installation/). Existing lite
projects can follow [Move from Lite to Basic](/guide/lite-migration/).
