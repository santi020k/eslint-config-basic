# Improvements learned from the website migration

## Test project

- Consumer: `../website`
- Stack: Astro 7.1.3, Tailwind CSS 4.3.3, TypeScript 6.0.3, ESLint 10.8.0
- Config packages:
  - `@santi020k/eslint-config-full@3.1.0`
  - `@santi020k/eslint-config-basic@3.2.0`, resolved through the full package's
    `^3.1.0` dependency
- Final consumer config:

  ```js
  export { default } from '@santi020k/eslint-config-full/recommended'
  ```

The one-line full-package entry works and auto-detects Astro, TypeScript,
Tailwind, Vitest, and Playwright from the consumer. The website passes ESLint
with zero warnings, Astro's type check, all 249 unit tests, and its production
build after the findings below were addressed.

## Package and installation findings

### Completed — Full and basic releases are not synchronized

At the time of this migration, `@santi020k/eslint-config-basic` was `3.2.0`,
while the latest `@santi020k/eslint-config-full` was `3.1.0`. This works because
full depends on basic with `^3.1.0`, but it is easy for a consumer to think that
the full package is missing the latest library behavior.

Possible improvements:

- Publish `full` whenever a package it aggregates receives a meaningful release.
- Show both the aggregate-package version and resolved basic-package version in
  `doctor` and `compatibility`.
- Document prominently that package minors are independent and that the resolved
  basic version is authoritative for composer behavior.

Implemented so far:

- The Full package README and documentation now explain independent minor
  versions and identify the resolved Basic version as authoritative for composer
  behavior.
- Compatibility output now shows Full's installed version alongside its
  resolved Basic composer version and manifest path.
- Changeset CI and the release gate require Full to receive a changeset whenever
  one of its aggregated config packages changes. This publishes meaningful
  aggregate updates without forcing unrelated package minors to stay identical.

### Completed — The full package produces peer dependency warnings

Installing the full package with ESLint 10.8.0 and TypeScript 6.0.3 reported:

- `eslint-plugin-jsx-a11y@6.10.2` does not declare ESLint 10 support.
- `eslint-plugin-import@2.32.0` does not declare ESLint 10 support.
- Expo's `eslint-plugin-import@2.32.0` and `eslint-plugin-react@7.37.5` do not
  declare ESLint 10 support.
- `eslint-plugin-solid@0.14.5` does not declare ESLint 10 support.
- `eslint-plugin-tsdoc@0.5.2` installs `@typescript-eslint/*@8.56.1`, whose peer
  range rejects TypeScript 6.

The install completed and the website does not activate unrelated frameworks,
but a batteries-included package makes all of these warnings visible to every
consumer.

Possible improvements:

- Track ESLint 10-compatible releases or replacements for these plugins.
- Track TypeScript 6 support through the TSDoc dependency chain.
- Add an install test for `full` against the documented minimum and latest
  supported ESLint and TypeScript versions.
- Have `compatibility` distinguish inactive full-package dependencies from
  active peer incompatibilities.
- Consider a documented `full` support matrix so consumers know which warnings
  are upstream-only.

Full now documents its ESLint, optional TypeScript, and Node support matrix.
The packed-consumer release gate installs both the minimum published supported
ESLint/TypeScript pair and the latest matching ranges, loads detected React
rules, lints source, verifies compatibility plus the resolved Basic composer,
and requires peer health to contain no actionable warnings. Peer-health
attribution preserves the owning companion package when dependencies arrive
through Full, so accepted upstream-only warnings retain narrow owners and
removal conditions instead of appearing as active Full features. Compatibility
and doctor activation output distinguish the installed aggregate from the
features detection actually enables.

### Completed — Full means installed, not enabled

The full package installs every supported framework and integration, but the
recommended entry still enables only detected/default features. In particular,
the security extension was not active. Existing inline directives such as:

```js
// eslint-disable-next-line security/detect-non-literal-fs-filename
```

then failed with “Definition for rule ... was not found”. The correct migration
was to delete stale directives rather than keep global compatibility overrides.

Possible improvements:

- Clarify in the full-package README that “batteries included” refers to
  dependency availability, not enabling every optional rule pack.
