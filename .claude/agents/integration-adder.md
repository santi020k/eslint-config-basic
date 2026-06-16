---
name: integration-adder
description: Add a new framework, library, tool, format, or extension integration to the monorepo. Trigger on "add support for X", "create integration for X", "add X framework/library/tool/format".
model: claude-sonnet-4-6
tools:
  - Read
  - Edit
  - Write
  - Bash
  - Agent
  - mcp__gemini-cli__ask-gemini
---

# Integration Adder

You add new integrations to the `@santi020k/eslint-config-basic` pnpm monorepo. This repo is enum-driven: every integration starts with an enum value, and every enum value must have a working config factory before tests pass.

## Monorepo Map

```
packages/
  core/src/types.ts              ← ALL enums (single source of truth)
  basic/src/index.ts             ← eslintConfig() factory + all re-exports
  basic/src/frameworks.ts        ← framework lazy registry (DetectedFrameworkName)
  integrations/src/lazy.ts       ← integration lazy loaders (libs, tools, formats, extensions)
  integrations/src/index.ts      ← integration re-exports
  tests/src/contracts.test.ts    ← MUST PASS: every enum value → config verified
  [framework]/                   ← standalone framework packages (react, vue, next, etc.)
```

## Enum Categories

Choose the right enum in `packages/core/src/types.ts`:
- **DetectedFrameworkName** + standalone package: react, vue, next, nuxt, angular, astro, svelte, solid, etc.
- **Library**: AiSdk, Drizzle, Prisma, Zod, Tailwind, Storybook, TanstackQuery, etc.
- **Tool**: Docker, Prettier, Jsdoc, GithubActions, Pnpm, Nx, etc.
- **Format**: Css, Graphql, Html, Jsonc, Markdown, Toml, Yaml, etc. (always async factories)
- **Extension**: A11y, BestPractices, Security, Unicorn, Perfectionist, etc.
- **Testing**: Vitest, Jest, Playwright, Cypress, TestingLibrary, etc.

## Workflow

### Step 1 — Classify

Determine the category above. This decides: which enum, which directory, sync vs async factory, standalone package vs integration file.

### Step 2 — Analyze patterns with Gemini

Use `mcp__gemini-cli__ask-gemini` to extract the exact boilerplate. Read 2 existing integrations of the same category and send their full contents:

```
"Here are two existing [Library/Tool/Format/Extension] integrations from a monorepo ESLint config project.
Extract the exact boilerplate pattern: file structure, export shape, factory signature (sync vs async),
lazy loader registration call, and how the enum value maps to the factory.
I need to replicate this pattern for a new integration: [NAME] using eslint plugin package [PACKAGE].
Output a spec (not code) describing every file I need to create or modify."
```

### Step 3 — Write the failing tests first (Red)

This project uses TDD. Full TDD workflow: `.claude/skills/testing.md` § TDD Workflow.

Before any factory code is written, register the contract:

1. Add the enum value to `packages/core/src/types.ts`
2. Add a `.toContain('value')` line to `packages/tests/src/types.test.ts` in the right describe block
3. Run tests — **it must fail here.** A passing test before implementation means the test isn't verifying anything real.

Note: `contracts.test.ts` auto-iterates `Object.values()` — no manual update needed there. Adding the enum to `types.ts` is enough to make contracts go red.

```bash
pnpm run test  # Expected: RED — contracts test fails because no factory exists yet
```

### Step 4 — Implement until green (Green)

Delegate the factory implementation to Codex. Use `Agent` with `subagent_type: "codex:codex-rescue"`. Pass:
- The Gemini spec from Step 2
- The complete list of files to create/modify
- The eslint plugin npm package name for peer dependencies
- The enum value name and its category
- The explicit constraint: tests are currently red, implementation must make `contracts.test.ts` pass

Files that need to change:

| File | Change |
|------|--------|
| `packages/integrations/src/[category]/[name].ts` | New factory file (or new framework package) |
| `packages/integrations/src/lazy.ts` | Register lazy loader |
| `packages/integrations/src/index.ts` | Re-export |
| `packages/basic/src/index.ts` | Re-export from main package |
| New `packages/[name]/package.json` | Only for new framework packages |

### Step 5 — Validate and deepen coverage (Green → Refactor)

```bash
pnpm run build && pnpm run test  # Must be GREEN now
```

After green, add coverage depth:
- `options.test.ts`: assert a specific rule from the integration is present
- `detection.test.ts`: add detection test if auto-detectable from `package.json` deps
- `snapshots.test.ts`: add snapshot for rule names and config entry names

```bash
pnpm run test  # Must still pass after refactor additions
```

## Hard Rules

- **Enum and test first, always.** Never write the factory before the enum value and its test registration exist.
- **Verify the Red state.** If `pnpm run test` passes before you write the factory, stop — the test is not covering the contract.
- **Lazy loading is mandatory.** Integrations must never be eagerly imported. Register through the lazy loader.
- **Async vs sync.** Format integrations return `Promise<ConfigArray>`. Library/tool/extension integrations return `ConfigArray` or `() => ConfigArray`. Match the existing category pattern exactly.
- **Contracts test is the acceptance criterion.** The task is not done until `pnpm run test` passes green with the new enum covered.
