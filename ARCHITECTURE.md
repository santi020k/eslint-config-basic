# Architecture Notes

This document defines contributor-facing architecture boundaries for the monorepo.

## Composition Responsibilities

- `packages/core/src/utils/detection.ts`
  - Reads project signals (`package.json`, tsconfig presence, GraphQL schema files).
  - Produces detected options (`detectedFrameworks`, runtime, optionals, preset hints).
  - Must stay side-effect free beyond filesystem reads.
- `packages/basic/src/resolvers.ts`
  - Resolves preset defaults and framework inputs.
  - Accepts bundled framework flags (`true`) and imported config arrays/factories.
- `packages/basic/src/index.ts`
  - Composes final flat-config order.
  - Applies merge strategy, framework dependencies, optionals, and strict mode.
  - Keeps final ordering contract: core -> frameworks -> TypeScript -> optionals -> Prettier.
- `packages/basic/src/optionals.ts`
  - Maps enum selections from `packages/core/src/types.ts` to optional config arrays.
  - Every enum value must map to at least one config array branch.

## Data Flow

1. `detectProjectOptions()` infers defaults.
2. `resolvePreset()` provides preset defaults.
3. `eslintConfig()` merges detected + preset + explicit options.
4. Frameworks are resolved through `resolveFramework()`.
5. Optionals are appended via `getOptionalConfigs()`.
6. Prettier is appended last via `getPrettierConfig()`.
7. Strict mode is applied at the end with `applyStrictMode()`.

## Contract Rules

- `packages/core/src/types.ts` is the single source of truth for enums and option types.
- New enum values require mapping updates in:
  - `packages/basic/src/optionals.ts` (optionals),
  - `packages/basic/src/resolvers.ts` (presets when applicable),
  - integration tests under `packages/tests/src/`.
- Detection precedence must remain deterministic:
  - `Worker > Node > Browser > Universal`.
- Framework implication rules (for example, `next` and `expo` imply `react`) must stay covered by tests.

## Documentation Governance

Docs lifecycle policy for current docs vs `v1` archive lives in:

- `packages/docs/DOCS_GOVERNANCE.md`
