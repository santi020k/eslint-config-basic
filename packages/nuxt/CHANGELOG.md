# @santi020k/eslint-config-nuxt

## 2.0.0-beta.1

### Patch Changes

- Updated dependencies [[`dfba51d`](https://github.com/santi020k/eslint-config-basic/commit/dfba51dca7387a71a263af206eb86fd8df15f387)]:
  - @santi020k/eslint-config-core@2.0.0-beta.1

## 2.0.0-beta.0

### Major Changes

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - **Breaking**: require ESLint 10. All packages now declare `"eslint": "^10.0.0"` as peer dependency (previously `^9.0.0 || ^10.0.0`), and `@santi020k/eslint-config-core` depends on `@eslint/js` v10.

  ESLint v9.x reaches end-of-life on 2026-08-06; targeting v10 only lets the configs rely on v10 behavior:

  - per-file config lookup (`eslint.config.*` resolved from each linted file's directory) — workspace packages can now ship their own config files alongside or instead of the root `projects` option
  - JSX reference tracking — correct scope analysis for JSX without plugin workarounds
  - the updated `eslint:recommended` baseline from `@eslint/js` v10

  If you are still on ESLint 9, stay on the v1.x line of these packages.

### Minor Changes

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Add new framework and integration support:

  - **New framework packages**: Nuxt (`@nuxt/eslint-plugin` on top of the Vue config), Lit (`eslint-plugin-lit` + `eslint-plugin-wc`), React Router v7 (successor to Remix), and TanStack Start (bundles TanStack Router + Query rules). All are wired into `eslintConfig()` framework keys, bundled resolvers, auto-detection (`nuxt`, `lit`, `@react-router/dev`, `@tanstack/react-start`, `@tanstack/solid-start`), the CLI, and the agent-skill generator.
  - **New formats**: `Format.Css` (official `@eslint/css` plugin) and `Format.Html` (`@html-eslint`).
  - **New extensions**: `Extension.Node` (`eslint-plugin-n`, with TS-aware module-resolution overrides), `Extension.Compat` (browserslist compatibility), `Extension.DeMorgan`, `Extension.Depend`, and `Extension.Oxlint` (disables rules covered by Oxlint for hybrid setups, applied last like Biome).
  - **New tool**: `Tool.Pnpm` (`eslint-plugin-pnpm`) enforcing pnpm catalogs and workspace settings in `package.json` and `pnpm-workspace.yaml`.

### Patch Changes

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Document and test the Lit, Nuxt, React Router, and TanStack Start packages: add package READMEs (previously blank on npm), add framework guide pages to the docs site sidebar, and list the four frameworks in the root README, llms.txt, llms-full.txt, and docs site metadata. Add detection, config export, and composition tests plus lint playgrounds for all four frameworks. Also add the six missing packages (lit, nuxt, react-router, slidev, tanstack-start, vite) to the Changesets `fixed` group so all publishable packages stay version-locked.

- Updated dependencies [[`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc)]:
  - @santi020k/eslint-config-core@2.0.0-beta.0
