---
"@santi020k/eslint-config-basic": patch
"@santi020k/eslint-config-core": patch
"@santi020k/eslint-config-typescript": patch
---

Fix agent skill path convention, Astro virtual JS glob, and TypeScript virtual-file parser setup

- Agent skill generator now writes `SKILL.md` inside `skills/eslint-standards/` instead of `eslint-standards.md` inside `skills/`, aligning with the `skill://` URL convention used by Claude Code and other agents
- Gemini target follows the same convention (was `styleguide.md` at root)
- Added `**/*.astro/*.js` to `GLOB_VIRTUAL_TS` so Astro virtual JavaScript fragments with TypeScript syntax are parsed correctly
- Added a dedicated ESLint config block that disables `projectService` / `project` for all virtual TS/JS files, preventing TypeScript project service errors on those fragments
