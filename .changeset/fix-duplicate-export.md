---
"@santi020k/eslint-config-basic": patch
---

Remove the internal `./dist/index.js` path from the package exports map. This key was leaking a dist path as a public entrypoint alongside the canonical `.` entry; only `.` should be exported.
