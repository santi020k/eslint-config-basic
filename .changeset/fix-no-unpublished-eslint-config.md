---
"@santi020k/eslint-config-core": patch
---

Disable `n/no-unpublished-import` for `eslint.config.*` files.

`eslint.config.*` files always import from devDependencies by design (the config package itself), causing `n/no-unpublished-import` to false-positive on every consumer project. The rule is now turned off for `**/eslint.config.{js,mjs,cjs,ts,mts,cts}` in the core config so consumers no longer need a manual override.
