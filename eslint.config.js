import { eslintConfig, Format, Testing } from '@santi020k/eslint-config-basic'

export default [
  ...eslintConfig({
    typescript: true,
    tsconfigRootDir: import.meta.dirname,
    formats: [Format.Mdx, Format.Markdown],
    testing: [Testing.Vitest]
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
