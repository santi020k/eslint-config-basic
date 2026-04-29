---
"@santi020k/eslint-config-angular": major
"@santi020k/eslint-config-astro": major
"@santi020k/eslint-config-basic": major
"@santi020k/eslint-config-core": major
"@santi020k/eslint-config-docs": major
"@santi020k/eslint-config-expo": major
"@santi020k/eslint-config-hono": major
"@santi020k/eslint-config-nest": major
"@santi020k/eslint-config-next": major
"@santi020k/eslint-config-optionals": major
"@santi020k/eslint-config-qwik": major
"@santi020k/eslint-config-react": major
"@santi020k/eslint-config-remix": major
"@santi020k/eslint-config-solid": major
"@santi020k/eslint-config-svelte": major
"@santi020k/eslint-config-typescript": major
"@santi020k/eslint-config-vue": major
---

Release v2 with a single public application install through `@santi020k/eslint-config-basic`.

Application projects no longer need to install or import separate framework config packages. Framework integrations are bundled behind the main package and can be enabled with booleans such as `frameworks.react: true`, `frameworks.next: true`, or by relying on auto-detection from `eslintConfig()`.

Detected framework configs are now enabled by default, while an explicit `frameworks: {}` remains the opt-out path. Next.js, Expo, and Remix automatically include React rules when enabled.

The documentation site now keeps the previous v1 docs under `/v1/`, updates the root docs for v2, and includes a v1 to v2 migration guide.
