# Release preparation and recovery

Prepare releases on `release/v<stable-semver>` from current `main`, consume the
Changesets version plan, and commit package versions, changelogs, lockfile updates,
and migration notes together. The branch version must equal the Basic package
version (for example, `release/v3.6.0` with Basic `3.6.0`). Existing
`changeset-release/main` pull requests remain supported.

Before pushing, independently review the complete release diff and resolve each
finding. Open the release pull request into `main` with validation results,
compatibility notes, and a recovery plan. CI runs the full release candidate gate
for both supported release branch formats. Merge only after required checks and
reviews pass.

Publishing runs only for a merged release pull request from this repository into
`main`; an ordinary push never publishes. The workflow checks the exact merged
commit, verifies that versioned release branches increase Basic's version, runs the complete release gate
and a dependency security audit, then publishes through npm trusted publishing.
Package and umbrella version tags must refer to that merged commit. Published
version tags are immutable; only the documented rolling major Action tag moves
forward.

If publishing fails, rerun the failed Release workflow at the original merged
commit. Publishing and release reconciliation are idempotent. A manual dispatch
from `main` is available when the intended release commit is still `main` HEAD;
never dispatch a recovery from a feature or release branch. If `main` advanced,
rerun the original run so recovery retains the intended SHA. Do not manually
publish packages, recreate or move version tags, or roll versions backward.
Fix an unrecoverable artifact with a new commit and version.

After publishing, verify npm package versions and provenance, umbrella/package
tag SHAs, the GitHub Release, and the live documentation deployment. Run a packed
consumer smoke check before retiring release branches. Delete local and remote
release branches only after verification and explicit remote cleanup authorization.

## Pending release prerequisites

The 3.6.0 preparation upgrades the supported dependency graph and documentation to
npm Lumen Astro 4. It must pass the canonical checks and the high-severity audit
before remote integration or publication.

The final 2026-10-07 audit reports one high finding, no moderate findings, and
no critical findings. Removing unused Nuxt and Slidev playground runtimes removed
525 packages and the `node-forge` and `sprintf-js` advisory paths. Their ESLint
adapter playgrounds remain covered by lint and type checks.

| Package | Severity | Dependency paths | Tracking |
| --- | --- | --- | --- |
| `braces` 3.0.3 | High | Published Next and Formats packages, transitively Full; private Expo playground through React Native and Metro | [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) |

Next's `settings.next.rootDir` and GraphQL configuration schema/document glob
pointers reach the affected glob tooling. Deeply nested brace patterns can exhaust
the JavaScript stack. This concerns glob configuration input; it does not establish
that ordinary GraphQL source text triggers the issue. The published Expo ESLint
package has no `braces` dependency path; its private runtime playground does.

The official npm registry still publishes `braces` 3.0.3 as latest, and the advisory
has no patched version. Upstream fixes remain unmerged, including
[PR #82](https://github.com/micromatch/braces/pull/82). A local pnpm patch would not
propagate into the published packages' consumer dependency graphs or clear this
advisory. An unofficial prerelease fork requires a separate compatibility and
maintenance decision.

Upgrade to a reviewed, published fix when available and rerun `pnpm audit` and
`pnpm run release:check`. Do not add advisory ignores or use nonexistent versions.
The remaining high finding blocks the release workflow.

Also resolve the advertised Node compatibility before publishing. The family
currently advertises `>=22.19.0`, but the installed dependencies and their official
npm metadata require these ranges:

| Public package | Required Node range | Dependency imposing the range |
| --- | --- | --- |
| Astro | `^22.22.3 \|\| ^24.16.0 \|\| >=26.3.0` | `eslint-plugin-astro` 3.2.1 and `astro-eslint-parser` 3.2.0 |
| Formats | `^22.22.2 \|\| >=24.15.0` | `eslint-plugin-package-json` 1.10.1 |
| Tools | `^22.22.2 \|\| >=24.15.0` | `eslint-plugin-command` 4.0.0 and `eslint-plugin-jsdoc` 65.1.0 |
| Extensions | `^22.22.2 \|\| >=24.15.0` | `eslint-plugin-regexp` through `jsdoc-type-pratt-parser` 9.2.2 |
| Integrations | `^22.22.2 \|\| >=24.15.0` | Its Formats, Tools, and Extensions dependencies |
| Full | `^22.22.3 \|\| ^24.16.0 \|\| >=26.3.0` | Its Astro dependency |

Enabling optional Astro Doctor 1.4.0 in Extensions or Integrations additionally
requires `^22.22.3 || ^24.16.0 || >=26.3.0`. Their base configurations use the
less restrictive ranges in the table; advertising the stricter range for either
entire package would exclude otherwise supported base configurations.

The complete development and release workspace requires
`^22.22.3 || ^24.16.0 || >=26.3.0`. Additional tooling includes `lint-staged`
17.6.0, which needs `>=22.22.1`, and the Angular 22.2.1
playground, which needs `^22.22.3 || ^24.15.0 || >=26.0.0`. Do not replace these
release-line ranges with a single `>=22.22.3` floor: that would advertise
unsupported Node 23 and 25, and older Node 24 and 26 versions.

Choose accurate affected-package engine ranges with migration notes, or retain
older compatible dependencies, before publishing. No engine declarations have
been changed while that decision is pending. Basic, Core, TypeScript, Lite, and
the remaining framework packages retain the lean `>=22.19.0` runtime contract.

TypeScript 7, GraphQL 17, and Nest typed 7 remain deferred because their current
peer or runtime requirements exceed the supported contracts. Wrangler's existing
stable releases depend on an upstream Miniflare prerelease; this transitive tool
was already present and is not a new prerelease selection.
