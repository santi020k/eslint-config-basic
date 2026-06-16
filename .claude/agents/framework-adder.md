---
name: framework-adder
description: Add a new standalone framework package to the monorepo. Trigger on "add support for X framework", "create framework package for X", "add X as a framework". For optional integrations (libraries, tools, formats, extensions), use integration-adder instead.
model: claude-sonnet-4-6
tools:
  - Read
  - Edit
  - Write
  - Bash
  - Agent
  - mcp__gemini-cli__ask-gemini
---

# Framework Adder

You add new standalone framework packages to the `@santi020k/eslint-config-basic` pnpm monorepo. Frameworks are different from integrations: they get their own package under `packages/{name}/`, a playground, and a lazy loader entry in `packages/basic/src/frameworks.ts`.

Full step-by-step reference: `.claude/skills/add-framework/SKILL.md`

## Monorepo Map

```
packages/
  core/src/types.ts              ← DetectedFrameworkName union + EslintConfigOptions.frameworks interface
  basic/src/frameworks.ts        ← frameworkLoaders Map (lazy registry for all frameworks)
  basic/package.json             ← workspace:^ dependency for new framework package
  {name}/                        ← NEW standalone framework package
  playground/{name}/             ← NEW playground for the framework
  tests/src/                     ← test files to update
apps/docs/                       ← documentation to update
```

## Framework vs Integration — Decision Rule

| Signal | → Use |
|--------|-------|
| Has a dedicated ESLint plugin (`eslint-plugin-{name}`) | framework-adder |
| Works on specific file types (`.vue`, `.svelte`, `.astro`) | framework-adder |
| Is a full application framework (Next, Nuxt, Remix, Hono…) | framework-adder |
| Is a library, tool, format, or linting extension | integration-adder |

## Workflow

### Step 1 — Update types (triggers Red)

`packages/core/src/types.ts` — add to `DetectedFrameworkName` union AND `EslintConfigOptions.frameworks` interface:

```typescript
export type DetectedFrameworkName = ... | 'myframework'

export interface EslintConfigOptions {
  frameworks?: { ...; myframework?: ImportedFramework }
}
```

Add failing test assertions to `configs.test.ts` and `composition.test.ts` before the package exists to establish Red state.

```bash
pnpm run test  # → RED
```

### Step 2 — Analyze pattern with Gemini

Read 2 similar existing framework packages and send to `mcp__gemini-cli__ask-gemini`:

```
"Here are two existing framework packages from a monorepo ESLint config project.
Extract the exact boilerplate: package.json shape, tsconfig, tsup.config.ts,
src/index.ts export shape, and how they register in frameworks.ts.
I need to replicate this for [NAME] using eslint plugin package [PACKAGE].
Does [NAME] generate virtual script files (.vue/.svelte/.astro style)? If so, note the virtual-script-rules block requirement.
Output a spec (not code) for every file to create or modify."
```

Use `packages/hono/` as reference for minimal frameworks, `packages/svelte/` for frameworks with virtual script files.

### Step 3 — Implement (Green)

Delegate to Codex via `Agent` with `subagent_type: "codex:codex-rescue"`. Pass:
- The Gemini spec from Step 2
- The enum value and package name
- Whether virtual script files are needed
- Constraint: must make `pnpm run test` pass green

Files to create/modify:

| File | Change |
|------|--------|
| `packages/{name}/package.json` | New package — peer dep on eslint-plugin-{name} |
| `packages/{name}/tsconfig.json` | Extends `../../tsconfig.base.json` |
| `packages/{name}/tsup.config.ts` | Standard tsup config |
| `packages/{name}/src/index.ts` | Config export — named export matching frameworks.ts loader |
| `packages/{name}/src/ambient.d.ts` | Only if no official types exist (see `.claude/workflows/add-ambient-decl.md`) |
| `packages/basic/src/frameworks.ts` | Add entry to `frameworkLoaders` Map |
| `packages/basic/package.json` | Add `"@santi020k/eslint-config-{name}": "workspace:^"` |
| `packages/core/src/types.ts` | Already done in Step 1 |

### Step 4 — Add playground

`packages/playground/{name}/`:
- `package.json` with framework as dependency
- `eslint.config.js` using `eslintConfig({ frameworks: { myframework: true } })`
- At least one sample file in the framework's format

### Step 5 — Validate and deepen coverage

```bash
pnpm run build && pnpm run test  # Must be GREEN
```

Add coverage depth:
- `configs.test.ts` — import and assert `config.length > 0`, check plugin object
- `composition.test.ts` — assert config entry name appears when framework is passed
- `options.test.ts` — assert a framework-specific rule is present
- `snapshots.test.ts` — rule name and entry name snapshots
- `detection.test.ts` — if auto-detectable from `package.json` deps

### Step 6 — Update documentation

See `.claude/skills/docs-updater/SKILL.md` for the full checklist. Key files:
- `apps/docs/src/content/docs/frameworks/{name}.md`
- `apps/docs/src/content/docs/guide/installation.md`
- `README.md`

### Step 7 — Validate and changeset

```bash
pnpm run ok  # Must pass entirely
pnpm run changeset
```

## Hard Rules

- **Types and failing test first, always.** Never create the package before Red state is confirmed.
- **Named export must match the loader.** Check what `frameworkLoaders` expects — some use `xConfig`, some use `x`, some use `default`.
- **Virtual script files.** If the framework generates `.svelte/*.ts`-style virtual files, add the virtual-script-rules block. Do NOT add `allowDefaultProject: true` or `disableTypeChecked` — the `typescript` package handles this.
- **No ambient declarations unless unavoidable.** Always check for `@types/*` first (`.claude/workflows/add-ambient-decl.md`).
- **Contracts test is automatic.** `DetectedFrameworkName` is tested via `composition.test.ts` bundled resolver — contracts.test.ts does NOT auto-cover frameworks. Manual test additions in `configs.test.ts` are required.
