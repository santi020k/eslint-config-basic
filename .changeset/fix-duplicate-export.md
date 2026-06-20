---
"@santi020k/eslint-config-basic": patch
---

Remove the internal `./dist/index.js` path from the package exports map. This key was leaking a dist path as a public entrypoint alongside the canonical `.` entry; only `.` should be exported.

Update the npm package description to list all v2 frameworks: Lit, Nuxt, Preact, React Router, TanStack Start, and Vite were missing from the v1-era description string.

Fix the Node.js compatibility row in the root README — it said `>=22.18.0` (the dev-workspace floor) but published packages declare `>=22.0.0`.