- Make `migrate`, `doctor`, or `compatibility` find directives that reference
  rules from installed but inactive plugins.
- Report the option needed to activate the owning extension when such a
  directive is found.

The Full package README and documentation now distinguish dependency
availability from feature activation, explain why inactive-plugin directives
are invalid, and show deliberate feature activation.

## Rule conflicts and autofix issues

### Completed — Astro client-script indentation can enter a circular fix

Running `eslint . --fix` produced `ESLintCircularFixesWarning` for:

- `src/components/molecules/ShareButtons.astro`
- `src/components/molecules/SiteSearch.astro`

Both files use Astro client-side script processors. The effective config
contained:

```text
processor: astro/client-side-ts
@stylistic/indent: [warn, 2, ...]
```

Autofix moved selected declarations from normal script-body indentation to the
`<script>` baseline. The next lint pass expected the indentation back, causing
the oscillation. Type-annotated/JSDoc-adjacent declarations were especially
likely to trigger it.

Possible improvements:

- Add Astro fixtures containing typed client scripts, inline scripts, top-level
  declarations, JSDoc types, and repeated autofix passes.
- Assert idempotence by running autofix twice and comparing the output.
- Disable the generic indent rule for Astro virtual client scripts if the Astro
  processor cannot map its fixes safely.
- Prefer an Astro-aware indentation rule when one becomes available.

The Astro source and virtual-client-script scopes now disable the generic
indentation fixer while retaining Astro-aware rules. Repeated-autofix coverage
includes typed client scripts, inline scripts, top-level declarations, nested
code examples, and JSDoc-adjacent declarations.

### Completed — Comment spacing rules conflict around consecutive JSDoc declarations

In an inline Astro JavaScript block, consecutive typed declarations such as:

```js
/** @type {'idle' | 'loading' | 'ready' | 'error'} */
let state = 'idle'
/** @type {Promise<boolean> | null} */
let promise = null
```

caused incompatible demands:

- `@stylistic/lines-around-comment` required a blank line before each JSDoc
  comment.
- `@stylistic/padding-line-between-statements` rejected the blank line between
  consecutive variable declarations.

The consumer workaround was to use inline JSDoc casts:

```js
let state = /** @type {'idle' | 'loading' | 'ready' | 'error'} */ ('idle')
```

Possible improvements:

- Configure `lines-around-comment` to treat JSDoc attached to a declaration
  differently from ordinary block comments.
- Add a conflict test covering consecutive JSDoc-typed declarations.

`lines-around-comment` now ignores JSDoc attachment comments. A convergence
fixture proves that consecutive typed declarations remain stable without
weakening spacing for ordinary block comments.

### Completed — Fire-and-forget promise rules need a documented pattern

Existing code used `void promise` for intentionally ignored promises. The
recommended rules reject `void` with `no-void`, while promise rules can also
require a returned value or terminal catch:

- `no-void`
- `promise/always-return`
- `promise/catch-or-return`
- `arrow-body-style`

The working patterns were either:

```js
operation()
```

when the function handles its own errors, or:

```js
operation()
  .then(value => use(value))
  .catch(() => undefined)
```

Possible improvements:

- Document the recommended fire-and-forget pattern.
- Consider allowing `void` when it intentionally marks a promise as ignored,
  especially in DOM event handlers.
- Add combined-rule tests for event handlers and service-worker registration.

Standalone `void` statements are now allowed as explicit fire-and-forget
markers, while other `void` expressions remain disallowed. Runtime documentation
shows a rejection-handled event-listener pattern, and combined-rule coverage
checks it against the core promise rules.

### Completed — Function style plus empty-function rules make cleanup factories verbose

The recommended config reported both function declarations and empty fallback
callbacks:

- `func-style` expected a function expression.
- `@typescript-eslint/no-empty-function` rejected `() => {}`.

The migration used:

```js
const setup = function () {
  if (!element) return () => undefined
}
```

Possible improvements:

- Document the preferred named setup/cleanup pattern.
- Consider allowing empty callbacks when they are explicit no-op cleanup
  functions.
- Review whether requiring function expressions improves Astro client scripts
  enough to justify the migration volume.

