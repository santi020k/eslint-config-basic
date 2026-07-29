---
"@santi020k/eslint-config-basic": minor
"@santi020k/eslint-config-core": minor
"@santi020k/eslint-config-extensions": minor
"@santi020k/eslint-config-formats": minor
"@santi020k/eslint-config-full": minor
"@santi020k/eslint-config-integrations": minor
"@santi020k/eslint-config-libraries": minor
"@santi020k/eslint-config-testing": minor
"@santi020k/eslint-config-tools": minor
---

Complete the v3 modular dependency boundary with five category feature packs.
Each pack owns its plugin dependencies and exposes a self-describing feature
registry through the shared `ConfigFeature` contract. The lean Basic composer
loads only registries for selected categories, Full installs every pack, and
Integrations remains as a compatibility aggregate.

Move agent-skill generation from the Basic root export to
`@santi020k/eslint-config-basic/agent`, keeping Node-oriented tooling out of the
configuration runtime entry point.
