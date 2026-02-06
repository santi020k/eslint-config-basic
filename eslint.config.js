// @ts-check
import { ConfigOption, eslintConfig, OptionalOption } from '@santi020k/eslint-config'

export default [
  ...eslintConfig({
    config: [ConfigOption.Ts],
    optionals: [OptionalOption.Mdx, OptionalOption.Markdown, OptionalOption.Vitest]
  }),
  {
    name: 'local-config',
    ignores: [
      'dist/*',
      'packages/*/dist/*',
    ]
  }
]
