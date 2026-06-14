---
name: testing
description: How to run and add tests for @santi020k/eslint-config-basic. Includes TDD workflow.
---

# Testing the ESLint Configurations

The monorepo uses [Vitest](https://vitest.dev/). All tests live in `packages/tests/src/`.

## 1. Running Tests

```bash
# Full suite from repo root
pnpm run test

# Single file during development
cd packages/tests && node node_modules/vitest/dist/cli.js run src/integration.test.ts

# Update snapshots after intentional config changes
cd packages/tests && node node_modules/vitest/dist/cli.js run src/snapshots.test.ts --update-snapshots
```

## 2. Test File Map

| File | What it tests |
| :--- | :--- |
| `contracts.test.ts` | Every enum value → config; every DetectedFrameworkName resolves |
| `configs.test.ts` | Every framework/optional exports a non-empty config array; plugins are present |
| `types.test.ts` | All enum values are present and correctly typed |
| `public-api.test.ts` | All enums and configs re-exported from the main package |
| `composition.test.ts` | `eslintConfig()` composition — passing frameworks/optionals includes the right configs |
| `options.test.ts` | Deep rule assertions — specific rules exist when right options are passed |
| `snapshots.test.ts` | Snapshot of rule names and config entry names for each framework/optional |
| `detection.test.ts` | Auto-detection from `package.json` deps |
| `integration.test.ts` | Real linting via `lintText()` on fixture files |
| `invariants.test.ts` | API surface and ordering contracts |
| `edge-cases.test.ts` | Graceful handling of empty/undefined/invalid options |
| `cli.test.ts` | CLI scaffolding (`npx santi-eslint init`) |
| `playground-frameworks.test.ts` | Lints playground environments per framework |
| `roadmap.test.ts` | Tracks planned-feature expectations |

## 3. TDD Workflow

This project uses **Test-Driven Development**. Tests are written before implementation. `contracts.test.ts` and `types.test.ts` act as the specification — a failing test means the implementation is missing.

### Red → Green → Refactor

**Red phase** (before any implementation code):
```bash
# 1. Add enum value to packages/core/src/types.ts
# 2. Add to contracts.test.ts and types.test.ts coverage arrays
pnpm run test  # → MUST FAIL. If it passes, the test is not verifying anything real.
```

**Green phase** (implement until tests pass):
```bash
# 3. Create the factory / package
# 4. Register in the lazy loader
# 5. Add re-exports
pnpm run test  # → MUST PASS now
```

**Refactor phase** (deepen coverage without changing behavior):
```bash
# 6. Add rule assertions in options.test.ts
# 7. Add detection test in detection.test.ts (if auto-detectable)
# 8. Add snapshot in snapshots.test.ts
pnpm run build && pnpm run test  # → still green
```

**Rule:** A test that passes before the factory is implemented is not a contract — it's a false positive. Always verify the Red state before writing implementation.

## 4. Test Utilities

`packages/tests/src/test-utils.ts` exports helpers used across test files:

```ts
extractRuleNames(config: Record<string, unknown>[]): string[]
extractConfigNames(config: Record<string, unknown>[]): string[]
lintText(code: string, config: TSESLint.FlatConfig.ConfigArray, filePath: string): Promise<ESLint.LintResult[]>
```

## 5. Integration Test — Important Gotcha

When writing tests that call `lintText()`, **do not rely on auto-detection for TypeScript** if the test uses a virtual file path. Auto-detection finds `packages/tests/tsconfig.json` and activates `projectService`, which rejects virtual paths not in a real tsconfig.

```ts
// ✅ Correct
const config = eslintConfig({ typescript: false, frameworks: { react: reactConfig } })
// ❌ Wrong — auto-detection activates projectService and rejects virtual paths
const config = eslintConfig({ frameworks: { react: reactConfig } })
```

## 6. Adding New Tests

### When adding a new framework

1. **`contracts.test.ts`** and **`types.test.ts`** — add to coverage arrays (do this FIRST for TDD)
2. **`configs.test.ts`** — import config and assert `config.length > 0`
3. **`composition.test.ts`** — assert config entry name appears in composed output
4. **`options.test.ts`** — assert a framework-specific rule is present
5. **`snapshots.test.ts`** — add rule name and entry name snapshot
6. **`detection.test.ts`** — add detection test if auto-detectable
7. **`integration.test.ts`** (optional) — real linting with a fixture file; use `typescript: false`

### When adding a new optional

1. **`contracts.test.ts`** — add to coverage array (do this FIRST)
2. **`composition.test.ts`** — assert config entry name appears
3. **`options.test.ts`** — assert a specific rule from the optional is present
4. **`detection.test.ts`** — if auto-detectable from `package.json` deps

### Fixtures

`packages/tests/fixtures/` contains real source files for `integration.test.ts`. Add new fixture files here when adding integration tests for new frameworks or formats.

## 7. Pre-Commit Validation

```bash
pnpm run build && pnpm run lint && pnpm run test
```

All three must pass. Tests also run in CI on every PR.
