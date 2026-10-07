---
title: "Testing"
description: "The testing option enables linting support for test runners, test environments, and testing-oriented utilities."
---

The `testing` option enables linting support for test runners, test environments, and testing-oriented utilities.

Install `@santi020k/eslint-config-testing` alongside the lean `basic`
package before enabling or auto-detecting entries on this page. The `full`
package already includes it.

| Integration | Enum | Use It When | Auto-Detected |
| :--- | :--- | :--- | :--- |
| Vitest | `Testing.Vitest` | The project uses Vitest. | Yes |
| Playwright | `Testing.Playwright` | The project uses Playwright. | Yes |
| Jest | `Testing.Jest` | The project uses Jest. | No |
| Cypress | `Testing.Cypress` | The project uses Cypress. | No |
| Testing Library | `Testing.TestingLibrary` | The project uses Testing Library. | No |
| Jest DOM | `Testing.JestDom` | The project uses Testing Library with Jest DOM assertions. | No |

## Example

```js
import { defineConfig, Testing } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  testing: [Testing.Vitest, Testing.Playwright]
})
```

## Notes

- Testing integrations can be mixed as needed.
- Detection covers the most common tools, but manual selection is still available for every supported integration.

## Repository Examples

- Testing Playgrounds: [packages/playground/testing](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/testing)
- Testing Package Source: [packages/testing](https://github.com/santi020k/eslint-config-basic/tree/main/packages/testing)

## Playwright and Testing Library together

When both integrations are enabled, Playwright-owned files set
`testing-library/utils-module` to `off`. This restricts import heuristics that
can mistake Playwright locators for Testing Library queries. Actual imports
from Testing Library still receive its rules, and unit-test files keep their
existing heuristics. Custom query and render settings remain unchanged.

Use `testingFiles.playwright` when browser tests live outside the conventional
e2e, functional, or Playwright directories:

```js
export default await defineConfig({
  testing: ['playwright', 'testing-library'],
  testingFiles: { playwright: ['tests/browser/**/*.spec.ts'] }
})
```

Install `@santi020k/eslint-config-testing`. Pass a local settings override after
the options object when a browser suite deliberately re-exports Testing Library
utilities and needs a custom `testing-library/utils-module` value.
