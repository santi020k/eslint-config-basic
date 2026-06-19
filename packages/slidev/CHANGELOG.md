# @santi020k/eslint-config-slidev

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

### Patch Changes

- Updated dependencies [[`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc), [`2ee503b`](https://github.com/santi020k/eslint-config-basic/commit/2ee503be55f5484624ee2e873fe59f348709eadc)]:
  - @santi020k/eslint-config-core@2.0.0-beta.0

## 1.6.0

- Initial Slidev framework configuration.
