---
title: "Planned v4 Removals"
description: "Compatibility packages and aliases deprecated during the v3 release line."
---

Version 3 keeps two compatibility packages installable so upgrades do not
break abruptly. npm installations display a deprecation message, the public
TypeScript declarations use `@deprecated`, and the packages remain covered by
v3 tests until their removal.

## Packages scheduled for removal

| Deprecated in v3 | v4 replacement | Reason |
| :--- | :--- | :--- |
| `@santi020k/eslint-config-lite` | `@santi020k/eslint-config-basic` | Basic now has the same lean, modular dependency model. Lite only re-exports Basic. |
| `@santi020k/eslint-config-integrations` | The relevant `extensions`, `formats`, `libraries`, `testing`, or `tools` package | Integration implementations and dependencies now belong to their category packages. |

The packages are deprecated, not unpublished. Existing v3 lockfiles therefore
remain reproducible while consumers migrate.

## APIs scheduled for removal

| Deprecated API | Replacement |
| :--- | :--- |
| `defineConfig({ integrations: { ... } })` | `defineConfig({ features: { ... } })` |
| `basic-eslint doctor --lite-install` | Install Basic and the category packages reported by `doctor` |
| Direct factory imports from the Integrations package | Import each factory from its owning category package |

## Packages that stay

No other public package is currently scheduled for v4 removal:

- `full` remains the batteries-included distribution. Although its runtime
  entry point is intentionally small, it owns the install-everything dependency
  model.
- `core` and `typescript` remain supported composition layers.
- Framework packages remain independently installable and own
  framework-specific behavior.
- The five category packages remain the supported homes for optional features.
- `playground` and `tests` are private workspace packages and are not part of
  the public removal policy.

Any additional v4 removal should first receive a v3 deprecation annotation,
migration path, registry warning, and test coverage.
