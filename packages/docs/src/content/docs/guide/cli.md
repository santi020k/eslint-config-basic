---
title: "CLI"
description: "The main package ships a CLI that can scaffold or refresh the project config."
---

The main package ships a CLI that can scaffold or refresh the project config.


```sh title="pnpm"
pnpm dlx @santi020k/eslint-config-basic init
pnpm dlx @santi020k/eslint-config-basic update
pnpm dlx @santi020k/eslint-config-basic explain
pnpm dlx @santi020k/eslint-config-basic inspect
pnpm dlx @santi020k/eslint-config-basic doctor
pnpm dlx @santi020k/eslint-config-basic docs
pnpm dlx @santi020k/eslint-config-basic migrate
```

```sh title="npm"
npx @santi020k/eslint-config-basic init
npx @santi020k/eslint-config-basic update
npx @santi020k/eslint-config-basic explain
npx @santi020k/eslint-config-basic inspect
npx @santi020k/eslint-config-basic doctor
npx @santi020k/eslint-config-basic docs
npx @santi020k/eslint-config-basic migrate
```

```sh title="yarn"
yarn dlx @santi020k/eslint-config-basic init
yarn dlx @santi020k/eslint-config-basic update
yarn dlx @santi020k/eslint-config-basic explain
yarn dlx @santi020k/eslint-config-basic inspect
yarn dlx @santi020k/eslint-config-basic doctor
yarn dlx @santi020k/eslint-config-basic docs
yarn dlx @santi020k/eslint-config-basic migrate
```

```sh title="bun"
bunx @santi020k/eslint-config-basic init
bunx @santi020k/eslint-config-basic update
bunx @santi020k/eslint-config-basic explain
bunx @santi020k/eslint-config-basic inspect
bunx @santi020k/eslint-config-basic doctor
bunx @santi020k/eslint-config-basic docs
bunx @santi020k/eslint-config-basic migrate
bunx @santi020k/eslint-config-basic generate-skill
```


## What It Does

- Detects TypeScript, runtime, and supported optional integrations from `package.json`.
- Chooses `eslint.config.js` for ESM projects.
- Chooses `eslint.config.mjs` otherwise.
- Uses bundled framework booleans (`frameworks.<name>: true`) in generated configs.
- Adds React automatically when Next.js or Expo is detected.
- Prints detected config inputs with `explain`.
- Prints detected inputs, package-manager details, workspace projects, and active config features with `inspect`.
- Checks common v2 adoption issues with `doctor`.
- Generates human-readable `ESLINT_STANDARDS.md` docs with `docs`.
- Reports v1-to-v2 migration suggestions with `migrate`.

## Usage


```sh title="pnpm"
pnpm dlx @santi020k/eslint-config-basic init
```

```sh title="npm"
npx @santi020k/eslint-config-basic init
```

```sh title="yarn"
yarn dlx @santi020k/eslint-config-basic init
```

```sh title="bun"
bunx @santi020k/eslint-config-basic init
```


If the package is already installed locally, the `basic-eslint` bin is also available through your package manager's local binary resolution.

```sh
basic-eslint --help
basic-eslint --version
```

## Update an Existing Config


```sh title="pnpm"
pnpm dlx @santi020k/eslint-config-basic update
```

```sh title="npm"
npx @santi020k/eslint-config-basic update
```

```sh title="yarn"
yarn dlx @santi020k/eslint-config-basic update
```

```sh title="bun"
bunx @santi020k/eslint-config-basic update
```


Use `update` when you want to regenerate the file after adding or removing dependencies.

## Explain Detection

Use `explain` before committing a zero-config setup or after dependency changes.

```sh
npx @santi020k/eslint-config-basic explain
```

It prints the detected TypeScript state, preset, runtime, framework list, optional integrations, tools, and formats.

## Inspect the Active Setup

Use `inspect` when you want a fuller view than `explain`, including package-manager detection, workspace package discovery, and features read from the active ESLint config when it can be loaded.

```sh
npx @santi020k/eslint-config-basic inspect
```

For automation, use JSON output:

```sh
npx @santi020k/eslint-config-basic inspect --json
```

## Diagnose Setup Issues

Use `doctor` while adopting v2 or after moving a project into a workspace. It reports missing config files, configs that cannot be loaded, lingering v1 framework imports, missing lint scripts, and detected workspace packages that are not represented with `projects` scoping.

It also detects when two different ESLint copies are installed — for example an ESLint 9 project that also pulls in the config packages' ESLint 10 dependency. Both majors are supported, but parallel copies can make your editor and CLI apply slightly different rule behavior, so `doctor` warns and suggests aligning or deduping.

