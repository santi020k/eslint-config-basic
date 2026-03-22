# CLI

The main package ships a CLI that can scaffold or refresh the project config.

```bash
npx basic-eslint init
npx basic-eslint update
```

## What it does

- detects TypeScript, runtime, and supported optionals from `package.json`
- chooses `eslint.config.js` for ESM projects
- chooses `eslint.config.mjs` otherwise
- includes explicit framework imports in generated configs
- adds React automatically when Next.js or Expo is detected

## Usage

```bash
npx @santi020k/eslint-config-basic init
```

or:

```bash
npx basic-eslint init
```

## Why the generated config stays explicit

The CLI is the bridge between detection and maintainable source code. Detection can infer that a project uses Next.js or Astro, but the generated file still writes explicit imports so your config remains readable and reviewable.
