# Release preparation and recovery

Prepare releases on `release/v<stable-semver>` from current `main`, consume the
Changesets version plan, and commit package versions, changelogs, lockfile updates,
and migration notes together. The branch version must equal the Basic package
version (for example, `release/v3.6.0` with Basic `3.6.0`). Existing
`changeset-release/main` pull requests remain supported.

Before pushing, independently review the complete release diff and resolve each
finding. Open the release pull request into `main` with validation results,
compatibility notes, and a recovery plan. CI runs the full release candidate gate
for both supported release branch formats, the Node 24 contract suite, and Windows
CLI/detection smoke tests. Documentation changes also require Chromium visual/a11y
checks and Firefox/WebKit navigation checks before merge. Merge only after required checks and
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

If npm artifacts and immutable package tags exist but a package GitHub Release
is missing, Changesets does not recreate it on retry. Run **Recover release
records** on main with the original merged release PR number. It validates the
trusted source, all npm provenance and package tags, and registry consumer
behavior before creating only missing release records from the original
changelogs. It audits the maintained recovery workspace, does not publish npm packages or
replace existing records, and moves only the documented rolling major Action tag
forward when its history permits. The workflow verifies the complete original
release afterward. If a newly disclosed development dependency advisory prevents
rerunning the historical source, first merge its remediation on main and use this
recovery workflow; do not weaken the historical audit or republish artifacts.

GitHub's built-in Actions token cannot modify workflows. When historical recovery
is rejected with HTTP 403 because workflow files differ from current main, the
recovery workflow can use the optional repository secret `RELEASE_GITHUB_TOKEN`.
Provision it only with explicit owner authorization: use a short-lived GitHub App
installation token or a short-expiry fine-grained token restricted to this
repository with Contents write and Workflows write. Do not copy a developer's
broad CLI credential or commit a token. Remove the temporary secret after recovery.
Normal publishing continues to use the built-in GitHub token and npm OIDC.
The credential is available only to the mutation step on a separate clean runner.
Artifact and consumer verification jobs use read-only built-in tokens; the
mutation job executes only current-main code and reads historical files as data.
The credential does not change artifact source checks or immutable tag policy.
See [GitHub release API permissions](https://docs.github.com/en/rest/releases/releases#create-a-release).


After publishing, `scripts/check-published-release.mjs` verifies each versioned npm
package's artifact integrity and provenance source/workflow, umbrella/package tags,
and stable GitHub Releases against the merged commit. It installs registry versions
of every versioned package plus Basic and Full in a temporary consumer, verifies npm
signatures/attestations, and
checks both clean linting and rejection of an unused variable. A recovery dispatch
compares the release commit against its first parent; if `main` has advanced, rerun
the original workflow instead. The docs deployment stamps its artifact with that
commit and checks live routes and search after Pages reports success.
For a closed-PR Release event, docs resolve the merged release commit through
GitHub's associated pull request metadata; the workflow run's head SHA is the
pre-merge PR head. Manual recovery retains its original main SHA even if main advances.

Also independently verify npm package versions and provenance, umbrella/package
tag SHAs, the GitHub Release, and the live documentation deployment. Run a packed
consumer smoke check before retiring release branches. Delete local and remote
release branches only after verification and explicit remote cleanup authorization.

## 3.6.0 security and runtime preparation

The release keeps every public package's advertised Node `>=22.19.0` contract.
The private development workspace requires Node `>=22.22.1` for lint-staged.
Compatible stable dependencies are pinned deliberately: Astro plugin 1.7.0,
Astro Doctor 1.2.0, Command 3.5.3, JSDoc 63.3.3, package-json 0.91.2, and
Regexp 3.1.0. Reconsider these pins only with minimum-runtime consumer tests;
newer releases require newer Node versions through their direct or transitive
runtime dependencies. Astro uses the compatible plugin's `flat/recommended` API.

The official `braces@3.0.3` release remains affected by
[GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).
Next root-directory globs and GraphQL schema/document glob pointers reach this
code. The private Expo runtime playground also contains a dependency path.
Ordinary GraphQL source text is not established as an attack vector.

The owner approved maintaining the depth patch and the increased adapter sizes.
`vendor/braces` retains the official tarball, npm integrity, MIT license, reviewed
patch, deterministic generator, and private derivative archive. The derivative
is not independently published. It bounds brace/parenthesis nesting to 100 and
recursive AST, array, queue, and parent-chain traversal; deeper inputs throw a
controlled RangeError. Ordinary globs and shallow AST behavior are preserved.
This mitigates recursion, not every cardinality, wide-AST, arbitrary getter, or
regular-expression resource-exhaustion scenario.

The workspace override protects the private Expo path and local tools. It is
not relied on for published consumers. Astro, Extensions, Formats, and Next
build private dependency trees under `dist/vendor`, including the maintained
code and all required runtime dependencies and licenses. Their public exports
and types are unchanged. ESLint, GraphQL, and TypeScript stay external host
peers. Full receives the same protection through its adapter dependencies.
This intentionally increases the affected package sizes; lean Basic and Core
remain outside these bundles. Artifact budgets track the approved increase.

Security CI runs the high-severity audit and the depth/cycle regression check,
including an original-code negative control. The release gate additionally
installs actual packed adapters and Full without consumer braces overrides,
checks protected Next and GraphQL globs and shared peers, and loads the selected
features on the minimum Node 22.19.0 runtime. The maintained source previously
passed all 764 upstream release tests; rerun the upstream suite when changing
the patch. A renamed dependency or clean audit alone is not remediation evidence.

When a reviewed stable upstream fix exists, remove the derivative, local override,
and adapter bundling only after clean consumer regressions and the release audit
pass. The source and removal plan are documented in `vendor/braces/README.md`.
For rollback, release a new fixed version through the same GitHub workflow;
do not move published tags or silently restore vulnerable dependencies.

TypeScript 7, GraphQL 17, and Nest typed 7 remain deferred because their current
peer or runtime requirements exceed the supported contracts. Wrangler's existing
stable releases depend on an upstream Miniflare prerelease; this transitive tool
was already present and is not a new prerelease selection.
