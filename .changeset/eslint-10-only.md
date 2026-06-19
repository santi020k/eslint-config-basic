---
"@santi020k/eslint-config-angular": major
"@santi020k/eslint-config-astro": major
"@santi020k/eslint-config-basic": major
"@santi020k/eslint-config-core": major
"@santi020k/eslint-config-expo": major
"@santi020k/eslint-config-hono": major
"@santi020k/eslint-config-integrations": major
"@santi020k/eslint-config-lit": major
"@santi020k/eslint-config-nest": major
"@santi020k/eslint-config-next": major
"@santi020k/eslint-config-nuxt": major
"@santi020k/eslint-config-qwik": major
"@santi020k/eslint-config-react": major
"@santi020k/eslint-config-react-router": major
"@santi020k/eslint-config-remix": major
"@santi020k/eslint-config-slidev": major
"@santi020k/eslint-config-solid": major
"@santi020k/eslint-config-svelte": major
"@santi020k/eslint-config-tanstack-start": major
"@santi020k/eslint-config-typescript": major
"@santi020k/eslint-config-vite": major
"@santi020k/eslint-config-vue": major
---

**Breaking**: require ESLint 10. All packages now declare `"eslint": "^10.0.0"` as peer dependency (previously `^9.0.0 || ^10.0.0`), and `@santi020k/eslint-config-core` depends on `@eslint/js` v10.

ESLint v9.x reaches end-of-life on 2026-08-06; targeting v10 only lets the configs rely on v10 behavior:

- per-file config lookup (`eslint.config.*` resolved from each linted file's directory) — workspace packages can now ship their own config files alongside or instead of the root `projects` option
- JSX reference tracking — correct scope analysis for JSX without plugin workarounds
- the updated `eslint:recommended` baseline from `@eslint/js` v10

If you are still on ESLint 9, stay on the v1.x line of these packages.
