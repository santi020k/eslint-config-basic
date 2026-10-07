---
"@santi020k/eslint-config-basic": minor
"@santi020k/eslint-config-core": minor
"@santi020k/eslint-config-docs": patch
---

Add optional typed formatting preferences with workspace inheritance. Restrict Testing Library import heuristics in Playwright-owned scopes while retaining actual Testing Library checks and unit-test behavior.

Doctor now inventories local workspace lint declarations, reports sampled effective-config evidence for potentially redundant Astro workaround fields, and generates missing lint scripts with zero-warning enforcement. Existing scripts, defaults, and overrides remain unchanged.

Consumer regression fixtures cover mixed Astro/React workspaces, independently linted Expo apps with typed Astro scopes, Playwright/Testing Library coexistence, and React/Hono runtime scopes. No mandatory migration is required. For custom browser-test locations, configure `testingFiles.playwright`; review Doctor candidates across all affected globs before removing fields.
