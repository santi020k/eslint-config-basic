# Consumer-driven improvements

These opportunities came from migrating a real ESLint 10, pnpm, TypeScript,
Astro, Tailwind, and Vitest monorepo to the modular v3 packages. They are
ordered by how directly they affect whether a consumer can install and lint
successfully.

## Implemented for the next release

- Every generated rule block now receives the plugin objects it references,
  with a contract test covering the complete optional-feature registry.
- Doctor and install planning now inspect every pnpm workspace project and
  explicit `features` selection.
- Normal doctor output reports modular v3 packages and no longer recommends
  deprecated Lite packages unless `--lite-install` is requested.
- Scoped projects inherit root detection and Tailwind defaults, while
  `projectDefaults` and project options remain the more specific layers.
- TypeScript `untypedFiles` overrides are composed after framework parser
  configs, including Astro projects.
- `init --explicit` now generates the v3 `features` map.
- The release check now installs a packed pnpm monorepo consumer with Astro,
  Tailwind, TypeScript, Vitest, format, tool, and extension packs; it runs
  doctor, ESLint 10, config typechecking, and a frozen-lockfile reinstall.

## Completed — Make every emitted config independently valid in ESLint 10

The Tailwind settings config can reference
`better-tailwindcss/no-unknown-classes` while the
`better-tailwindcss` plugin is registered on another config object. ESLint 10
then reports that it cannot find the plugin, especially when a consumer adds a
later file-scoped override for the rule.

Improve the composer so every emitted config object that references a plugin
rule also carries that plugin registration. This should be guaranteed for all
framework and feature-pack configs, not only Tailwind.

Acceptance criteria:

- `defineConfig()` output can be passed directly to ESLint 10 without a
  consumer-side plugin-copying workaround.
- A later `{ files, rules }` override can disable a feature-pack rule without
  manually importing or locating the plugin.
- A contract test checks every emitted `plugin/rule` entry against the plugins
  available to that config object.

## Completed — Make the install planner project-aware

A monorepo can disable root-level library detection and still enable a
library-backed feature inside a scoped project. For example, an Astro docs
project can detect Tailwind and require
`@santi020k/eslint-config-libraries`, even when the root has
`detection: { libraries: false }`.

The doctor and install commands should resolve the same project scopes,
detection controls, and feature graph as `defineConfig()`. They should report
all required category packages before ESLint is started.

Acceptance criteria:

- `basic-eslint doctor` reports a missing category package required by any
  configured project.
- `basic-eslint install --dry-run` returns the exact modular packages required
  by root and project-scoped features.
- Detection disabled at one scope does not suppress requirements discovered in
  another scope.

## Completed — Replace deprecated Lite advice in normal doctor output

The JSON doctor result currently includes a `liteInstallCommand` that recommends
`@santi020k/eslint-config-lite` and
`@santi020k/eslint-config-integrations`, even when the consumer uses the v3
basic package and did not request `--lite-install`.

Normal doctor output should recommend the lean v3 package set. Deprecated Lite
advice should only be produced when `--lite-install` is explicitly requested
and should be labeled as a compatibility workflow.

Acceptance criteria:

- Default JSON output exposes a modular `installCommand` or structured
  `requiredPackages` result.
- `liteInstallCommand` is omitted unless `--lite-install` is present.
- The suggested command uses the detected framework and category packages.

## Completed — Clarify root versus project option inheritance

Settings such as `tailwind.noUnknownClasses` may need to be repeated inside a
project scope to affect that project's generated config. Consumers need a clear
way to express shared defaults without learning this through lint failures.

Prefer one of these approaches:

1. inherit safe root options into projects consistently; or
2. require `projectDefaults`, document it prominently, and have doctor suggest
   moving misplaced root options there.

Acceptance criteria:

- The monorepo guide shows how root options, `projectDefaults`, and project
  overrides compose.
- Doctor warns when a root option has no effect on scoped projects.
- Tests cover Tailwind, TypeScript, detection controls, and runtime defaults.

## Completed — Add a realistic modular-consumer release fixture

Add a packed-package fixture matching a production monorepo:

- pnpm workspace with multiple package projects;
- Astro and Tailwind in one app only;
- TypeScript project service;
- Vitest, JSONC, Markdown, YAML, pnpm, CSpell, boundaries, and Unicorn;
- explicit `features` configuration;
- ESLint 10 with `--max-warnings=0`.

The fixture should install from packed tarballs, run doctor, lint, typecheck,
and verify that the lockfile is frozen-installable. This catches package
boundary and resolver errors that workspace symlinks can hide.

## Completed — Preserve pnpm workspace catalogs during installation

`basic-eslint install` currently writes a direct semver range into the nearest
`package.json`. In catalog-managed workspaces this immediately violates
`pnpm/json-enforce-catalog` and forces the consumer to move every dependency by
hand.

