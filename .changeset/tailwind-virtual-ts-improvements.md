---
"@santi020k/eslint-config-basic": minor
"@santi020k/eslint-config-core": minor
"@santi020k/eslint-config-typescript": patch
---

Tailwind `noUnknownClasses` option, expanded testing config names, and virtual TS parser fix.

- **`TailwindOptions.noUnknownClasses`**: new optional field (`'error' | 'warn' | 'off' | false`) to control the `better-tailwindcss/no-unknown-classes` rule severity. Defaults to `'error'` when a Tailwind entry point is detected; set to `false` or `'off'` to disable.
- **Testing config overrides**: `TESTING_CONFIG_NAMES` now maps Cypress, Jest, JestDom, Playwright, TestingLibrary, and Vitest — so per-testing-tool file overrides are applied for all supported testing integrations, not just Playwright.
- **TypeScript virtual file parser**: the parser-setup config block now also covers virtual TS files (`parserSetupFiles` includes `GLOB_VIRTUAL_TS`), fixing missing parser options for framework-generated virtual modules.
