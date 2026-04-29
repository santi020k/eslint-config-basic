---
"@santi020k/eslint-config-basic": minor
---

Add `basic-eslint generate-skill` CLI command and `generateAgentSkills()` API.

The new command scans a project for AI coding-assistant agent folders (`.agent`, `.agents`, `.claude`, `.cursor`, `.windsurf`, `.copilot`, `.aider`) and writes a tailored ESLint standards skill file into each one. The generated file describes the active configuration (TypeScript, frameworks, testing, tools, etc.) and instructs the agent to follow the project's lint conventions automatically.

A companion GitHub Actions workflow (`.github/workflows/agent-skills.yml`) is included so projects can auto-regenerate skill files whenever the ESLint config changes.

**Usage:**

```bash
npx basic-eslint generate-skill          # write skill files (skip existing)
npx basic-eslint generate-skill --force  # overwrite all skill files
```

**Programmatic API:**

```ts
import { generateAgentSkills } from '@santi020k/eslint-config-basic'

const { written, skipped } = generateAgentSkills({ cwd: process.cwd(), force: true })
```
