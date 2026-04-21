# Core Package

Package: [`@santi020k/eslint-config-core`](https://www.npmjs.com/package/@santi020k/eslint-config-core)

The core package contains the base JavaScript rules, runtime-aware globals, shared utilities, and types that the rest of the monorepo builds on.

## Includes

- Base ESLint and stylistic rules.
- Runtime helpers and environment globals.
- `detectProjectOptions`: Automatically identifies project settings from `package.json` and project structure. Note that this **no longer populates boolean flags** in the `frameworks` object; instead, it reports names via `detectedFrameworks`.
- Shared config types and enums.
- `gitignore` integration.

## Main Exports

- `Runtime`
- `Preset`
- `Library`
- `Testing`
- `Format`
- `Tool`
- `Extension`
- `Setting`
- `NextMode`
- `detectProjectOptions`
- `createCoreConfig`
- `coreConfig`

## When to Use It Directly

For most consumers, the main package is the right entry point. Import `core` directly only when you are building your own wrapper or you need the low-level shared utilities.

## Repository Links

- Source Package: [packages/core](https://github.com/santi020k/eslint-config-basic/tree/main/packages/core)
- Project Repository: [santi020k/eslint-config-basic](https://github.com/santi020k/eslint-config-basic)

## Related Pages

- [Basic Package](/packages/basic)
- [Configuration](/guide/configuration)
- [API Reference](/api/)
- [Optionals Package](/packages/optionals)
