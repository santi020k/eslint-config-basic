import { eslintConfig, Format, Testing } from '@santi020k/eslint-config-basic'

export default [
  {
    name: 'local-global-ignores',
    ignores: [
      'dist/*',
      'packages/*/dist/*',
      '**/tsup.config.ts',
      'docs/*',
      'docs-md/*',
      '.agent/**',
      'packages/tests/fixtures/**',
      'packages/docs/.astro/**',
      'packages/docs/playwright-report/**',
      'packages/docs/test-results/**',
      'typedoc.config.mjs',
      'typedoc.markdown.mjs'
    ]
  },
  ...eslintConfig({
    typescript: true,
    tsconfigRootDir: import.meta.dirname,
    formats: [Format.Mdx, Format.Markdown],
    testing: [Testing.Vitest],
    libraries: [],
    // Root lists tailwindcss for tooling; do not enable Tailwind ESLint for the whole monorepo.
    detection: { libraries: false }
  })
]
