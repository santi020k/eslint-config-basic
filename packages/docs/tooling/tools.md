# Tools

The `tools` option enables integrations for standalone developer tooling that commonly interacts with source code or documentation.

| Tool | Enum | Use It When | Auto-Detected |
| :--- | :--- | :--- | :--- |
| Prettier | `Tool.Prettier` | The project uses Prettier and needs ESLint compatibility. | No |
| CSpell | `Tool.Cspell` | The project wants spell checking coverage. | No |
| JSDoc | `Tool.Jsdoc` | The project relies on JSDoc conventions. | No |
| Swagger | `Tool.Swagger` | The project uses Nest Swagger tooling. | Yes |

## Example

```js
import { eslintConfig, Tool } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  tools: [Tool.Prettier, Tool.Cspell]
})
```

## Notes

- Prettier is intentionally applied last in the final config array.
- Swagger is automatically detected when the project includes `@nestjs/swagger`.

## Repository Examples

- Tool Playgrounds: [packages/playground/tools](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/tools)
- Optionals Package Source: [packages/optionals](https://github.com/santi020k/eslint-config-basic/tree/main/packages/optionals)
