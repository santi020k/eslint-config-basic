---
"@santi020k/eslint-config-basic": patch
---

ci: disable Husky git hooks during the release workflow

- Added `HUSKY=0` environment variable to the release workflow to prevent Git hooks from interfering with the automated release process
