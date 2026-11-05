# Maintained minimatch optimization guard

This private derivative retains the minimatch 10.2.6 API, including makeRe,
which eslint-plugin-import-x requires. The official npm archive, SHA-512
integrity, and Blue Oak Model License 1.0.0 are retained here. Run
`node scripts/generate-minimatch-patch.mjs` to regenerate the derivative.

The patch backports the two runtime guards from upstream commit
https://github.com/isaacs/minimatch/commit/77a0f5c4b80bdc641c3c930a1d9edf5ad2db57f8
for https://github.com/advisories/GHSA-g3hv-75wg-m249:
cap optimizationLevel 2 pattern splitting at braceExpandMax (default 100,000),
and skip pairwise deduplication above 1,000 patterns. Both CommonJS and ESM
entry points receive the same patch. Existing option declarations are unchanged.
The upstream compiled files are patched without changing their matching API.

The workspace override protects tooling and copies bundled into guarded
adapters. It does not replace a consumer's external ESLint host or other
unbundled dependencies. Consumers must audit their complete dependency graph.
The renamed archive is not independently published; a clean registry audit
alone is not evidence of protection. Regression checks must prove bounded
pattern expansion, skipped quadratic processing, matching compatibility, and
failure of the original unpatched code under the same assertions.

Remove this derivative and override when a maintained upstream release fixes
the advisory while retaining the APIs required by the dependency graph, then
rerun the release preflight and packed-consumer checks.
