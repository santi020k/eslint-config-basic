---
'@santi020k/eslint-config-basic': patch
'@santi020k/eslint-config-typescript': patch
---

Make packed zero-config installs behave consistently across npm, pnpm, Yarn,
and Bun by ensuring the eagerly loaded TypeScript parser has its runtime.
