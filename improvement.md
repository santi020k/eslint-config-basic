# Improvements learned from consumer migrations

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

### Completed — Declaration-only packages were not covered automatically

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
declaration, and plain JavaScript packages. Doctor now preserves the detected
TypeScript mode instead of reducing it to a boolean, names the nearest workspace
path and package, and explains the automatic syntax fallback, package-local
minimal-tsconfig route, and `typescript.untypedFiles` option. This prevents the
project-service parse failure in zero-config composition while retaining an
actionable package-specific diagnostic for intentional type-aware adoption.

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
coverage verifies that unrelated source globs are not included. Security rules
remain enabled because command entry points still process external paths and
arguments.

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

The extensions guide now distinguishes branching that can be refactored from deliberate
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

## Observatory migration follow-up (2026-07-30)

- Consumer: `../observatory`
- Stack: Astro 7.1.3, Hono 4.12.32, TypeScript 6.0.3, ESLint 10.7.0
- Composer: `@santi020k/eslint-config-basic@3.2.0`
- Companion Astro config: `@santi020k/eslint-config-astro@3.1.0`
- Final consumer config:

  ```ts
  import { defineConfig } from '@santi020k/eslint-config-basic'

  export default await defineConfig()
  ```

### Completed — Astro top-level redirects crash `no-misused-promises`

Astro pages legitimately terminate front matter with statements such as:

```ts
if (response.status === 401) return Astro.redirect('/login/')
```

With the zero-argument auto-detected configuration, ESLint aborted instead of
reporting a diagnostic:

```text
Non-null Assertion Failed: Expected node to have a parent.
Rule: "@typescript-eslint/no-misused-promises"
```

The failure reproduced on every page containing a top-level Astro redirect,
including a page whose entire front matter was one return statement. It blocks
both lint and autofix. The consumer uses a pnpm patch that disables only
`@typescript-eslint/no-misused-promises` for real `**/*.astro` source files.

Possible improvements:

- Disable this rule for Astro source until the parser and TypeScript rule agree
  on parent pointers for Astro's top-level return nodes.
- Add fixtures for conditional and unconditional `return Astro.redirect(...)`.
- Assert that both normal lint and `--fix` complete without throwing.
- Keep the rule enabled for ordinary TypeScript and Astro virtual client scripts.

The Astro source scope now disables only
`@typescript-eslint/no-misused-promises`, leaving it enabled for ordinary
TypeScript and client-script virtual files. Type-aware integration fixtures
exercise both conditional and unconditional top-level redirects and require
normal lint plus autofix to complete without fatal diagnostics.

### Completed — The published Astro package lacks current virtual-script safeguards

The 3.1.0 package installed from npm did not include the current source
configuration's `@stylistic/indent`, unused-variable, and `no-undef` safeguards
for Astro virtual scripts. Autofix consequently emitted circular-fix warnings
and unstable indentation in inline scripts. Applying the current source rules
as a package patch made autofix converge.

Possible improvements:

- Publish the current Astro package changes and add packed-artifact assertions
  for every virtual-script safeguard.
- Run repeated autofix tests against the packed npm artifact, not only workspace
  source imports.
- Have `compatibility` identify when Basic is newer than an installed companion
  package whose fixes it expects.

Astro has a release changeset for the virtual-script and convergence fixes. The
packed modular-consumer gate installs the generated Astro tarball, runs an
inline-script fixture through autofix, and requires the second dry-run pass to
produce no output. The broader repeated-fix workspace suite continues to cover
typed scripts, JSDoc, nested code examples, fragments, and multiple virtual
blocks.

### Completed — `/recommended` is valid but `doctor` misdiagnoses project scoping

This supported zero-config form loaded and linted the monorepo:

```ts
export { default } from '@santi020k/eslint-config-basic/recommended'
```

However, `basic-eslint doctor --json` warned:

```text
Workspace packages were detected, but the root config does not use `projects` scoping.
```

Switching to an explicit zero-argument `defineConfig()` call removed the warning
without changing consumer settings. The validation logic recognizes composer
calls syntactically but not the recommended re-export.

Possible improvements:

- Treat the `/recommended` entry point as a composer-backed, auto-scoped config.
- Add doctor fixtures for JavaScript and TypeScript re-export-only configs.
- Resolve and inspect the active config rather than relying only on source-text
  patterns when determining project scope.

Doctor now recognizes Basic and Full `/recommended` re-exports as composer-
backed auto-scoped configurations. JavaScript-config fixtures for both entries
verify that detected workspace projects no longer produce the false unscoped
warning.

