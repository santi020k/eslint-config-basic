---
"@santi020k/eslint-config-react": major
"@santi020k/eslint-config-remix": major
"@santi020k/eslint-config-basic": major
---

Modernize the React stack and rename Remix:

- **BREAKING**: `@santi020k/eslint-config-react` now uses `@eslint-react/eslint-plugin` instead of `eslint-plugin-react` + `eslint-plugin-react-hooks`. Rule names change from `react/*` and `react-hooks/*` to `@eslint-react/*` (e.g. `react-hooks/exhaustive-deps` → `@eslint-react/exhaustive-deps`). This removes the `fixupConfigRules` compatibility shim, is ESLint 10-native, and includes the hooks rules. `react-compiler` and `react-refresh` plugins are unchanged.
- **BREAKING**: `@santi020k/eslint-config-remix` is now a deprecated alias that re-exports `@santi020k/eslint-config-react-router` (Remix merged into React Router v7). The `frameworks.remix` key still works but is deprecated — use `frameworks['react-router']`. The alias will be removed in the next major.
- The toolchain now builds with TypeScript 6.
