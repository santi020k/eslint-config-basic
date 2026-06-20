# @santi020k/eslint-config-hono

## 2.0.0

### Major Changes

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - **Breaking**: require ESLint 10. All packages now declare `"eslint": "^10.0.0"` as peer dependency (previously `^9.0.0 || ^10.0.0`), and `@santi020k/eslint-config-core` depends on `@eslint/js` v10.

  ESLint v9.x reaches end-of-life on 2026-08-06; targeting v10 only lets the configs rely on v10 behavior:

  - per-file config lookup (`eslint.config.*` resolved from each linted file's directory) — workspace packages can now ship their own config files alongside or instead of the root `projects` option
  - JSX reference tracking — correct scope analysis for JSX without plugin workarounds
  - the updated `eslint:recommended` baseline from `@eslint/js` v10

  If you are still on ESLint 9, stay on the v1.x line of these packages.

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Release v2 with a single public application install through `@santi020k/eslint-config-basic`.

  Application projects no longer need to install or import separate framework config packages. Framework integrations are bundled behind the main package and can be enabled with booleans such as `frameworks.react: true`, `frameworks.next: true`, or by relying on auto-detection from `eslintConfig()`.

  Detected framework configs are now enabled by default, while an explicit `frameworks: {}` remains the opt-out path. Next.js, Expo, and Remix automatically include React rules when enabled.

  The documentation site now keeps the previous v1 docs under `/v1/`, updates the root docs for v2, and includes a v1 to v2 migration guide.

### Patch Changes

- Updated dependencies [[`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`dfba51d`](https://github.com/santi020k/eslint-config-basic/commit/dfba51dca7387a71a263af206eb86fd8df15f387), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`59158db`](https://github.com/santi020k/eslint-config-basic/commit/59158dbc0b48de041062f4d0c75b1f7e3a1e779c), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`59158db`](https://github.com/santi020k/eslint-config-basic/commit/59158dbc0b48de041062f4d0c75b1f7e3a1e779c), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc)]:
  - @santi020k/eslint-config-core@2.0.0

## 2.0.0-beta.3

### Patch Changes

- Updated dependencies [[`af152cd`](https://github.com/santi020k/eslint-config-basic/commit/af152cda17961f9de8ca7bf069739f151fca65be)]:
  - @santi020k/eslint-config-core@2.0.0-beta.3

## 2.0.0-beta.2

### Patch Changes

- Updated dependencies []:
  - @santi020k/eslint-config-core@2.0.0-beta.2

## 2.0.0-beta.1

### Patch Changes

- Updated dependencies [[`dfba51d`](https://github.com/santi020k/eslint-config-basic/commit/dfba51dca7387a71a263af206eb86fd8df15f387)]:
  - @santi020k/eslint-config-core@2.0.0-beta.1

## 2.0.0-beta.0

### Major Changes

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - **Breaking**: require ESLint 10. All packages now declare `"eslint": "^10.0.0"` as peer dependency (previously `^9.0.0 || ^10.0.0`), and `@santi020k/eslint-config-core` depends on `@eslint/js` v10.

  ESLint v9.x reaches end-of-life on 2026-08-06; targeting v10 only lets the configs rely on v10 behavior:

  - per-file config lookup (`eslint.config.*` resolved from each linted file's directory) — workspace packages can now ship their own config files alongside or instead of the root `projects` option
  - JSX reference tracking — correct scope analysis for JSX without plugin workarounds
  - the updated `eslint:recommended` baseline from `@eslint/js` v10

  If you are still on ESLint 9, stay on the v1.x line of these packages.

- [#87](https://github.com/santi020k/eslint-config-basic/pull/87) [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc) Thanks [@santi020k](https://github.com/santi020k)! - Release v2 with a single public application install through `@santi020k/eslint-config-basic`.

  Application projects no longer need to install or import separate framework config packages. Framework integrations are bundled behind the main package and can be enabled with booleans such as `frameworks.react: true`, `frameworks.next: true`, or by relying on auto-detection from `eslintConfig()`.

  Detected framework configs are now enabled by default, while an explicit `frameworks: {}` remains the opt-out path. Next.js, Expo, and Remix automatically include React rules when enabled.

  The documentation site now keeps the previous v1 docs under `/v1/`, updates the root docs for v2, and includes a v1 to v2 migration guide.

### Patch Changes

- Updated dependencies [[`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc)]:
  - @santi020k/eslint-config-core@2.0.0-beta.0

## 1.6.0

### Patch Changes

- Updated dependencies []:
  - @santi020k/eslint-config-core@1.6.0

## 1.5.0

### Minor Changes

- [#82](https://github.com/santi020k/eslint-config-basic/pull/82) [`af844f6`](https://github.com/santi020k/eslint-config-basic/commit/af844f663f8403d679467e0dd2a7251e8f3d4bcd) Thanks [@santi020k](https://github.com/santi020k)! - - Add first-class Hono support with Worker runtime globals, package detection, and a playground for Cloudflare Workers-style projects.
  - Lower the Node.js engine requirement to `>=22.18.0` in `package.json` and `.nvmrc`, and validate CI against Node.js 22.
  - Update `README.md` with a landing pointer to the canonical docs site.

### Patch Changes

- Updated dependencies [[`af844f6`](https://github.com/santi020k/eslint-config-basic/commit/af844f663f8403d679467e0dd2a7251e8f3d4bcd)]:
  - @santi020k/eslint-config-core@1.5.0