### Completed — Catalog compatibility output needs packed-release coverage

All config packages resolved through pnpm and `pnpm list`, but the published
3.2.0 `compatibility` command reported each `catalog:` dependency as “declared
but not installed”. The parent workspace already contains a source fix and
regression coverage for this behavior. Add a packed-CLI consumer check so the
fix cannot be marked complete until the exact publish artifact reports the
installed paths and versions correctly.

The packed modular-consumer gate now declares every local config tarball through
a named pnpm `catalog:configs`, executes the packed Basic CLI's
`compatibility --json`, and requires every catalog declaration to have an
installed version and manifest path with no missing-package issue. The Full
support matrix separately verifies that import-only aggregate packages and
their resolved Basic composer are found through the packed CLI.

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

## Lumen follow-up findings with 3.2.0 zero-config auto-detection

### Completed — Tailwind entry-point discovery is workspace-scoped

`defineConfig()` correctly detected Tailwind from the workspace dependency
graph, but `findTailwindEntryPoint(rootDir)` only checked conventional paths
under the repository root. Lumen's real entry is
`apps/docs/src/styles/global.css`, so the generated Better Tailwind settings
had no `entryPoint` and reported hundreds of diagnostics with the plugin's
“No tailwind css entry point found at undefined” warning.

Possible improvements:

- Search detected workspace projects for conventional Tailwind entry points.
- Scope each discovered entry point to its owning workspace instead of applying
  a single root entry to the entire monorepo.
- Have `doctor` report a detected Tailwind library with no usable entry point;
  it currently passes with only the unrelated Astro Doctor advisory.
- Expose the selected entry points in `inspect --json`.

Zero-config workspace composition now keeps root-only Tailwind development
dependencies from leaking into every package, recursively composes each detected
workspace from its own root, and resolves conventional CSS entry points there.
The monorepo regression reproduces Lumen's `apps/docs/src/styles/global.css`
layout: only the docs scope receives that entry point and strict unknown-class
validation, while unrelated workspaces receive neither setting. `doctor` and
`inspect --json` expose the selected conventional entry point per project;
`doctor` also explains the safe fallback when a detected Tailwind project has
none.

### Completed — Autodetected `no-unknown-classes` and mixed CSS systems

Even with a valid entry point, `better-tailwindcss/no-unknown-classes` rejects
ordinary BEM and component-library selectors. Lumen intentionally combines
Tailwind utilities with standalone semantic classes such as `ui-button`,
`docs-site-header`, and `lumen-template__panel`. Version 3.2.0 enables the rule
at error severity automatically, leaving `tailwind.noUnknownClasses: false` as
the only local setting required by an otherwise zero-config migration.

Possible improvements:

- Default this rule to off when Tailwind is detected but no entry point is
  found.
- Add an auto-detection policy for mixed Tailwind plus standalone component CSS,
  or make unknown-class enforcement an opt-in strict feature.
- In monorepos, apply unknown-class validation only to workspaces whose class
  system can be compiled by the selected Tailwind entry point.
- Explain the supported `tailwind.noUnknownClasses` escape hatch in `doctor`
  output when the rule produces a large false-positive set.

When Tailwind is enabled but no usable CSS entry point is
available, the composer now disables only `no-unknown-classes` instead of
running it with incomplete settings. Workspace scoping prevents a Tailwind app's
strict rule from leaking into sibling component packages. With a usable entry
point, the composer recursively follows local CSS imports and converts declared
standalone selectors and static Tailwind v4 `@utility` declarations into exact
anchored ignore patterns. This recognizes BEM, component-library, and custom
utility classes without globally disabling validation; a nearby undeclared typo
remains an error. Dynamic `@utility name-*` declarations, package imports, and
remote imports are deliberately left to the Tailwind compiler or explicit
consumer patterns rather than guessed.
`detectComponentClasses: false` opts out, and explicit `tailwind.ignore`
patterns merge with the detected classes. Doctor and inspect report the
`strict-with-css-components` policy and detected selector count.

### Completed — Astro closing-tag autofix converges

Repeated 3.2.0 autofix passes emitted `ESLintCircularFixesWarning` for
`apps/docs/src/pages/docs/theme-playground.astro` and
`packages/lumen/templates/astro/saas-admin/src/lumen/saas-admin.astro`.
The conflict involved Astro JSX closing-bracket/closing-tag placement and
indentation, requiring a final manual formatting pass.

Possible improvements:

- Add these two shapes as repeated-fix regression fixtures.
- Require two consecutive packed-artifact autofix passes to be byte-identical.
- Resolve precedence between the Astro processor's indentation output and the
  stylistic JSX closing-location rules.

