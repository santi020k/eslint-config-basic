# Optional Tooling Overview

The main package can compose optional integrations from five categories:

- Libraries
- Testing
- Formats
- Tools
- Extensions

## Example

```js
import { eslintConfig, Extension, Format, Library, Testing, Tool } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  libraries: [Library.Tailwind, Library.Storybook],
  testing: [Testing.Vitest],
  formats: [Format.Markdown],
  tools: [Tool.Prettier],
  extensions: [Extension.Unicorn, Extension.Security]
})
```

## How to Read the Tooling Docs

- Use [Libraries](/v1/tooling/libraries) for framework-adjacent integrations such as Tailwind or Storybook.
- Use [Testing](/v1/tooling/testing) for Vitest, Playwright, Jest, Cypress, and Testing Library.
- Use [Formats](/v1/tooling/formats) for Markdown, MDX, JSONC, YAML, TOML, and GraphQL.
- Use [Tools](/v1/tooling/tools) for Prettier, CSpell, JSDoc, and Swagger.
- Use [Extensions](/v1/tooling/extensions) for rule packs such as Unicorn or SonarJS.

## Detection Notes

Some optional integrations can be inferred from `package.json`, but the final configuration still stays explicit in the source you write or the file the CLI scaffolds for you.

## Repository Examples

- Library Playgrounds: [packages/playground/libraries](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/libraries)
- Testing Playgrounds: [packages/playground/testing](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/testing)
- Format Playgrounds: [packages/playground/formats](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/formats)
- Tool Playgrounds: [packages/playground/tools](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/tools)
- Extension Playgrounds: [packages/playground/extensions](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/extensions)

## Related Pages

- [Basic Package](/v1/packages/basic)
- [Configuration](/v1/guide/configuration)
- [Optionals Package](/v1/packages/optionals)
- [CLI](/v1/guide/cli)
