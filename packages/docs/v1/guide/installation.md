# Installation

## Requirements

- Node.js `>=22.18.0`
- ESLint `9+`

## Base Package

The base package already depends on ESLint `^9 || ^10`, so this is the smallest supported install:

::: code-group

```sh [pnpm]
pnpm add -D @santi020k/eslint-config-basic
```

```sh [npm]
npm install -D @santi020k/eslint-config-basic
```

```sh [yarn]
yarn add -D @santi020k/eslint-config-basic
```

```sh [bun]
bun add -d @santi020k/eslint-config-basic
```

:::

## Framework Packages

Install framework packages only when your project needs them. TypeScript support is enabled through `typescript: true`, not a separate framework package install.

::: code-group

```sh [pnpm]
pnpm add -D @santi020k/eslint-config-react
pnpm add -D @santi020k/eslint-config-next @santi020k/eslint-config-react
pnpm add -D @santi020k/eslint-config-astro
pnpm add -D @santi020k/eslint-config-vue
pnpm add -D @santi020k/eslint-config-svelte
pnpm add -D @santi020k/eslint-config-solid
pnpm add -D @santi020k/eslint-config-angular
pnpm add -D @santi020k/eslint-config-nest
pnpm add -D @santi020k/eslint-config-hono
pnpm add -D @santi020k/eslint-config-qwik
pnpm add -D @santi020k/eslint-config-remix @santi020k/eslint-config-react
pnpm add -D @santi020k/eslint-config-expo @santi020k/eslint-config-react
```

```sh [npm]
npm install -D @santi020k/eslint-config-react
npm install -D @santi020k/eslint-config-next @santi020k/eslint-config-react
npm install -D @santi020k/eslint-config-astro
npm install -D @santi020k/eslint-config-vue
npm install -D @santi020k/eslint-config-svelte
npm install -D @santi020k/eslint-config-solid
npm install -D @santi020k/eslint-config-angular
npm install -D @santi020k/eslint-config-nest
npm install -D @santi020k/eslint-config-hono
npm install -D @santi020k/eslint-config-qwik
npm install -D @santi020k/eslint-config-remix @santi020k/eslint-config-react
npm install -D @santi020k/eslint-config-expo @santi020k/eslint-config-react
```

```sh [yarn]
yarn add -D @santi020k/eslint-config-react
yarn add -D @santi020k/eslint-config-next @santi020k/eslint-config-react
yarn add -D @santi020k/eslint-config-astro
yarn add -D @santi020k/eslint-config-vue
yarn add -D @santi020k/eslint-config-svelte
yarn add -D @santi020k/eslint-config-solid
yarn add -D @santi020k/eslint-config-angular
yarn add -D @santi020k/eslint-config-nest
yarn add -D @santi020k/eslint-config-hono
yarn add -D @santi020k/eslint-config-qwik
yarn add -D @santi020k/eslint-config-remix @santi020k/eslint-config-react
yarn add -D @santi020k/eslint-config-expo @santi020k/eslint-config-react
```

```sh [bun]
bun add -d @santi020k/eslint-config-react
bun add -d @santi020k/eslint-config-next @santi020k/eslint-config-react
bun add -d @santi020k/eslint-config-astro
bun add -d @santi020k/eslint-config-vue
bun add -d @santi020k/eslint-config-svelte
bun add -d @santi020k/eslint-config-solid
bun add -d @santi020k/eslint-config-angular
bun add -d @santi020k/eslint-config-nest
bun add -d @santi020k/eslint-config-hono
bun add -d @santi020k/eslint-config-qwik
bun add -d @santi020k/eslint-config-remix @santi020k/eslint-config-react
bun add -d @santi020k/eslint-config-expo @santi020k/eslint-config-react
```

:::

Next.js and Expo require `@santi020k/eslint-config-react`. Remix projects usually pair `@santi020k/eslint-config-remix` with `@santi020k/eslint-config-react` so React component rules stay explicit, matching the playground.

Other supported packages are documented in the [Framework guides](/v1/frameworks/typescript).

