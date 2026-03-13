---
"@santi020k/eslint-config-basic": minor
"@santi020k/eslint-config-core": minor
"@santi020k/eslint-config-optionals": minor
---

feat: add `regexp` optional config with `eslint-plugin-regexp`

- New `OptionalOption.Regexp` to enable regex linting via `eslint-plugin-regexp`
- Catches common regex mistakes: exponential backtracking, unnecessary escapes, and optimizable character classes
- Uses recommended rules with selective overrides for smoother adoption
