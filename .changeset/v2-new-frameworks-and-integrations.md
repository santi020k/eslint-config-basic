---
"@santi020k/eslint-config-basic": minor
"@santi020k/eslint-config-core": minor
"@santi020k/eslint-config-integrations": minor
"@santi020k/eslint-config-nuxt": minor
"@santi020k/eslint-config-lit": minor
"@santi020k/eslint-config-react-router": minor
"@santi020k/eslint-config-tanstack-start": minor
---

Add new framework and integration support:

- **New framework packages**: Nuxt (`@nuxt/eslint-plugin` on top of the Vue config), Lit (`eslint-plugin-lit` + `eslint-plugin-wc`), React Router v7 (successor to Remix), and TanStack Start (bundles TanStack Router + Query rules). All are wired into `eslintConfig()` framework keys, bundled resolvers, auto-detection (`nuxt`, `lit`, `@react-router/dev`, `@tanstack/react-start`, `@tanstack/solid-start`), the CLI, and the agent-skill generator.
- **New formats**: `Format.Css` (official `@eslint/css` plugin) and `Format.Html` (`@html-eslint`).
- **New extensions**: `Extension.Node` (`eslint-plugin-n`, with TS-aware module-resolution overrides), `Extension.Compat` (browserslist compatibility), `Extension.DeMorgan`, `Extension.Depend`, and `Extension.Oxlint` (disables rules covered by Oxlint for hybrid setups, applied last like Biome).
- **New tool**: `Tool.Pnpm` (`eslint-plugin-pnpm`) enforcing pnpm catalogs and workspace settings in `package.json` and `pnpm-workspace.yaml`.
