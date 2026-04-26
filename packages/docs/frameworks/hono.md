# Hono

Package: [`@santi020k/eslint-config-hono`](https://www.npmjs.com/package/@santi020k/eslint-config-hono)

Use the Hono package for Fetch API apps, especially Cloudflare Workers and other edge runtimes.

## Install

::: code-group

```sh [pnpm]
pnpm add -D @santi020k/eslint-config-hono
```

```sh [npm]
npm install -D @santi020k/eslint-config-hono
```

```sh [yarn]
yarn add -D @santi020k/eslint-config-hono
```

```sh [bun]
bun add -d @santi020k/eslint-config-hono
```

:::

## Configure

```js
import { eslintConfig, Runtime } from '@santi020k/eslint-config-basic'
import hono from '@santi020k/eslint-config-hono'

export default eslintConfig({
  typescript: true,
  runtime: Runtime.Worker,
  frameworks: {
    hono
  }
})
```

## What It Adds

- Worker runtime globals for Fetch API server handlers.
- A small explicit framework package for Hono projects.
- A `createHonoConfig()` factory when a Hono app targets a non-Worker adapter.
- Auto-detection for `hono`, plus Worker runtime detection when Cloudflare Workers tooling is present.

## Notes

- Plain Hono projects are detected as Hono but keep the default universal runtime.
- Hono projects with `wrangler`, `@cloudflare/workers-types`, or `@cloudflare/vitest-pool-workers` are detected as `Runtime.Worker`.
- The framework package remains explicit, even when Hono is detected from `package.json`.

## Repository Links

- Source Package: [packages/hono](https://github.com/santi020k/eslint-config-basic/tree/main/packages/hono)
- Playground: [packages/playground/hono](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/hono)

## Related Pages

- [Configuration](/guide/configuration)
- [Core Package](/packages/core)
- [Playgrounds](/guide/playgrounds)
