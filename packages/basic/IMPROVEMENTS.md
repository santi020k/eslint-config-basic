# Consumer-driven improvements

These opportunities came from migrating a real ESLint 10, pnpm, TypeScript,
Astro, Tailwind, and Vitest monorepo to the modular v3 packages. They are
ordered by how directly they affect whether a consumer can install and lint
successfully.

## Dep Beacon follow-up after adopting 3.2.0

<!-- cspell:words database_specific ecosystem_specific fixability frontmatter heredocs lintable -->

The Dep Beacon migration removed a blanket `@stylistic` compatibility override,
ran ESLint autofix over the complete monorepo, and resolved every remaining
finding. This exposed several interactions that a config-level comparison did
not predict.

The first unsuppressed run reported 729 findings: 8 errors and 721 warnings.
Autofix reduced that to 81 findings, but some remaining cases could not be
resolved without changing rule options or addressing non-formatting project
issues. The final consumer passes repository and package lint with
`--max-warnings=0`, typechecking, tests, and a frozen pnpm install.

### Completed — Improve adoption reports with source-level lint debt

`basic-eslint explain-preset monorepo --compatibility` reported five newly
enabled formatting rules and one changed import-sort option. Its generated
compatibility fragment was much narrower than the consumer's actual migration
debt: replacing the existing broad compatibility block with that fragment
exposed 729 findings.

The report correctly compared effective configurations, but that comparison
cannot show how many existing source lines violate unchanged or differently
configured rules. Consumers can therefore interpret a small config diff as a
small migration when the source rewrite is actually repository-wide.

Future adoption tooling should optionally execute ESLint without writing files
and report both dimensions:

- effective rule changes grouped by category;
- current source findings grouped by rule, severity, file type, and fixability;
- the estimated number of files and lines changed by autofix;
- rules that enter fix loops or remain after an autofix preview;
- non-formatting errors that should be handled before a formatting migration.

Acceptance criteria:

- A `--lint` or `--analyze-source` mode reports the real finding count for the
  selected preset.
- The report distinguishes config changes from pre-existing source violations.
- A dry autofix preview identifies changed files without mutating the consumer.
- Compatibility output explains whether it preserves effective configuration,
  current source behavior, or both.

`explain-preset --analyze-source` now runs the selected preset against source
without writing files, groups findings by rule, category, severity, file type,
and fixability, and calls out non-formatting errors. A second in-memory ESLint
run previews changed files and estimated changed lines, then reports remaining
fixable rules as potential fix conflicts. Compatibility output explicitly states
that it preserves effective configuration rather than existing source
violations.

### Completed — Make the default stylistic rule set internally satisfiable

The combination of
`@stylistic/function-call-argument-newline: ['warn', 'never']` and
`@stylistic/max-len` at 120 columns made long function calls impossible to
satisfy. Autofix collapsed multiline arguments onto one line, after which
`max-len` failed. Manually wrapping the call caused the newline rule to fail or
collapse it again.

The consumer changed the argument-newline option to `consistent`, which permits
both a compact one-line call and a fully multiline call:

```js
{
  '@stylistic/function-call-argument-newline': ['error', 'consistent']
}
```

Similar pressure appeared around long arrow predicates:

- `@stylistic/implicit-arrow-linebreak: 'beside'`;
- `arrow-body-style` preferring an expression body;
- `@stylistic/operator-linebreak: 'after'`;
- `@stylistic/indent-binary-ops`;
- `@stylistic/max-len`.

A block body made the line wrap cleanly but violated `arrow-body-style`. A
newline immediately after `=>` violated `implicit-arrow-linebreak`. The
satisfiable form required an opening parenthesis immediately after the arrow,
followed by carefully aligned binary operands:

```js
items.find(item => (
  firstCondition(item) ||
  secondCondition(item)
))
```

This is valid, but the config should not require consumers to discover a narrow
format through repeated lint cycles.

Acceptance criteria:

