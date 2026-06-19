---
"@santi020k/eslint-config-basic": major
"@santi020k/eslint-config-core": minor
---

Lazy framework loading and normalized framework export naming.

**Lazy loading**: framework packages (angular-eslint, vue-eslint-parser, eslint-plugin-svelte, …) are now imported dynamically and only when their framework is enabled. Projects that enable none or few frameworks no longer pay the startup cost of loading every bundled framework plugin when `eslintConfig()` / `defineConfig()` runs.

**Breaking — normalized naming**: framework exports from `@santi020k/eslint-config-basic` now use bare framework names, and all of them are async factories returning `Promise<FlatConfigArray>`:

`angular`, `astro`, `expo`, `hono`, `lit`, `nest`, `next`, `nuxt`, `qwik`, `react`, `reactRouter`, `slidev`, `solid`, `svelte`, `tanstackStart`, `vite`, `vue` (plus deprecated `remix`).

The previous mixed-style names (`angularConfig`, `expoConfig`, `nestConfig`, `nextConfig`, `reactConfig`, `solidConfig`, `svelteConfig`, `vueConfig`) remain available as deprecated aliases of the same factories, but they are no longer plain config arrays — call them (and `await` the result) when composing manually:

```js
// before (v1)
import { reactConfig } from '@santi020k/eslint-config-basic'

export default [...reactConfig]
```

```js
// after (v2)
import { react } from '@santi020k/eslint-config-basic'

export default [...(await react())]
```

Most users are unaffected: `frameworks: { react: true }` and auto-detection behave exactly as before.

`@santi020k/eslint-config-core`: the `ImportedFramework` type now also accepts async factories (`(options?) => Promise<FlatConfigArray>`), so lazy factories can be passed directly as framework option values.
