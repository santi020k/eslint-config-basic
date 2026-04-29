# CLI

The main package ships a CLI that can scaffold or refresh the project config.

::: code-group

```sh [pnpm]
pnpm dlx @santi020k/eslint-config-basic init
pnpm dlx @santi020k/eslint-config-basic update
```

```sh [npm]
npx @santi020k/eslint-config-basic init
npx @santi020k/eslint-config-basic update
```

```sh [yarn]
yarn dlx @santi020k/eslint-config-basic init
yarn dlx @santi020k/eslint-config-basic update
```

```sh [bun]
bunx @santi020k/eslint-config-basic init
bunx @santi020k/eslint-config-basic update
bunx @santi020k/eslint-config-basic generate-skill
```

:::

## What It Does

- Detects TypeScript, runtime, and supported optional integrations from `package.json`.
- Chooses `eslint.config.js` for ESM projects.
- Chooses `eslint.config.mjs` otherwise.
- Uses bundled framework booleans (`frameworks.<name>: true`) in generated configs.
- Adds React automatically when Next.js or Expo is detected.

## Usage

::: code-group

```sh [pnpm]
pnpm dlx @santi020k/eslint-config-basic init
```

```sh [npm]
npx @santi020k/eslint-config-basic init
```

```sh [yarn]
yarn dlx @santi020k/eslint-config-basic init
```

```sh [bun]
bunx @santi020k/eslint-config-basic init
```

:::

If the package is already installed locally, the `basic-eslint` bin is also available through your package manager's local binary resolution.

```sh
basic-eslint --help
basic-eslint --version
```

## Update an Existing Config

::: code-group

```sh [pnpm]
pnpm dlx @santi020k/eslint-config-basic update
```

```sh [npm]
npx @santi020k/eslint-config-basic update
```

```sh [yarn]
yarn dlx @santi020k/eslint-config-basic update
```

```sh [bun]
bunx @santi020k/eslint-config-basic update
```

:::

Use `update` when you want to regenerate the file after adding or removing dependencies.

## Generate Agent Standards (Beta)

The `generate-skill` command creates or updates ESLint standards files for AI coding assistants (Cursor, Claude, Copilot, etc.) based on your project's active configuration.

This is a **beta** feature and is **non-breaking** (it only adds/updates files in `.agent`, `.cursor`, `.claude`, etc. folders).

::: code-group

```sh [pnpm]
pnpm dlx @santi020k/eslint-config-basic generate-skill
```

```sh [npm]
npx @santi020k/eslint-config-basic generate-skill
```

```sh [yarn]
yarn dlx @santi020k/eslint-config-basic generate-skill
```

```sh [bun]
bunx @santi020k/eslint-config-basic generate-skill
```

:::

Use `--force` if you want to overwrite existing standards files.

## When to Use Each Command

- Use `init` when the project does not have an ESLint flat config yet.
- Use `update` when the dependency graph changed and you want a fresh generated baseline.
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
