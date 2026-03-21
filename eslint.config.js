import { eslintConfig, Library } from '@santi020k/eslint-config-basic'

export default [
  ...eslintConfig({
    typescript: true,
    libraries: [Library.Mdx, Library.Markdown, Library.Vitest]
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
