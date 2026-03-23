---
"@santi020k/eslint-config-basic": minor
"@santi020k/eslint-config-core": minor
"@santi020k/eslint-config-typescript": minor
"@santi020k/eslint-config-react": minor
"@santi020k/eslint-config-next": minor
"@santi020k/eslint-config-astro": minor
"@santi020k/eslint-config-vue": minor
"@santi020k/eslint-config-svelte": minor
"@santi020k/eslint-config-solid": minor
"@santi020k/eslint-config-angular": minor
"@santi020k/eslint-config-nest": minor
"@santi020k/eslint-config-expo": minor
"@santi020k/eslint-config-optionals": minor
---

# Release 0.8.0

- **Snippet Fixes**: Resolved ESLint parsing errors in virtual TypeScript files within Markdown, Astro, and VitePress code blocks by disabling type-aware rules for those snippets.
- **Standalone TS Support**: Restored `disableTypeChecked` configuration in the TypeScript package, ensuring it remains fully functional and parsing-error-free when used without the main composer.
- **Documentation Reorganization**: Significantly expanded and restructured the documentation site, adding new pages for the Inspector, CLI Tooling, Extensions, and better framework-specific guides.
- **Branding Update**: Updated the author link label from "Website" to "Author" across all documentation files for improved brand identity.
- **Composition Improvements**: Refactored the configuration composer to be more robust when handling virtual snippets and framework contracts.
