---
"@santi020k/eslint-config-basic": patch
"@santi020k/eslint-config-core": patch
"@santi020k/eslint-config-integrations": patch
---

Refresh all external dependencies to their latest versions across the monorepo (58 bumps), including majors: TypeScript 6.0, Vite 8, Angular 22, MikroORM 7, and TypeORM 1.0. ESLint moves to 10.5, the `vite` and `eslint` pnpm overrides are updated to match, and the Angular and NestJS playgrounds now declare `rxjs@^7.8.2` explicitly so framework peer dependencies no longer resolve against a stale transitive rxjs 6.