- Add convergence fixtures for long function calls, constructor calls, arrow
  predicates, ternaries, and nullish-coalescing expressions.
- Run autofix twice and assert that the second pass produces no changes.
- No recommended rule combination should force a line past `max-len`.
- Prefer `consistent` for function-call argument newlines, or document why a
  stricter option is safe.

Implemented:

- `function-call-argument-newline` now uses `consistent`.
- Convergence coverage runs autofix twice for all five expression shapes and
  asserts that the second pass is stable.

### Completed — Prevent Astro circular autofixes

Astro inline scripts exposed a circular fix between `@stylistic/indent` and
`@stylistic/jsx-closing-tag-location`. One rule moved the closing `</script>` to
the JavaScript indentation expected for the virtual script; the other moved it
back to align with the opening Astro tag. ESLint emitted
`ESLintCircularFixesWarning` for an inline theme script and for nested
`<pre><code>` examples.

The consumer ultimately kept stylistic rules enabled globally and disabled only
`@stylistic/indent` for `**/*.astro`. This is much narrower than suppressing the
entire stylistic plugin, but it shows that the shared indentation rule is not
processor-aware enough for mixed Astro documents.

Future Astro behavior should:

- avoid applying generic JavaScript indentation to template tag boundaries;
- define which layer owns inline-script indentation;
- cover `<script is:inline>`, frontmatter, template expressions, and nested
  `<pre><code>` blocks;
- verify autofix convergence, not only lint validity.

Acceptance criteria:

- Representative Astro fixtures reach a stable result after one autofix pass.
- Inline script closing tags do not alternate between two indentation levels.
- Consumers do not need to disable all indentation enforcement for Astro.

The Astro source and virtual-client-script scopes now disable only the generic
JavaScript indentation rule, leaving Astro-aware formatting rules in place.
Inline scripts, typed client scripts, JSDoc declarations, and nested
`<pre><code>` examples have second-pass convergence coverage.

### Make `max-len` practical across code, prose, and workflows

The 120-column rule found useful code readability issues, but it also blocked
Astro prose, long URLs, template-literal diagnostics, YAML workflow commands,
and shell or Python snippets embedded in GitHub Actions. Because the consumer
uses `--max-warnings=0`, a warning-level formatting preference is still a hard
failure.

The practical consumer settings were:

```js
{
  '@stylistic/max-len': ['warn', {
    code: 120,
    comments: 200,
    ignoreStrings: true,
    ignoreTemplateLiterals: true,
    ignoreUrls: true,
    tabWidth: 2
  }]
}
```

Even with those exceptions, source expressions and normal prose were wrapped.
Workflow commands were rewritten into heredocs or multiline scripts, which is a
larger behavioral risk than ordinary JavaScript formatting.

Potential improvements:

- provide format-specific defaults for Markdown, Astro, YAML, and generated
  files;
- ignore URLs and template literals by default;
- avoid enforcing code-oriented line length on embedded shell scripts unless a
  shell-aware formatter owns the rewrite;
- have adoption reports call out that warning rules block projects using
  `--max-warnings=0`.

Implemented so far:

- URLs and template literals are ignored by the shared default, alongside
  ordinary strings.
- Fenced Markdown examples are not rewritten to the current JavaScript quote,
  semicolon, or trailing-comma style, preserving generated changelogs and
  historical migration examples while Markdown syntax rules remain active.

### Completed — Handle external schema names without project-wide camel-case exceptions

OSV response fixtures legitimately use `database_specific` and
`ecosystem_specific`. The default `camelcase` configuration treated those wire
format keys as project naming violations.

The consumer added an explicit allowlist while retaining checks for local
identifiers. This works, but every API with snake-case JSON can require another
project-specific list.

Consider one of these defaults:

1. do not check object-literal property names;
2. ignore quoted properties and destructured keys that are renamed locally; or
3. replace the legacy camel-case rule with a naming-convention setup that
   distinguishes local symbols from external wire formats.