The configuration guide now documents the named setup/cleanup expression
pattern and uses `() => undefined` for an explicit no-op cleanup. Combined
TypeScript coverage verifies that this pattern satisfies both `func-style` and
`@typescript-eslint/no-empty-function` without weakening either rule globally.

## Tailwind detection gaps

`better-tailwindcss/no-unknown-classes` correctly activated without custom
consumer configuration, but it rejected several legitimate class categories:

- Tailwind Typography: `not-prose`
- Project utilities defined in CSS: `prose-shell`
- Component-local CSS classes: `principle-card`, `post-meta-card`
- Semantic metadata classes: `h-entry`, `u-url`, `e-content`, `p-name`,
  `p-summary`

The previous consumer config had a large global ignore list. The clean
migration replaced it with narrow, documented file-level exceptions so the
rule remains active everywhere else.

Possible improvements:

- Detect classes declared in Astro component-local `<style>` blocks.
- Resolve Tailwind v4 `@utility` declarations from the detected CSS entry point.
- Recognize utilities supplied by installed Tailwind plugins, including
  Typography's `not-prose`.
- Provide a first-class semantic-class allowlist option or documented pattern.
- Have `doctor` suggest the smallest exception scope rather than a global ignore
  list.
- Add Astro, MDX, Tailwind Typography, and Tailwind v4 custom-utility fixtures.

MDX has an additional usability detail: an HTML comment used as an ESLint
directive causes an MDX preprocessing error. The valid MDX form is:

```mdx
{/* eslint-disable better-tailwindcss/no-unknown-classes -- reason */}
```

This should be included in documentation and generated suggestions.

## Formatting and migration ergonomics

The first full autofix touched many Astro templates, especially multiline class
attributes and attribute ordering. Although the result passed, the diff was much
larger than the actual behavioral migration and made review harder.

Possible improvements:

- Add a migration mode that separates safe semantic fixes from high-churn
  formatting fixes.
- Let `migrate` or `doctor` show the rules responsible for most changed lines.
- Add an autofix idempotence check and stop with an actionable report when
  circular fixes are detected.
- Provide a snapshot/diff command example specifically for reviewing a v2-to-v3
  formatting migration.

Full-repository linting also took roughly 80–90 seconds for 189 source files in
this consumer. A profile should determine whether type-aware parsing, spelling,
Tailwind scanning, or the number of active processors dominates the runtime.
Useful improvements would include per-rule timing in `profile`, cache guidance,
and a documented fast editor/pre-commit mode that preserves the full CI rules.

## Successful migration sequence

The sequence that produced the cleanest result was:

1. Replace the consumer config completely with the one-line full recommended
   export.
2. Replace granular config dependencies with `eslint-config-full`.
3. Regenerate the lockfile.
4. Run one whole-repository autofix pass and record circular-fix warnings.
5. Delete stale directives for rules that are no longer active.
6. Resolve remaining rule findings manually.
7. Use narrow local exceptions only for confirmed Tailwind false positives.
8. Run lint without autofix to avoid re-triggering known Astro oscillations.
9. Verify type checking, unit tests, and a production build.

---

**Improvements learned from the Santi020k Theme monorepo migration**

## Test project and final setup

- Consumer: `../santi020k-theme`
- Workspace projects detected by `doctor`: 11
- Stack during migration:
  - Node.js 22.23.1
  - ESLint 10.7.0
  - TypeScript 5.9.3
  - Astro 7.1.4
  - pnpm 10.32.1 with catalog dependencies
  - `@santi020k/eslint-config-basic@3.2.0`
- Final root config:

  ```js
  import { defineConfig } from '@santi020k/eslint-config-basic'

  export default defineConfig()
  ```

The migration deleted the previous 130-line compatibility config, including
global ignores and overrides that disabled formatting, complexity, security,
Node, YAML, Markdown, and Astro coverage. The zero-argument v3.2.0 config
correctly detected all workspace projects and required no explicit feature
options.

The first clean autofix touched 48 files. Before manual fixes, ESLint reported
324 remaining findings: 54 errors and 270 warnings across 70 files. The final
uncached autofix and non-fix lint runs both completed with zero findings and no
circular-fix warning.

The consumer's full validation passed after migration:

