---
"@santi020k/eslint-config-lit": patch
"@santi020k/eslint-config-nuxt": patch
"@santi020k/eslint-config-react-router": patch
"@santi020k/eslint-config-tanstack-start": patch
"@santi020k/eslint-config-docs": patch
---

Document and test the Lit, Nuxt, React Router, and TanStack Start packages: add package READMEs (previously blank on npm), add framework guide pages to the docs site sidebar, and list the four frameworks in the root README, llms.txt, llms-full.txt, and docs site metadata. Add detection, config export, and composition tests plus lint playgrounds for all four frameworks. Also add the six missing packages (lit, nuxt, react-router, slidev, tanstack-start, vite) to the Changesets `fixed` group so all publishable packages stay version-locked.