## Framework Installation Matrix

| Project Type | Packages To Install | Notes |
| :--- | :--- | :--- |
| TypeScript | `@santi020k/eslint-config-basic` | TypeScript is enabled with `typescript: true` and is auto-detected from `tsconfig.json`. |
| React | `@santi020k/eslint-config-basic`, `@santi020k/eslint-config-react` | Common browser setup. |
| Next.js | `@santi020k/eslint-config-basic`, `@santi020k/eslint-config-next`, `@santi020k/eslint-config-react` | React is required. |
| Astro | `@santi020k/eslint-config-basic`, `@santi020k/eslint-config-astro` | Commonly paired with TypeScript. |
| Vue | `@santi020k/eslint-config-basic`, `@santi020k/eslint-config-vue` | Supports single-file components. |
| Svelte | `@santi020k/eslint-config-basic`, `@santi020k/eslint-config-svelte` | Commonly paired with TypeScript. |
| Solid | `@santi020k/eslint-config-basic`, `@santi020k/eslint-config-solid` | Combine with TypeScript as needed. |
| Angular | `@santi020k/eslint-config-basic`, `@santi020k/eslint-config-angular` | Usually paired with TypeScript. |
| NestJS | `@santi020k/eslint-config-basic`, `@santi020k/eslint-config-nest` | Commonly paired with `Preset.Node` or `Runtime.Node`. |
| Hono | `@santi020k/eslint-config-basic`, `@santi020k/eslint-config-hono` | Optimized for Hono/Edge runtimes. |
| Qwik | `@santi020k/eslint-config-basic`, `@santi020k/eslint-config-qwik` | Optimized for Qwik resumability. |
| Remix | `@santi020k/eslint-config-basic`, `@santi020k/eslint-config-remix`, `@santi020k/eslint-config-react` | React is recommended for Remix component rules. |
| Expo | `@santi020k/eslint-config-basic`, `@santi020k/eslint-config-expo`, `@santi020k/eslint-config-react` | React is required. |

## Optional Tooling Matrix

| Category | Configure Through | Documentation |
| :--- | :--- | :--- |
| Libraries | `libraries` | [Libraries](/v1/tooling/libraries) |
| Testing | `testing` | [Testing](/v1/tooling/testing) |
| Formats | `formats` | [Formats](/v1/tooling/formats) |
| Tools | `tools` | [Tools](/v1/tooling/tools) |
| Extensions | `extensions` | [Extensions](/v1/tooling/extensions) |

## Minimal Config

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig()
```

## Common Installation Paths

- Base JavaScript or TypeScript only: Install `@santi020k/eslint-config-basic`.
- React projects: Add `@santi020k/eslint-config-react`.
- Next.js projects: Add both `@santi020k/eslint-config-next` and `@santi020k/eslint-config-react`.
- Expo projects: Add both `@santi020k/eslint-config-expo` and `@santi020k/eslint-config-react`.
- Remix projects: Add `@santi020k/eslint-config-remix`, and usually `@santi020k/eslint-config-react` too.
- Other frameworks: Add the specific framework package only when it is needed by the project.

## React Example

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'
import react from '@santi020k/eslint-config-react'

export default eslintConfig({
  typescript: true,
  frameworks: {
    react
  }
})
```

## Notes

- Install `eslint` manually only if you want to pin it yourself. The base package already carries a compatible version.
- TypeScript, runtime, and supported optional integrations can be detected automatically from `package.json`.
- Framework configs stay explicit on purpose.
- Next.js and Expo require the React package as part of the `frameworks` object.

## Repository Links

- Main Package Source: [packages/basic](https://github.com/santi020k/eslint-config-basic/tree/main/packages/basic)
- Project Repository: [santi020k/eslint-config-basic](https://github.com/santi020k/eslint-config-basic)

## Related Pages

- [Getting Started](/v1/guide/getting-started)
- [Frameworks](/v1/frameworks/typescript)
- [Optional Tooling](/v1/tooling/overview)
