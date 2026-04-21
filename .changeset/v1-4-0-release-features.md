---
"@santi020k/eslint-config-basic": minor
"@santi020k/eslint-config-core": minor
"@santi020k/eslint-config-optionals": minor
"@santi020k/eslint-config-react": patch
"@santi020k/eslint-config-expo": patch
"@santi020k/eslint-config-angular": patch
"@santi020k/eslint-config-astro": patch
"@santi020k/eslint-config-nest": patch
"@santi020k/eslint-config-next": patch
"@santi020k/eslint-config-qwik": patch
"@santi020k/eslint-config-remix": patch
"@santi020k/eslint-config-solid": patch
"@santi020k/eslint-config-svelte": patch
"@santi020k/eslint-config-typescript": patch
"@santi020k/eslint-config-vue": patch
---

# v1.4.0 — API improvements, new optional, and quality-of-life fixes

## Breaking changes

**Unified Node.js requirement to >=24.0.0.**
All packages in the monorepo now strictly require Node.js 24.0.0 or higher. This ensures compatibility with modern dependency versions (such as `cspell` v10) and aligns with the project's long-term maintenance strategy.

**`detectProjectOptions()` no longer sets boolean flags on `frameworks`.**
Previously, auto-detection would set `frameworks.react = true`, `frameworks.next = true`, etc. Passing those values to `eslintConfig()` would throw a `TypeError` because framework configs must be real imports, not booleans.

Detected frameworks are now reported via a new `detectedFrameworks: DetectedFrameworkName[]` field. The `frameworks` object in the detection result stays empty, so spreading `detectProjectOptions()` into `eslintConfig()` is always safe.

```ts
// Before (would throw)
const opts = detectProjectOptions()

eslintConfig(opts) // ❌

// opts.frameworks.next === true → TypeError inside eslintConfig()

// After (safe)
const opts = detectProjectOptions()

// opts.detectedFrameworks → ['next', 'react']  (informational)
// opts.frameworks → {}                          (safe to spread)
eslintConfig(opts) // ✅
```

## New features

**`Extension.BestPractices` optional config** — adds four quality rules with no extra dependencies:

- `no-console` (warn) — catches leftover debug output
- `no-alert` (error) — disallows browser `alert` / `confirm` / `prompt`
- `complexity` (warn, max 10) — flags overly complex functions
- `max-depth` (warn, max 4) — flags deeply nested blocks

```ts
eslintConfig({ extensions: [Extension.BestPractices] })
```

**Category barrel exports for `@santi020k/eslint-config-optionals`** — five new sub-path exports let you import a whole category at once:

```ts
// also: /extensions  /tools  /libraries
```

**`NextMode` auto-detection** — `detectProjectOptions()` now detects App Router vs Pages Router by checking for an `app/` or `src/app/` directory, so `options.nextMode` is set automatically.

**`DetectedFrameworkName` type** — new exported union type listing all framework names that `detectProjectOptions()` can detect. Useful for display logic or tooling built on top of detection.

## Improvements

**Early `tsconfigRootDir` validation** — `createTypescriptConfig()` now throws a clear, actionable error at config-creation time if the provided `tsconfigRootDir` path does not exist on disk, instead of failing silently at ESLint runtime.

**CI node version matrix** — the build pipeline now runs against Node 24.x to ensure stability across the updated engine requirements.

**`docs/PHILOSOPHY.md`** — new document explaining the major design decisions: why hard deps, flat config only, lazy framework loading, rule severity philosophy, and how to extend or override rules.

**Changelog synchronization** — new `sync-docs-changelog.mjs` script to automatically propagate root changelog updates to the documentation site.

## Bug Fixes

- **CLI Scaffolding**: Resolved bug where auto-detected frameworks were not correctly included in the generated configuration.
- **Rule Set Update**: Updated React and Expo collections to reflect rule removals in `eslint-plugin-react-hooks@7` recommended configuration.
- **Tailwind CSS Performance**: Fixed `Atomics.wait()` timeout errors in monorepos by providing customizable settings in the recommended Tailwind configuration.

## Dependency Updates

- **External Plugins**:
  - Updated `@cspell/eslint-plugin` to `v10.0.0` (Major).
  - Updated `typescript-eslint` to `v8.59.0`.
  - Updated `eslint-plugin-react-hooks` to `v7.1.1`.
  - Updated `eslint-plugin-perfectionist` to `v5.9.0`.
  - Updated `eslint-plugin-sonarjs` to `v4.0.3`.
  - Updated `tailwindcss` to `v4.2.4`.
- **Core Tooling**:
  - Updated `eslint` to `v10.2.1`.
  - Updated `vitest` and `@vitest/coverage-v8` to `v4.1.5`.
  - Internal alignment of `typescript` version to `v5.9.3`.
