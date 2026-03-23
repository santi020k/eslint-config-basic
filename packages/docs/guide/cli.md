# CLI

The main package ships a CLI that can scaffold or refresh the project config.

```bash
npx basic-eslint init
npx basic-eslint update
```

## What It Does

- Detects TypeScript, runtime, and supported optional integrations from `package.json`.
- Chooses `eslint.config.js` for ESM projects.
- Chooses `eslint.config.mjs` otherwise.
- Includes explicit framework imports in generated configs.
- Adds React automatically when Next.js or Expo is detected.

## Usage

```bash
npx @santi020k/eslint-config-basic init
```

or:

```bash
npx basic-eslint init
```

## Update an Existing Config

```bash
npx basic-eslint update
```

Use `update` when you want to regenerate the file after adding or removing dependencies.

## When to Use Each Command

- Use `init` when the project does not have an ESLint flat config yet.
- Use `update` when the dependency graph changed and you want a fresh generated baseline.
- Use manual editing when the config already has custom organization that you do not want regenerated.

## Why the Generated Config Stays Explicit

The CLI is the bridge between detection and maintainable source code. Detection can infer that a project uses Next.js or Astro, but the generated file still writes explicit imports so your config remains readable and reviewable.

## Notes

- The CLI detects frameworks, but it does not hide them behind implicit runtime magic.
- Existing `eslint.config.js` or `eslint.config.mjs` files are respected for updates.
- The generated file is a starting point that you can still edit by hand.

## Repository Links

- Source Package: [packages/basic](https://github.com/santi020k/eslint-config-basic/tree/main/packages/basic)
- Project Repository: [santi020k/eslint-config-basic](https://github.com/santi020k/eslint-config-basic)

## Related Pages

- [Getting Started](/guide/getting-started)
- [Configuration](/guide/configuration)
- [Frameworks](/frameworks/typescript)
