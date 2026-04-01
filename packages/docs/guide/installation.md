# Installation

## Requirements

- Node.js `>=18.18.0`
- ESLint `10+`

## Base Package

```bash
npm install -D eslint @santi020k/eslint-config-basic
```

## Framework Packages

Install framework packages only when your project needs them.

```bash
npm install -D @santi020k/eslint-config-react
npm install -D @santi020k/eslint-config-next
npm install -D @santi020k/eslint-config-astro
npm install -D @santi020k/eslint-config-vue
```

Other supported packages are documented in the [Framework guides](/frameworks/typescript).

## Framework Installation Matrix

| Project Type | Packages To Install | Notes |
| :--- | :--- | :--- |
| TypeScript | `eslint`, `@santi020k/eslint-config-basic` | TypeScript is enabled with `typescript: true` and is auto-detected from `tsconfig.json`. |
| React | `eslint`, `@santi020k/eslint-config-basic`, `@santi020k/eslint-config-react` | Common browser setup. |
| Next.js | `eslint`, `@santi020k/eslint-config-basic`, `@santi020k/eslint-config-next`, `@santi020k/eslint-config-react` | React is required. |
| Astro | `eslint`, `@santi020k/eslint-config-basic`, `@santi020k/eslint-config-astro` | Commonly paired with TypeScript. |
| Vue | `eslint`, `@santi020k/eslint-config-basic`, `@santi020k/eslint-config-vue` | Supports single-file components. |
| Svelte | `eslint`, `@santi020k/eslint-config-basic`, `@santi020k/eslint-config-svelte` | Commonly paired with TypeScript. |
| Solid | `eslint`, `@santi020k/eslint-config-basic`, `@santi020k/eslint-config-solid` | Combine with TypeScript as needed. |
| Angular | `eslint`, `@santi020k/eslint-config-basic`, `@santi020k/eslint-config-angular` | Usually paired with TypeScript. |
| NestJS | `eslint`, `@santi020k/eslint-config-basic`, `@santi020k/eslint-config-nest` | Commonly paired with `Preset.Node` or `Runtime.Node`. |
| Qwik | `eslint`, `@santi020k/eslint-config-basic`, `@santi020k/eslint-config-qwik` | Optimized for Qwik resumability. |
| Remix | `eslint`, `@santi020k/eslint-config-basic`, `@santi020k/eslint-config-remix`, `@santi020k/eslint-config-react` | React is required. |
| Expo | `eslint`, `@santi020k/eslint-config-basic`, `@santi020k/eslint-config-expo`, `@santi020k/eslint-config-react` | React is required. |

## Optional Tooling Matrix

| Category | Configure Through | Documentation |
| :--- | :--- | :--- |
| Libraries | `libraries` | [Libraries](/tooling/libraries) |
| Testing | `testing` | [Testing](/tooling/testing) |
| Formats | `formats` | [Formats](/tooling/formats) |
| Tools | `tools` | [Tools](/tooling/tools) |
| Extensions | `extensions` | [Extensions](/tooling/extensions) |

## Minimal Config

```js
import { eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig()
```

## Common Installation Paths

- Base JavaScript or TypeScript only: Install `eslint` and `@santi020k/eslint-config-basic`.
- React projects: Add `@santi020k/eslint-config-react`.
- Next.js projects: Add both `@santi020k/eslint-config-next` and `@santi020k/eslint-config-react`.
- Expo projects: Add both `@santi020k/eslint-config-expo` and `@santi020k/eslint-config-react`.
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

- TypeScript, runtime, and supported optional integrations can be detected automatically from `package.json`.
- Framework configs stay explicit on purpose.
- Next.js and Expo require the React package as part of the `frameworks` object.

## Repository Links

- Main Package Source: [packages/basic](https://github.com/santi020k/eslint-config-basic/tree/main/packages/basic)
- Project Repository: [santi020k/eslint-config-basic](https://github.com/santi020k/eslint-config-basic)

## Related Pages

- [Getting Started](/guide/getting-started)
- [Frameworks](/frameworks/typescript)
- [Optional Tooling](/tooling/overview)
