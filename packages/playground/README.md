<p align="center">
  <a href="../../README.md">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="../../assets/readme/workspace-dark.svg">
      <img src="../../assets/readme/workspace-light.svg" alt="ESLint Config Basic — Less setup. Clearer feedback." width="1200" height="220">
    </picture>
  </a>
</p>

<h1 align="center">Configuration playground</h1>

<p align="center">
  <a href="../../LICENSE"><img src="https://img.shields.io/badge/license-MIT-13967e?style=flat-square" alt="License: MIT"></a>
  <a href="package.json"><img src="https://img.shields.io/badge/workspace-Private-6319be?style=flat-square" alt="Workspace: Private"></a>
</p>

<p align="center">
  <a href="../../README.md">Project overview</a> ·
  <a href="package.json">Package manifest</a> ·
  <a href="CHANGELOG.md">Changelog</a> ·
  <a href="#resources">Resources</a>
</p>

**On this page:** [Workspace commands](#workspace-commands) · [Resources](#resources)

Reference playgrounds used to verify real configurations against real frameworks.

This internal package is maintained inside the [`@santi020k/eslint-config-basic`](https://github.com/santi020k/eslint-config-basic) monorepo.

- Docs: [Playgrounds](https://eslint.santi020k.com/guide/playgrounds/)
- Repository: [santi020k/eslint-config-basic](https://github.com/santi020k/eslint-config-basic)
- Author: [santi020k](https://santi020k.com)

The canonical documentation lives on the Astro Starlight site, so this README intentionally stays short to avoid duplication.

## Workspace commands

Run from the repository root after its documented setup. Use the Node.js and pnpm versions
declared in the root [package.json](../../package.json).

Run the actual framework workspaces, rather than the parent package's placeholder scripts:

```sh
pnpm run build
pnpm exec turbo run lint --filter='./packages/playground/**'
```

Choose an individual playground from the [workspace directory](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground)
and use its manifest's scripts for development. The root lint command also checks
these consumers with zero allowed warnings.

## Resources

[Project overview](../../README.md) · [Contributing](../../.github/CONTRIBUTING.md) · [License](../../LICENSE)
