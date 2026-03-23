---
name: testing
description: How to run and add new integration tests for @santi020k/eslint-config-basic.
---

# Testing the ESLint Configurations

The `@santi020k/eslint-config-basic` monorepo uses [Vitest](https://vitest.dev/) for testing. Tests are located entirely within the `packages/tests/` package.

## 1. Running Tests

You can run the full test suite from the root directory of the monorepo:

```bash
npm run test
```

This triggers `vitest run packages/tests` internally.

### Watch Mode

If you are developing rules and want the tests to instantly re-run:

```bash
npx vitest watch packages/tests
```

## 2. Test Structure

Tests are located in `packages/tests/src/`.

- `configs.test.ts`: Verifies that each framework and optional config properly exports an array of rule definitions and that the basic ESLint options aren't returning undefined values.
- `composition.test.ts`: Tests the `eslintConfig({ ... })` function composition logic, ensuring that passing different enums properly includes or excludes the expected configurations.
- `rules.test.ts`: Tests the application of specific rules.
- `snapshots.test.ts`: Maintains snapshot validations of the expected final config outputs.

## 3. Adding New Tests

When adding a **new framework configuration** or a **new optional configuration**, you MUST update the tests to verify it:

1. **Config Export Tests (`configs.test.ts`):**
   Import your generated configuration array and verify it has length > 0.

2. **Composition Tests (`composition.test.ts`):**
   Add a test case where you call `eslintConfig({ frameworks: { yourframework: true } })` or `eslintConfig({ optionals: [OptionalOption.YourOptional] })` and assert that your specific config `name` property is included in the output array.

3. **Snapshots (`snapshots.test.ts`):**
   If you created a new composition scenario, add it to the snapshot tests. Run `npx vitest -u packages/tests` to update the snapshots before committing.

## 4. Pre-Commit Validation

Before pushing any changes, tests will run alongside the build and lint processes. We strongly recommend making a habit of running `npm run test` frequently during development to catch structural configuration oversights early.