The installer should discover `pnpm-workspace.yaml`, update the appropriate
catalog entry, and write `catalog:` in the package manifest. It should also
detect the workspace package manager from the root instead of falling back to
npm when invoked from a nested package.

Acceptance criteria:

- Existing `catalog:`, `catalog:default`, and named-catalog conventions are
  preserved.
- `--dry-run` shows both manifest and workspace-catalog changes.
- Running from a nested workspace package still uses the root package manager.
- A second installation is idempotent.

The installer now resolves the pnpm workspace root even when invoked from a
nested package and asks pnpm to save new dependencies into the existing
default or named catalog. Dry runs print the exact catalog-aware command.
Idempotency is delegated to pnpm's catalog-aware `add` operation.

## Completed — Keep `untypedFiles` last enough to be effective

In Astro consumers, the generated `eslint-config-typescript/untyped-files`
entry can appear before a later framework entry re-enables typed parser
options. Consumers then receive a parser error saying that `project` and
`projectService` are enabled together, and must find and append the generated
entry manually.

Compose untyped-file overrides after framework and project configs, or merge
parser options with a deterministic precedence model.

Acceptance criteria:

- `typescript.untypedFiles: ['**/*.astro']` works with the Astro framework.
- The same behavior works inside a scoped monorepo project.
- Consumers never need to inspect config names and reorder generated entries.

## Completed — Preserve nested import failures

When an optional framework package exists but fails while importing one of its
own dependencies, the current error can say only that the optional framework
could not be loaded. During migration, a React integration failure caused by a
Zod compatibility mismatch looked like a missing React package.

Error handling should distinguish:

- package not installed;
- installed package failed to evaluate;
- incompatible peer or transitive dependency.

Always retain the original error as `cause`, show the failing package path, and
include the one-command remediation only when the package is genuinely absent.

## P2 — Make preset expansion visible and adoption-friendly

`Preset.App`, `Preset.Worker`, and `Preset.Library` can activate substantially
more rules than an existing default config. That is useful for new projects,
but a migration can unexpectedly introduce hundreds of formatting or
domain-specific findings.

Add `basic-eslint explain-preset <preset>` and a migration mode that compares
the current effective config with the selected preset. Group the output into
formatting, correctness, security, framework, and domain rules, and generate a
temporary compatibility override when requested.

## Partially completed — Make CLI help side-effect free

`basic-eslint install --help` should print subcommand help and exit without
installing packages. Add command-level parsing tests for `--help`, `--dry-run`,
and invalid flags so documentation discovery can never mutate a workspace.

Help flags are now intercepted before command dispatch, so they cannot trigger
installation. Dedicated subcommand help and strict invalid-flag validation
remain follow-up work.

## Partially completed — Respect release compatibility under minimum-age policies

With pnpm's `minimumReleaseAge`, requesting an unversioned companion package can
resolve an older major while Basic itself is already pinned to 3.1. The install
planner should derive companion ranges from the installed Basic major/minor
instead of asking the package manager for an unconstrained latest version.

For Basic 3.1, generated install requests should use a compatible 3.1 range and
produce a clear message when workspace supply-chain policy temporarily blocks
that release.

Install and doctor commands now derive a compatible caret range from the
installed Basic dependency, including catalog-backed versions, and use that
range for modular companion packages. A dedicated diagnostic for package
manager minimum-age rejection remains follow-up work.

## P2 — Treat peer health as a release signal

The modular consumer installed and linted successfully but `pnpm peers check`
still reported stale ESLint and TypeScript peer ranges from transitive plugins.
These warnings make genuine missing-peer failures harder to notice.

Add a release report that:

- runs the package manager's peer checker in packed consumer fixtures;
- identifies which direct package introduces each warning;
- fails for newly introduced actionable warnings;
- records explicitly accepted upstream range gaps with an owner and removal
  condition.

## In progress — Generate modern configuration during migration

Migration output should prefer the v3 `features` map and `root` option over
legacy category arrays and root-directory aliases. When custom classes are
detected, it should offer the supported project-scoped Tailwind option instead
of generating a raw rule override.

`init --explicit` now emits `features`; rewriting arbitrary existing JavaScript
config objects remains future work because migration must preserve expressions,
spreads, comments, and computed values without changing behavior.

An ideal generated result is concise and self-explanatory:

```js
export default await defineConfig({
  features: {
    boundaries: true,
    jsonc: true,
    markdown: true,
    pnpm: true,
    unicorn: true,
    vitest: true,
    yaml: true
  },
  projects: {
    'apps/docs': {
      tailwind: { noUnknownClasses: false }
    }
  },
  root: import.meta.dirname
})
```
