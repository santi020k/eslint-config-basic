---
'@santi020k/eslint-config-testing': patch
---

Keep Playwright-only rules out of generic unit-test folders when Playwright and
Vitest coexist while retaining explicit end-to-end folders, Playwright-named
files, Playwright configs, and custom test-file overrides.
