---
"@santi020k/eslint-config-angular": patch
"@santi020k/eslint-config-astro": patch
"@santi020k/eslint-config-basic": minor
"@santi020k/eslint-config-core": minor
"@santi020k/eslint-config-docs": patch
"@santi020k/eslint-config-expo": patch
"@santi020k/eslint-config-nest": patch
"@santi020k/eslint-config-next": patch
"@santi020k/eslint-config-optionals": patch
"@santi020k/playground": patch
"@santi020k/eslint-config-react": patch
"@santi020k/eslint-config-solid": patch
"@santi020k/eslint-config-svelte": patch
"@santi020k/eslint-config-tests": patch
"@santi020k/eslint-config-typescript": patch
"@santi020k/eslint-config-vue": patch
---

feat: add standard ESLint configuration and resolve typecheck/hook failures

This release introduces a new standard configuration in `@santi020k/eslint-config-core` and addresses several technical issues:
- Fixed global typecheck failures across the monorepo.
- Resolved pre-commit hook issues with cspell.
- Fixed pre-push hook failures related to publint in the playground package.
- Added missing test coverage scripts and fixed CI build failures.
