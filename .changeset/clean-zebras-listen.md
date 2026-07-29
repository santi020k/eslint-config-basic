---
'@santi020k/eslint-config-basic': minor
---

Add `explain-preset` adoption reports and optional temporary compatibility
overrides grouped by formatting, correctness, security, framework, and domain
rules.

Make generated configs safer for real ESLint 10 monorepos by attaching referenced plugins locally, inheriting shared project detection and Tailwind options, composing untyped TypeScript overrides after framework parsers, and making doctor/install planning aware of workspace projects and modern feature selections.

Improve the CLI for pnpm workspaces by detecting the workspace root from nested
projects, preserving default and named catalogs during installation, and
requesting companion config packages with a version range compatible with the
installed Basic release. Command parsing is now strict, subcommand help is
side-effect free, minimum-release-age blocks are diagnosed, and safe v3 config
syntax is modernized during migration. Optional framework and feature-pack load
errors distinguish missing packages from evaluation failures while retaining the
original cause. Packed modular monorepo and peer-health release checks now verify
doctor, ESLint, TypeScript, frozen pnpm installs, and owned exceptions against
published-package boundaries.
