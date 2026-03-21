import { eslintConfig, LibraryOption } from '@santi020k/eslint-config-basic'

export default [
  ...eslintConfig({
    typescript: true,
    libraries: [LibraryOption.Mdx, LibraryOption.Markdown, LibraryOption.Vitest]
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
