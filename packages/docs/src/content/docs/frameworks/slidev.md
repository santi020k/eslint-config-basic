---
title: "Slidev"
description: "Use Slidev support from the main v2 package for Vue-powered presentation decks."
---

Use Slidev support from the main v2 package.

## Install

```sh title="pnpm"
pnpm add -D @santi020k/eslint-config-basic
```

## Configure

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default defineConfig({
  frameworks: {
    slidev: true
  },
  typescript: true
})
```

Most projects can also rely on auto-detection and use `eslintConfig()` with no framework object.

## What It Adds

- Browser runtime globals for Slidev deck code.
- Vue support when `slidev` is enabled through the main composer.
- Relaxed Markdown expression rules for `slides.md` and `pages/**/*.md`.
