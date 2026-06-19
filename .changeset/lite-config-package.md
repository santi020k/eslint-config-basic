---
"@santi020k/eslint-config-lite": minor
"@santi020k/eslint-config-integrations": minor
"@santi020k/eslint-config-basic": patch
---

Add `@santi020k/eslint-config-lite` as an optional composer package for projects that want to install framework and integration config packages manually. The full `@santi020k/eslint-config-basic` package remains the recommended default install.

Expose integration composition helpers from `@santi020k/eslint-config-integrations` so the lite package can lazy-load integration configs only when selected.

Teach `basic-eslint doctor` to recognize lite configs and warn when detected frameworks or integrations are missing their manually installed config packages.

Add `basic-eslint doctor --lite-install` to print the detected package-manager install command for switching a project to the lite package, including framework config packages, integrations, ESLint, and TypeScript when needed.

Document package-choice metrics, a Basic-to-Lite migration recipe, and a lite-specific `Preset.All` warning.
