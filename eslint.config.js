// @ts-check
import { eslintConfig, OptionalOption } from '@santi020k/eslint-config-basic'

export default [
  ...eslintConfig({
    typescript: true,
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
