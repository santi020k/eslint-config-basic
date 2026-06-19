# @santi020k/eslint-config-tests

Internal integration and snapshot coverage for the monorepo.

This internal package is maintained inside the [`@santi020k/eslint-config-basic`](https://github.com/santi020k/eslint-config-basic) monorepo.

- Docs: [Tests package](https://eslint.santi020k.com/packages/tests.html)
- Repository: [santi020k/eslint-config-basic](https://github.com/santi020k/eslint-config-basic)
- Author: [santi020k](https://santi020k.com)

The canonical documentation lives on the VitePress site, so this README intentionally stays short to avoid duplication.

## Why tests run with `--maxWorkers=1`

This package intentionally runs Vitest in a single worker to reduce nondeterminism in snapshot-heavy integration tests and avoid cross-test interference from mocked filesystem/process state.