```sh
npx @santi020k/eslint-config-basic doctor
```

## Generate Team Standards

Use `docs` to create a project-local `ESLINT_STANDARDS.md` summary for humans.

```sh
npx @santi020k/eslint-config-basic docs
```

This is separate from `generate-skill`: `docs` writes a general standards document, while `generate-skill` targets AI coding assistant rule folders.

## Migration Report

Use `migrate` while moving from v1-style framework package imports to v2 booleans.

```sh
npx @santi020k/eslint-config-basic migrate
```

The command reports the main migration steps and calls out configs that still appear to import old framework config packages.

For straightforward v1 configs that only import framework packages, `--write` can replace those imports with the v2 bundled framework boolean form.

```sh
npx @santi020k/eslint-config-basic migrate --write
```

## Generate Agent Standards (Beta)

The `generate-skill` command creates or updates ESLint standards files for AI coding assistants based on your project's active configuration.

This is a **beta** feature and is **non-breaking** (it only adds/updates files in existing agent folders and instruction files).

Supported targets:

| Tool | Location | Format |
| :--- | :--- | :--- |
| Generic agents | `.agent/skills/`, `.agents/skills/` | Markdown + front-matter |
| Claude Code | `.claude/commands/` | Markdown |
| Cursor | `.cursor/rules/` | MDC front-matter |
| Windsurf | `.windsurf/rules/` | Markdown + front-matter |
| GitHub Copilot | `.copilot/instructions/`, `.github/copilot-instructions.md` | Markdown / guarded section |
| Aider | `.aider/` | Markdown |
| Gemini | `.gemini/styleguide.md` | Markdown |
| Cline | `.clinerules/` | Markdown |
| Roo Code | `.roo/rules/` | Markdown |
| Kiro | `.kiro/steering/` | Markdown + `inclusion: always` front-matter |
| AGENTS.md standard (Codex CLI, OpenCode, Jules, Amp, etc.) | root `AGENTS.md` | Guarded section appended/updated |

Folder targets are only written when the folder already exists, and `AGENTS.md` / `.github/copilot-instructions.md` are only updated when those files already exist — the command never creates tool folders for tools you do not use.


```sh title="pnpm"
pnpm dlx @santi020k/eslint-config-basic generate-skill
```

```sh title="npm"
npx @santi020k/eslint-config-basic generate-skill
```

```sh title="yarn"
yarn dlx @santi020k/eslint-config-basic generate-skill
```

```sh title="bun"
bunx @santi020k/eslint-config-basic generate-skill
```


Use `--force` if you want to overwrite existing standards files.

### Flags

- `--force` — overwrite existing skill files and guarded sections.
- `--check` — CI mode: compares existing skill files against freshly generated content without writing anything, and exits with code 1 when any file is stale or missing. Useful as a CI step or pre-push hook so agent rules never drift from the actual config.
- `--create` — scaffold a root `AGENTS.md` (with the guarded ESLint-standards section) when the project has none. Without this flag, `AGENTS.md` is only updated when it already exists.

```sh title="CI example"
npx @santi020k/eslint-config-basic generate-skill --check
```

## When to Use Each Command

- Use `init` when the project does not have an ESLint flat config yet.
- Use `update` when the dependency graph changed and you want a fresh generated baseline.
- Use `explain` when you want to review what auto-detection found.
- Use `inspect` when you need machine-readable details or active config feature extraction.
- Use `doctor` when a v2 setup is not behaving as expected.
- Use `docs` when you want a committed standards summary.
- Use `migrate` when moving a v1 config to v2.
- Use manual editing when the config already has custom organization that you do not want regenerated.

## Why the Generated Config Uses Booleans

The CLI writes `frameworks: { <name>: true }` so the generated file stays concise and aligned with v2's bundled framework model. You can still replace any framework entry with an imported custom config array or factory when needed.

## Notes

- The CLI detects frameworks, but it does not hide them behind implicit runtime magic.
- Generated files are explicit about enabled frameworks, but do not add per-framework import statements.
- Existing `eslint.config.js` or `eslint.config.mjs` files are respected for updates.
- The generated file is a starting point that you can still edit by hand.

## Repository Links

- Source Package: [packages/basic](https://github.com/santi020k/eslint-config-basic/tree/main/packages/basic)
- Project Repository: [santi020k/eslint-config-basic](https://github.com/santi020k/eslint-config-basic)

## Related Pages

- [Getting Started](/guide/getting-started)
- [Configuration](/guide/configuration)
- [Frameworks](/frameworks/typescript)
