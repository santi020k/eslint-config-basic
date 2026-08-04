---
'@santi020k/eslint-config-basic': patch
'@santi020k/eslint-config-astro': patch
'@santi020k/eslint-config-core': patch
'@santi020k/eslint-config-formats': patch
'@santi020k/eslint-config-full': patch
'@santi020k/eslint-config-extensions': patch
'@santi020k/eslint-config-integrations': patch
'@santi020k/eslint-config-libraries': patch
'@santi020k/eslint-config-testing': patch
'@santi020k/eslint-config-tools': patch
'@santi020k/eslint-config-typescript': patch
---

Keep root untyped TypeScript file patterns effective in detected workspace
projects, allow consistently multiline function calls, and make the default
line-length rule ignore URLs and template literals. Avoid circular generic
indentation and closing-tag-location fixes and variable-rule false positives in
Astro virtual scripts, and permit external snake-case schema properties without
weakening checks on local bindings. Keep declaration-attached JSDoc and
intentional fire-and-forget promises compatible with the surrounding formatting
and promise rules, and
clarify Full package activation and version semantics. Add source-aware preset
adoption reports with grouped lint debt and a non-writing autofix preview.
Make compatibility reports resolve pnpm catalog declarations through installed
package manifests, expose resolved paths, and validate consumer Node engine
ranges against config package requirements. Let doctor diagnose and safely fix
those range mismatches by intersecting consumer and package constraints.
Add structured per-project doctor activation reports, including installed,
detected, and enabled framework and feature-pack state, TypeScript mode,
tsconfig, ignores, and reasons that installed optional packages remain inactive.
Detect declaration-only and JavaScript-plus-declaration workspace packages as
syntax-only TypeScript projects when they do not have a tsconfig, preventing
project-service parse failures while preserving type-aware mode when a package
does provide a project.
Detect `.astro` source files inside framework-neutral workspace packages and
scope the Astro parser and processor to them, including shared components
imported by separately detected Astro applications.
Cover mixed React/Astro packages whose Astro templates live several directories
below the package root so their processor scope cannot regress.
Keep the JavaScript-oriented line-length rule out of Astro documents so
declarative tags, SVG path data, and embedded previews remain intact.
Allow GitHub Actions event keys to use their valid null mapping shorthand while
continuing to report unrelated empty values in workflow YAML.
Show Full's resolved Basic composer version in compatibility output and require
a Full changeset whenever an aggregated config package is released.
Treat conventional `scripts/` files and manifest `bin` entries as scoped CLI
entry points, allowing intentional terminal output and process termination
without weakening reusable source modules.
Enhance `basic-eslint explain complexity --file ...` with current
rule-specific ESLint diagnostics, including the calculated complexity and
source locations in text and JSON output.
Run a non-writing TypeScript compiler preflight during preset source analysis,
prioritizing root module-resolution failures before cascading unsafe-rule lint
debt.
Exercise packed-consumer adoption with deliberately old-style TypeScript,
Astro, YAML, and test sources, requiring source analysis, autofix convergence,
strict lint, typechecking, tests, peer health, and a frozen reinstall.
Verify Full against minimum and latest ESLint/TypeScript support-matrix edges,
retain companion-package ownership for transitive peer warnings, and document
which aggregate dependencies are installed versus activated.
Reject TypeScript 7 during compatibility resolution because the current
typescript-eslint parser supports TypeScript 5 and 6.
Prevent Astro top-level redirects from crashing the type-aware
`no-misused-promises` rule, and recognize Basic/Full recommended re-exports as
auto-scoped composer configurations in doctor.
Resolve Astro Doctor metadata from sibling workspace packages when the plugin
is owned by the monorepo rather than installed at its root.
Keep build-generated `next-env.d.ts` declarations lint-clean by excluding them
from quote and semicolon source-formatting rules in detected Next.js projects.
Resolve Tailwind CSS entry points inside their owning workspace and turn off
unknown-class validation when no usable entry exists, without leaking a root
tooling dependency into unrelated workspace packages. Surface the resolved
entry-point policy per project in doctor and inspect output.
Resolve ESM-only companion-package manifests through Node's export-map-aware
lookup so doctor no longer labels installed pnpm workspace packs as missing.
Include category packs implied by automatically selected presets in install and
doctor dependency plans so dry runs cannot recommend an incomplete config set.
Preserve declaration-only TypeScript mode in doctor and provide package-specific
guidance for the syntax fallback, minimal tsconfig, and untyped-file options.
Recognize exact standalone component selectors and static Tailwind v4
`@utility` declarations from local Tailwind CSS import graphs while continuing
to report undeclared classes, and expose the resulting strict mixed-CSS policy
through doctor and inspect.
Keep Playwright-only rules out of generic unit-test folders when Playwright and
Vitest coexist, including ambiguous top-level `tests/*.spec.*` files, while
retaining explicit e2e and functional folders, Playwright-named files,
Playwright configs, and the existing custom test-file override.
Avoid `no-unnecessary-condition` false positives at Astro's generated props and
frontmatter boundaries without weakening the rule for ordinary TypeScript.
Treat npm-aliased packages as installed when their requested dependency key
resolves successfully, including TypeScript 6 development aliases in workspace
doctor activation reports.
Include features loaded by the active config in doctor's root activation row,
even when dependency detection did not infer them, and do not simultaneously
label their category packages inactive.
