---
'@santi020k/eslint-config-basic': patch
---

Make generated configs safer for real ESLint 10 monorepos by attaching referenced plugins locally, inheriting shared project detection and Tailwind options, composing untyped TypeScript overrides after framework parsers, and making doctor/install planning aware of workspace projects and modern feature selections.

Improve the CLI for pnpm workspaces by detecting the workspace root from nested
projects, preserving default and named catalogs during installation, and
requesting companion config packages with a version range compatible with the
installed Basic release. Subcommand help is now side-effect free, and optional
framework and feature-pack load errors distinguish missing packages from
evaluation failures while retaining the original cause. A packed modular
monorepo release check now verifies doctor, ESLint, TypeScript, and frozen pnpm
installs against published-package boundaries.