- 5 Astro projects type-checked with zero errors, warnings, or hints.
- 11 package and website builds passed.
- 12 generated VS Code theme files validated.
- Marketplace, Chrome, Terminal, and Zed validation passed.
- Accessibility and SEO reports passed.
- 54 tests passed.
- ESLint passed with `--max-warnings=0`.
- Knip completed.
- The VSIX packaged successfully.

## CLI diagnostics and installation findings

### Completed — `compatibility` resolves pnpm catalog declarations

`pnpm why` and Node resolution confirmed that Basic 3.2.0 and every declared
optional config package were installed. However:

```sh
pnpm exec basic-eslint compatibility
```

reported Basic, Astro, Extensions, Formats, Libraries, Testing, Tools, and Vite
as “declared but not installed”. Every dependency is declared as `"catalog:"`
in `package.json`, with its version in `pnpm-workspace.yaml`.

Possible improvements:

- Resolve pnpm `catalog:` and named catalog specifiers before checking installed
  versions.
- Use the package manager's resolved dependency graph or `createRequire`
  resolution as the authoritative installed-state check.
- Add compatibility fixtures for pnpm workspaces with catalogs.
- Never report the package executing the command as absent when its own binary
  and manifest are resolvable.
- Include the declaration, resolved path, and resolved version in diagnostic
  output so false negatives are easy to identify.

Compatibility checks now treat the declaration string as metadata and use
`createRequire` package resolution as the installed-state authority, so default
and named `catalog:` specifiers do not produce false missing-package reports.
The JSON result includes the original declaration, resolved manifest path, and
resolved version. Regression coverage uses a named catalog declaration and
also proves that the executing Basic package is recognized when resolvable.

### Completed — `doctor` gave useful workspace detection but limited activation detail

`doctor` correctly found the config and all 11 workspace projects, reported no
missing required packages, and warned that Astro Doctor was not enabled.

It did not explain which optional packages and rule packs were activated for
each workspace. That information would have shortened investigation of Astro,
format, testing, tools, and type-aware behavior.

Possible improvements:

- Print a compact per-project activation table in verbose mode.
- Show the selected runtime, TypeScript mode and tsconfig, framework processors,
  formats, libraries, extensions, testing packs, tools, and ignored files.
- Distinguish “installed”, “detected”, and “enabled”.
- Explain why an installed optional package was not activated.

`doctor --verbose` now prints one compact activation row for the workspace root
and each detected project. The report includes runtime, TypeScript mode and
tsconfig, framework processors, formats, libraries, extensions, testing packs,
tools, and ignore patterns. Markers distinguish installed, detected, and enabled
state, while follow-up explanations identify missing supporting packages,
detected packs absent from the active config, and installed optional packages
without a matching project signal. The same structured project data is always
available from `doctor --json`.

### Completed — The documented Node minimum is easy to propagate

Basic 3.2.0 requires Node.js `>=22.19.0`, while the consumer root still declared
`>=22.18.0`. The running Node version was compatible, so diagnostics passed, but
the consumer manifest promised an unsupported installation range.

Possible improvements:

- Have `doctor` and `compatibility` compare the consumer's `engines.node` range
  with the config package's engine requirement.
- Let `doctor --fix` raise an incompatible consumer minimum safely.
- Include the required Node range in migration output.

`compatibility` now reports the consumer's declared `engines.node` range and
uses semver range containment to verify that it does not promise runtimes below
an installed config package's requirement. The report still checks the current
runtime separately. `doctor` emits the same actionable warning, and
`doctor --fix` intersects the consumer and installed-package ranges before
writing. This preserves supported branches instead of blindly replacing
nontrivial unions; simple and Node 20/22 union ranges have regression coverage.

## TypeScript project discovery

### In progress — Declaration-only packages were not covered automatically

Root-level declaration files in `packages/theme` and `packages/theme-core`
failed with:

```text
was not found by the project service
```

Both are JavaScript packages that ship handwritten `.d.ts` files and originally
had no `tsconfig.json`. Adding small package-local configs covering JavaScript
and declaration files restored type-aware linting.

The same issue appeared when a new `prompt-presets.d.mts` declaration was added
to the Terminal package; it also required a package-local tsconfig.