The Astro source scope now disables the generic JSX closing-tag-location fixer,
which cannot safely map all of its edits through Astro templates. Repeated-fix
fixtures reproduce both Lumen shapes: multiline component attributes with text
adjacent to the opening bracket, and dense nested component markup. Two
consecutive passes are byte-stable and emit no circular-fix warning.

### Completed — Nested Astro templates are detected inside mixed packages

`packages/lumen` declares Astro and React development dependencies and contains
installer sources under `templates/astro/**`. The published 3.2.0 detector
reported only React for that package, and its scoped config parsed every
`.astro` template as plain TypeScript. A local
`projects["packages/lumen"].frameworks.astro` declaration was required.

Possible improvements:

- Treat a declared `astro` dependency as authoritative for package-scoped
  detection, even when React is also present.
- Make the `.astro` file probe recursive through conventional nested source and
  template directories.
- Add a mixed React package with nested Astro templates to packed zero-config
  monorepo coverage.

Framework detection now treats the declared Astro dependency independently of
React and recursively probes project trees for `.astro` files while excluding
dependency and generated-output directories. The fixture matrix reproduces
Lumen's mixed React/Astro package and deeply nested
`templates/astro/saas-admin/src/lumen/*.astro` layout, verifying that both
framework scopes are activated.

### Completed — Generated Next.js declarations remain lint-clean after a build

The Next.js build regenerated `apps/next-smoke/next-env.d.ts` with double
quotes and semicolons. The recommended stylistic rules then reported
`@stylistic/quotes` and `@stylistic/semi`, so a repository that was clean before
`next build` was dirty again afterward.

Possible improvements:

- Treat `next-env.d.ts` as generated Next.js output and exclude it from
  stylistic source-formatting rules.
- Add a convergence fixture that runs `next build` before ESLint and requires
  the generated declaration to pass without being rewritten.
- Have `doctor` identify generated framework files that are currently included
  in conflicting autofix rules.

The composed Next.js configuration now treats `next-env.d.ts` as generated
framework output and disables only the quote and semicolon formatting rules for
that file. A regression fixture uses the declaration text emitted by current
Next.js builds, and the complete 789-test package suite verifies both the rule
behavior and the composed-config snapshot.

<!-- consolidated-improvement-history -->

## Basic package consumer-driven improvements

These opportunities came from migrating a real ESLint 10, pnpm, TypeScript,
Astro, Tailwind, and Vitest monorepo to the modular v3 packages. They are
ordered by how directly they affect whether a consumer can install and lint
successfully.

### Dep Beacon follow-up after adopting 3.2.0

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

#### Completed — Improve adoption reports with source-level lint debt

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

#### Completed — Make the default stylistic rule set internally satisfiable

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

#### Completed — Prevent Astro circular autofixes

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

#### Completed — Make `max-len` practical across code, prose, and workflows

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
- Astro documents no longer receive the JavaScript-oriented line-length rule;
  coverage preserves long accessible markup and SVG path data. YAML and
  Markdown use their format-specific parsers rather than the JavaScript rule,
  and generated templates have a documented narrow override. Source-adoption
  reports count warnings separately and therefore make the effect of
  `--max-warnings=0` visible before migration.

#### Completed — Handle external schema names without project-wide camel-case exceptions

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

#### Completed — Keep plugin attachment automatic for consumer overrides

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

#### Completed — Surface unresolved TypeScript modules as one root problem

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

#### Completed — Add an end-to-end autofix adoption fixture

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
source and config type checks, Vitest, peer health, and a frozen reinstall.
The fixture performs one explicit manual adoption edit between analysis and
autofix: an inline Astro client script stops using debug `console` output,
demonstrating that correctness/context findings are reviewed instead of hidden
by the formatting pass.

### Implemented for the next release

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

### Completed — Make every emitted config independently valid in ESLint 10

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

### Completed — Make the install planner project-aware

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

### Completed — Replace deprecated Lite advice in normal doctor output

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

### Completed — Clarify root versus project option inheritance

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

### Completed — Add a realistic modular-consumer release fixture

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

### Completed — Preserve pnpm workspace catalogs during installation

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

### Completed — Keep `untypedFiles` last enough to be effective

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

### Completed — Preserve nested import failures

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

### Completed — Make preset expansion visible and adoption-friendly

`Preset.App`, `Preset.Worker`, and `Preset.Library` can activate substantially
more rules than an existing default config. That is useful for new projects,
but a migration can unexpectedly introduce hundreds of formatting or
domain-specific findings.

