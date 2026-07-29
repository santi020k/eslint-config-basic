# @santi020k/eslint-config-docs

## 3.1.0

### Patch Changes

- [#99](https://github.com/santi020k/eslint-config-basic/pull/99) [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967) Thanks [@santi020k](https://github.com/santi020k)! - Deprecate the Lite and Integrations compatibility packages during v3 and
  schedule their removal for v4. Add TypeScript deprecation annotations,
  migration guidance, and post-publish npm registry warnings. Also deprecate the
  `integrations` option alias and `doctor --lite-install` compatibility workflow.

- [#99](https://github.com/santi020k/eslint-config-basic/pull/99) [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967) Thanks [@santi020k](https://github.com/santi020k)! - Add a `basic-eslint install` command that detects missing framework, feature
  category, ESLint, and TypeScript dependencies and installs them with the
  project's package manager. Document the command in the v3 setup flow.

- [#99](https://github.com/santi020k/eslint-config-basic/pull/99) [`0f89b89`](https://github.com/santi020k/eslint-config-basic/commit/0f89b89b466732ea582650b4e0baee0c47b0c967) Thanks [@santi020k](https://github.com/santi020k)! - Add v3 lifecycle tooling to the `basic-eslint` CLI: an automated v2-to-v3
  migration planner and writer, incremental strict-mode baselines backed by ESLint
  bulk suppressions, rule-performance profiling with concurrency comparison,
  effective-rule snapshots and diffs, and optional official ESLint MCP
  scaffolding for generated agent standards.

## 2.1.1

## 2.1.0

## 2.0.0

### Major Changes

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Release v2 with a single public application install through `@santi020k/eslint-config-basic`.

  Application projects no longer need to install or import separate framework config packages. Framework integrations are bundled behind the main package and can be enabled with booleans such as `frameworks.react: true`, `frameworks.next: true`, or by relying on auto-detection from `eslintConfig()`.

  Detected framework configs are now enabled by default, while an explicit `frameworks: {}` remains the opt-out path. Next.js, Expo, and Remix automatically include React rules when enabled.

  The documentation site now keeps the previous v1 docs under `/v1/`, updates the root docs for v2, and includes a v1 to v2 migration guide.

### Minor Changes

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

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Fix `optionMergeStrategy: 'merge'` so explicitly passed options (`tools`, `testing`, `formats`, `libraries`, `extensions`, `frameworks`) are actually unioned with detected and preset values, as documented. Previously, providing any of these options silently replaced detected/preset values regardless of strategy. To fully opt out of detected frameworks, use `autoFrameworks: false` or `optionMergeStrategy: 'replace'` (an explicit `frameworks: {}` no longer opts out under the default merge strategy).

  Other fixes:

  - `detection: false` now also disables the default detected extensions (Unicorn, Perfectionist, Security); a new granular `detection: { extensions: false }` control is available.
  - Negated glob patterns (`!pattern`) in `projects` sub-configs are now scoped correctly instead of producing invalid `path/!glob` patterns.
  - Deprecate the unused `TsOptions` interface (`typescript: { project }` was ignored since v2) and correct stale doc comments on `ImportedFramework` and the no-op `Setting.Gitignore` / `Setting.DefaultIgnores` values.

### Patch Changes

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Align documentation with the published surface area: add Vite and Slidev to the root README, llms context files, installation/configuration framework matrices, and homepage framework-guide count; refresh agent guides (CLAUDE.md, .agent rules and skills) to reflect the v2 architecture (bundled frameworks, `packages/integrations`, Astro Starlight docs).

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Document and test the Lit, Nuxt, React Router, and TanStack Start packages: add package READMEs (previously blank on npm), add framework guide pages to the docs site sidebar, and list the four frameworks in the root README, llms.txt, llms-full.txt, and docs site metadata. Add detection, config export, and composition tests plus lint playgrounds for all four frameworks. Also add the six missing packages (lit, nuxt, react-router, slidev, tanstack-start, vite) to the Changesets `fixed` group so all publishable packages stay version-locked.

## 2.0.0-beta.3

## 2.0.0-beta.2

## 2.0.0-beta.1

## 2.0.0-beta.0

### Major Changes

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Release v2 with a single public application install through `@santi020k/eslint-config-basic`.

  Application projects no longer need to install or import separate framework config packages. Framework integrations are bundled behind the main package and can be enabled with booleans such as `frameworks.react: true`, `frameworks.next: true`, or by relying on auto-detection from `eslintConfig()`.

  Detected framework configs are now enabled by default, while an explicit `frameworks: {}` remains the opt-out path. Next.js, Expo, and Remix automatically include React rules when enabled.

  The documentation site now keeps the previous v1 docs under `/v1/`, updates the root docs for v2, and includes a v1 to v2 migration guide.

### Minor Changes

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

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Fix `optionMergeStrategy: 'merge'` so explicitly passed options (`tools`, `testing`, `formats`, `libraries`, `extensions`, `frameworks`) are actually unioned with detected and preset values, as documented. Previously, providing any of these options silently replaced detected/preset values regardless of strategy. To fully opt out of detected frameworks, use `autoFrameworks: false` or `optionMergeStrategy: 'replace'` (an explicit `frameworks: {}` no longer opts out under the default merge strategy).

  Other fixes:

  - `detection: false` now also disables the default detected extensions (Unicorn, Perfectionist, Security); a new granular `detection: { extensions: false }` control is available.
  - Negated glob patterns (`!pattern`) in `projects` sub-configs are now scoped correctly instead of producing invalid `path/!glob` patterns.
  - Deprecate the unused `TsOptions` interface (`typescript: { project }` was ignored since v2) and correct stale doc comments on `ImportedFramework` and the no-op `Setting.Gitignore` / `Setting.DefaultIgnores` values.

### Patch Changes

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Align documentation with the published surface area: add Vite and Slidev to the root README, llms context files, installation/configuration framework matrices, and homepage framework-guide count; refresh agent guides (CLAUDE.md, .agent rules and skills) to reflect the v2 architecture (bundled frameworks, `packages/integrations`, Astro Starlight docs).

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Document and test the Lit, Nuxt, React Router, and TanStack Start packages: add package READMEs (previously blank on npm), add framework guide pages to the docs site sidebar, and list the four frameworks in the root README, llms.txt, llms-full.txt, and docs site metadata. Add detection, config export, and composition tests plus lint playgrounds for all four frameworks. Also add the six missing packages (lit, nuxt, react-router, slidev, tanstack-start, vite) to the Changesets `fixed` group so all publishable packages stay version-locked.

## 1.6.0

## 1.5.0

### Minor Changes

- [#82](https://github.com/santi020k/eslint-config-basic/pull/82) [`af844f6`](https://github.com/santi020k/eslint-config-basic/commit/af844f663f8403d679467e0dd2a7251e8f3d4bcd) Thanks [@santi020k](https://github.com/santi020k)! - - Add first-class Hono support with Worker runtime globals, package detection, and a playground for Cloudflare Workers-style projects.
  - Lower the Node.js engine requirement to `>=22.18.0` in `package.json` and `.nvmrc`, and validate CI against Node.js 22.
  - Update `README.md` with a landing pointer to the canonical docs site.

## 1.4.0

## 1.3.0

### Minor Changes

- [#77](https://github.com/santi020k/eslint-config-basic/pull/77) [`450fa19`](https://github.com/santi020k/eslint-config-basic/commit/450fa1996aa651671513a32bd5d8736e5336be73) Thanks [@santi020k](https://github.com/santi020k)! - Refresh package metadata and supporting docs for the `santi020k.com` domain migration.
  - Update documentation, canonical URLs, and package links from `santi020k.me` to `santi020k.com`.
  - Sync npm package metadata so published packages point to the correct license, repository, issues page, and documentation URLs.
  - Refresh low-risk ESLint ecosystem and release tooling dependencies.

## 1.2.0

### Minor Changes

- [#74](https://github.com/santi020k/eslint-config-basic/pull/74) [`c63e902`](https://github.com/santi020k/eslint-config-basic/commit/c63e902ab0107b9d2231a84715f2d220ea283489) Thanks [@santi020k](https://github.com/santi020k)! - # v1.2.0 Release - Documentation Overhaul

  This release focuses on a comprehensive update of the documentation site and branding refresh.

  ## Highlights
  - **VitePress Refresh**: Major updates to the documentation structure, including new guides and improved navigation.
  - **Branding Assets**: Added new official logos, icons, and social preview images (opengraph) in `packages/docs/public`.
  - **Theme Enhancements**: Custom styling and component improvements for a more premium documentation experience.
  - **Improved Installation Guide**: Updated steps for getting started with the latest features.

## Unreleased

### Documentation Updates

- v2-focused homepage refresh: gradient migration banner, staggered section fades, hero mesh/grid/shine, v2 badge and tagline styling, and clearer paths to the migration guide alongside existing guides.
- Refined the VitePress UI to stay closer to the `santi020k.me` visual language, including footer versioning, responsive navigation improvements, and stronger homepage presentation.
- Expanded installation guidance to cover every supported framework package with package-manager tabs for `pnpm`, `npm`, `yarn`, and `bun`.
- Updated CLI examples and package guides so the docs show consistent multi-package-manager commands instead of a single-manager path.
- Clarified coverage across guide pages and API reference pages so framework support is easier to understand at a glance.
- Added contributor governance docs for current docs vs `v1` archive ownership, plus CI/docs-script consistency expectations.
- Added documentation for the new Preact framework integration.

## 1.1.0

### Minor Changes

- [#70](https://github.com/santi020k/eslint-config-basic/pull/70) [`ef658c1`](https://github.com/santi020k/eslint-config-basic/commit/ef658c170f6eaadce14a7e662eaa2a3762362e82) Thanks [@santi020k](https://github.com/santi020k)! - # 1.1.0 Release

  ## Update Highlights
  - **ESLint 10 Support**: Harmonized ESLint version to `^10.1.0` across the monorepo and playgrounds.
  - **Security Patches**: Fixed vulnerabilities in `lodash`, `esbuild`, and `path-to-regexp` via root overrides.
  - **Solid Playground Fix**: Resolved `MODULE_NOT_FOUND` error in the Solid playground linting process.

## 0.0.1

### Patch Changes

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