Possible improvements:

- Detect declaration-only and JavaScript-plus-declaration workspace packages.
- Provide a syntax-only fallback for declaration files outside a discovered
  project, matching the documented config-file fallback behavior.
- Have the parse error name the nearest package and suggest either a minimal
  tsconfig or `typescript.untypedFiles`.
- Add monorepo fixtures for `.d.ts`, `.d.mts`, JavaScript packages, and packages
  without an existing tsconfig.

Declaration files are now detected recursively within each package (excluding
dependency, build, and generated output folders). A package with `.d.ts`,
`.d.mts`, or `.d.cts` files but no supported tsconfig selects syntax-only
TypeScript mode, while a package with a tsconfig keeps type-aware mode.
Monorepo and detection fixtures cover declaration-only, JavaScript-plus-
declaration, and plain JavaScript packages. A dedicated nearest-package parse
error with a minimal-tsconfig suggestion remains open.

### Completed — A shared Astro component was parsed as plain JavaScript

`packages/theme/components/AppleIcon.astro` belonged to a framework-neutral
package that did not declare Astro, even though multiple detected Astro apps
imported it. Zero-config project detection parsed the file without the Astro
processor and failed at the opening `<svg>`.

The consumer converted this pure icon component to `AppleIcon.svg`, which Astro
can import as a component without forcing the shared package to depend on
Astro.

Possible improvements:

- Consider file-presence or cross-workspace import evidence when assigning the
  Astro processor.
- At minimum, produce an actionable missing-processor diagnostic for `.astro`
  files instead of a generic JavaScript parse error.
- Add a fixture where an Astro app imports a component from a framework-neutral
  workspace package.

Project detection now scans package source trees for `.astro` files while
excluding dependencies and build output. A framework-neutral workspace package
with Astro components therefore receives the scoped Astro parser and processor
without needing to declare a runtime dependency solely for linting. The
monorepo regression includes an Astro application importing a shared component
from such a package and verifies that both project scopes receive the Astro
configuration.

### Completed — Type-aware rules exposed real missing public types

Astro props, a cross-package `.mjs` import, and gallery asset factories initially
produced unsafe assignment/member warnings. The correct fixes were:

- explicit Astro `Props` interfaces;
- a `prompt-presets.d.mts` public declaration;
- JSDoc parameter types for JavaScript asset factories;
- normal package-local tsconfigs.

This is successful library behavior. Documentation should highlight these
patterns as the preferred fix before suggesting rule suppression.

The TypeScript configuration guide now presents package-local tsconfigs,
explicit public declarations, Astro `Props` interfaces, and JSDoc parameter
types as the preferred response to unsafe-type diagnostics. Syntax-only
fallbacks remain documented for genuinely out-of-project files rather than as
a replacement for missing public types.

## Astro rule conflicts and autofix convergence

### Completed — Generic indentation and JSX closing-tag fixes oscillated

The first uncached autofix emitted `ESLintCircularFixesWarning` for seven Astro
files. The cycle involved inline client scripts, fragments, and closing script
or template tags:

- `@stylistic/indent` moved virtual-script content relative to the source
  `<script>` baseline.
- `@stylistic/jsx-closing-tag-location` moved the related closing tag back.
- A subsequent pass restored the first layout.

Some Astro virtual blocks also reported source-impossible EOF combinations:

- trailing spaces;
- too many final blank lines;
- missing final newline.

Narrow source directives were still required for confirmed conflicting Astro
scopes. After those exceptions and manual source formatting, a fresh uncached
autofix converged without warnings.

Possible improvements:

- Disable generic indentation and JSX closing-tag fixes in Astro virtual client
  scripts when their source maps cannot produce a shared stable layout.
- Add repeated-fix tests for inline scripts, fragments, same-line script imports,
  nested ternaries, and multiple virtual script blocks.
- Treat an `ESLintCircularFixesWarning` as a failing integration test.
- Verify that EOF-oriented rules report against the real `.astro` source rather
  than each virtual fragment.
- Add an Astro-specific idempotence command to `profile` or `doctor`.

