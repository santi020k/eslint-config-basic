---
name: testing
description: How to run and add new integration tests for @santi020k/eslint-config-basic.
---

# Testing the ESLint Configurations

The `@santi020k/eslint-config-basic` monorepo uses [Vitest](https://vitest.dev/) for testing. Tests are located entirely within the `packages/tests/` package.

## 1. Running Tests

Run the full test suite from the repo root:

```bash
pnpm run test
```

Run a single test file during development:

```bash
cd packages/tests
node node_modules/vitest/dist/cli.js run src/integration.test.ts
```

Update snapshots after intentional config changes:

```bash
cd packages/tests
node node_modules/vitest/dist/cli.js run src/snapshots.test.ts --update-snapshots
```

## 2. Test Structure

All tests live in `packages/tests/src/`. Each file has a distinct responsibility:

| File | What it tests |
| :--- | :--- |
| `configs.test.ts` | Every framework/optional exports a non-empty config array; plugins are present |
| `rules.test.ts` | Specific rule settings and plugin shapes on the core, TypeScript, and React configs |
| `composition.test.ts` | `eslintConfig()` composition — passing frameworks/optionals includes the right configs |
| `snapshots.test.ts` | Snapshot of rule names and config entry names for each framework/optional |
| `detection.test.ts` | Auto-detection from `package.json` deps — correct enums/runtimes are detected |
| `integration.test.ts` | Real linting via `lintText()` — actual ESLint errors fire on fixture files |
| `options.test.ts` | Deep rule assertions — specific rules exist when the right options are passed |
| `edge-cases.test.ts` | Graceful handling of empty/undefined/invalid options |
| `public-api.test.ts` | All enums and configs are re-exported from the main package |
| `cli.test.ts` | CLI scaffolding (`npx santi-eslint init`) generates correct `eslint.config.js` |
| `types.test.ts` | All enum values are present and correctly typed |

### Fixtures

`packages/tests/fixtures/` contains real source files used in `integration.test.ts`:

| File | Used for |
| :--- | :--- |
| `fixtures/nest.ts` | NestJS service — tests `@typescript-eslint/no-explicit-any`, `@stylistic/quotes` |
| `fixtures/vue.vue` | Vue SFC — tests `vue/require-v-for-key`, `@stylistic/quotes` |
| `fixtures/svelte.svelte` | Svelte component — tests `@stylistic/quotes` in script block |

Add new fixture files here when writing integration tests for new frameworks.

## 3. Test Utilities

`packages/tests/src/test-utils.ts` exports helper functions used across test files:

```ts
// Extract all rule IDs configured across a config array
extractRuleNames(config: Record<string, unknown>[]): string[]

// Extract all config entry names (the `name` field on each config object)
extractConfigNames(config: Record<string, unknown>[]): string[]

// Lint a string of source code and return ESLint results
lintText(code: string, config: TSESLint.FlatConfig.ConfigArray, filePath: string): Promise<ESLint.LintResult[]>
```

## 4. Integration Test — Important Gotcha

When writing tests that call `lintText()`, **do not rely on auto-detection for TypeScript** if the test uses a virtual file path. Auto-detection will find `packages/tests/tsconfig.json` and activate TypeScript `projectService`, which rejects virtual file paths not registered in a real tsconfig.

**Solution**: Always pass `typescript: false` when the test doesn't need TS-specific rule checking:

```ts
// ✅ Correct — typescript: false prevents projectService from rejecting the virtual path
const config = eslintConfig({ typescript: false, frameworks: { react: reactConfig } })
const results = await lintText(code, config, 'Button.tsx')
// ❌ Wrong — auto-detection activates projectService and rejects virtual paths
const config = eslintConfig({ frameworks: { react: reactConfig } })
const results = await lintText(code, config, 'Button.tsx')
```

Also make sure fixture code matches the active stylistic rules — for example, use double quotes for JSX attributes (`type="button"`, not `type='button'`) to satisfy `@stylistic/jsx-quotes`.

## 5. Adding New Tests

### When adding a new framework

1. **`configs.test.ts`** — Import the framework config and assert `config.length > 0`. Check for the plugin object.

2. **`composition.test.ts`** — Add a test calling `eslintConfig({ frameworks: { myframework: myConfig } })` and assert the config entry name is present.

3. **`snapshots.test.ts`** — Add snapshot tests for rule names and entry names:
   ```ts
   it('should match rule names snapshot for myframework', () => {
     const config = eslintConfig({ frameworks: { myframework: myframeworkConfig } })
   
     expect(extractRuleNames(config as Record<string, unknown>[])).toMatchSnapshot()
   })
   ```

4. **`options.test.ts`** — Assert a framework-specific rule is present when the framework is enabled:
   ```ts
   it('should include myframework-specific rules', () => {
     const config = eslintConfig({ frameworks: { myframework: myframeworkConfig } })
     const rules = extractRuleNames(config as Record<string, unknown>[])
   
     expect(rules).toContain('myframework/some-rule')
   })
   ```

5. **`detection.test.ts`** — If the framework is auto-detectable, add a detection test:
   ```ts
   it('should detect myframework from package.json', () => {
     const options = detectProjectOptions({ dependencies: { myframework: '1.0.0' } })
   
     expect(options.frameworks).toContain('myframework')
   })
   ```

6. **`integration.test.ts`** (optional) — Add a real linting test using a fixture file if you want to validate actual rule firing. Remember to use `typescript: false`.

### When adding a new optional

1. **`composition.test.ts`** — Add a test passing the enum and asserting the config name appears.

2. **`options.test.ts`** — Assert a specific rule from the optional is present:
   ```ts
   it('should include mylib rules when MyLib is enabled', () => {
     const config = eslintConfig({ libraries: [Library.MyLib] })
     const rules = extractRuleNames(config as Record<string, unknown>[])
   
     expect(rules.some(r => r.startsWith('mylib/'))).toBe(true)
   })
   ```

3. **`detection.test.ts`** — If auto-detectable from `package.json` deps, add a detection test.

## 6. Pre-Commit Validation

Before pushing any changes, always run the full suite from the repo root:

```bash
pnpm run build && pnpm run lint && pnpm run test
```

All three must pass. Tests also run in CI on every PR.