Add `basic-eslint explain-preset <preset>` and a migration mode that compares
the current effective config with the selected preset. Group the output into
formatting, correctness, security, framework, and domain rules, and generate a
temporary compatibility override when requested.

### Completed — Make CLI help side-effect free

`basic-eslint install --help` should print subcommand help and exit without
installing packages. Add command-level parsing tests for `--help`, `--dry-run`,
and invalid flags so documentation discovery can never mutate a workspace.

Help flags are intercepted before command dispatch, dedicated subcommand help
lists only supported flags, and strict parsing rejects unknown or incomplete
options before any handler can mutate the workspace.

### Completed — Respect release compatibility under minimum-age policies

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

### Completed — Treat peer health as a release signal

The modular consumer installed and linted successfully but `pnpm peers check`
still reported stale ESLint and TypeScript peer ranges from transitive plugins.
These warnings make genuine missing-peer failures harder to notice.

Add a release report that:

- runs the package manager's peer checker in packed consumer fixtures;
- identifies which direct package introduces each warning;
- fails for newly introduced actionable warnings;
- records explicitly accepted upstream range gaps with an owner and removal
  condition.

### Completed — Generate modern configuration during migration

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

### Completed — Resolve npm aliases by their installed dependency key

Doctor previously required a resolved package manifest's `name` field to match
the requested dependency key. Valid npm aliases such as
`typescript: npm:@typescript/typescript6@...` therefore appeared uninstalled in
every child workspace even though Node resolution and TypeScript both worked.

Resolution by the requested specifier is now authoritative, while the real
aliased manifest metadata remains available for version and engine checks. A
workspace regression covers the TypeScript 6 development alias.

### Completed — Reconcile detected and active doctor state

Preset-created config entries can activate a category pack without a matching
dependency signal in the project summary. Doctor previously omitted that active
feature and simultaneously described its installed package as inactive, making
feature-pack pruning unsafe.

The root activation row now includes active-config-only features with
`detected: false` and `enabled: true`. Matching packages are removed from the
inactive list, while child rows continue to describe their own dependency
detection. Regression coverage verifies both states.

---

## Parent-project adoption after ESLint Config Basic 3.2.0

<!-- cspell:words aaronmgz commitprompt difftale lintable memudo postlens -->

Date: 2026-07-30

### Scope

The 3.2.0 upgrade was applied to these direct consumers:

- `aaronmgz`
- `astro-doctor`
- `commitprompt`
- `dep-beacon`
- `difftale`
- `lumen`
- `memudo.ai`
- `observatory`
- `postlens`
- `santi020k-theme`
- `website`
- `workspace-organizer`

All projects now resolve `@santi020k/eslint-config-basic` 3.2.0 and use automatic
root, workspace project, framework, runtime, TypeScript, format, testing, library,
and tool detection wherever the detected result is sufficient. Explicit settings
remain only for behavior that detection cannot infer or for compatibility with
established project code.

### Recommended follow-up improvements

#### 1. Completed — Retire the temporary formatting compatibility layer

Several established projects do not yet match the default `@stylistic` rules.
Their configs temporarily disable formatting rules while leaving correctness,
security, framework, testing, and domain rules active.

Adopt formatting one repository at a time:

1. Run `basic-eslint explain-preset monorepo` (or the detected application/library
   preset).
2. Apply formatting-only fixes in a dedicated change.
3. Remove `temporary-formatting-compatibility` after the repository passes with
   `--max-warnings=0`.

Highest-value candidates are `astro-doctor`, `commitprompt`, `dep-beacon`,
`difftale`, `lumen`, and `website`.

The generated all-stylistic compatibility layers are now retired:

- Difftale and Astro Doctor removed `temporary-formatting-compatibility`,
  adopted the preset autofix, wrapped their remaining overlong implementation
  lines, and pass uncached lint plus canonical lint, typecheck, test, and build.
- Aaronmgz removed its generated disable for every `@stylistic` rule and its
  project-wide padding exception. Default formatting now applies across the
  monorepo; remaining exceptions are named exact-file boundaries for localized
  content, generated component call layout, and grouped switch cases. Uncached
  lint and all 11 lint, 12 typecheck, and 5 test tasks pass.
- Commitprompt and Website already had no formatting compatibility override.
  Dep Beacon's two Astro virtual-layout exceptions and Lumen's generated
  `next-env.d.ts` quote/semicolon exceptions are narrow parser/generated-file
  boundaries rather than project-wide layers.

#### 2. Completed — Add a monorepo regression test for inherited untyped files

