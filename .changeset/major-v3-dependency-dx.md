---
"@santi020k/eslint-config-basic": major
"@santi020k/eslint-config-core": major
"@santi020k/eslint-config-full": major
"@santi020k/eslint-config-integrations": major
"@santi020k/eslint-config-lite": major
---

Release v3 with a lean dependency boundary and a one-line recommended entry point. Framework and integration packages are now optional, dynamically loaded peers with actionable installation errors. Integration factories move from the basic root export to `@santi020k/eslint-config-integrations`, while the new `@santi020k/eslint-config-full` package provides the batteries-included installation path. Core no longer owns JSX accessibility rules, the CLI writes the one-line configuration, and release checks enforce dependency budgets, packed-consumer compatibility, and lean production-audit boundaries.
