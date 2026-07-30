---
'@santi020k/eslint-config-basic': patch
'@santi020k/eslint-config-astro': patch
'@santi020k/eslint-config-core': patch
'@santi020k/eslint-config-full': patch
---

Keep root untyped TypeScript file patterns effective in detected workspace
projects, allow consistently multiline function calls, and make the default
line-length rule ignore URLs and template literals. Avoid circular generic
indentation fixes and variable-rule false positives in Astro virtual scripts,
and permit external snake-case schema properties without weakening checks on
local bindings. Keep declaration-attached JSDoc and intentional fire-and-forget
promises compatible with the surrounding formatting and promise rules, and
clarify Full package activation and version semantics. Add source-aware preset
adoption reports with grouped lint debt and a non-writing autofix preview.
Make compatibility reports resolve pnpm catalog declarations through installed
package manifests, expose resolved paths, and validate consumer Node engine
ranges against config package requirements. Let doctor diagnose and safely fix
those range mismatches by intersecting consumer and package constraints.
