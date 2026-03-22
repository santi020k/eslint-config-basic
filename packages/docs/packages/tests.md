# Tests Package

Package: `@santi020k/eslint-config-tests`

This internal package holds the public API tests, composition tests, CLI integration tests, detection tests, and snapshot coverage for the monorepo.

## What it protects

- public re-exports
- preset behavior
- strict-mode severity upgrades
- CLI scaffolding behavior
- generated API and config snapshot drift

It is intentionally internal, but documenting it makes the monorepo easier to understand.
