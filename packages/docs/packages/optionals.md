# Optionals Package

Package: [`@santi020k/eslint-config-optionals`](https://www.npmjs.com/package/@santi020k/eslint-config-optionals)

This package contains the optional integrations consumed by the main package through the `libraries`, `testing`, `formats`, `tools`, and `extensions` options.

## Categories

- Libraries: Tailwind, I18next, Storybook, Stencil, TanStack Query, TanStack Router.
- Testing: Vitest, Jest, Cypress, Playwright, Testing Library.
- Formats: Markdown, MDX, JSONC, YAML, TOML, GraphQL.
- Tools: Prettier, CSpell, JSDoc, Swagger.
- Extensions: RegExp, Unicorn, SonarJS, Security, Perfectionist, BestPractices.

## How to Use It

Most projects use the main package and enable optionals through enums rather than importing `@santi020k/eslint-config-optionals` directly.

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

- Source Package: [packages/optionals](https://github.com/santi020k/eslint-config-basic/tree/main/packages/optionals)
- Playground Root: [packages/playground](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground)

## Related Pages

- [Basic Package](/packages/basic)
- [Tooling Overview](/tooling/overview)
- [Libraries](/tooling/libraries)
- [Testing](/tooling/testing)
- [Formats](/tooling/formats)
- [Tools](/tooling/tools)
- [Extensions](/tooling/extensions)
