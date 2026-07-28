---
"@santi020k/eslint-config-react": major
---

Replace the prerelease `eslint-plugin-react-compiler` integration with the
official compiler diagnostics from `eslint-plugin-react-hooks`. Compiler
diagnostics now use the `react-hooks/*` namespace, while diagnostics already
provided by `@eslint-react/eslint-plugin` remain deduplicated. The diagnostics
remain warnings to preserve the previous configuration's enforcement level.
