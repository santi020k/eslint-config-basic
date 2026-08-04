---
title: "Changelog"
description: "Release history for @santi020k/eslint-config-basic."
---

## 3.2.0

### Minor Changes

- [#104](https://github.com/santi020k/eslint-config-basic/pull/104) [`522aed9`](https://github.com/santi020k/eslint-config-basic/commit/522aed93495faebff095f6e48dc731b7730e8f7a) Thanks [@santi020k](https://github.com/santi020k)! - Add `explain-preset` adoption reports and optional temporary compatibility
  overrides grouped by formatting, correctness, security, framework, and domain
  rules.

  Make generated configs safer for real ESLint 10 monorepos by attaching referenced plugins locally, inheriting shared project detection and Tailwind options, composing untyped TypeScript overrides after framework parsers, and making doctor/install planning aware of workspace projects and modern feature selections.

  Improve the CLI for pnpm workspaces by detecting the workspace root from nested
  projects, preserving default and named catalogs during installation, and
  requesting companion config packages with a version range compatible with the
  installed Basic release. Command parsing is now strict, subcommand help is
  side-effect free, minimum-release-age blocks are diagnosed, and safe v3 config
  syntax is modernized during migration. Optional framework and feature-pack load
  errors distinguish missing packages from evaluation failures while retaining the
  original cause. Packed modular monorepo and peer-health release checks now verify
  doctor, ESLint, TypeScript, frozen pnpm installs, and owned exceptions against
  published-package boundaries.

### Patch Changes

- Updated dependencies [[`a93a940`](https://github.com/santi020k/eslint-config-basic/commit/a93a9406d4e69d53f0e177c65b9aceeeec6ae1ba)]:
  - @santi020k/eslint-config-typescript@3.1.1

## 3.1.0

### Minor Changes

- [#99](https://github.com/santi020k/eslint-config-basic/pull/99) [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967) Thanks [@santi020k](https://github.com/santi020k)! - Add an opt-in, lazily loaded Astro Doctor ESLint integration through `Extension.AstroDoctor` or `features: { "astro-doctor": true }`, including the recommended proprietary and official Astro rules, configuration validation, and `basic-eslint doctor` compatibility guidance.

- [#99](https://github.com/santi020k/eslint-config-basic/pull/99) [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967) Thanks [@santi020k](https://github.com/santi020k)! - Add a `basic-eslint install` command that detects missing framework, feature
  category, ESLint, and TypeScript dependencies and installs them with the
  project's package manager. Document the command in the v3 setup flow.

- [#99](https://github.com/santi020k/eslint-config-basic/pull/99) [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967) Thanks [@santi020k](https://github.com/santi020k)! - Complete the v3 lean dependency boundary and one-line recommended entry point. Framework and feature-pack packages are now optional, dynamically loaded peers with actionable installation errors. Feature factories move from the basic root export to granular extensions, formats, libraries, testing, and tools packages; `@santi020k/eslint-config-integrations` remains as a compatibility aggregate, while the new `@santi020k/eslint-config-full` package provides the batteries-included installation path. Core no longer owns JSX accessibility rules, the CLI writes the one-line configuration, and release checks enforce dependency budgets, packed-consumer compatibility, and lean production-audit boundaries.

  Remove the v1 compatibility exports (`*Config`, `jsConfig`, `tsConfig`,
  `astroConfig`, `rules`, `loadModule`, and `eslintConfig`) from the aggregate
  v3 API. Remove the deprecated Remix package and `frameworks.remix` option;
  Remix dependencies now resolve through the React Router v7 configuration.
  The Lite package is now a thin compatibility re-export of Basic.

- [#99](https://github.com/santi020k/eslint-config-basic/pull/99) [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967) Thanks [@santi020k](https://github.com/santi020k)! - Complete the v3 modular dependency boundary with five category feature packs.
  Each pack owns its plugin dependencies and exposes a self-describing feature
  registry through the shared `ConfigFeature` contract. The lean Basic composer
  loads only registries for selected categories, Full installs every pack, and
  Integrations remains as a compatibility aggregate.

  Move agent-skill generation from the Basic root export to
  `@santi020k/eslint-config-basic/agent`, keeping Node-oriented tooling out of the
  configuration runtime entry point.

- [#99](https://github.com/santi020k/eslint-config-basic/pull/99) [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967) Thanks [@santi020k](https://github.com/santi020k)! - Polish real-world consumer configuration: add one `root` option for detection,
  TypeScript, Tailwind, projects, and `.gitignore`; auto-detect and scope workspace
  packages without leaking root framework dependencies; accept native project
  service options; and syntax-lint TypeScript config files plus explicit
  `untypedFiles` without consumer-side `typescript-eslint` imports.

- [#99](https://github.com/santi020k/eslint-config-basic/pull/99) [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967) Thanks [@santi020k](https://github.com/santi020k)! - Drop Node.js 20 support and require Node.js 22.19.0 or newer across the package
  suite. This aligns the published engine contract with the current ESLint,
  Lighthouse, GraphQL, and Unicorn toolchain.

- [#99](https://github.com/santi020k/eslint-config-basic/pull/99) [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967) Thanks [@santi020k](https://github.com/santi020k)! - Add v3 lifecycle tooling to the `basic-eslint` CLI: an automated v2-to-v3
  migration planner and writer, incremental strict-mode baselines backed by ESLint
  bulk suppressions, rule-performance profiling with concurrency comparison,
  effective-rule snapshots and diffs, and optional official ESLint MCP
  scaffolding for generated agent standards.

- [#99](https://github.com/santi020k/eslint-config-basic/pull/99) [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967) Thanks [@santi020k](https://github.com/santi020k)! - Add v3 project-assistance workflows: safe doctor repairs, explicit init output,
  effective rule/source explanations, package compatibility reporting, lint
  warning and performance budgets, real v2 migration fixtures, and a reusable
  GitHub Action for consumer checks.

### Patch Changes

- [#99](https://github.com/santi020k/eslint-config-basic/pull/99) [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967) Thanks [@santi020k](https://github.com/santi020k)! - Resolve package-scoped Tailwind and Astro configuration roots, keep lazy framework imports anchored to their declaring package, add shared `projectDefaults` inheritance for monorepos, and move integration host libraries to optional peers.

- [#99](https://github.com/santi020k/eslint-config-basic/pull/99) [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967) Thanks [@santi020k](https://github.com/santi020k)! - Deprecate the Lite and Integrations compatibility packages during v3 and
  schedule their removal for v4. Add TypeScript deprecation annotations,
  migration guidance, and post-publish npm registry warnings. Also deprecate the
  `integrations` option alias and `doctor --lite-install` compatibility workflow.

- [#99](https://github.com/santi020k/eslint-config-basic/pull/99) [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967) Thanks [@santi020k](https://github.com/santi020k)! - Include explicit feature, preset, and strict config selections in CLI install
  and doctor repair planning, preserve runtime dependency fields and peer metadata
  during v3 migrations, analyze TypeScript ESLint config files during doctor
  checks, and honor dot-prefixed workspace exclusion patterns during project
  detection.
- Updated dependencies [[`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967), [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967)]:
  - @santi020k/eslint-config-core@3.1.0
  - @santi020k/eslint-config-typescript@3.1.0

## 3.0.0

### Major Changes

- Make the lean dependency model the default. Framework and integration config
  packages are optional peers instead of hard dependencies.
- Add `@santi020k/eslint-config-basic/recommended` for a one-line zero-config
  `eslint.config.*` file.
- Move integration factory exports to
  `@santi020k/eslint-config-integrations`; the new
  `@santi020k/eslint-config-full` package re-exports the batteries-included API.
- Make `Preset.Basic` dependency-free beyond core and TypeScript support.
- Make `basic-eslint init` generate the one-line recommended config.

See the [v2 to v3 migration guide](https://eslint.santi020k.com/guide/migration-v2-to-v3/).

## 2.1.1

### Patch Changes

- [#95](https://github.com/santi020k/eslint-config-basic/pull/95) [`2576ec6`](https://github.com/santi020k/eslint-config-basic/commit/2576ec62df6127f5b40821e46a22394bb9dec867) Thanks [@santi020k](https://github.com/santi020k)! - Fix agent skill path convention, Astro virtual JS glob, and TypeScript virtual-file parser setup

  - Agent skill generator now writes `SKILL.md` inside `skills/eslint-standards/` instead of `eslint-standards.md` inside `skills/`, aligning with the `skill://` URL convention used by Claude Code and other agents
  - Gemini target follows the same convention (was `styleguide.md` at root)
  - Added `**/*.astro/*.js` to `GLOB_VIRTUAL_TS` so Astro virtual JavaScript fragments with TypeScript syntax are parsed correctly
  - Added a dedicated ESLint config block that disables `projectService` / `project` for all virtual TS/JS files, preventing TypeScript project service errors on those fragments

- Updated dependencies [[`2576ec6`](https://github.com/santi020k/eslint-config-basic/commit/2576ec62df6127f5b40821e46a22394bb9dec867)]:
  - @santi020k/eslint-config-core@2.1.1
  - @santi020k/eslint-config-typescript@2.1.1
  - @santi020k/eslint-config-integrations@2.1.1
  - @santi020k/eslint-config-angular@2.1.1
  - @santi020k/eslint-config-astro@2.1.1
  - @santi020k/eslint-config-expo@2.1.1
  - @santi020k/eslint-config-hono@2.1.1
  - @santi020k/eslint-config-lit@2.1.1
  - @santi020k/eslint-config-nest@2.1.1
  - @santi020k/eslint-config-next@2.1.1
  - @santi020k/eslint-config-nuxt@2.1.1
  - @santi020k/eslint-config-qwik@2.1.1
  - @santi020k/eslint-config-react@2.1.1
  - @santi020k/eslint-config-react-router@2.1.1
  - @santi020k/eslint-config-remix@2.1.1
  - @santi020k/eslint-config-slidev@2.1.1
  - @santi020k/eslint-config-solid@2.1.1
  - @santi020k/eslint-config-svelte@2.1.1
  - @santi020k/eslint-config-tanstack-start@2.1.1
  - @santi020k/eslint-config-vite@2.1.1
  - @santi020k/eslint-config-vue@2.1.1
  - @santi020k/eslint-config-preact@2.1.1

## 2.1.0

### Minor Changes

- [#93](https://github.com/santi020k/eslint-config-basic/pull/93) [`9bf89ba`](https://github.com/santi020k/eslint-config-basic/commit/9bf89badbabf46d8167b59096622b62a218d97db) Thanks [@santi020k](https://github.com/santi020k)! - Preserve detected runtime globals when detection infers a preset, including Cloudflare-specific globals, and stop warning for supported `typescript.project` parser options.

### Patch Changes

- [#93](https://github.com/santi020k/eslint-config-basic/pull/93) [`9bf89ba`](https://github.com/santi020k/eslint-config-basic/commit/9bf89badbabf46d8167b59096622b62a218d97db) Thanks [@santi020k](https://github.com/santi020k)! - Remove the internal `./dist/index.js` path from the package exports map. This key was leaking a dist path as a public entrypoint alongside the canonical `.` entry; only `.` should be exported.

  Update the npm package description to list all v2 frameworks: Lit, Nuxt, Preact, React Router, TanStack Start, and Vite were missing from the v1-era description string.

  Fix the Node.js compatibility row in the root README — it said `>=22.18.0` (the dev-workspace floor) but published packages declare `>=22.0.0`.

- [#93](https://github.com/santi020k/eslint-config-basic/pull/93) [`9bf89ba`](https://github.com/santi020k/eslint-config-basic/commit/9bf89badbabf46d8167b59096622b62a218d97db) Thanks [@santi020k](https://github.com/santi020k)! - Update `engines.node` floor to `^20.19.0 || >=22.18.0` to safely support Node 20 environments while avoiding installation failures on early Node 22 versions.

- Updated dependencies [[`9bf89ba`](https://github.com/santi020k/eslint-config-basic/commit/9bf89badbabf46d8167b59096622b62a218d97db)]:
  - @santi020k/eslint-config-integrations@2.1.0
  - @santi020k/eslint-config-angular@2.1.0
  - @santi020k/eslint-config-astro@2.1.0
  - @santi020k/eslint-config-core@2.1.0
  - @santi020k/eslint-config-expo@2.1.0
  - @santi020k/eslint-config-hono@2.1.0
  - @santi020k/eslint-config-lit@2.1.0
  - @santi020k/eslint-config-nest@2.1.0
  - @santi020k/eslint-config-next@2.1.0
  - @santi020k/eslint-config-nuxt@2.1.0
  - @santi020k/eslint-config-qwik@2.1.0
  - @santi020k/eslint-config-react@2.1.0
  - @santi020k/eslint-config-react-router@2.1.0
  - @santi020k/eslint-config-remix@2.1.0
  - @santi020k/eslint-config-slidev@2.1.0
  - @santi020k/eslint-config-solid@2.1.0
  - @santi020k/eslint-config-svelte@2.1.0
  - @santi020k/eslint-config-tanstack-start@2.1.0
  - @santi020k/eslint-config-typescript@2.1.0
  - @santi020k/eslint-config-vite@2.1.0
  - @santi020k/eslint-config-vue@2.1.0
  - @santi020k/eslint-config-preact@2.1.0

## 2.0.0

### Major Changes

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - **Breaking**: require ESLint 10. All packages now declare `"eslint": "^10.0.0"` as peer dependency (previously `^9.0.0 || ^10.0.0`), and `@santi020k/eslint-config-core` depends on `@eslint/js` v10.

  ESLint v9.x reaches end-of-life on 2026-08-06; targeting v10 only lets the configs rely on v10 behavior:

  - per-file config lookup (`eslint.config.*` resolved from each linted file's directory) — workspace packages can now ship their own config files alongside or instead of the root `projects` option
  - JSX reference tracking — correct scope analysis for JSX without plugin workarounds
  - the updated `eslint:recommended` baseline from `@eslint/js` v10

  If you are still on ESLint 9, stay on the v1.x line of these packages.

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Lazy framework loading and normalized framework export naming.

  **Lazy loading**: framework packages (angular-eslint, vue-eslint-parser, eslint-plugin-svelte, …) are now imported dynamically and only when their framework is enabled. Projects that enable none or few frameworks no longer pay the startup cost of loading every bundled framework plugin when `eslintConfig()` / `defineConfig()` runs.

  **Breaking — normalized naming**: framework exports from `@santi020k/eslint-config-basic` now use bare framework names, and all of them are async factories returning `Promise<FlatConfigArray>`:

  `angular`, `astro`, `expo`, `hono`, `lit`, `nest`, `next`, `nuxt`, `qwik`, `react`, `reactRouter`, `slidev`, `solid`, `svelte`, `tanstackStart`, `vite`, `vue` (plus deprecated `remix`).

  The previous mixed-style names (`angularConfig`, `expoConfig`, `nestConfig`, `nextConfig`, `reactConfig`, `solidConfig`, `svelteConfig`, `vueConfig`) remain available as deprecated aliases of the same factories, but they are no longer plain config arrays — call them (and `await` the result) when composing manually:

  ```js
  // before (v1)
  import { reactConfig } from "@santi020k/eslint-config-basic";

  export default [...reactConfig];
  ```

  ```js
  // after (v2)
  import { react } from "@santi020k/eslint-config-basic";

  export default [...(await react())];
  ```

  Most users are unaffected: `frameworks: { react: true }` and auto-detection behave exactly as before.

  `@santi020k/eslint-config-core`: the `ImportedFramework` type now also accepts async factories (`(options?) => Promise<FlatConfigArray>`), so lazy factories can be passed directly as framework option values.

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Release v2 with a single public application install through `@santi020k/eslint-config-basic`.

  Application projects no longer need to install or import separate framework config packages. Framework integrations are bundled behind the main package and can be enabled with booleans such as `frameworks.react: true`, `frameworks.next: true`, or by relying on auto-detection from `eslintConfig()`.

  Detected framework configs are now enabled by default, while an explicit `frameworks: {}` remains the opt-out path. Next.js, Expo, and Remix automatically include React rules when enabled.

  The documentation site now keeps the previous v1 docs under `/v1/`, updates the root docs for v2, and includes a v1 to v2 migration guide.

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Modernize the React stack and rename Remix:

  - **BREAKING**: `@santi020k/eslint-config-react` now uses `@eslint-react/eslint-plugin` instead of `eslint-plugin-react` + `eslint-plugin-react-hooks`. Rule names change from `react/*` and `react-hooks/*` to `@eslint-react/*` (e.g. `react-hooks/exhaustive-deps` → `@eslint-react/exhaustive-deps`). This removes the `fixupConfigRules` compatibility shim, is ESLint 10-native, and includes the hooks rules. `react-compiler` and `react-refresh` plugins are unchanged.
  - **BREAKING**: `@santi020k/eslint-config-remix` is now a deprecated alias that re-exports `@santi020k/eslint-config-react-router` (Remix merged into React Router v7). The `frameworks.remix` key still works but is deprecated — use `frameworks['react-router']`. The alias will be removed in the next major.
  - The toolchain now builds with TypeScript 6.

### Minor Changes

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Add first-class support for Preact.

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - AI tooling workflow improvements:

  - **Default ignores for AI artifacts**: the composed config now ignores AI coding-assistant folders (`.agent`, `.agents`, `.aider*`, `.claude`, `.clinerules`, `.codex`, `.copilot`, `.cursor`, `.gemini`, `.kiro`, `.opencode`, `.roo`, `.windsurf`) so generated agent rules are never linted as source code. Disable via `settings: [Setting.NoDefaultIgnores]`.
  - **`generate-skill --check`**: CI mode that compares existing agent skill files (and guarded `AGENTS.md` / copilot-instructions sections) against freshly generated content without writing, and exits with code 1 when anything is stale or missing.
  - **`generate-skill --create`**: scaffolds a root `AGENTS.md` with the guarded ESLint-standards section when the project has none.
  - **`doctor` duplicate-ESLint detection**: warns when the project and the config packages resolve two different ESLint versions (e.g. an ESLint 9 project pulling in the config's ESLint 10 dependency). Both majors remain supported; the warning helps avoid editor/CLI rule-behavior drift.

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Add broader AI tooling support:

  - **New agent skill targets** in `generate-skill`: Gemini (`.gemini/styleguide.md`), Cline (`.clinerules/`), Roo Code (`.roo/rules/`), and Kiro (`.kiro/steering/` with `inclusion: always` front-matter). The generator also maintains a guarded ESLint-standards section in an existing root `AGENTS.md` (the open standard read by Codex CLI, OpenCode, Jules, Amp, and others), mirroring the `.github/copilot-instructions.md` behavior.
  - **New library integrations**: `Library.Langchain` and `Library.LlamaIndex` add import safety rules for LangChain.js (`langchain`, `@langchain/*`) and LlamaIndex.TS (`llamaindex`, `@llamaindex/*`) projects, with auto-detection from `package.json` dependencies.
  - Generated agent skills now report AI SDK, MCP, Mastra, OpenAI Agents, LangChain, and LlamaIndex integrations in the feature summary.

- [`dfba51d`](https://github.com/santi020k/eslint-config-basic/commit/dfba51dca7387a71a263af206eb86fd8df15f387) Thanks [@santi020k](https://github.com/santi020k)! - Improve config migration handling and enhance TypeScript options detection

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Add optional `ignores` to `eslintConfig()` / `EslintConfigOptions` for extra global ignore globs, documented in the configuration guide.

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Add `defineConfig` as a named alias for `eslintConfig`, keep implicit framework expansion from mutating caller-provided options, declare ESLint as a peer dependency of the umbrella package, and mark the package as side-effect free for bundlers.

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Fix `optionMergeStrategy: 'merge'` so explicitly passed options (`tools`, `testing`, `formats`, `libraries`, `extensions`, `frameworks`) are actually unioned with detected and preset values, as documented. Previously, providing any of these options silently replaced detected/preset values regardless of strategy. To fully opt out of detected frameworks, use `autoFrameworks: false` or `optionMergeStrategy: 'replace'` (an explicit `frameworks: {}` no longer opts out under the default merge strategy).

  Other fixes:

  - `detection: false` now also disables the default detected extensions (Unicorn, Perfectionist, Security); a new granular `detection: { extensions: false }` control is available.
  - Negated glob patterns (`!pattern`) in `projects` sub-configs are now scoped correctly instead of producing invalid `path/!glob` patterns.
  - Deprecate the unused `TsOptions` interface (`typescript: { project }` was ignored since v2) and correct stale doc comments on `ImportedFramework` and the no-op `Setting.Gitignore` / `Setting.DefaultIgnores` values.

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Disable context-sensitive framework rules that produce false positives in lint-staged and monorepo layouts: Nest's provider reference rule and Next's Pages Router link rule.

- [#91](https://github.com/santi020k/eslint-config-basic/pull/91) [`59158db`](https://github.com/santi020k/eslint-config-basic/commit/59158dbc0b48de041062f4d0c75b1f7e3a1e779c) Thanks [@santi020k](https://github.com/santi020k)! - Tailwind `noUnknownClasses` option, expanded testing config names, and virtual TS parser fix.

  - **`TailwindOptions.noUnknownClasses`**: new optional field (`'error' | 'warn' | 'off' | false`) to control the `better-tailwindcss/no-unknown-classes` rule severity. Defaults to `'error'` when a Tailwind entry point is detected; set to `false` or `'off'` to disable.
  - **Testing config overrides**: `TESTING_CONFIG_NAMES` now maps Cypress, Jest, JestDom, Playwright, TestingLibrary, and Vitest — so per-testing-tool file overrides are applied for all supported testing integrations, not just Playwright.
  - **TypeScript virtual file parser**: the parser-setup config block now also covers virtual TS files (`parserSetupFiles` includes `GLOB_VIRTUAL_TS`), fixing missing parser options for framework-generated virtual modules.

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Add new framework and integration support:

  - **New framework packages**: Nuxt (`@nuxt/eslint-plugin` on top of the Vue config), Lit (`eslint-plugin-lit` + `eslint-plugin-wc`), React Router v7 (successor to Remix), and TanStack Start (bundles TanStack Router + Query rules). All are wired into `eslintConfig()` framework keys, bundled resolvers, auto-detection (`nuxt`, `lit`, `@react-router/dev`, `@tanstack/react-start`, `@tanstack/solid-start`), the CLI, and the agent-skill generator.
  - **New formats**: `Format.Css` (official `@eslint/css` plugin) and `Format.Html` (`@html-eslint`).
  - **New extensions**: `Extension.Node` (`eslint-plugin-n`, with TS-aware module-resolution overrides), `Extension.Compat` (browserslist compatibility), `Extension.DeMorgan`, `Extension.Depend`, and `Extension.Oxlint` (disables rules covered by Oxlint for hybrid setups, applied last like Biome).
  - **New tool**: `Tool.Pnpm` (`eslint-plugin-pnpm`) enforcing pnpm catalogs and workspace settings in `package.json` and `pnpm-workspace.yaml`.

### Patch Changes

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Refresh all external dependencies to their latest versions across the monorepo (58 bumps), including majors: TypeScript 6.0, Vite 8, Angular 22, MikroORM 7, and TypeORM 1.0. ESLint moves to 10.5, the `vite` and `eslint` pnpm overrides are updated to match, and the Angular and NestJS playgrounds now declare `rxjs@^7.8.2` explicitly so framework peer dependencies no longer resolve against a stale transitive rxjs 6.

- [#92](https://github.com/santi020k/eslint-config-basic/pull/92) [`9524bf8`](https://github.com/santi020k/eslint-config-basic/commit/9524bf8a955ece3cb44e8bdd4114bced0f8a646d) Thanks [@santi020k](https://github.com/santi020k)! - fix: export `boundaries` from the main package barrel — it was wired internally but missing from the public API, making `import { boundaries } from '@santi020k/eslint-config-basic'` resolve to undefined

- [#92](https://github.com/santi020k/eslint-config-basic/pull/92) [`9524bf8`](https://github.com/santi020k/eslint-config-basic/commit/9524bf8a955ece3cb44e8bdd4114bced0f8a646d) Thanks [@santi020k](https://github.com/santi020k)! - fix: gate `security/detect-non-literal-fs-filename` scripts override on Security extension being enabled — previously the rule was always emitted, which caused ESLint to throw "Could not find plugin 'security'" for consumers who did not opt in to the Security extension

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Add `@santi020k/eslint-config-lite` as an optional composer package for projects that want to install framework and integration config packages manually. The full `@santi020k/eslint-config-basic` package remains the recommended default install.

  Expose integration composition helpers from `@santi020k/eslint-config-integrations` so the lite package can lazy-load integration configs only when selected.

  Teach `basic-eslint doctor` to recognize lite configs and warn when detected frameworks or integrations are missing their manually installed config packages.

  Add `basic-eslint doctor --lite-install` to print the detected package-manager install command for switching a project to the lite package, including framework config packages, integrations, ESLint, and TypeScript when needed.

  Document package-choice metrics, a Basic-to-Lite migration recipe, and a lite-specific `Preset.All` warning.

- Updated dependencies [[`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`dfba51d`](https://github.com/santi020k/eslint-config-basic/commit/dfba51dca7387a71a263af206eb86fd8df15f387), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`9524bf8`](https://github.com/santi020k/eslint-config-basic/commit/9524bf8a955ece3cb44e8bdd4114bced0f8a646d), [`59158db`](https://github.com/santi020k/eslint-config-basic/commit/59158dbc0b48de041062f4d0c75b1f7e3a1e779c), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`59158db`](https://github.com/santi020k/eslint-config-basic/commit/59158dbc0b48de041062f4d0c75b1f7e3a1e779c), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc)]:
  - @santi020k/eslint-config-preact@2.0.0
  - @santi020k/eslint-config-core@2.0.0
  - @santi020k/eslint-config-integrations@2.0.0
  - @santi020k/eslint-config-angular@2.0.0
  - @santi020k/eslint-config-astro@2.0.0
  - @santi020k/eslint-config-expo@2.0.0
  - @santi020k/eslint-config-hono@2.0.0
  - @santi020k/eslint-config-lit@2.0.0
  - @santi020k/eslint-config-nest@2.0.0
  - @santi020k/eslint-config-next@2.0.0
  - @santi020k/eslint-config-nuxt@2.0.0
  - @santi020k/eslint-config-qwik@2.0.0
  - @santi020k/eslint-config-react@2.0.0
  - @santi020k/eslint-config-react-router@2.0.0
  - @santi020k/eslint-config-remix@2.0.0
  - @santi020k/eslint-config-slidev@2.0.0
  - @santi020k/eslint-config-solid@2.0.0
  - @santi020k/eslint-config-svelte@2.0.0
  - @santi020k/eslint-config-tanstack-start@2.0.0
  - @santi020k/eslint-config-typescript@2.0.0
  - @santi020k/eslint-config-vite@2.0.0
  - @santi020k/eslint-config-vue@2.0.0

## 2.0.0-beta.3

### Patch Changes

- Updated dependencies [[`af152cd`](https://github.com/santi020k/eslint-config-basic/commit/af152cda17961f9de8ca7bf069739f151fca65be)]:
  - @santi020k/eslint-config-core@2.0.0-beta.3
  - @santi020k/eslint-config-integrations@2.0.0-beta.3
  - @santi020k/eslint-config-typescript@2.0.0-beta.3
  - @santi020k/eslint-config-angular@2.0.0-beta.3
  - @santi020k/eslint-config-astro@2.0.0-beta.3
  - @santi020k/eslint-config-expo@2.0.0-beta.3
  - @santi020k/eslint-config-hono@2.0.0-beta.3
  - @santi020k/eslint-config-lit@2.0.0-beta.3
  - @santi020k/eslint-config-nest@2.0.0-beta.3
  - @santi020k/eslint-config-next@2.0.0-beta.3
  - @santi020k/eslint-config-nuxt@2.0.0-beta.3
  - @santi020k/eslint-config-qwik@2.0.0-beta.3
  - @santi020k/eslint-config-react@2.0.0-beta.3
  - @santi020k/eslint-config-react-router@2.0.0-beta.3
  - @santi020k/eslint-config-remix@2.0.0-beta.3
  - @santi020k/eslint-config-slidev@2.0.0-beta.3
  - @santi020k/eslint-config-solid@2.0.0-beta.3
  - @santi020k/eslint-config-svelte@2.0.0-beta.3
  - @santi020k/eslint-config-tanstack-start@2.0.0-beta.3
  - @santi020k/eslint-config-vite@2.0.0-beta.3
  - @santi020k/eslint-config-vue@2.0.0-beta.3
  - @santi020k/eslint-config-preact@2.0.0-beta.3

## 2.0.0-beta.2

### Minor Changes

- Tailwind `noUnknownClasses` option, expanded testing config names, and virtual TS parser fix.

  - **`TailwindOptions.noUnknownClasses`**: new optional field (`'error' | 'warn' | 'off' | false`) to control the `better-tailwindcss/no-unknown-classes` rule severity. Defaults to `'error'` when a Tailwind entry point is detected; set to `false` or `'off'` to disable.
  - **Testing config overrides**: `TESTING_CONFIG_NAMES` now maps Cypress, Jest, JestDom, Playwright, TestingLibrary, and Vitest — so per-testing-tool file overrides are applied for all supported testing integrations, not just Playwright.
  - **TypeScript virtual file parser**: the parser-setup config block now also covers virtual TS files (`parserSetupFiles` includes `GLOB_VIRTUAL_TS`), fixing missing parser options for framework-generated virtual modules.

### Patch Changes

- Updated dependencies []:
  - @santi020k/eslint-config-core@2.0.0-beta.2
  - @santi020k/eslint-config-typescript@2.0.0-beta.2
  - @santi020k/eslint-config-integrations@2.0.0-beta.2
  - @santi020k/eslint-config-angular@2.0.0-beta.2
  - @santi020k/eslint-config-astro@2.0.0-beta.2
  - @santi020k/eslint-config-expo@2.0.0-beta.2
  - @santi020k/eslint-config-hono@2.0.0-beta.2
  - @santi020k/eslint-config-lit@2.0.0-beta.2
  - @santi020k/eslint-config-nest@2.0.0-beta.2
  - @santi020k/eslint-config-next@2.0.0-beta.2
  - @santi020k/eslint-config-nuxt@2.0.0-beta.2
  - @santi020k/eslint-config-qwik@2.0.0-beta.2
  - @santi020k/eslint-config-react@2.0.0-beta.2
  - @santi020k/eslint-config-react-router@2.0.0-beta.2
  - @santi020k/eslint-config-remix@2.0.0-beta.2
  - @santi020k/eslint-config-slidev@2.0.0-beta.2
  - @santi020k/eslint-config-solid@2.0.0-beta.2
  - @santi020k/eslint-config-svelte@2.0.0-beta.2
  - @santi020k/eslint-config-tanstack-start@2.0.0-beta.2
  - @santi020k/eslint-config-vite@2.0.0-beta.2
  - @santi020k/eslint-config-vue@2.0.0-beta.2
  - @santi020k/eslint-config-preact@2.0.0-beta.2

## 2.0.0-beta.1

### Minor Changes

- [`dfba51d`](https://github.com/santi020k/eslint-config-basic/commit/dfba51dca7387a71a263af206eb86fd8df15f387) Thanks [@santi020k](https://github.com/santi020k)! - Improve config migration handling and enhance TypeScript options detection

### Patch Changes

- Updated dependencies [[`dfba51d`](https://github.com/santi020k/eslint-config-basic/commit/dfba51dca7387a71a263af206eb86fd8df15f387)]:
  - @santi020k/eslint-config-core@2.0.0-beta.1
  - @santi020k/eslint-config-integrations@2.0.0-beta.1
  - @santi020k/eslint-config-typescript@2.0.0-beta.1
  - @santi020k/eslint-config-angular@2.0.0-beta.1
  - @santi020k/eslint-config-astro@2.0.0-beta.1
  - @santi020k/eslint-config-expo@2.0.0-beta.1
  - @santi020k/eslint-config-hono@2.0.0-beta.1
  - @santi020k/eslint-config-lit@2.0.0-beta.1
  - @santi020k/eslint-config-nest@2.0.0-beta.1
  - @santi020k/eslint-config-next@2.0.0-beta.1
  - @santi020k/eslint-config-nuxt@2.0.0-beta.1
  - @santi020k/eslint-config-qwik@2.0.0-beta.1
  - @santi020k/eslint-config-react@2.0.0-beta.1
  - @santi020k/eslint-config-react-router@2.0.0-beta.1
  - @santi020k/eslint-config-remix@2.0.0-beta.1
  - @santi020k/eslint-config-slidev@2.0.0-beta.1
  - @santi020k/eslint-config-solid@2.0.0-beta.1
  - @santi020k/eslint-config-svelte@2.0.0-beta.1
  - @santi020k/eslint-config-tanstack-start@2.0.0-beta.1
  - @santi020k/eslint-config-vite@2.0.0-beta.1
  - @santi020k/eslint-config-vue@2.0.0-beta.1
  - @santi020k/eslint-config-preact@2.0.0-beta.1

## 2.0.0-beta.0

### Major Changes

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - **Breaking**: require ESLint 10. All packages now declare `"eslint": "^10.0.0"` as peer dependency (previously `^9.0.0 || ^10.0.0`), and `@santi020k/eslint-config-core` depends on `@eslint/js` v10.

  ESLint v9.x reaches end-of-life on 2026-08-06; targeting v10 only lets the configs rely on v10 behavior:

  - per-file config lookup (`eslint.config.*` resolved from each linted file's directory) — workspace packages can now ship their own config files alongside or instead of the root `projects` option
  - JSX reference tracking — correct scope analysis for JSX without plugin workarounds
  - the updated `eslint:recommended` baseline from `@eslint/js` v10

  If you are still on ESLint 9, stay on the v1.x line of these packages.

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Lazy framework loading and normalized framework export naming.

  **Lazy loading**: framework packages (angular-eslint, vue-eslint-parser, eslint-plugin-svelte, …) are now imported dynamically and only when their framework is enabled. Projects that enable none or few frameworks no longer pay the startup cost of loading every bundled framework plugin when `eslintConfig()` / `defineConfig()` runs.

  **Breaking — normalized naming**: framework exports from `@santi020k/eslint-config-basic` now use bare framework names, and all of them are async factories returning `Promise<FlatConfigArray>`:

  `angular`, `astro`, `expo`, `hono`, `lit`, `nest`, `next`, `nuxt`, `qwik`, `react`, `reactRouter`, `slidev`, `solid`, `svelte`, `tanstackStart`, `vite`, `vue` (plus deprecated `remix`).

  The previous mixed-style names (`angularConfig`, `expoConfig`, `nestConfig`, `nextConfig`, `reactConfig`, `solidConfig`, `svelteConfig`, `vueConfig`) remain available as deprecated aliases of the same factories, but they are no longer plain config arrays — call them (and `await` the result) when composing manually:

  ```js
  // before (v1)
  import { reactConfig } from "@santi020k/eslint-config-basic";

  export default [...reactConfig];
  ```

  ```js
  // after (v2)
  import { react } from "@santi020k/eslint-config-basic";

  export default [...(await react())];
  ```

  Most users are unaffected: `frameworks: { react: true }` and auto-detection behave exactly as before.

  `@santi020k/eslint-config-core`: the `ImportedFramework` type now also accepts async factories (`(options?) => Promise<FlatConfigArray>`), so lazy factories can be passed directly as framework option values.

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Release v2 with a single public application install through `@santi020k/eslint-config-basic`.

  Application projects no longer need to install or import separate framework config packages. Framework integrations are bundled behind the main package and can be enabled with booleans such as `frameworks.react: true`, `frameworks.next: true`, or by relying on auto-detection from `eslintConfig()`.

  Detected framework configs are now enabled by default, while an explicit `frameworks: {}` remains the opt-out path. Next.js, Expo, and Remix automatically include React rules when enabled.

  The documentation site now keeps the previous v1 docs under `/v1/`, updates the root docs for v2, and includes a v1 to v2 migration guide.

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Modernize the React stack and rename Remix:

  - **BREAKING**: `@santi020k/eslint-config-react` now uses `@eslint-react/eslint-plugin` instead of `eslint-plugin-react` + `eslint-plugin-react-hooks`. Rule names change from `react/*` and `react-hooks/*` to `@eslint-react/*` (e.g. `react-hooks/exhaustive-deps` → `@eslint-react/exhaustive-deps`). This removes the `fixupConfigRules` compatibility shim, is ESLint 10-native, and includes the hooks rules. `react-compiler` and `react-refresh` plugins are unchanged.
  - **BREAKING**: `@santi020k/eslint-config-remix` is now a deprecated alias that re-exports `@santi020k/eslint-config-react-router` (Remix merged into React Router v7). The `frameworks.remix` key still works but is deprecated — use `frameworks['react-router']`. The alias will be removed in the next major.
  - The toolchain now builds with TypeScript 6.

### Minor Changes

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Add first-class support for Preact.

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - AI tooling workflow improvements:

  - **Default ignores for AI artifacts**: the composed config now ignores AI coding-assistant folders (`.agent`, `.agents`, `.aider*`, `.claude`, `.clinerules`, `.codex`, `.copilot`, `.cursor`, `.gemini`, `.kiro`, `.opencode`, `.roo`, `.windsurf`) so generated agent rules are never linted as source code. Disable via `settings: [Setting.NoDefaultIgnores]`.
  - **`generate-skill --check`**: CI mode that compares existing agent skill files (and guarded `AGENTS.md` / copilot-instructions sections) against freshly generated content without writing, and exits with code 1 when anything is stale or missing.
  - **`generate-skill --create`**: scaffolds a root `AGENTS.md` with the guarded ESLint-standards section when the project has none.
  - **`doctor` duplicate-ESLint detection**: warns when the project and the config packages resolve two different ESLint versions (e.g. an ESLint 9 project pulling in the config's ESLint 10 dependency). Both majors remain supported; the warning helps avoid editor/CLI rule-behavior drift.

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Add broader AI tooling support:

  - **New agent skill targets** in `generate-skill`: Gemini (`.gemini/styleguide.md`), Cline (`.clinerules/`), Roo Code (`.roo/rules/`), and Kiro (`.kiro/steering/` with `inclusion: always` front-matter). The generator also maintains a guarded ESLint-standards section in an existing root `AGENTS.md` (the open standard read by Codex CLI, OpenCode, Jules, Amp, and others), mirroring the `.github/copilot-instructions.md` behavior.
  - **New library integrations**: `Library.Langchain` and `Library.LlamaIndex` add import safety rules for LangChain.js (`langchain`, `@langchain/*`) and LlamaIndex.TS (`llamaindex`, `@llamaindex/*`) projects, with auto-detection from `package.json` dependencies.
  - Generated agent skills now report AI SDK, MCP, Mastra, OpenAI Agents, LangChain, and LlamaIndex integrations in the feature summary.

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Add optional `ignores` to `eslintConfig()` / `EslintConfigOptions` for extra global ignore globs, documented in the configuration guide.

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Add `defineConfig` as a named alias for `eslintConfig`, keep implicit framework expansion from mutating caller-provided options, declare ESLint as a peer dependency of the umbrella package, and mark the package as side-effect free for bundlers.

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Fix `optionMergeStrategy: 'merge'` so explicitly passed options (`tools`, `testing`, `formats`, `libraries`, `extensions`, `frameworks`) are actually unioned with detected and preset values, as documented. Previously, providing any of these options silently replaced detected/preset values regardless of strategy. To fully opt out of detected frameworks, use `autoFrameworks: false` or `optionMergeStrategy: 'replace'` (an explicit `frameworks: {}` no longer opts out under the default merge strategy).

  Other fixes:

  - `detection: false` now also disables the default detected extensions (Unicorn, Perfectionist, Security); a new granular `detection: { extensions: false }` control is available.
  - Negated glob patterns (`!pattern`) in `projects` sub-configs are now scoped correctly instead of producing invalid `path/!glob` patterns.
  - Deprecate the unused `TsOptions` interface (`typescript: { project }` was ignored since v2) and correct stale doc comments on `ImportedFramework` and the no-op `Setting.Gitignore` / `Setting.DefaultIgnores` values.

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Disable context-sensitive framework rules that produce false positives in lint-staged and monorepo layouts: Nest's provider reference rule and Next's Pages Router link rule.

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Add new framework and integration support:

  - **New framework packages**: Nuxt (`@nuxt/eslint-plugin` on top of the Vue config), Lit (`eslint-plugin-lit` + `eslint-plugin-wc`), React Router v7 (successor to Remix), and TanStack Start (bundles TanStack Router + Query rules). All are wired into `eslintConfig()` framework keys, bundled resolvers, auto-detection (`nuxt`, `lit`, `@react-router/dev`, `@tanstack/react-start`, `@tanstack/solid-start`), the CLI, and the agent-skill generator.
  - **New formats**: `Format.Css` (official `@eslint/css` plugin) and `Format.Html` (`@html-eslint`).
  - **New extensions**: `Extension.Node` (`eslint-plugin-n`, with TS-aware module-resolution overrides), `Extension.Compat` (browserslist compatibility), `Extension.DeMorgan`, `Extension.Depend`, and `Extension.Oxlint` (disables rules covered by Oxlint for hybrid setups, applied last like Biome).
  - **New tool**: `Tool.Pnpm` (`eslint-plugin-pnpm`) enforcing pnpm catalogs and workspace settings in `package.json` and `pnpm-workspace.yaml`.

### Patch Changes

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Refresh all external dependencies to their latest versions across the monorepo (58 bumps), including majors: TypeScript 6.0, Vite 8, Angular 22, MikroORM 7, and TypeORM 1.0. ESLint moves to 10.5, the `vite` and `eslint` pnpm overrides are updated to match, and the Angular and NestJS playgrounds now declare `rxjs@^7.8.2` explicitly so framework peer dependencies no longer resolve against a stale transitive rxjs 6.

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Add `@santi020k/eslint-config-lite` as an optional composer package for projects that want to install framework and integration config packages manually. The full `@santi020k/eslint-config-basic` package remains the recommended default install.

  Expose integration composition helpers from `@santi020k/eslint-config-integrations` so the lite package can lazy-load integration configs only when selected.

  Teach `basic-eslint doctor` to recognize lite configs and warn when detected frameworks or integrations are missing their manually installed config packages.

  Add `basic-eslint doctor --lite-install` to print the detected package-manager install command for switching a project to the lite package, including framework config packages, integrations, ESLint, and TypeScript when needed.

  Document package-choice metrics, a Basic-to-Lite migration recipe, and a lite-specific `Preset.All` warning.

- Updated dependencies [[`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc)]:
  - @santi020k/eslint-config-preact@2.0.0-beta.0
  - @santi020k/eslint-config-core@2.0.0-beta.0
  - @santi020k/eslint-config-integrations@2.0.0-beta.0
  - @santi020k/eslint-config-angular@2.0.0-beta.0
  - @santi020k/eslint-config-astro@2.0.0-beta.0
  - @santi020k/eslint-config-expo@2.0.0-beta.0
  - @santi020k/eslint-config-hono@2.0.0-beta.0
  - @santi020k/eslint-config-lit@2.0.0-beta.0
  - @santi020k/eslint-config-nest@2.0.0-beta.0
  - @santi020k/eslint-config-next@2.0.0-beta.0
  - @santi020k/eslint-config-nuxt@2.0.0-beta.0
  - @santi020k/eslint-config-qwik@2.0.0-beta.0
  - @santi020k/eslint-config-react@2.0.0-beta.0
  - @santi020k/eslint-config-react-router@2.0.0-beta.0
  - @santi020k/eslint-config-remix@2.0.0-beta.0
  - @santi020k/eslint-config-slidev@2.0.0-beta.0
  - @santi020k/eslint-config-solid@2.0.0-beta.0
  - @santi020k/eslint-config-svelte@2.0.0-beta.0
  - @santi020k/eslint-config-tanstack-start@2.0.0-beta.0
  - @santi020k/eslint-config-typescript@2.0.0-beta.0
  - @santi020k/eslint-config-vite@2.0.0-beta.0
  - @santi020k/eslint-config-vue@2.0.0-beta.0

## 1.6.0

### Minor Changes

- [#85](https://github.com/santi020k/eslint-config-basic/pull/85) [`664693e`](https://github.com/santi020k/eslint-config-basic/commit/664693ef8edeb51239bf4dc2c75148203bcf41a6) Thanks [@santi020k](https://github.com/santi020k)! - Add `basic-eslint generate-skill` CLI command and `generateAgentSkills()` API.

  The new command scans a project for AI coding-assistant agent folders (`.agent`, `.agents`, `.claude`, `.cursor`, `.windsurf`, `.copilot`, `.aider`) and writes a tailored ESLint standards skill file into each one. The generated file describes the active configuration (TypeScript, frameworks, testing, tools, etc.) and instructs the agent to follow the project's lint conventions automatically.

  A companion GitHub Actions workflow (`.github/workflows/agent-skills.yml`) is included so projects can auto-regenerate skill files whenever the ESLint config changes.

  **Usage:**

  ```bash
  npx basic-eslint generate-skill          # write skill files (skip existing)
  npx basic-eslint generate-skill --force  # overwrite all skill files
  ```

  **Programmatic API:**

  ```ts
  import { generateAgentSkills } from "@santi020k/eslint-config-basic";

  const { skipped, written } = generateAgentSkills({
    cwd: process.cwd(),
    force: true,
  });
  ```

### Patch Changes

- [#85](https://github.com/santi020k/eslint-config-basic/pull/85) [`664693e`](https://github.com/santi020k/eslint-config-basic/commit/664693ef8edeb51239bf4dc2c75148203bcf41a6) Thanks [@santi020k](https://github.com/santi020k)! - Load optional integrations lazily so projects can import the base config without installing unrelated integration peers such as Storybook, GraphQL, Stencil, Cypress, or Testing Library.

  Also include the generated agent-skill API entry in the basic package build output so published packages do not reference a missing `agent-skill-generator.js` file.

- Updated dependencies [[`664693e`](https://github.com/santi020k/eslint-config-basic/commit/664693ef8edeb51239bf4dc2c75148203bcf41a6)]:
  - @santi020k/eslint-config-optionals@1.6.0
  - @santi020k/eslint-config-core@1.6.0
  - @santi020k/eslint-config-typescript@1.6.0

## 1.5.0

### Minor Changes

- [#82](https://github.com/santi020k/eslint-config-basic/pull/82) [`af844f6`](https://github.com/santi020k/eslint-config-basic/commit/af844f663f8403d679467e0dd2a7251e8f3d4bcd) Thanks [@santi020k](https://github.com/santi020k)! - - Add first-class Hono support with Worker runtime globals, package detection, and a playground for Cloudflare Workers-style projects.
  - Lower the Node.js engine requirement to `>=22.18.0` in `package.json` and `.nvmrc`, and validate CI against Node.js 22.
  - Update `README.md` with a landing pointer to the canonical docs site.

### Patch Changes

- Updated dependencies [[`af844f6`](https://github.com/santi020k/eslint-config-basic/commit/af844f663f8403d679467e0dd2a7251e8f3d4bcd)]:
  - @santi020k/eslint-config-core@1.5.0
  - @santi020k/eslint-config-optionals@1.5.0
  - @santi020k/eslint-config-typescript@1.5.0

## 1.4.0

### Minor Changes

- [#80](https://github.com/santi020k/eslint-config-basic/pull/80) [`7bccef0`](https://github.com/santi020k/eslint-config-basic/commit/7bccef0876e4ffde0c7395b5b20917225a067592) Thanks [@santi020k](https://github.com/santi020k)! - # v1.4.0 — API improvements, new optional, and quality-of-life fixes

  ## Breaking changes

  **Unified Node.js requirement to >=24.0.0.**
  All packages in the monorepo now strictly require Node.js 24.0.0 or higher. This ensures compatibility with modern dependency versions (such as `cspell` v10) and aligns with the project's long-term maintenance strategy.

  **`detectProjectOptions()` no longer sets boolean flags on `frameworks`.**
  Previously, auto-detection would set `frameworks.react = true`, `frameworks.next = true`, etc. Passing those values to `eslintConfig()` would throw a `TypeError` because framework configs must be real imports, not booleans.

  Detected frameworks are now reported via a new `detectedFrameworks: DetectedFrameworkName[]` field. The `frameworks` object in the detection result stays empty, so spreading `detectProjectOptions()` into `eslintConfig()` is always safe.

  ```ts
  // Before (would throw)
  const opts = detectProjectOptions();

  eslintConfig(opts); // ❌

  // opts.frameworks.next === true → TypeError inside eslintConfig()

  // After (safe)
  const opts = detectProjectOptions();

  // opts.detectedFrameworks → ['next', 'react']  (informational)
  // opts.frameworks → {}                          (safe to spread)
  eslintConfig(opts); // ✅
  ```

  ## New features

  **`Extension.BestPractices` optional config** — adds four quality rules with no extra dependencies:
  - `no-console` (warn) — catches leftover debug output
  - `no-alert` (error) — disallows browser `alert` / `confirm` / `prompt`
  - `complexity` (warn, max 10) — flags overly complex functions
  - `max-depth` (warn, max 4) — flags deeply nested blocks

  ```ts
  eslintConfig({ extensions: [Extension.BestPractices] });
  ```

  **Category barrel exports for `@santi020k/eslint-config-optionals`** — five new sub-path exports let you import a whole category at once:

  ```ts
  // also: /extensions  /tools  /libraries
  ```

  **`NextMode` auto-detection** — `detectProjectOptions()` now detects App Router vs Pages Router by checking for an `app/` or `src/app/` directory, so `options.nextMode` is set automatically.

  **`DetectedFrameworkName` type** — new exported union type listing all framework names that `detectProjectOptions()` can detect. Useful for display logic or tooling built on top of detection.

  ## Improvements

  **Early `tsconfigRootDir` validation** — `createTypescriptConfig()` now throws a clear, actionable error at config-creation time if the provided `tsconfigRootDir` path does not exist on disk, instead of failing silently at ESLint runtime.

  **CI node version matrix** — the build pipeline now runs against Node 24.x to ensure stability across the updated engine requirements.

  **`docs/PHILOSOPHY.md`** — new document explaining the major design decisions: why hard deps, flat config only, lazy framework loading, rule severity philosophy, and how to extend or override rules.

  **Changelog synchronization** — new `sync-docs-changelog.mjs` script to automatically propagate root changelog updates to the documentation site.

  ## Bug Fixes
  - **CLI Scaffolding**: Resolved bug where auto-detected frameworks were not correctly included in the generated configuration.
  - **Rule Set Update**: Updated React and Expo collections to reflect rule removals in `eslint-plugin-react-hooks@7` recommended configuration.
  - **Tailwind CSS Performance**: Fixed `Atomics.wait()` timeout errors in monorepos by providing customizable settings in the recommended Tailwind configuration.

  ## Dependency Updates
  - **External Plugins**:
    - Updated `@cspell/eslint-plugin` to `v10.0.0` (Major).
    - Updated `typescript-eslint` to `v8.59.0`.
    - Updated `eslint-plugin-react-hooks` to `v7.1.1`.
    - Updated `eslint-plugin-perfectionist` to `v5.9.0`.
    - Updated `eslint-plugin-sonarjs` to `v4.0.3`.
    - Updated `tailwindcss` to `v4.2.4`.
  - **Core Tooling**:
    - Updated `eslint` to `v10.2.1`.
    - Updated `vitest` and `@vitest/coverage-v8` to `v4.1.5`.
    - Internal alignment of `typescript` version to `v5.9.3`.

### Patch Changes

- Updated dependencies [[`7bccef0`](https://github.com/santi020k/eslint-config-basic/commit/7bccef0876e4ffde0c7395b5b20917225a067592)]:
  - @santi020k/eslint-config-core@1.4.0
  - @santi020k/eslint-config-optionals@1.4.0
  - @santi020k/eslint-config-typescript@1.4.0

## 1.3.0

### Minor Changes

- [#77](https://github.com/santi020k/eslint-config-basic/pull/77) [`450fa19`](https://github.com/santi020k/eslint-config-basic/commit/450fa1996aa651671513a32bd5d8736e5336be73) Thanks [@santi020k](https://github.com/santi020k)! - Refresh package metadata and supporting docs for the `santi020k.com` domain migration.
  - Update documentation, canonical URLs, and package links from `santi020k.me` to `santi020k.com`.
  - Sync npm package metadata so published packages point to the correct license, repository, issues page, and documentation URLs.
  - Refresh low-risk ESLint ecosystem and release tooling dependencies.

### Patch Changes

- Updated dependencies [[`450fa19`](https://github.com/santi020k/eslint-config-basic/commit/450fa1996aa651671513a32bd5d8736e5336be73)]:
  - @santi020k/eslint-config-angular@1.3.0
  - @santi020k/eslint-config-astro@1.3.0
  - @santi020k/eslint-config-core@1.3.0
  - @santi020k/eslint-config-expo@1.3.0
  - @santi020k/eslint-config-nest@1.3.0
  - @santi020k/eslint-config-next@1.3.0
  - @santi020k/eslint-config-optionals@1.3.0
  - @santi020k/eslint-config-qwik@1.3.0
  - @santi020k/eslint-config-react@1.3.0
  - @santi020k/eslint-config-remix@1.3.0
  - @santi020k/eslint-config-solid@1.3.0
  - @santi020k/eslint-config-svelte@1.3.0
  - @santi020k/eslint-config-typescript@1.3.0
  - @santi020k/eslint-config-vue@1.3.0

## 1.2.0

### Minor Changes

- [#74](https://github.com/santi020k/eslint-config-basic/pull/74) [`c63e902`](https://github.com/santi020k/eslint-config-basic/commit/c63e902ab0107b9d2231a84715f2d220ea283489) Thanks [@santi020k](https://github.com/santi020k)! - # v1.2.0 Release - Documentation Overhaul

  This release focuses on a comprehensive update of the documentation site and branding refresh.

  ## Highlights
  - **VitePress Refresh**: Major updates to the documentation structure, including new guides and improved navigation.
  - **Branding Assets**: Added new official logos, icons, and social preview images (opengraph) in `packages/docs/public`.
  - **Theme Enhancements**: Custom styling and component improvements for a more premium documentation experience.
  - **Improved Installation Guide**: Updated steps for getting started with the latest features.

### Patch Changes

- Updated dependencies [[`c63e902`](https://github.com/santi020k/eslint-config-basic/commit/c63e902ab0107b9d2231a84715f2d220ea283489)]:
  - @santi020k/eslint-config-core@1.2.0
  - @santi020k/eslint-config-typescript@1.2.0
  - @santi020k/eslint-config-react@1.2.0
  - @santi020k/eslint-config-next@1.2.0
  - @santi020k/eslint-config-astro@1.2.0
  - @santi020k/eslint-config-vue@1.2.0
  - @santi020k/eslint-config-svelte@1.2.0
  - @santi020k/eslint-config-solid@1.2.0
  - @santi020k/eslint-config-angular@1.2.0
  - @santi020k/eslint-config-nest@1.2.0
  - @santi020k/eslint-config-expo@1.2.0
  - @santi020k/eslint-config-qwik@1.2.0
  - @santi020k/eslint-config-remix@1.2.0
  - @santi020k/eslint-config-optionals@1.2.0

## 1.1.0

### Minor Changes

- [#70](https://github.com/santi020k/eslint-config-basic/pull/70) [`ef658c1`](https://github.com/santi020k/eslint-config-basic/commit/ef658c170f6eaadce14a7e662eaa2a3762362e82) Thanks [@santi020k](https://github.com/santi020k)! - # 1.1.0 Release

  ## Update Highlights
  - **ESLint 10 Support**: Harmonized ESLint version to `^10.1.0` across the monorepo and playgrounds.
  - **Security Patches**: Fixed vulnerabilities in `lodash`, `esbuild`, and `path-to-regexp` via root overrides.
  - **Solid Playground Fix**: Resolved `MODULE_NOT_FOUND` error in the Solid playground linting process.

### Patch Changes

- Updated dependencies [[`ef658c1`](https://github.com/santi020k/eslint-config-basic/commit/ef658c170f6eaadce14a7e662eaa2a3762362e82)]:
  - @santi020k/eslint-config-core@1.1.0
  - @santi020k/eslint-config-typescript@1.1.0
  - @santi020k/eslint-config-astro@1.1.0
  - @santi020k/eslint-config-vue@1.1.0
  - @santi020k/eslint-config-optionals@1.1.0
  - @santi020k/eslint-config-qwik@1.1.0
  - @santi020k/eslint-config-remix@1.1.0
  - @santi020k/eslint-config-angular@1.1.0
  - @santi020k/eslint-config-expo@1.1.0
  - @santi020k/eslint-config-nest@1.1.0
  - @santi020k/eslint-config-next@1.1.0
  - @santi020k/eslint-config-react@1.1.0
  - @santi020k/eslint-config-solid@1.1.0
  - @santi020k/eslint-config-svelte@1.1.0

## 1.0.0

### Minor Changes

- [#66](https://github.com/santi020k/eslint-config-basic/pull/66) [`6f2f473`](https://github.com/santi020k/eslint-config-basic/commit/6f2f4733642087eb9eac22a7b6193b71453f375d) Thanks [@santi020k](https://github.com/santi020k)! - v0.10.0 Release

  ## Major Changes
  - **Migration to pnpm**: Full migration of the monorepo from npm to pnpm workspaces (pnpm v10+). This includes better performance, stricter dependency management, and corepack integration.
  - **neostandard removal**: Removed `neostandard` dependency to provide more granular control and modularity in core rules.
  - **Stylistic v4 -> v5**: Upgraded to `@stylistic/eslint-plugin` version 5.x for improved formatting rules and TypeScript 5.7+ support.
  - **GraphQL Integration**: Added comprehensive support for GraphQL schemas and operations. This includes automated project detection for GraphQL files and specialized linting rules for both schema definitions and operation documents.
  - **React 19 Support**: Updated React detection logic and configurations to support React 19.

  ## Framework Updates
  - **Qwik & Remix Support**: Added comprehensive ESLint configurations and functional playground environments for both Qwik and Remix frameworks.
  - **Dependency Alignment**: Resolved critical `typescript-eslint` dependency issues in Astro, Svelte, and Vue packages to ensure proper rule resolution and type safety.
  - **Consistency Refinements**: Standardized `disable-type-checked` rule blocks across all framework-specific configurations.
  - **Documentation Overhaul**: Major documentation refresh in root `README.md` and VitePress documentation. Added clarity on configuration priority, framework auto-detection, and full-settings examples.

  ## Maintenance
  - **Corepack Enablement**: Added `corepack` support for automated package manager version management.
  - **Turbo Update**: Bumped Turborepo to v2.9+ for faster builds and improved task caching.
  - **Turbo Optimizations**: Configured Turborepo to output in `errors-only` mode with `errorsOnlyShowHash` enabled, significantly reducing terminal noise during build and lint tasks.
  - **Integration Test Improvements**: Enhanced integration tests to be more robust, including proper `tsconfigRootDir` handling and better React version validation.
  - **Playground Synchronization**: Updated all playground packages to maintain parity with the latest framework rules.

- [#55](https://github.com/santi020k/eslint-config-basic/pull/55) [`d8e4b4a`](https://github.com/santi020k/eslint-config-basic/commit/d8e4b4a61c2739dbffa3c823d8742ea234c5b731) Thanks [@santi020k](https://github.com/santi020k)! - feat: add standard ESLint configuration and resolve typecheck/hook failures

  This release introduces a new standard configuration in `@santi020k/eslint-config-core` and addresses several technical issues:
  - Fixed global typecheck failures across the monorepo.
  - Resolved pre-commit hook issues with cspell.
  - Fixed pre-push hook failures related to publint in the playground package.
  - Added missing test coverage scripts and fixed CI build failures.

### Patch Changes

- Updated dependencies [[`6f2f473`](https://github.com/santi020k/eslint-config-basic/commit/6f2f4733642087eb9eac22a7b6193b71453f375d), [`d8e4b4a`](https://github.com/santi020k/eslint-config-basic/commit/d8e4b4a61c2739dbffa3c823d8742ea234c5b731)]:
  - @santi020k/eslint-config-angular@1.0.0
  - @santi020k/eslint-config-astro@1.0.0
  - @santi020k/eslint-config-core@1.0.0
  - @santi020k/eslint-config-expo@1.0.0
  - @santi020k/eslint-config-nest@1.0.0
  - @santi020k/eslint-config-next@1.0.0
  - @santi020k/eslint-config-optionals@1.0.0
  - @santi020k/eslint-config-qwik@0.8.2
  - @santi020k/eslint-config-react@1.0.0
  - @santi020k/eslint-config-remix@0.8.2
  - @santi020k/eslint-config-solid@1.0.0
  - @santi020k/eslint-config-svelte@1.0.0
  - @santi020k/eslint-config-typescript@1.0.0
  - @santi020k/eslint-config-vue@1.0.0

## 0.8.1

### Minor Changes

- 13e8e5a: # Release 0.8.0
  - **Snippet Fixes**: Resolved ESLint parsing errors in virtual TypeScript files within Markdown, Astro, and VitePress code blocks by disabling type-aware rules for those snippets.
  - **Standalone TS Support**: Restored `disableTypeChecked` configuration in the TypeScript package, ensuring it remains fully functional and parsing-error-free when used without the main composer.
  - **Documentation Reorganization**: Significantly expanded and restructured the documentation site, adding new pages for the Inspector, CLI Tooling, Extensions, and better framework-specific guides.
  - **Branding Update**: Updated the author link label from "Website" to "Author" across all documentation files for improved brand identity.
  - **Composition Improvements**: Refactored the configuration composer to be more robust when handling virtual snippets and framework contracts.

### Patch Changes

- CI & Workflow Stabilization
  - Fixed invalid `actions/setup-node` version from `@v6` to `@v4` in Release and Docs workflows.
  - Improved CLI test performance and reliability by refactoring integration tests into fast in-memory unit tests.
  - Enabled Turborepo caching in GitHub Actions to significantly reduce PR build times.

- Updated dependencies
- Updated dependencies [13e8e5a]
  - @santi020k/eslint-config-...@0.8.1
  - @santi020k/eslint-config-...@0.8.1
  - @santi020k/eslint-config-...@0.8.1
  - @santi020k/eslint-config-...@0.8.1
  - @santi020k/eslint-config-...@0.8.1
  - @santi020k/eslint-config-...@0.8.1
  - @santi020k/eslint-config-...@0.8.1
  - @santi020k/eslint-config-...@0.8.1
  - @santi020k/eslint-config-...@0.8.1
  - @santi020k/eslint-config-...@0.8.1
  - @santi020k/eslint-config-...@0.8.1
  - @santi020k/eslint-config-...@0.8.1

## 0.7.1

### Patch Changes

- [#43](https://github.com/santi020k/eslint-config-basic/pull/43) [`6ceaa37`](https://github.com/santi020k/eslint-config-basic/commit/6ceaa370b9d5f4dfc3819760367bceb5cfd0ba38) Thanks [@santi020k](https://github.com/santi020k)! - Sync README documentation with implemented features (Vue, Playwright).

- Updated dependencies []:
  - @santi020k/eslint-config-astro@0.7.1
  - @santi020k/eslint-config-core@0.7.1
  - @santi020k/eslint-config-expo@0.7.1
  - @santi020k/eslint-config-nest@0.7.1
  - @santi020k/eslint-config-next@0.7.1
  - @santi020k/eslint-config-optionals@0.7.1
  - @santi020k/eslint-config-react@0.7.1
  - @santi020k/eslint-config-typescript@0.7.1
  - @santi020k/eslint-config-vue@0.7.1

## 0.7.0

### Minor Changes

- [#41](https://github.com/santi020k/eslint-config-basic/pull/41) [`d802dfb`](https://github.com/santi020k/eslint-config-basic/commit/d802dfb2cb2f0813d91170771b3b21b3cf3b5e10) Thanks [@santi020k](https://github.com/santi020k)! - Add Playwright support as an optional configuration.

### Patch Changes

- Updated dependencies [[`d802dfb`](https://github.com/santi020k/eslint-config-basic/commit/d802dfb2cb2f0813d91170771b3b21b3cf3b5e10)]:
  - @santi020k/eslint-config-core@0.5.0
  - @santi020k/eslint-config-optionals@0.5.0

## 0.6.0

### Minor Changes

- [#39](https://github.com/santi020k/eslint-config-basic/pull/39) [`1c11dec`](https://github.com/santi020k/eslint-config-basic/commit/1c11decd67a9874ff42f98a7ac455216313c952f) Thanks [@santi020k](https://github.com/santi020k)! - feat(astro): add robust defaults and virtual script support for Astro 5+
  feat(core): standardize internal dependencies to workspace:\* for better monorepo development
  docs: add Tailwind CSS v4 compatibility notes and workarounds to README

### Patch Changes

- [#39](https://github.com/santi020k/eslint-config-basic/pull/39) [`1c11dec`](https://github.com/santi020k/eslint-config-basic/commit/1c11decd67a9874ff42f98a7ac455216313c952f) Thanks [@santi020k](https://github.com/santi020k)! - Fix missing README in published package by ensuring symlinks are correctly handled during `prepack` and `postpack`, and explicitly including `README.md` and `CHANGELOG.md` in the `files` array.

- [#39](https://github.com/santi020k/eslint-config-basic/pull/39) [`1c11dec`](https://github.com/santi020k/eslint-config-basic/commit/1c11decd67a9874ff42f98a7ac455216313c952f) Thanks [@santi020k](https://github.com/santi020k)! - refactor(optionals): replace eslint-plugin-tailwindcss with eslint-plugin-better-tailwindcss for better Tailwind v4 support

- Updated dependencies [[`1c11dec`](https://github.com/santi020k/eslint-config-basic/commit/1c11decd67a9874ff42f98a7ac455216313c952f), [`1c11dec`](https://github.com/santi020k/eslint-config-basic/commit/1c11decd67a9874ff42f98a7ac455216313c952f)]:
  - @santi020k/eslint-config-astro@0.3.0
  - @santi020k/eslint-config-core@0.4.2
  - @santi020k/eslint-config-typescript@0.1.2
  - @santi020k/eslint-config-react@0.1.2
  - @santi020k/eslint-config-next@0.1.2
  - @santi020k/eslint-config-expo@0.2.2
  - @santi020k/eslint-config-nest@0.2.2
  - @santi020k/eslint-config-vue@0.2.2
  - @santi020k/eslint-config-optionals@0.4.2

## 0.5.0

### Minor Changes

- [#36](https://github.com/santi020k/eslint-config-basic/pull/36) [`85d6a5e`](https://github.com/santi020k/eslint-config-basic/commit/85d6a5e91f5322445eb874fa45693f8368ab4ca4) Thanks [@santi020k](https://github.com/santi020k)! - feat(astro): add robust defaults and virtual script support for Astro 5+
  feat(core): standardize internal dependencies to workspace:\* for better monorepo development
  docs: add Tailwind CSS v4 compatibility notes and workarounds to README

### Patch Changes

- [#36](https://github.com/santi020k/eslint-config-basic/pull/36) [`85d6a5e`](https://github.com/santi020k/eslint-config-basic/commit/85d6a5e91f5322445eb874fa45693f8368ab4ca4) Thanks [@santi020k](https://github.com/santi020k)! - refactor(optionals): replace eslint-plugin-tailwindcss with eslint-plugin-better-tailwindcss for better Tailwind v4 support

- Updated dependencies [[`85d6a5e`](https://github.com/santi020k/eslint-config-basic/commit/85d6a5e91f5322445eb874fa45693f8368ab4ca4), [`85d6a5e`](https://github.com/santi020k/eslint-config-basic/commit/85d6a5e91f5322445eb874fa45693f8368ab4ca4)]:
  - @santi020k/eslint-config-astro@0.2.0
  - @santi020k/eslint-config-core@0.4.1
  - @santi020k/eslint-config-typescript@0.1.1
  - @santi020k/eslint-config-react@0.1.1
  - @santi020k/eslint-config-next@0.1.1
  - @santi020k/eslint-config-expo@0.2.1
  - @santi020k/eslint-config-nest@0.2.1
  - @santi020k/eslint-config-vue@0.2.1
  - @santi020k/eslint-config-optionals@0.4.1

## 0.4.0

### Minor Changes

- [#34](https://github.com/santi020k/eslint-config-basic/pull/34) [`f015876`](https://github.com/santi020k/eslint-config-basic/commit/f015876442b88b395cd3775b06f829349dd34d3a) Thanks [@santi020k](https://github.com/santi020k)! - feat: add eslint-plugin-sonarjs as optional config
  chore: remove tailwindcss from playground and test package dependencies
  docs: update AI Agent skills in README

### Patch Changes

- Updated dependencies [[`f015876`](https://github.com/santi020k/eslint-config-basic/commit/f015876442b88b395cd3775b06f829349dd34d3a)]:
  - @santi020k/eslint-config-core@0.4.0
  - @santi020k/eslint-config-optionals@0.4.0

## 0.3.0

### Minor Changes

- [#28](https://github.com/santi020k/eslint-config-basic/pull/28) [`162afdb`](https://github.com/santi020k/eslint-config-basic/commit/162afdb2f0a30714487915bdf083234426018ad2) Thanks [@santi020k](https://github.com/santi020k)! - feat: add `regexp` optional config with `eslint-plugin-regexp`
  - New `OptionalOption.Regexp` to enable regex linting via `eslint-plugin-regexp`
  - Catches common regex mistakes: exponential backtracking, unnecessary escapes, and optimizable character classes
  - Uses recommended rules with selective overrides for smoother adoption

### Patch Changes

- [#27](https://github.com/santi020k/eslint-config-basic/pull/27) [`577abbe`](https://github.com/santi020k/eslint-config-basic/commit/577abbe49c2a83f6ecc744413daf3d1e1e16be2c) Thanks [@santi020k](https://github.com/santi020k)! - ci: disable Husky git hooks during the release workflow
  - Added `HUSKY=0` environment variable to the release workflow to prevent Git hooks from interfering with the automated release process

- [#25](https://github.com/santi020k/eslint-config-basic/pull/25) [`1fb4693`](https://github.com/santi020k/eslint-config-basic/commit/1fb4693b4ff6e3a1a9404096e14039121e1297b5) Thanks [@santi020k](https://github.com/santi020k)! - feat: add GitHub-linked changelogs and automatic GitHub releases with tags
  - Switched changelog generator to `@changesets/changelog-github` for richer changelogs with PR links, commit references, and contributor credits
  - Configured release workflow to create GitHub releases with git tags on publish

- Updated dependencies [[`162afdb`](https://github.com/santi020k/eslint-config-basic/commit/162afdb2f0a30714487915bdf083234426018ad2), [`1fb4693`](https://github.com/santi020k/eslint-config-basic/commit/1fb4693b4ff6e3a1a9404096e14039121e1297b5)]:
  - @santi020k/eslint-config-core@0.3.0
  - @santi020k/eslint-config-optionals@0.3.0

## 0.2.0

### Minor Changes

- feat: add Nest.js, Vue, and Expo ESLint configs with optionals package
  - Added `@santi020k/eslint-config-nest` with NestJS-specific linting rules
  - Added `@santi020k/eslint-config-vue` with Vue 3 linting rules
  - Added `@santi020k/eslint-config-expo` with Expo/React Native linting rules
  - Added `@santi020k/eslint-config-optionals` for optional integrations (Tailwind, Vitest, cspell, i18next, MDX, Markdown, Stencil)
  - Added `ConfigOption.Nest`, `ConfigOption.Vue`, and `ConfigOption.Expo` enum values
  - Updated PR template with changeset reminder

### Patch Changes

- Updated dependencies
  - @santi020k/eslint-config-core@0.2.0
  - @santi020k/eslint-config-nest@0.2.0
  - @santi020k/eslint-config-vue@0.2.0
  - @santi020k/eslint-config-expo@0.2.0
  - @santi020k/eslint-config-optionals@0.2.0

## 0.1.0

### Minor Changes

- publish testing

### Patch Changes

- Updated dependencies
  - @santi020k/eslint-config-typescript@0.1.0
  - @santi020k/eslint-config-optionals@0.1.0
  - @santi020k/eslint-config-astro@0.1.0
  - @santi020k/eslint-config-react@0.1.0
  - @santi020k/eslint-config-core@0.1.0
  - @santi020k/eslint-config-expo@0.1.0
  - @santi020k/eslint-config-nest@0.1.0
  - @santi020k/eslint-config-next@0.1.0
  - @santi020k/eslint-config-vue@0.1.0
