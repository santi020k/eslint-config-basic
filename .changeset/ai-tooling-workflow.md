---
"@santi020k/eslint-config-basic": minor
"@santi020k/eslint-config-docs": minor
---

AI tooling workflow improvements:

- **Default ignores for AI artifacts**: the composed config now ignores AI coding-assistant folders (`.agent`, `.agents`, `.aider*`, `.claude`, `.clinerules`, `.codex`, `.copilot`, `.cursor`, `.gemini`, `.kiro`, `.opencode`, `.roo`, `.windsurf`) so generated agent rules are never linted as source code. Disable via `settings: [Setting.NoDefaultIgnores]`.
- **`generate-skill --check`**: CI mode that compares existing agent skill files (and guarded `AGENTS.md` / copilot-instructions sections) against freshly generated content without writing, and exits with code 1 when anything is stale or missing.
- **`generate-skill --create`**: scaffolds a root `AGENTS.md` with the guarded ESLint-standards section when the project has none.
- **`doctor` duplicate-ESLint detection**: warns when the project and the config packages resolve two different ESLint versions (e.g. an ESLint 9 project pulling in the config's ESLint 10 dependency). Both majors remain supported; the warning helps avoid editor/CLI rule-behavior drift.