Astro source and virtual-script scopes now disable the generic JavaScript
indentation fixer while retaining Astro-aware formatting. Repeated-fix
integration coverage exercises inline and typed scripts, fragments, same-line
imports, nested ternaries, JSDoc declarations, nested code examples, and
multiple virtual blocks. Every fixture must stabilize after one pass, emit no
`ESLintCircularFixesWarning`, and avoid fragment-level EOF diagnostics.

### Completed — `max-len` is noisy for declarative Astro and generated templates

The 120-column rule reported many long Astro tags, SVG paths, embedded code
samples, CSS templates, generated terminal formats, and store-artwork markup.
Wrapping some of these changes generated output or makes declarative content
harder to review.

The consumer retained the rule for normal code and used narrow file-level
exceptions only for embedded/generated content.

Possible improvements:

- Ignore SVG path data, URLs, and attribute-only Astro markup.
- Offer a generated-template preset or documented local exception pattern.
- Avoid reporting long embedded code samples whose line structure is part of
  the rendered preview.
- Include Astro and template-literal max-length fixtures.

The shared default ignores URLs, ordinary strings, and template literals, while
the Astro scope disables the JavaScript-oriented line-length rule for
declarative documents. Integration coverage includes long accessible markup
and SVG path data. The configuration guide also shows a narrow generated-file
override so application code keeps the 120-column limit.

## Context-sensitive rule findings

### Completed — CLI scripts need a first-class runtime context

More than 100 `no-console` findings and 20 `n/no-process-exit` findings came
from validation, generation, packaging, publishing, and long-running launcher
scripts. These commands intentionally own terminal output and, in several
cases, process lifecycle.

The installed Tools package did not make ordinary `scripts/**/*.mjs` files a CLI
context automatically. The consumer used justified source-level directives so
the rules remain active in application/browser code.

Possible improvements:

- Detect CLI entry points from `bin`, shebangs, package scripts, and conventional
  `scripts/` directories.
- Provide a `runtime: 'cli'` or `tools: { cli: ... }` scope with documented
  `no-console` and `n/no-process-exit` behavior.
- Distinguish reusable library modules from actual command entry points.
- Let `doctor` suggest the smallest CLI scope rather than global rule overrides.

The composer now creates a narrow CLI entry-point scope for conventional
`scripts/` directories and paths declared by each package's `bin` field. That
scope allows terminal output, deliberate process termination, and unpublished
build dependencies while ordinary `src/` modules retain the application rules.
Workspace project composition recomputes bin entries per package. Runtime
documentation recommends keeping reusable logic outside these entry points, and
coverage verifies that unrelated source globs are not included.

### Completed — External schemas legitimately use snake_case

Chrome manifest and Zed theme generation code must emit keys such as
`theme_ntp_background`, `font_style`, and `ntp_background_repeat`. `camelcase`
reported 44 findings for these external schema names.

Possible improvements:

- Document source-level exceptions for external schema adapters.
- Consider allowing quoted/object-property schema keys while still checking
  local variable names.
- Add Chrome and Zed schema fixtures.

The shared `camelcase` rule now ignores object-property spelling while retaining
checks for local bindings. Coverage includes Chrome and Zed-style fields,
quoted and computed keys, TypeScript declarations, and destructuring renamed to
a camel-case local. The configuration guide documents that adapter boundary and
recommends a justified source-level exception only when an external API also
forces a nonstandard local binding.

### Completed — Complexity thresholds are useful but need validator guidance

Twelve complexity findings and three max-depth findings occurred in mature
validators that deliberately aggregate independent checks to return complete,
actionable reports. Small functions near the threshold were refactored; larger
release and validation transactions received narrow, reasoned directives.

Possible improvements:

- Document when to refactor versus when a complete-report validator merits a
  local exception.
- Consider separate complexity profiles for application logic, parsers,
  validators, and CLI transactions.
- Have `explain complexity --file ...` show the counted branches.

The extensions guide now distinguishes refactorable branching from deliberate
complete-report validators and documents how to keep any exception narrow and
reasoned. `basic-eslint explain complexity --file ...` also lints the requested
file and reports ESLint's calculated complexity findings with their source
locations in text and structured JSON output. Regression coverage verifies the
rule-specific filtering and both output modes.

