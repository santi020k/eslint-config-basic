---
"@santi020k/eslint-config-basic": minor
"@santi020k/eslint-config-core": minor
"@santi020k/eslint-config-extensions": minor
"@santi020k/eslint-config-formats": minor
"@santi020k/eslint-config-full": minor
"@santi020k/eslint-config-integrations": minor
"@santi020k/eslint-config-libraries": minor
"@santi020k/eslint-config-lite": minor
"@santi020k/eslint-config-testing": minor
"@santi020k/eslint-config-tools": minor
---

Complete the v3 lean dependency boundary and one-line recommended entry point. Framework and feature-pack packages are now optional, dynamically loaded peers with actionable installation errors. Feature factories move from the basic root export to granular extensions, formats, libraries, testing, and tools packages; `@santi020k/eslint-config-integrations` remains as a compatibility aggregate, while the new `@santi020k/eslint-config-full` package provides the batteries-included installation path. Core no longer owns JSX accessibility rules, the CLI writes the one-line configuration, and release checks enforce dependency budgets, packed-consumer compatibility, and lean production-audit boundaries.

Remove the v1 compatibility exports (`*Config`, `jsConfig`, `tsConfig`,
`astroConfig`, `rules`, `loadModule`, and `eslintConfig`) from the aggregate
v3 API. Remove the deprecated Remix package and `frameworks.remix` option;
Remix dependencies now resolve through the React Router v7 configuration.
The Lite package is now a thin compatibility re-export of Basic.
