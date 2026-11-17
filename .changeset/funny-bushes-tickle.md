---
"@santi020k/eslint-config-basic": patch
"@santi020k/eslint-config-core": patch
---

Harden project-scoped configuration, CSS class discovery, and CLI maintenance.

- Keep child rule blocks and negated file patterns inside their project. Scope
  local ignores consistently, rebase relative `basePath` values once, and retain
  explicitly absolute base paths.
- Accept documented `false` framework flags in public types and the JSON schema.
  An unrelated disabled framework no longer prevents required React rules.
- Recognize Unicode and leading-hyphen CSS class names. Decode CSS escapes once,
  replace invalid Unicode escape values, and avoid configuration-loading crashes.
- Make preset updates target only the generated Basic or Full configuration.
  Comments and strings cannot redirect a rewrite; customized modules are refused
  before any file changes or ESLint invocation.
- Use a valid declared package manager when no existing workspace or lockfile
  identifies one, while preserving existing lockfile precedence.
- Report a missing requested `AGENTS.md` as stale with
  `generate-skill --check --create`, without writing files, and include `--create`
  in the suggested recovery command.

Migration notes: child rule-block ignores are relative to the child project.
Remove a manually added project prefix if it compensated for the previous
unscoped-ignore behavior. For customized ESLint modules, set `strict` manually
and run `baseline` without `--preset`.
