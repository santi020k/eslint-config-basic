# Quality v2 rollout

This change belongs to the unfinished `release/v3.8.0` candidate. Quality is pinned
to 2.0.0 for impact planning. Shared CI setup actions use the immutable Quality
2.1.0 release commit.

The parallel impact job records a committed-source shadow plan. Package inputs
include integration contracts and generated documentation consumers. Shared
configuration, unknown paths and unavailable history require the full graph.
Release branches record full plans. Existing affected Turbo validation,
package-manager consumers, Windows compatibility and full release qualification
remain authoritative; this policy does not authorize skipping release checks.

Task caches now use Quality's shared setup, separating operating system,
architecture, Node selection, lockfile and Turbo configuration. Source revisions
create new cache entries so later successful outputs can be saved; the old
lockfile-only immutable keys could never accumulate them. Package-manager and
release jobs also reuse these outputs. Turbo still verifies each task hash.
Security audits, package publication and live deployment checks remain uncached.
Documentation retains its build-once Pages artifact and protected deploy.

The stable Quality gate requires success from every selected job, including the
planner. Failed, cancelled or unexpectedly skipped jobs block the aggregate.

Run `node --test scripts/quality-impact.node-test.mjs` with Quality 2 on PATH for
policy and gate regressions. Before publication run `pnpm run release:check` and
security gates, then verify hosted CI and deployed docs. Local tests do not prove
deployment. Recovery keeps full qualification and reverts the cache/planning
change through a reviewed commit; never move release tags or bypass checks.

Persisted Turbo task hashes include `QUALITY_TASK_RUNTIME`, captured after setup
from the actual Node and pnpm versions, platform, and architecture. This prevents
a broad cache restore from reusing outputs after a runtime patch changes, even
when the declared Node selector remains unchanged. Local runs without that
variable use a separate task identity.

Shared root compiler configurations are explicit Turbo inputs. The CI regression
uses actual task hashes to verify compiler, ESLint and runtime invalidation while
preserving cache hits for unrelated README changes.
