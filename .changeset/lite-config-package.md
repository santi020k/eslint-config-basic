---
"@santi020k/eslint-config-lite": minor
"@santi020k/eslint-config-integrations": minor
---

Add `@santi020k/eslint-config-lite` as an optional composer package for projects that want to install framework and integration config packages manually. The full `@santi020k/eslint-config-basic` package remains the recommended default install.

Expose integration composition helpers from `@santi020k/eslint-config-integrations` so the lite package can lazy-load integration configs only when selected.
