---
"@santi020k/eslint-config-basic": patch
---

fix: gate `security/detect-non-literal-fs-filename` scripts override on Security extension being enabled — previously the rule was always emitted, which caused ESLint to throw "Could not find plugin 'security'" for consumers who did not opt in to the Security extension
