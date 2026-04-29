# Extensions

The `extensions` option enables specialized rule packs that are useful across many project types.

| Extension | Enum | Use It When | Auto-Detected |
| :--- | :--- | :--- | :--- |
| RegExp | `Extension.Regexp` | The project wants stronger regular-expression linting. | No |
| Unicorn | `Extension.Unicorn` | The project wants modern JavaScript best-practice rules. | No |
| SonarJS | `Extension.Sonarjs` | The project wants maintainability-oriented rules. | No |
| Security | `Extension.Security` | The project wants additional security-oriented checks. | Yes |
| Perfectionist | `Extension.Perfectionist` | The project wants ordering and consistency rules. | No |
| BestPractices | `Extension.BestPractices` | The project wants light-weight quality rules with no extra dependencies. | No |

## Example

```js
import { eslintConfig, Extension } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  extensions: [Extension.Unicorn, Extension.Security, Extension.Perfectionist, Extension.BestPractices]
})
```

## Details

### BestPractices

The `Extension.BestPractices` pack adds four quality rules that don't require any external plugin dependencies:

- `no-console` (warn) — catches leftover debug output
- `no-alert` (error) — disallows browser `alert`, `confirm`, and `prompt`
- `complexity` (warn, max 10) — flags overly complex functions
- `max-depth` (warn, max 4) — flags deeply nested blocks

## Notes

- The Security extension is enabled by default through detection.
- These extensions can be layered with frameworks, formats, and tooling without changing the core composition model.

## Repository Examples

- Extension Playgrounds: [packages/playground/extensions](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/extensions)
- Optionals Package Source: [packages/optionals](https://github.com/santi020k/eslint-config-basic/tree/main/packages/optionals)
