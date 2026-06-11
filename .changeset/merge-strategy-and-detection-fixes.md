---
"@santi020k/eslint-config-basic": minor
"@santi020k/eslint-config-core": minor
"@santi020k/eslint-config-docs": minor
---

Fix `optionMergeStrategy: 'merge'` so explicitly passed options (`tools`, `testing`, `formats`, `libraries`, `extensions`, `frameworks`) are actually unioned with detected and preset values, as documented. Previously, providing any of these options silently replaced detected/preset values regardless of strategy. To fully opt out of detected frameworks, use `autoFrameworks: false` or `optionMergeStrategy: 'replace'` (an explicit `frameworks: {}` no longer opts out under the default merge strategy).

Other fixes:

- `detection: false` now also disables the default detected extensions (Unicorn, Perfectionist, Security); a new granular `detection: { extensions: false }` control is available.
- Negated glob patterns (`!pattern`) in `projects` sub-configs are now scoped correctly instead of producing invalid `path/!glob` patterns.
- Deprecate the unused `TsOptions` interface (`typescript: { project }` was ignored since v2) and correct stale doc comments on `ImportedFramework` and the no-op `Setting.Gitignore` / `Setting.DefaultIgnores` values.