Acceptance criteria:

- Snake-case JSON fields can be represented without disabling checks for local
  variables and functions.
- Destructuring with a local alias remains lintable.
- Tests cover API fixtures, computed keys, quoted keys, and type declarations.

The shared `camelcase` rule now ignores property names while continuing to
report snake-case local bindings. Coverage includes object literals, TypeScript
property declarations, computed access, quoted keys, and aliased destructuring.

### Completed — Keep plugin attachment automatic for consumer overrides

The 3.2.0 plugin-attachment change worked as intended. Dep Beacon could pass its
Astro Tailwind exception directly as an extra config:

```js
export default defineConfig(options, {
  files: ['**/*.astro'],
  rules: {
    'better-tailwindcss/no-unknown-classes': 'off'
  }
})
```

The returned rule block received `better-tailwindcss` automatically, eliminating
the previous consumer workaround that searched generated config objects and
copied the plugin manually.

One ergonomic boundary remains: fragments appended after `defineConfig()` has
resolved are outside that automatic pass. A dynamically generated late override
must either be supplied to `defineConfig()` or wrapped with
`attachReferencedPlugins()`. Documentation should make this ordering explicit,
and examples should prefer passing all known overrides into `defineConfig()`.

Implemented:

- The README and configuration guide document the ordering boundary and show
  the late-override wrapper.
- A lifecycle test verifies attachment after `defineConfig()` resolves.

### Completed — Surface unresolved TypeScript modules as one root problem

After formatting findings were reduced, type-aware linting produced a large
cascade of `no-unsafe-*` findings and `no-redundant-type-constituents` errors in
the language server. The root cause was not unsafe consumer code:
`vscode-languageserver` had resolved to v10, whose exported subpath is
`vscode-languageserver/node`; the source still imported the removed
`vscode-languageserver/node.js` path.

TypeScript reported the useful root diagnostic immediately. ESLint instead
reported many downstream values as error-typed or `any`, making the dependency
resolution failure look like hundreds of rule violations.

Potential improvements:

- have doctor or adoption analysis run the configured TypeScript project before
  type-aware ESLint;
- detect parser diagnostics or error-typed imports and summarize the root module
  resolution failure;
- recommend fixing typechecking before reviewing unsafe-rule findings;
- avoid presenting cascading unsafe findings as independent migration debt.

This case also confirms that strict lint adoption can reveal genuine dependency
API changes. The tooling should preserve that value while making the root cause
prominent.

`explain-preset --analyze-source` now runs the consumer-resolved TypeScript
compiler with `--noEmit` for the root and detected/configured workspace
tsconfigs. Its structured report records every checked config and promotes
module, type-definition, and source-file resolution diagnostics ahead of the
ESLint summary. Text output explicitly recommends fixing compiler errors before
reviewing cascading type-aware unsafe-rule findings. Regression coverage uses a
real child-process preflight and verifies that the root TS2307 diagnostic is
prioritized over an unrelated downstream type error.

### Completed — Add an end-to-end autofix adoption fixture

Packed-consumer fixtures currently prove that generated configs load and lint
known-good source. Add a deliberately old-style monorepo fixture that exercises
the migration workflow itself:

- TypeScript packages and tests;
- Astro pages with inline scripts and code examples;
- YAML GitHub workflows with embedded shell;
- long function calls and binary arrow predicates;
- external snake-case API fields;
- Tailwind rules overridden in an Astro file scope;
- `--max-warnings=0`.

The test should capture the initial report, run autofix, resolve only explicitly
documented manual findings, rerun autofix to prove convergence, then run lint,
typecheck, and tests. This would catch rule conflicts that config snapshots and
already-formatted fixtures cannot expose.

