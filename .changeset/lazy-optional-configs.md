---
"@santi020k/eslint-config-optionals": patch
"@santi020k/eslint-config-basic": patch
---

Load optional integrations lazily so projects can import the base config without installing unrelated integration peers such as Storybook, GraphQL, Stencil, Cypress, or Testing Library.

Also include the generated agent-skill API entry in the basic package build output so published packages do not reference a missing `agent-skill-generator.js` file.