`aaronmgz` has Playwright/Astro test files outside the package TypeScript project.
The root untyped-files config is generated correctly, but project-scoped configs
later re-enable type-aware rules. The consumer currently re-appends the generated
`eslint-config-typescript/untyped-files` entry.

Add a Basic test fixture where a root `typescript.untypedFiles` pattern targets a
detected child workspace. The final effective config should keep type-aware rules
disabled without consumer-side composition.

Root `typescript.untypedFiles` is now inherited as a child-project default
without inheriting unrelated root TypeScript parser settings. The regression
fixture verifies that the scoped untyped-files entry follows the child parser
setup and disables its project service.

#### 3. Completed — Improve Astro virtual-script defaults

Lumen's large generated `UIPrimitives.astro` file exposes `no-unused-vars`,
`no-undef`, and type-safety false positives on Astro virtual script paths. Its
template source is also intentionally not part of the lintable product source.

Potential improvements:

- extend the Astro package's virtual-file handling to cover the generated
  `*.astro/**` paths consistently;
- disable core variable rules in favor of Astro/parser-aware equivalents where
  appropriate;
- offer a documented generated-template ignore convention.

Implemented so far:

- Astro virtual JavaScript and TypeScript paths disable core and
  TypeScript-specific unused-variable rules plus `no-undef`.
- Type-aware rules remain disabled by the TypeScript virtual-file layer.
- Generic indentation is disabled only for Astro source and virtual scripts,
  repeated autofix fixtures must converge, and the packed-consumer release gate
  exercises an inline Astro script from the generated package artifact.
- Generated templates have a documented narrow ignore convention.

#### 4. Completed — Replace broad Tailwind exceptions with focused adoption

Some consumers still disable unknown-class or formatting checks broadly because
they use semantic classes, generated classes, or existing class order:

- `aaronmgz`
- `lumen`
- `memudo.ai`
- `website`

Move toward per-project Tailwind entry points and small `ignore` patterns. Then
enable class-order, canonical-class, deprecated-class, and unknown-class checks
individually. The 3.2.0 project inheritance fixes should make this practical
without plugin reattachment workarounds.

Completed so far:

- `dep-beacon` now points its detected docs project at
  `apps/docs/src/styles/global.css`, keeps `no-unknown-classes` enabled, and
  ignores only grouped names for the semantic classes defined by its local CSS.
  An uncached repository-wide ESLint pass succeeds with zero warnings.
- `website` already uses the Full recommended config without a Tailwind rule
  override. An uncached repository-wide ESLint pass confirms that its default
  Tailwind checks pass with zero warnings, so no compatibility exception remains
  to retire there.
- `lumen` now scopes Tailwind unknown-class enforcement to its Docs workspace
  with the package-relative `src/styles/global.css` entry point. Two compact
  ignore expressions cover its documented semantic BEM families while utility
  classes remain checked. Uncached Docs lint, all 18 canonical lint and
  typecheck tasks, and all 365 tests pass. Component-library workspaces retain
  their semantic-class setting because they do not own a Tailwind entry point.
- `memudo.ai` now enables unknown-class enforcement in all seven Tailwind
  workspaces. Admin, Broker, Docs, and Ops need no ignores; Deck and Web use
  app-scoped semantic-class family patterns, and UI ignores only its
  animation-plugin/arbitrary-variant parser boundary. Every package passes an
  uncached ESLint run, followed by all 11 canonical lint and typecheck tasks.
- The next Basic patch now discovers exact standalone selectors from each
  workspace's local Tailwind CSS import graph. This keeps typo detection strict
  while allowing declared BEM, component-library, and static Tailwind v4
  `@utility` classes automatically. Dynamic utilities remain explicit because
  their wildcard expansion belongs to Tailwind's compiler.
<!-- cspell:ignore blackst -->

- `aaronmgz` now enables unknown-class enforcement in Admin, Baby Shower, Web,
  and UI. The audit fixed the real `font-blackst` typo and invalid
  `origin-top-center` class, installed the missing `tw-animate-css` provider,
  and retained only project-scoped patterns for semantic/external classes.
  A direct strict Tailwind sweep reports zero unknown classes, followed by all
  11 canonical lint, 12 typecheck, and 5 test tasks passing.

#### 5. Completed — Finish pnpm catalog adoption

`postlens` and `workspace-organizer` keep automatic pnpm detection enabled but
temporarily exempt existing package manifests from `pnpm/json-enforce-catalog`
and `jsonc/sort-keys`.

Move remaining direct version specifiers into the root catalog, sort the manifests,
and remove those two compatibility rules. This retains the benefit of automatic
pnpm policy enforcement instead of disabling pnpm detection.

