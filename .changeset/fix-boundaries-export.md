---
"@santi020k/eslint-config-integrations": patch
"@santi020k/eslint-config-basic": patch
---

fix: export `boundaries` from the main package barrel — it was wired internally but missing from the public API, making `import { boundaries } from '@santi020k/eslint-config-basic'` resolve to undefined
