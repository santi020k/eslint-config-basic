# Tests Package

Package: `@santi020k/eslint-config-tests`

This internal package holds the public API tests, composition tests, CLI integration tests, detection tests, and snapshot coverage for the monorepo.

## What It Protects

- Public re-exports.
- Preset behavior.
- Strict-mode severity upgrades.
- CLI scaffolding behavior.
- Generated API and config snapshot drift.

It is intentionally internal, but documenting it makes the monorepo easier to understand.

## Main Test Areas

- `public-api.test.ts` protects the package surface.
- `composition.test.ts` and `options.test.ts` protect config assembly behavior.
- `cli.test.ts` covers scaffold and update behavior.
- `detection.test.ts` covers auto-detection.
- `snapshots.test.ts` protects the generated config output.

## Repository Links

- Source Package: [packages/tests](https://github.com/santi020k/eslint-config-basic/tree/main/packages/tests)
- Project Repository: [santi020k/eslint-config-basic](https://github.com/santi020k/eslint-config-basic)

## Related Pages

- [Playgrounds](/v1/guide/playgrounds)
- [API Reference](/v1/api/)
- [Configuration](/v1/guide/configuration)
