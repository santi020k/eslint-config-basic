// @ts-check
import { ConfigOption, eslintConfig, OptionalOption } from '@santi020k/eslint-config-basic'

export default [
  ...await eslintConfig({
    config: [ConfigOption.Ts],
    optionals: [OptionalOption.Mdx, OptionalOption.Markdown, OptionalOption.Vitest]
  }),
  {
    name: 'local-config',
    ignores: [
      'dist/*',
      'packages/*/dist/*',
      '**/tsup.config.ts',
      'docs/*',
      'docs-md/*',
      'typedoc.config.mjs',
      'typedoc.markdown.mjs'
    ]
  }
]