`postlens` now catalogs Playwright, Husky, and lint-staged.
`workspace-organizer` now catalogs Playwright, Axe Playwright, Wrangler, and
Sharp. Both repositories removed their package-manifest rule override, accepted
the config's deterministic key ordering, regenerated their lockfile importers,
and pass frozen installation, uncached ESLint with zero warnings, canonical
lint, and canonical typecheck.

#### 6. Completed — Consolidate repeated MeMudo compatibility rules

The MeMudo apps now rely on automatic Next.js, Hono, React, runtime, TypeScript,
and Tailwind detection. Several Next.js apps still repeat the same established
formatting and Tailwind exceptions.

Create one local flat-config fragment for shared Next.js compatibility, import it
after `defineConfig()`, and keep only app-specific differences in each config.
This reduces drift while preserving package-local auto-detection.

MeMudo now owns `eslint/next-compatibility.mjs`, a named flat-config fragment
containing the nine rules shared exactly by `admin`, `broker`, `docs`, and
`ops`. Each app composes it after `defineConfig()`, while the docs config retains
only its seven additional rules. `web` and `deck` remain separate because their
compatibility requirements are materially different. Effective-config
inspection confirms the shared rules remain disabled for representative files,
and the repository passes all 11 canonical lint and typecheck tasks.

#### 7. Completed — Reduce rule exceptions by category

The upgrade revealed established exceptions for React hooks, unsafe TypeScript
operations, import sorting, complexity, console usage, and generated code.
Review them in this order:

1. correctness and unsafe TypeScript rules;
2. React hooks/compiler rules;
3. security rules;
4. complexity limits;
5. formatting and import order.

Prefer narrow file patterns and comments that state why an exception exists.
Avoid project-wide disables when a generated folder or integration boundary is
the actual source.

Completed so far:

- MeMudo's API re-enabled `no-non-null-assertion`,
  `no-unnecessary-type-assertion`, `no-unsafe-member-access`,
  `no-unsafe-return`, and `require-await` across its full source scope.
- Redundant typed-array assertions were removed, synchronous secret lookup no
  longer has an async contract, and Hono's CORS environment type without
  parameters is converted to `unknown` and runtime-validated instead of accessed
  as `any`.
- Uncached API lint and typecheck pass, followed by all 11 canonical repository
  lint and typecheck tasks.
- Astro Doctor's docs app re-enabled `no-unsafe-assignment` and
  `no-unsafe-member-access` across the Astro source scope. The code-block
  component now uses public Astro types, dynamic rule slugs are guarded before
  lookup, and only the homepage's parser-generated inline SVG assignments retain
  a documented file-scoped exception. The full repository lint, typecheck, and
  test gates pass.
- Difftale removed its complete VS Code API compatibility block after uncached
  lint proved that all five unsafe rules and
  `no-redundant-type-constituents` pass without source changes. Its canonical
  lint, typecheck, test, and build gates all pass.
- Aaronmgz removed its remaining production and test unsafe exceptions. The
  chart component required no changes; the API now validates Hono's CORS
  bindings without type parameters from `unknown`, and Playwright cookie helpers
  use runtime guards instead of non-null assertions. All 11 lint tasks, 12
  typecheck tasks, and 5 test tasks pass.

The unsafe-TypeScript phase is complete.

React hooks/compiler progress:

- MeMudo re-enabled React purity and immutability in its web app. Copyright-year
  calculation moved outside render and session loaders are declared before the
  mounting effect. All 11 lint and typecheck tasks pass.
- Aaronmgz re-enabled React Compiler, exhaustive dependencies, static-component,
  immutability, and incompatible-library checks across the monorepo. Nested JSX
  components became render helpers, React Hook Form subscriptions use
  `useWatch`, locale-cookie mutation moved outside the component, and the RSVP
  submission callback now has explicit hook dependencies.
- `set-state-in-effect` is narrowed from every JavaScript and TypeScript file to
  six named components/hooks that intentionally synchronize opened-record or
  browser state. Aaronmgz passes all 11 lint tasks, 12 typecheck tasks, and 5
  test tasks.

The React hooks/compiler phase is complete.

Security progress:

- MeMudo removed its stale project-wide `security/detect-object-injection`
  exception. All 11 canonical lint and typecheck tasks pass.
- Aaronmgz re-enabled `security/detect-object-injection` across its API and UI
  code. Password byte comparison now traverses paired typed-array iterators,
  OTP slots use a bounded search, and chart configuration lookups use typed
  entry helpers instead of dynamic object indexing.
<!-- cspell:ignore innerhtml -->

