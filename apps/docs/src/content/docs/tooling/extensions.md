---
title: "Extensions"
description: "The extensions option enables specialized rule packs that are useful across many project types."
---

The `extensions` option enables specialized rule packs that are useful across many project types.

| Extension | Enum | Use It When | Auto-Detected |
| :--- | :--- | :--- | :--- |
| RegExp | `Extension.Regexp` | The project wants stronger regular-expression linting. | No |
| Unicorn | `Extension.Unicorn` | The project wants modern JavaScript best-practice rules. | No |
| SonarJS | `Extension.Sonarjs` | The project wants maintainability-oriented rules. | No |
| Security | `Extension.Security` | The project wants additional security-oriented checks. | Yes |
| Perfectionist | `Extension.Perfectionist` | The project wants ordering and consistency rules. | No |
| BestPractices | `Extension.BestPractices` | The project wants light-weight quality rules with no extra dependencies. | No |
| Boundaries | `Extension.Boundaries` | The project wants dependency-free import boundary guardrails for package, generated-code, and test imports. | No |
| A11y | `Extension.A11y` | The project wants accessibility linting for JSX and Vue. | Yes |
| Biome | `Extension.Biome` | The project wants to enforce Biome formatting and rules. | No |
| Node | `Extension.Node` | The project is a Node.js codebase that wants `eslint-plugin-n` rules. | No |
| Compat | `Extension.Compat` | The project wants browser-compatibility checks against its browserslist. | No |
| DeMorgan | `Extension.DeMorgan` | The project wants negated logical expressions simplified automatically. | No |
| Depend | `Extension.Depend` | The project wants suggestions for lighter or native dependency alternatives. | No |
| Oxlint | `Extension.Oxlint` | The project runs Oxlint alongside ESLint and wants duplicate rules disabled. | No |

## Example

```js
import { defineConfig, Extension } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  extensions: [
    Extension.Unicorn, Extension.Security, Extension.Perfectionist, Extension.BestPractices, Extension.Boundaries
  ]
})
```

## Details

### BestPractices

The `Extension.BestPractices` pack adds four quality rules that don't require any external plugin dependencies:

- `no-console` (warn) — catches leftover debug output
- `no-alert` (error) — disallows browser `alert`, `confirm`, and `prompt`
- `complexity` (warn, max 10) — flags overly complex functions
- `max-depth` (warn, max 4) — flags deeply nested blocks

### Boundaries

The `Extension.Boundaries` pack adds dependency-free import guardrails:

- `import/no-relative-packages` (warn) — catches relative imports across package boundaries.
- `import/no-self-import` (error) — prevents a module from importing itself.
- `no-restricted-imports` (error) — blocks production imports from generated-code and test-only paths.

### Node

The `Extension.Node` pack applies `eslint-plugin-n` recommended rules. Module-resolution rules (`n/no-missing-import`, `n/no-missing-require`) are disabled for TypeScript files because the compiler already validates imports.

### Oxlint

The `Extension.Oxlint` pack disables ESLint rules already covered by [Oxlint](https://oxc.rs) so both linters can run side by side without duplicate reports — the same hybrid-linting model as the Biome extension.

## Notes

- The Security extension is enabled by default through detection.
- These extensions can be layered with frameworks, formats, and tooling without changing the core composition model.
- Like Prettier and Biome, the Oxlint extension is applied after other extensions so its rule disables win.

## Repository Examples

- Extension Playgrounds: [packages/playground/extensions](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/extensions)
- Integrations Package Source: [packages/integrations](https://github.com/santi020k/eslint-config-basic/tree/main/packages/integrations)
