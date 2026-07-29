---
title: Architecture Notes
description: Contributor-facing architecture boundaries for the monorepo.
---

This document defines contributor-facing architecture boundaries for the monorepo.

## Composition Responsibilities

- [`detection.ts`](https://github.com/santi020k/eslint-config-basic/blob/main/packages/core/src/utils/detection.ts)
  - Reads project signals (`package.json`, tsconfig presence, GraphQL schema files).
  - Produces detected options (`detectedFrameworks`, runtime, integrations, preset hints).
  - Must stay side-effect free beyond filesystem reads.
- [`resolvers.ts`](https://github.com/santi020k/eslint-config-basic/blob/main/packages/basic/src/resolvers.ts)
  - Resolves preset defaults and framework inputs.
  - Accepts installed optional framework flags (`true`) and imported config arrays/factories.
- [`index.ts`](https://github.com/santi020k/eslint-config-basic/blob/main/packages/basic/src/index.ts)
  - Composes final flat-config order.
  - Applies merge strategy, framework dependencies, integrations, and strict mode.
  - Keeps final ordering contract: core -> frameworks -> TypeScript -> integrations -> Prettier.
- [`integrations.ts`](https://github.com/santi020k/eslint-config-basic/blob/main/packages/basic/src/integrations.ts)
  - Loads only the installed feature-pack registries required by the selected categories.
  - Resolves the shared `ConfigFeature` contract without importing plugin implementations into the composer.
- [`feature.ts`](https://github.com/santi020k/eslint-config-basic/blob/main/packages/core/src/feature.ts)
  - Defines the ecosystem-neutral feature adapter contract.
  - Sorts selected features and separates normal configs from finalizers such as Prettier.
- Feature packs (`packages/extensions`, `packages/formats`, `packages/libraries`,
  `packages/testing`, and `packages/tools`)
  - Own their plugin dependencies, public factories, and feature registries.
  - Keep adding one category from installing unrelated categories.
- [`packages/integrations`](https://github.com/santi020k/eslint-config-basic/tree/main/packages/integrations)
  - Is a compatibility aggregate over the five feature packs.
  - Does not own plugin implementations.

## Data Flow

1. `detectProjectOptions()` infers defaults.
2. `resolvePreset()` provides preset defaults.
3. `defineConfig()` merges detected + preset + explicit options.
4. Frameworks are resolved through `resolveFramework()`.
5. Selected feature-pack registries are resolved through `getIntegrationConfigs()`.
6. Prettier is appended last via `getPrettierConfig()`.
7. Strict mode is applied at the end with `applyStrictMode()`.

## Contract Rules

- [`types.ts`](https://github.com/santi020k/eslint-config-basic/blob/main/packages/core/src/types.ts) is the single source of truth for enums and option types.
- New enum values require mapping updates in:
  - the matching feature pack registry,
  - [`resolvers.ts`](https://github.com/santi020k/eslint-config-basic/blob/main/packages/basic/src/resolvers.ts) (presets when applicable),
  - integration tests under `packages/tests/src/`.
- Feature adapters must use globally stable `order` values. Prettier and other
  final overrides use the `finalizer` phase.
- Detection precedence must remain deterministic:
  - `Worker > Node > Browser > Universal`.
- Framework implication rules (for example, `next` and `expo` imply `react`) must stay covered by tests.

## Documentation Governance

Docs lifecycle policy for current docs and the frozen version archives lives in:

- [`DOCS_GOVERNANCE.md`](https://github.com/santi020k/eslint-config-basic/blob/main/apps/docs/DOCS_GOVERNANCE.md)
