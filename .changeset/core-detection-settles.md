---
'@santi020k/eslint-config-core': patch
'@santi020k/eslint-config-typescript': patch
---

Improve workspace source detection and TypeScript parser scoping for untyped,
declaration-only, and Astro virtual files. Keep multiline calls, URLs, template
literals, declaration-attached JSDoc, and intentional fire-and-forget promises
compatible with the surrounding core rules.
