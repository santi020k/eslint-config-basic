# Parent projects after ESLint Config Basic 3.2.0

<!-- cspell:words aaronmgz commitprompt difftale lintable memudo postlens -->

Date: 2026-07-30

## Scope

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

## Recommended follow-up improvements

### 1. Retire the temporary formatting compatibility layer

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

### 2. Completed — Add a monorepo regression test for inherited untyped files

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

### 3. Improve Astro virtual-script defaults

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

### 4. Replace broad Tailwind exceptions with focused adoption

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

### 5. Finish pnpm catalog adoption

`postlens` and `workspace-organizer` keep automatic pnpm detection enabled but
temporarily exempt existing package manifests from `pnpm/json-enforce-catalog`
and `jsonc/sort-keys`.

Move remaining direct version specifiers into the root catalog, sort the manifests,
and remove those two compatibility rules. This retains the benefit of automatic
pnpm policy enforcement instead of disabling pnpm detection.

### 6. Consolidate repeated MeMudo compatibility rules

The MeMudo apps now rely on automatic Next.js, Hono, React, runtime, TypeScript,
and Tailwind detection. Several Next.js apps still repeat the same established
formatting and Tailwind exceptions.

Create one local flat-config fragment for shared Next.js compatibility, import it
after `defineConfig()`, and keep only app-specific differences in each config.
This reduces drift while preserving package-local auto-detection.

### 7. Reduce rule exceptions by category

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

### 8. Use the 3.2.0 adoption commands in maintenance workflows

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

### 9. Remove temporary supply-chain exclusions

The new Basic and TypeScript config releases were published inside the consumers'
minimum-release-age windows, so pnpm added explicit exclusions for the trusted
release. Remove version-specific exclusions after the configured age has elapsed.
Where frequent first-party releases are expected, prefer one documented package
name exclusion over accumulating version entries.

### 10. Prune unused feature packs after observing detection

The consumers currently retain the granular framework and feature packs installed
during the v3 migration. After the configs have been stable for a release cycle,
use `basic-eslint inspect`, `doctor`, and `install --dry-run` to compare detected
features with installed packs. Remove packs that no workspace can activate, while
keeping independently versioned companion packages on compatible v3 ranges.

### 11. Review Astro Doctor adoption and CLI diagnostics

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

## Verification completed

- Every lockfile resolves `@santi020k/eslint-config-basic` 3.2.0.
- Frozen lockfile validation passes in all 12 repositories.
- Every ESLint config loads successfully under ESLint 10.
- A full direct ESLint sweep with `--max-warnings=0` passes in all 12 repositories.
- No application source changes were required for this upgrade.
