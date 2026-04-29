# Testing

The `testing` option enables linting support for test runners, test environments, and testing-oriented utilities.

| Integration | Enum | Use It When | Auto-Detected |
| :--- | :--- | :--- | :--- |
| Vitest | `Testing.Vitest` | The project uses Vitest. | Yes |
| Playwright | `Testing.Playwright` | The project uses Playwright. | Yes |
| Jest | `Testing.Jest` | The project uses Jest. | No |
| Cypress | `Testing.Cypress` | The project uses Cypress. | No |
| Testing Library | `Testing.TestingLibrary` | The project uses Testing Library. | No |

## Example

```js
import { eslintConfig, Testing } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  testing: [Testing.Vitest, Testing.Playwright]
})
```

## Notes

- Testing integrations can be mixed as needed.
- Detection covers the most common tools, but manual selection is still available for every supported integration.

## Repository Examples

- Testing Playgrounds: [packages/playground/testing](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/testing)
- Optionals Package Source: [packages/optionals](https://github.com/santi020k/eslint-config-basic/tree/main/packages/optionals)
