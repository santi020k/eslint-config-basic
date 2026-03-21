// @ts-check

import { eslintConfig, OptionalOption } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  config: [],
  optionals: [
    OptionalOption.Mdx,
    OptionalOption.Stencil,
    OptionalOption.Storybook,
    OptionalOption.TanstackQuery,
    OptionalOption.TanstackRouter,
    OptionalOption.Unicorn,
    OptionalOption.Perfectionist,
    OptionalOption.Security,
    OptionalOption.Jsdoc,
    OptionalOption.Jsonc,
    OptionalOption.Yaml,
    OptionalOption.Toml,
    OptionalOption.Regexp,
    OptionalOption.Sonarjs,
    OptionalOption.Playwright,
    OptionalOption.Swagger
  ]
})
