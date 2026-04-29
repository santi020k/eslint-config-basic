# Integrations Package

Package: [`@santi020k/eslint-config-integrations`](https://www.npmjs.com/package/@santi020k/eslint-config-integrations)

This package contains the integrations consumed by the main package through the `libraries`, `testing`, `formats`, `tools`, and `extensions` options.

## Categories

- Libraries: Tailwind, I18next, Storybook, Stencil, TanStack Query, TanStack Router.
- Testing: Vitest, Jest, Cypress, Playwright, Testing Library.
- Formats: Markdown, MDX, JSONC, YAML, TOML, GraphQL.
- Tools: Prettier, CSpell, JSDoc, Swagger.
- Extensions: RegExp, Unicorn, SonarJS, Security, Perfectionist, BestPractices.

## How to Use It

Most projects use the main package and enable integrations through enums rather than importing `@santi020k/eslint-config-integrations` directly.

```js
import { eslintConfig, Extension, Library, Testing, Tool } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  libraries: [Library.Tailwind],
  testing: [Testing.Vitest],
  tools: [Tool.Prettier],
  extensions: [Extension.Unicorn]
})
```

## Repository Links

- Source Package: [packages/integrations](https://github.com/santi020k/eslint-config-basic/tree/main/packages/integrations)
- Playground Root: [packages/playground](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground)

## Related Pages

- [Basic Package](/v1/packages/basic)
- [Tooling Overview](/v1/tooling/overview)
- [Libraries](/v1/tooling/libraries)
- [Testing](/v1/tooling/testing)
- [Formats](/v1/tooling/formats)
- [Tools](/v1/tooling/tools)
- [Extensions](/v1/tooling/extensions)
