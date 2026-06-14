---
name: testing
description: How to run, read, and add tests for @santi020k/eslint-config-basic. Includes TDD workflow and test file map.
---

# Testing the ESLint Configurations

All tests live in `packages/tests/src/` and run via Vitest.

## 1. Running Tests

```bash
# Full suite (build first, then test)
pnpm run test

# Single file during development
cd packages/tests && node node_modules/vitest/dist/cli.js run src/contracts.test.ts

# Update snapshots after intentional config changes
cd packages/tests && node node_modules/vitest/dist/cli.js run src/snapshots.test.ts --update-snapshots

# Full validation including lint and types
pnpm run ok
```

## 2. Test File Map (21 files)

| File | What it tests | Manual update needed? |
| :--- | :--- | :--- |
| `contracts.test.ts` | All `Library`, `Testing`, `Format`, `Extension`, `Tool` enum values produce valid configs. Auto-iterates `Object.values()` — **adding an enum is enough to get Red** | No — auto |
| `types.test.ts` | Enum string values are present (`.toContain('value')`). Needs a new line per new enum value. | **Yes** |
| `configs.test.ts` | Each framework package exports a non-empty config array; plugins are present | Yes (new frameworks) |
| `composition.test.ts` | `eslintConfig()`/`defineConfig()` with various option combos; config entry names appear | Yes (new options/frameworks) |
| `options.test.ts` | Deep rule assertions — specific rules present when right options are passed | Yes (new integrations) |
| `detection.test.ts` | Auto-detection from `package.json` deps, tsconfig, scripts | Yes (new auto-detectable items) |
| `detection-fixtures.test.ts` | Detection with real `package.json` fixture combos | Sometimes |
| `detection-internals.test.ts` | Internal detection function unit tests (deduplication etc.) | Rarely |
| `public-api.test.ts` | All enum values and factory functions re-exported from the main package | Yes (new enums/factories) |
| `snapshots.test.ts` | Rule name + config entry name regression snapshots per framework/optional | Yes (new frameworks/rules) |
| `composed-snapshots.test.ts` | Snapshots for composed multi-option configurations | Rarely |
| `integration.test.ts` | Real linting via `lintText()` on fixture files in `fixtures/` | Yes (new file formats) |
| `edge-cases.test.ts` | Framework conflicts and edge cases (Expo + Next, multiple React frameworks) | Rarely |
| `invariants.test.ts` | Config ordering invariants (gitignore ordering, rule structure) | Rarely |
| `strict-lazy.test.ts` | Strict mode lazy loading and merging behavior | Rarely |
| `rules.test.ts` | Core/React/TypeScript rule exports and import group classification | Rarely |
| `cli.test.ts` | CLI commands (`handleInit`, `handleUpdate`, `handleExplain`, etc.) and agent skill generation | Yes (new CLI commands) |
| `consumer-e2e.test.ts` | E2E linting against the built package from an external project context | Rarely |
| `package-artifacts.test.ts` | All public packages have `dist/` artifacts (exports, types, bin) | Rarely |
| `roadmap.test.ts` | Planned feature expectations (v1.0.0 roadmap) | Rarely |
| `playground-frameworks.test.ts` | Framework playground environment linting | Yes (new playgrounds) |

## 3. Test Utilities (`packages/tests/src/test-utils.ts`)

```ts
extractRuleNames(config)            // All unique rule IDs across a config array
extractConfigNames(config)          // All named config entries (filters undefined names)
getEffectiveRuleValue(config, rule) // Final value for a rule (last definition wins)
lintText(code, config, fileName)    // Lint a code string via ESLint API
lintFile(filePath, config)          // Lint a real file via ESLint API
```

## 4. TDD Workflow

This project uses **Test-Driven Development**. Tests are written (or registered) before implementation.

### How the Red state works per test file

**`contracts.test.ts` — automatic Red**
This file calls `Object.values(Library)`, `Object.values(Testing)`, etc. and verifies each value adds configs when passed to `defineConfig()`. Adding an enum value to `packages/core/src/types.ts` is all you need — the test automatically picks it up and fails until `compose.ts` is wired.

```bash
# After adding enum to types.ts:
pnpm run test  # → RED: "Library 'mylib' is not mapped"
```

**`types.test.ts` — manual Red**
This file checks individual string values with `.toContain()`. You must add a line:
```ts
expect(options).toContain('mylib')  // add this manually
```
Then run tests to confirm it fails (the value must exist in the enum for the line to compile).

**Framework tests (`configs.test.ts`, `composition.test.ts`) — manual Red**
Add test imports and assertions before the package exists. The test will fail at import or assertion level.

### Red → Green → Refactor

**Red phase:**
1. Add enum value to `packages/core/src/types.ts`
2. Add `.toContain('value')` to `types.test.ts`
3. Run `pnpm run test` → must be RED

**Green phase:**
4. Implement the factory / package
5. Wire in `compose.ts` (integrations) or `frameworkLoaders` Map (frameworks)
6. Add re-exports
7. Run `pnpm run test` → must be GREEN

**Refactor phase:**
8. Add rule assertions to `options.test.ts`
9. Add detection test to `detection.test.ts` if auto-detectable
10. Add snapshot to `snapshots.test.ts`
11. `pnpm run ok` → still green

**Rule:** If the test passes before the factory exists, the test is not a contract. Always verify Red before implementing.

## 5. Integration Test Gotcha

When calling `lintText()`, **do not rely on auto-detection for TypeScript** with virtual file paths. Auto-detection finds `packages/tests/tsconfig.json` and activates `projectService`, which rejects virtual paths not in any real tsconfig.

```ts
// ✅ Correct
const config = await eslintConfig({ typescript: false, frameworks: { react: true } })
// ❌ Wrong — projectService rejects virtual paths
const config = await eslintConfig({ frameworks: { react: true } })
```

Also make sure fixture code matches active stylistic rules — use double quotes for JSX attributes (`type="button"` not `type='button'`).

## 6. Fixture Files

`packages/tests/fixtures/` contains real source files for `integration.test.ts`. Add new fixtures when adding integration tests for new frameworks or formats.

## 7. Pre-Commit Validation

```bash
pnpm run build && pnpm run lint && pnpm run test
# or all-in-one:
pnpm run ok
```

All must pass. Tests also run in CI on every PR via `pre-push` hook.
