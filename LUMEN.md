# Lumen

The documentation app uses `@santi020k/lumen-astro` 0.3.0.

## Project conventions

- Import the Lumen layer prelude before Tailwind and import Lumen styles once in the shared
  Starlight stylesheet.
- Mount `UIPrimitives` once through `apps/docs/src/components/PageFrame.astro`.
- Use public Lumen components for docs UI; keep Starlight integration in thin shared components.
- `InstallTabs.astro` and `RunnerTabs.astro` use `CodeTabs` instead of maintaining a custom tab
  controller.
- Keep the same `storageKey` for install and runner groups so the selected package manager follows
  the reader through the documentation.

## CodeTabs in 0.3.0

Each tab item has a stable `value`, visible `label`, `code`, and optional `language`. Use
`ariaLabel` to distinguish the tab group's purpose and `wrap={false}` for command lines that should
scroll rather than wrap. The docs keep wrapping enabled so long install commands stay usable on
mobile. Astro's root `UIPrimitives` instance provides keyboard interaction,
persistence, and cross-instance synchronization.

Version 0.3.0 also includes full-screen dialog layouts, refined disclosure states, and improved
theme-toggle focus treatment. Run the repository's build, typecheck, test, and lint scripts after
Lumen changes.