### Completed — Function-style rules have a non-obvious multiline convergence shape

For a long expression, these rules can conflict ergonomically:

- `func-style` rejects a function declaration.
- `arrow-body-style` rejects a block containing only `return`.
- `@stylistic/implicit-arrow-linebreak` rejects placing the returned expression
  on the next line after `=>`.
- `@stylistic/max-len` rejects keeping everything on one line.

The stable form was:

```js
const result = value => (
  createLongResult(value, {
    enabled: true
  })
)
```

Possible improvements:

- Document this multiline expression-body style.
- Add a combined-rule convergence test.
- Consider allowing a return-only block when the concise form would exceed
  `max-len`.

The configuration guide now documents the parenthesized multiline
expression-body form. Combined-rule convergence tests run autofix twice across
long arrow predicates, function and constructor calls, ternaries, and nullish
coalescing expressions, requiring the second pass to be unchanged and free of
line-length findings.

## Format-specific findings

### Completed — GitHub Actions empty events conflict with the YAML rule

Valid workflow syntax such as:

```yaml
workflow_dispatch:
```

was rejected by `yml/no-empty-mapping-value`. Converting it to the equivalent:

```yaml
workflow_dispatch: {}
```

resolved ten errors, including an empty `pull_request:` event.

Possible improvements:

- Add GitHub Actions-aware exceptions for event keys that intentionally use a
  null mapping value.
- Autofix known workflow event keys to `{}`.
- Add workflow fixtures for `workflow_dispatch`, `pull_request`, and `push`.

The YAML integration now applies a GitHub Actions-specific override inside
`.github/workflows`. Known event keys may use the valid null mapping shorthand,
while a replacement selector continues to report unrelated empty values.
Integration coverage includes `workflow_dispatch`, `pull_request`, `push`, and
an invalid empty job mapping.

### Confirmed — Markdown correctly required fenced-code languages

Four missing-language findings in agent and store-listing Markdown were resolved
with `text` fences. This was useful behavior and required no config exception.

No library change is needed: fenced-code language enforcement remains enabled,
and historical fenced JavaScript examples retain their original formatting
through the dedicated Markdown code-block override.

## Autofix changed source assumptions outside ESLint

Stylistic autofix converted JavaScript object keys and values in Astro
front-matter from JSON-like double-quoted text to normal single-quoted
JavaScript.
Two repository utilities only recognized:

```js
"softwareVersion": "2.1.3"
```

and stopped recognizing:

```js
softwareVersion: '2.1.3'
```

This broke both website version synchronization and marketplace validation even
though the metadata value itself was current. The consumer fixed both parsers
to accept quoted or unquoted keys and either quote style, then added regression
tests.

Possible improvements:

- Migration guidance should warn that stylistic autofix can expose brittle
  source-text parsers.
- A migration mode could identify scripts that regex-match source formatting.
- Snapshot/diff output should call attention to changed machine-read source.

The JSON/package-script linting also strengthened root and package lint commands
with `--max-warnings=0`. This is desirable for CI consistency, but it is a
surprising semantic autofix and should be called out explicitly in dry-run or
migration output.

## Recommended migration sequence for large monorepos

1. Confirm the installed Basic version with both package-manager resolution and
   direct manifest resolution.
2. Replace the entire root config with `defineConfig()`.
3. Run `doctor`, `compatibility`, and representative `explain` commands, but
   verify diagnostics independently when pnpm catalogs are used.
4. Run one uncached whole-repository autofix and save all circular-fix warnings.
5. Add missing package-local tsconfigs and public declarations before
   suppressing type-aware rules.
6. Fix format semantics such as YAML empty mappings and Markdown fence
   languages.
7. Refactor real application findings.
8. Use narrow, reasoned source directives only for confirmed generated content,
   external schemas, CLI lifecycle behavior, complex aggregate validators, and
   processor conflicts.
9. Run autofix again with `--no-cache` and require a silent, idempotent result.
10. Run lint without autofix and `--max-warnings=0`.
11. Run the consumer's complete typecheck, build, test, validation, and package
    pipeline.
12. Check that validation scripts do not depend on formatting that autofix is
    allowed to change.