- Aaronmgz narrowed `@eslint-react/dom-no-dangerously-set-innerhtml` to the
  chart component that serializes developer-owned theme configuration into
  generated CSS. Its full canonical validation passes all 11 lint tasks, 12
  typecheck tasks, and 5 test tasks.

The security phase is complete.

Complexity progress:

- MeMudo Core and Workspace Organizer removed their package- and script-wide
  complexity disables. Workspace Organizer retains one named exception for the
  Lemon sandbox command router, narrowed to its exact integration script. Its
  canonical lint and typecheck tasks pass.
- PostLens removed its all-scripts complexity exception. Its agent check runner
  now separates plan execution and summary reporting, and the repository passes
  uncached ESLint plus canonical lint and typecheck.
- Aaronmgz replaced its project-wide `complexity` and `max-depth` disables with
  named regression ceilings: complexity 55 for 31 exact legacy files and nesting
  depth 6 for four exact files. The defaults remain active everywhere else, an
  uncached full-code lint pass succeeds, and all 11 lint tasks, 12 typecheck
  tasks, and 5 test tasks pass.

The complexity phase is complete.

Import-order progress:

- MeMudo re-enabled import sorting in its API, Deck, and Web apps and applied
  the deterministic autofix to 14 affected config/source files. All 11
  canonical lint and typecheck tasks pass.
- Aaronmgz removed its monorepo-wide import- and export-sorting exceptions and
  applied the deterministic autofix across the existing codebase. Its canonical
  11 lint, 12 typecheck, and 5 test tasks pass.
- No upgraded consumer now disables `simple-import-sort/imports`,
  `simple-import-sort/exports`, or an equivalent import-order rule.

Import-order adoption is complete. The broader formatting work is tracked in
recommendation 1, which is now complete.

#### 8. In progress — Use adoption commands in maintenance workflows

Add lightweight, non-mutating checks to each repository:

```sh
basic-eslint doctor
basic-eslint compatibility
basic-eslint snapshot
basic-eslint diff
basic-eslint profile --max-warnings 0
```

Use `explain-preset` when adopting stricter presets and `baseline` only for a
temporary, reviewed migration. Effective-rule snapshots are especially useful
for dependency-update pull requests because companion config packages release
independently within the same major.

The Dep Beacon pilot produced a deterministic single-file effective-rule
snapshot: `snapshot --check` and `diff` both passed against `src/index.ts`.
However, its installed Basic 3.2.0 `compatibility` command still reports pnpm
catalog dependencies as missing. That false negative is fixed and covered in
this workspace but is not yet available to consumers. The pilot snapshot was
removed rather than committing a maintenance workflow that necessarily fails;
rollout remains queued behind the patched Basic release.

The patched CLI has now run `inspect`, `doctor`, `compatibility`, and
`install --dry-run` without making mutations across all 12 consumers.
Compatibility also identified seven real consumer engine-range mismatches:
Aaronmgz, Commitprompt,
Lumen, MeMudo, PostLens, Website, and Workspace Organizer promised Node versions
below the config packages' `>=22.19.0` minimum. Their root `engines.node` ranges
now match that minimum, every compatibility report passes, and all seven frozen
installs pass with their declared pnpm versions. Committed snapshots and the
maintenance workflow rollout remain queued until consumers can run the patched
CLI from a published package rather than this workspace build.

#### 9. Completed — Remove temporary supply-chain exclusions

The new Basic and TypeScript config releases were published inside the consumers'
minimum-release-age windows, so pnpm added explicit exclusions for the trusted
release. Remove version-specific exclusions after the configured age has elapsed.
Where frequent first-party releases are expected, prefer one documented package
name exclusion over accumulating version entries.

The version-specific Basic 3.2.0 exclusion is now removed from Astro Doctor,
Commitprompt, Dep Beacon, Difftale, Lumen, MeMudo, PostLens, Santi020k Theme,
Website, and Workspace Organizer. Observatory already used the preferred Basic
package-name exclusion; its accumulated version-specific companion-config and
Commitprompt entries were consolidated into package-name policy. All 12
repositories pass a frozen lockfile-only install with their declared pnpm
version, and the 10 standalone workspace YAML files pass uncached ESLint;
MeMudo's root YAML is validated by pnpm because that repository intentionally
has only package-local ESLint configs.

Aaronmgz removed the obsolete version-specific Santi config and Commitprompt
entries once its workspace file became available, retained its intentional
package-name policies, and passes installation with pnpm 11.3.0 and
`--frozen-lockfile`. All 12 repositories have now completed this cleanup.

