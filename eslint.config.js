import { eslintConfig, Format, Testing } from '@santi020k/eslint-config-basic'

export default [
  {
    ignores: [
      'dist/*',
      'packages/*/dist/*',
      '**/tsup.config.ts',
      'docs/*',
      'docs-md/*',
      '**/.agent/**',
      'packages/tests/fixtures/**',
      'packages/playground/**',
      'packages/docs/.astro/**',
      'packages/docs/playwright-report/**',
      'packages/docs/test-results/**',
      'typedoc.config.mjs',
      'typedoc.markdown.mjs'
    ],
    name: 'local-global-ignores'
  },
  ...eslintConfig({
    // Root lists tailwindcss for tooling; do not enable Tailwind ESLint for the whole monorepo.
    detection: { libraries: false },
    formats: [Format.Mdx, Format.Markdown],
    libraries: [],
    testing: [Testing.Vitest],
    tsconfigRootDir: import.meta.dirname,
    typescript: true
  }),
  {
    files: ['scripts/**/*', 'packages/tests/**/*', 'packages/typescript/src/index.ts'],
    name: 'local-overrides',
    rules: {
      '@typescript-eslint/no-empty-function': 'off',
      'no-use-before-define': 'off',
    }
  }
]
