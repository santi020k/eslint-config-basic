---
title: Architecture Notes
description: Contributor-facing architecture boundaries for the monorepo.
---

This document defines contributor-facing architecture boundaries for the monorepo.

## Composition Responsibilities

- [detection.ts](file:///Users/smith/Projects/santi020k/eslint-config-basic/packages/core/src/utils/detection.ts)
  - Reads project signals (`package.json`, tsconfig presence, GraphQL schema files).
  - Produces detected options (`detectedFrameworks`, runtime, integrations, preset hints).
  - Must stay side-effect free beyond filesystem reads.
- [resolvers.ts](file:///Users/smith/Projects/santi020k/eslint-config-basic/packages/basic/src/resolvers.ts)
  - Resolves preset defaults and framework inputs.
  - Accepts installed optional framework flags (`true`) and imported config arrays/factories.
- [index.ts](file:///Users/smith/Projects/santi020k/eslint-config-basic/packages/basic/src/index.ts)
  - Composes final flat-config order.
  - Applies merge strategy, framework dependencies, integrations, and strict mode.
  - Keeps final ordering contract: core -> frameworks -> TypeScript -> integrations -> Prettier.
- [integrations.ts](file:///Users/smith/Projects/santi020k/eslint-config-basic/packages/basic/src/integrations.ts)
  - Maps enum selections from `packages/core/src/types.ts` to integration config arrays.
  - Every enum value must map to at least one config array branch.

## Data Flow

1. `detectProjectOptions()` infers defaults.
2. `resolvePreset()` provides preset defaults.
3. `eslintConfig()` merges detected + preset + explicit options.
4. Frameworks are resolved through `resolveFramework()`.
5. Integrations are appended via `getIntegrationConfigs()`.
6. Prettier is appended last via `getPrettierConfig()`.
7. Strict mode is applied at the end with `applyStrictMode()`.

## Contract Rules

- [types.ts](file:///Users/smith/Projects/santi020k/eslint-config-basic/packages/core/src/types.ts) is the single source of truth for enums and option types.
- New enum values require mapping updates in:
  - [integrations.ts](file:///Users/smith/Projects/santi020k/eslint-config-basic/packages/basic/src/integrations.ts) (integrations),
  - [resolvers.ts](file:///Users/smith/Projects/santi020k/eslint-config-basic/packages/basic/src/resolvers.ts) (presets when applicable),
  - integration tests under `packages/tests/src/`.
- Detection precedence must remain deterministic:
  - `Worker > Node > Browser > Universal`.
- Framework implication rules (for example, `next` and `expo` imply `react`) must stay covered by tests.

## Documentation Governance

Docs lifecycle policy for current docs vs `v1` archive lives in:

- [DOCS_GOVERNANCE.md](file:///Users/smith/Projects/santi020k/eslint-config-basic/packages/docs/DOCS_GOVERNANCE.md)