#### 10. Completed — Prune unused feature packs after observing detection

The consumers currently retain the granular framework and feature packs installed
during the v3 migration. After the configs have been stable for a release cycle,
use `basic-eslint inspect`, `doctor`, and `install --dry-run` to compare detected
features with installed packs. Remove packs that no workspace can activate, while
keeping independently versioned companion packages on compatible v3 ranges.

The first aggregate audit exposed two upstream reliability gaps before any
dependency removal could be retained. Doctor used CommonJS main-entry
resolution for ESM-only companion packages, so real pnpm workspaces falsely
reported installed packs as missing; Basic now resolves their package manifests
through Node's export-map-aware lookup and falls back through the workspace
root, with an import-only package regression fixture.

After that fix, a trial prune showed that `install --dry-run` can still omit
category packs activated by composed preset or explicit config state: Dep
Beacon's planner reported no missing packages, but canonical lint immediately
failed while loading the Extensions registry. Every trial feature-pack removal
was restored, the known-clean Dep Beacon lockfile was restored byte-for-byte,
and its frozen install plus canonical lint and typecheck pass again. The install
planner now adds category packs implied by automatic `app`, `ci`, `library`,
`monorepo`, and `all` presets; workspace and named-catalog regressions cover the
corrected plan. No consumer pack removal is retained yet, so pruning remains
open for a fresh post-release audit using the corrected diagnostics.

A fresh patched-CLI audit then exposed a third diagnostic edge in Dep Beacon:
its `typescript` dependency is an npm alias to `@typescript/typescript6`, so the
resolved manifest name differs from the requested dependency key. Doctor marked
TypeScript uninstalled in every child workspace despite successful resolution.
Package metadata checks now treat resolution by the requested specifier as
authoritative and retain the aliased manifest metadata; a workspace regression
covers the TypeScript 6 alias before the aggregate pruning audit continues.

The aggregate matrix also showed preset-activated packs in `inspect` while
doctor labeled the same packages inactive because its project rows contained
only dependency-detected features. Doctor now includes active-config-only
features in the root activation row with `detected: false` and `enabled: true`,
and removes the contradictory inactive-package explanation. This preserves
project detection detail while making repository-level pruning decisions reflect
the configuration that ESLint actually loaded.

The corrected audit then compared every declared granular package against both
detected and enabled state across all project rows, followed by a physical
removal trial, patched `install --dry-run`, frozen installation, canonical lint,
and typecheck for each remaining candidate. Two packages were proven unused and
removed:

- MeMudo removed `@santi020k/eslint-config-testing`; all 11 lint and 11
  typecheck tasks pass, the frozen pnpm 11.1.2 install passes, and the planner
  requests no replacement. Its apparently inactive Extensions pack was retained
  because the corrected preset planner requires it.
- Santi020k Theme removed `@santi020k/eslint-config-vite`; uncached lint passes,
  all five Astro applications report zero typecheck diagnostics, the frozen pnpm
  10.32.1 install passes, and the planner requests no replacement.

All other declared granular packs are detected, enabled, required by preset
planning, or supplied intentionally by the Full aggregate. No further safe
pruning candidate remains in the 12-repository matrix.

#### 11. Completed — Review Astro Doctor adoption and CLI diagnostics

The 3.2.0 doctor reports Astro projects that do not enable the optional Astro
Doctor plugin. Decide per repository whether the additional diagnostics justify
the dependency and adoption work; enable it deliberately instead of silently
adding new rules to every Astro consumer.

Two doctor diagnostics also deserve upstream coverage:

- an implicitly detected monorepo can be reported as not using `projects`
  scoping even though `defineConfig()` generated the project configs;
- a repository that owns the Astro Doctor plugin can report the plugin as
  unresolved when it is a sibling workspace package rather than a root
  dependency.

Doctor now reports structured installed/detected/enabled activation per
workspace project. It recognizes Basic and Full `/recommended` re-exports as
composer-backed auto-scoped configs and resolves Astro Doctor metadata from a
sibling workspace package when normal Node resolution is intentionally absent.
Regression fixtures cover both diagnostic cases; plugin activation remains an
explicit per-repository choice.

### Verification completed

- Every lockfile resolves `@santi020k/eslint-config-basic` 3.2.0.
- Frozen lockfile validation passes in all 12 repositories.
- Every ESLint config loads successfully under ESLint 10.
- A full direct ESLint sweep with `--max-warnings=0` passes in all 12 repositories.
- Follow-up strict-adoption changes are recorded above; they include focused
  consumer source migrations where newly enabled correctness rules exposed
  real issues.
