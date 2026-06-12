---
title: "Runtime"
description: "The runtime option controls which global variables are available during linting. Picking the wrong runtime leads to false positives for globals that are not available in your actual execution environment."
---

The `runtime` option controls which global variables are available during linting. Picking the wrong runtime leads to false positives for globals that are not available in your actual execution environment.

```js title="eslint.config.mjs"
import { defineConfig, Runtime } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  runtime: Runtime.Node
})
```

## Available Runtimes

| Runtime | Enum | Use It When |
| :--- | :--- | :--- |
| Universal | `Runtime.Universal` | Full-stack projects, or when you are unsure — adds both Node.js and browser globals. |
| Browser | `Runtime.Browser` | Front-end-only code. Removes Node.js globals to prevent accidental server-side assumptions. |
| Node | `Runtime.Node` | Back-end-only code (APIs, CLIs, scripts). Removes browser globals. |
| Worker | `Runtime.Worker` | Generic service workers and edge runtimes — adds Fetch API and worker globals. |
| Cloudflare | `Runtime.Cloudflare` | Cloudflare Workers projects — adds worker globals plus Cloudflare-specific globals such as `DurableObject` and `WebSocketPair`. |
| Bun | `Runtime.Bun` | Bun runtime projects. |
| Deno | `Runtime.Deno` | Deno runtime projects. |

## Runtime Details

### `Runtime.Universal` (default)

Adds **both** Node.js and browser globals. This is the default when no explicit runtime is set and auto-detection cannot determine a clear signal.

Use this when your project is truly full-stack and source files mix server and client code (for example a Remix app with API routes and React components in the same tree).

```js
import { defineConfig, Runtime } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  runtime: Runtime.Universal
})
```

### `Runtime.Browser`

Adds browser globals: `window`, `document`, `navigator`, `location`, `history`, `localStorage`, `fetch`, `XMLHttpRequest`, `CustomEvent`, and the full DOM API surface.

Does **not** include Node.js-specific globals like `process`, `Buffer`, `__dirname`, or `require`.

```js
import { defineConfig, Runtime } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  frameworks: { vue: true },
  runtime: Runtime.Browser
})
```

> [!TIP]
> Most framework presets (React, Vue, Svelte, Solid, Angular, Astro) automatically narrow to Browser runtime. You usually do not need to set this explicitly for UI projects.

### `Runtime.Node`

Adds Node.js globals: `process`, `Buffer`, `__dirname`, `__filename`, `require`, `module`, `exports`, `global`, `setTimeout`, `setInterval`, `setImmediate`, and `clearImmediate`.

Does **not** include browser DOM globals.

```js
import { defineConfig, Runtime } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  frameworks: { nest: true },
  runtime: Runtime.Node
})
```

Use `Runtime.Node` for: Express / Fastify / Hono APIs, NestJS applications, CLI tools and scripts, and Node.js cron jobs.

### `Runtime.Worker`

Adds service worker and Fetch API globals: `self`, `fetch`, `Request`, `Response`, `Headers`, `URL`, `URLSearchParams`, `ReadableStream`, `WritableStream`, `TransformStream`, `caches`, `crypto`, and `CryptoKey`.

Does **not** include `window` (workers have no DOM access) and does **not** include Node.js-specific globals.

```js
import { defineConfig, Runtime } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  frameworks: { hono: true },
  runtime: Runtime.Worker
})
```

Use `Runtime.Worker` for: generic edge functions, Next.js middleware, and browser service workers.

### `Runtime.Cloudflare`

Adds service worker globals plus Cloudflare Workers-specific globals such as `DurableObject`, `WebSocketPair`, and `caches`.

```js
import { defineConfig, Runtime } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  runtime: Runtime.Cloudflare
})
```

Hono projects with `wrangler`, `@cloudflare/workers-types`, or `@cloudflare/vitest-pool-workers` are detected as Cloudflare automatically. Browser frameworks deployed with Wrangler stay browser-first unless you explicitly choose `Runtime.Cloudflare`.

### `Runtime.Bun`

Adds Bun, Node, and browser-compatible globals. Detection looks for Bun runtime types or Bun runtime configuration.

### `Runtime.Deno`

Adds `Deno` and browser-compatible globals. Detection looks for Deno config files or the Deno ESLint plugin.

## Auto-Detection

When no `runtime` is set explicitly, auto-detection reads `package.json` and the project file tree for signals:

| Signal | Detected Runtime |
| :--- | :--- |
| Presence of `next`, `astro`, `vite`, `solid-js`, `svelte`, `vue` | `Browser` |
| Presence of `@nestjs/core` | `Node` |
| Presence of Hono plus `wrangler`, `@cloudflare/workers-types`, or `@cloudflare/vitest-pool-workers` | `Cloudflare` |
| Presence of Cloudflare worker signals without a browser framework | `Cloudflare` |
| Presence of Bun runtime config/types | `Bun` |
| Presence of Deno config/plugin signals | `Deno` |
| No clear signal | `Universal` |

Detection precedence (highest wins): `Cloudflare > Bun/Deno > Worker > Node > Browser > Universal`.

Use `detection: { runtime: false }` to disable runtime auto-detection and rely solely on your explicit `runtime` option.

## Runtime in Monorepos

Use the `projects` option to assign different runtimes to different workspace packages:

```js
import { defineConfig, Preset, Runtime } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  preset: Preset.Monorepo,
  projects: {
    'apps/edge-api': { runtime: Runtime.Worker },
    'apps/web': { frameworks: { next: true }, runtime: Runtime.Browser },
    'packages/cli': { runtime: Runtime.Node },
    'packages/sdk': { runtime: Runtime.Universal }
  }
})
```

## Related Pages

- [Presets](/guide/presets) — preset defaults per runtime
- [Monorepo](/guide/monorepo) — per-package runtime scoping
- [Configuration](/guide/configuration) — full option reference