The packed modular-consumer release check now includes deliberately old-style
TypeScript application and Vitest sources, external snake-case schema fields,
an Astro page with an inline script and generated code example, Tailwind classes
under a scoped override, and a GitHub Actions workflow with empty event keys and
embedded shell. It captures the initial `explain-preset --analyze-source`
finding and autofix estimates, applies autofix once, requires a second
`--fix-dry-run` pass to produce no output, then runs strict zero-warning lint,
source and config typechecks, Vitest, peer health, and a frozen reinstall.
The fixture performs one explicit manual adoption edit between analysis and
autofix: an inline Astro client script stops using debug `console` output,
demonstrating that correctness/context findings are reviewed instead of hidden
by the formatting pass.

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
- Root `typescript.untypedFiles` patterns remain effective in detected child
  workspaces.
- Astro files avoid generic indentation fix loops, and virtual scripts suppress
  variable-rule false positives.
- External snake-case schema properties remain lintable while local binding
  names still require camel case.
- `init --explicit` now generates the v3 `features` map.
- Preset adoption reports compare effective rules by category and can write a
  temporary compatibility override.
- Preset adoption reports can analyze real source debt and preview autofix
  without mutating consumer files.
- CLI subcommands now have strict, side-effect-free help and flag validation.
- Minimum-release-age failures receive a dedicated compatible-range diagnostic.
- Release checks enforce peer health with owned, conditional exceptions.
- Safe migration rewrites prefer `features` and `root`, while dynamic cases
  receive explicit manual-action guidance.
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

## Completed — Make preset expansion visible and adoption-friendly

`Preset.App`, `Preset.Worker`, and `Preset.Library` can activate substantially
more rules than an existing default config. That is useful for new projects,
but a migration can unexpectedly introduce hundreds of formatting or
domain-specific findings.

Add `basic-eslint explain-preset <preset>` and a migration mode that compares
the current effective config with the selected preset. Group the output into
formatting, correctness, security, framework, and domain rules, and generate a
temporary compatibility override when requested.

## Completed — Make CLI help side-effect free

`basic-eslint install --help` should print subcommand help and exit without
installing packages. Add command-level parsing tests for `--help`, `--dry-run`,
and invalid flags so documentation discovery can never mutate a workspace.

Help flags are intercepted before command dispatch, dedicated subcommand help
lists only supported flags, and strict parsing rejects unknown or incomplete
options before any handler can mutate the workspace.

## Completed — Respect release compatibility under minimum-age policies

With pnpm's `minimumReleaseAge`, requesting an unversioned companion package can
resolve an older major while Basic itself is already pinned to 3.1. The install
planner should derive companion ranges from the installed Basic major/minor
instead of asking the package manager for an unconstrained latest version.

For Basic 3.1, generated install requests should use a compatible 3.1 range and
produce a clear message when workspace supply-chain policy temporarily blocks
that release.

Install and doctor commands derive a compatible caret range from the installed
Basic dependency, including catalog-backed versions, and use that range for
modular companion packages. Install also recognizes pnpm minimum-release-age
failures and explains the wait-or-exclude policy without suggesting an
incompatible release.

## Completed — Treat peer health as a release signal

The modular consumer installed and linted successfully but `pnpm peers check`
still reported stale ESLint and TypeScript peer ranges from transitive plugins.
These warnings make genuine missing-peer failures harder to notice.

Add a release report that:

- runs the package manager's peer checker in packed consumer fixtures;
- identifies which direct package introduces each warning;
- fails for newly introduced actionable warnings;
- records explicitly accepted upstream range gaps with an owner and removal
  condition.

## Completed — Generate modern configuration during migration

Migration output should prefer the v3 `features` map and `root` option over
legacy category arrays and root-directory aliases. When custom classes are
detected, it should offer the supported project-scoped Tailwind option instead
of generating a raw rule override.

`init --explicit` emits `features`. The v3 migration rewrites literal category
arrays, the deprecated `integrations` alias, and unambiguous root aliases.
Expressions, spreads, comments inside dynamic selections, conflicting root
aliases, and raw Tailwind rule overrides are preserved and reported as manual
actions so migration never changes behavior it cannot prove safe.

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
