---
title: "Tools"
description: "The tools option enables integrations for standalone developer tooling that commonly interacts with source code or documentation."
---

The `tools` option enables integrations for standalone developer tooling that commonly interacts with source code or documentation.

Install `@santi020k/eslint-config-integrations` alongside the lean `basic`
package before enabling or auto-detecting entries on this page. The `full`
package already includes it.

| Tool | Enum | Use It When | Auto-Detected |
| :--- | :--- | :--- | :--- |
| Prettier | `Tool.Prettier` | The project uses Prettier and needs ESLint compatibility. | No |
| CSpell | `Tool.Cspell` | The project wants spell checking coverage. | No |
| JSDoc | `Tool.Jsdoc` | The project relies on JSDoc conventions. | No |
| Command | `Tool.Command` | The project wants micro-fixes via magic comments (`/// @keep`, etc). | No |
| Docker | `Tool.Docker` | The project has Docker Compose YAML files. | Yes |
| GitHub Actions | `Tool.GithubActions` | The project has workflow files under `.github/workflows`. | Yes |
| Nx | `Tool.Nx` | The project uses Nx workspace configuration. | Yes |
| pnpm | `Tool.Pnpm` | The project uses pnpm catalogs or workspace settings that should be enforced. | No |
| Swagger | `Tool.Swagger` | The project uses Nest Swagger tooling. | Yes |

## Example

```js
import { defineConfig, Tool } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  tools: [Tool.Prettier, Tool.Cspell, Tool.GithubActions, Tool.Docker, Tool.Nx]
})
```

## Notes

- Prettier is intentionally applied last in the final config array.
- GitHub Actions and Docker Compose build on the YAML integration.
- Nx builds on the JSON/JSONC integration for `nx.json` and `project.json`.
- pnpm enforces catalogs and workspace settings in `package.json` and `pnpm-workspace.yaml` via `eslint-plugin-pnpm`.
- Swagger is automatically detected when the project includes `@nestjs/swagger`.

## Repository Examples

- Tool Playgrounds: [packages/playground/tools](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/tools)
- Integrations Package Source: [packages/integrations](https://github.com/santi020k/eslint-config-basic/tree/main/packages/integrations)
