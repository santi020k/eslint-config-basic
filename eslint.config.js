import { eslintConfig, Format, Testing } from '@santi020k/eslint-config-basic'

export default [
  ...eslintConfig({
    typescript: true,
    tsconfigRootDir: import.meta.dirname,
    formats: [Format.Mdx, Format.Markdown],
    testing: [Testing.Vitest],
    libraries: []
  }),
  {
    name: 'local-config',
    ignores: [
      'dist/*',
      'packages/*/dist/*',
      '**/tsup.config.ts',
      'docs/*',
      'docs-md/*',
      'packages/tests/fixtures/**/*',
      'typedoc.config.mjs',
      'typedoc.markdown.mjs'
    ]
  }
]
