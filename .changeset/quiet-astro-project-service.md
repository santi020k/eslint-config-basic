---
"@santi020k/eslint-config-astro": patch
"@santi020k/eslint-config-basic": minor
"@santi020k/eslint-config-full": patch
"@santi020k/eslint-config-typescript": patch
---

Keep Astro lint runs warning-free by leaving `projectService` ownership with
Astro's supported `project` parser option. TypeScript parser setup no longer
forwards `projectService` into Astro source files, while Vue, Svelte, and
virtual TypeScript files retain their existing parser behavior.

Add `snapshot --rules-only` for compact committed rule contracts. Rules-only
snapshots record their scope so subsequent checks and diffs omit globals,
language options, and plugin metadata automatically.

Forward `--rules-only` through the public CLI dispatcher and add an end-to-end
regression for the saved scope. The option was previously accepted but only
direct handler calls received it.

Add `config-types` to emit ESLint config declarations in memory with the
consumer's TypeScript context and reject pnpm-internal or transitive
`typescript-eslint` types. The composite action exposes an opt-in portability
gate for consumer maintenance workflows.

Discover exact selectors from Astro component-local styles and narrow utility
patterns from explicitly configured Tailwind plugins. Doctor reports the
smallest project-scoped exception shape when dynamic classes still need an
allowance.

Add semantic-only preset adoption fixes and report scripts that combine source
file reads with regular-expression parsing. Writing is allowed only in the
semantic-only mode, keeping formatting churn in a separate review.

Run the CLI when pnpm invokes its direct `.bin/basic-eslint` symlink. Older
entrypoint guards could silently exit successfully because the executable path
did not end in `cli.js`.
