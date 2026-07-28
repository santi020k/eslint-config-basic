---
"@santi020k/eslint-config-basic": major
"@santi020k/eslint-config-core": major
"@santi020k/eslint-config-extensions": major
"@santi020k/eslint-config-formats": major
"@santi020k/eslint-config-full": major
"@santi020k/eslint-config-integrations": major
"@santi020k/eslint-config-libraries": major
"@santi020k/eslint-config-testing": major
"@santi020k/eslint-config-tools": major
---

Complete the v3 modular dependency boundary with five category feature packs.
Each pack owns its plugin dependencies and exposes a self-describing feature
registry through the shared `ConfigFeature` contract. The lean Basic composer
loads only registries for selected categories, Full installs every pack, and
Integrations remains as a compatibility aggregate.

Move agent-skill generation from the Basic root export to
`@santi020k/eslint-config-basic/agent`, keeping Node-oriented tooling out of the
configuration runtime entry point.
