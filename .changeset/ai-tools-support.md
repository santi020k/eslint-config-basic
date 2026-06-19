---
"@santi020k/eslint-config-basic": minor
"@santi020k/eslint-config-core": minor
"@santi020k/eslint-config-integrations": minor
"@santi020k/eslint-config-docs": minor
---

Add broader AI tooling support:

- **New agent skill targets** in `generate-skill`: Gemini (`.gemini/styleguide.md`), Cline (`.clinerules/`), Roo Code (`.roo/rules/`), and Kiro (`.kiro/steering/` with `inclusion: always` front-matter). The generator also maintains a guarded ESLint-standards section in an existing root `AGENTS.md` (the open standard read by Codex CLI, OpenCode, Jules, Amp, and others), mirroring the `.github/copilot-instructions.md` behavior.
- **New library integrations**: `Library.Langchain` and `Library.LlamaIndex` add import safety rules for LangChain.js (`langchain`, `@langchain/*`) and LlamaIndex.TS (`llamaindex`, `@llamaindex/*`) projects, with auto-detection from `package.json` dependencies.
- Generated agent skills now report AI SDK, MCP, Mastra, OpenAI Agents, LangChain, and LlamaIndex integrations in the feature summary.
