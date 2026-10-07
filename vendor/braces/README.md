# Maintained braces depth guard

This private, bundled derivative starts from the official MIT-licensed
`braces@3.0.3` npm tarball. The original archive and its license are retained.
`scripts/generate-braces-patch.mjs` checks the official SHA-512 integrity,
applies `depth-limit.patch`, and creates the deterministic derivative archive.
Run `node scripts/generate-braces-patch.mjs` to regenerate it. It is never
published as a separate npm package.

The patch mitigates GHSA-vfj7-8cjw-p6xm by limiting brace/parenthesis nesting
to 100 and recursive AST, parent-chain, array, and queue traversal to the
corresponding depth. Deeper input throws a controlled RangeError. Ordinary
globs, escaping, quoting, ranges, and shallow ASTs retain upstream behavior.
This does not claim to prevent every resource-exhaustion attack, including
excessively wide expansions or arbitrary getters on caller-provided objects.

The workspace override is only local protection. Published adapters bundle
the affected plugin dependency trees so consumers receive the guarded code
without configuring overrides. Packed-consumer checks verify the actual
dependency resolution and behavior; a renamed dependency or clean audit alone
is not proof of remediation.

Replace this derivative with a reviewed stable upstream fix when available.
Remove the override, archive, generator, and adapter bundling only after clean
consumer regression tests and the release security audit pass. Keep the depth
regressions to prevent reintroduction.

Upstream: https://github.com/micromatch/braces

Advisory: https://github.com/advisories/GHSA-vfj7-8cjw-p6xm
