---
title: "Integrations Overview"
description: "The main package can compose integrations from five categories:"
---

The main package can compose integrations from five categories:

- Libraries
- Testing
- Formats
- Tools
- Extensions

With the lean `basic` package, install the matching category pack before
enabling or auto-detecting those options: `eslint-config-extensions`,
`eslint-config-formats`, `eslint-config-libraries`, `eslint-config-testing`, or
`eslint-config-tools`. The `full` package includes all five.

## Example

```js
import { defineConfig, Extension, Format, Library, Testing, Tool } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  extensions: [Extension.Unicorn, Extension.Security],
  formats: [Format.Markdown],
  libraries: [Library.Tailwind, Library.Storybook],
  testing: [Testing.Vitest],
  tools: [Tool.Prettier]
})
```

The same optional configs can be written with strings:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  extensions: ['unicorn', 'security'],
  formats: ['markdown'],
  libraries: ['tailwind', 'storybook'],
  testing: ['vitest'],
  tools: ['prettier']
})
```

Or use `features` when you want a single boolean map:

```js
import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  features: {
    markdown: true,
    prettier: true,
    security: true,
    tailwind: true,
    vitest: true
  }
})
```

## How to Read the Tooling Docs

- Use [Libraries](/tooling/libraries) for framework-adjacent integrations such as Tailwind or Storybook.
- Use [Testing](/tooling/testing) for Vitest, Playwright, Jest, Cypress, and Testing Library.
- Use [Formats](/tooling/formats) for Markdown, MDX, JSONC, YAML, TOML, and GraphQL.
- Use [Tools](/tooling/tools) for Prettier, CSpell, JSDoc, and Swagger.
- Use [Extensions](/tooling/extensions) for rule packs such as Unicorn or SonarJS.

## Detection Notes

Some integrations can be inferred from `package.json`, but you can still make the final configuration explicit with enums, strings, or `features`. Set a `features` entry to `false` to remove a detected or preset-enabled optional config.

## Repository Examples

- Library Playgrounds: [packages/playground/libraries](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/libraries)
- Testing Playgrounds: [packages/playground/testing](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/testing)
- Format Playgrounds: [packages/playground/formats](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/formats)
- Tool Playgrounds: [packages/playground/tools](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/tools)
- Extension Playgrounds: [packages/playground/extensions](https://github.com/santi020k/eslint-config-basic/tree/main/packages/playground/extensions)

## Related Pages

- [Basic Package](/packages/basic)
- [Configuration](/guide/configuration)
- [Integrations Package](/packages/integrations)
- [CLI](/guide/cli)
