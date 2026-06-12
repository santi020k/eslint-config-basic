import { defineConfig, Format, Testing } from './packages/basic/dist/index.js'

export default [
  {
    ignores: [
      'dist/*',
      'packages/*/dist/*',
      '**/tsup.config.ts',
      'docs/*',
      '**/.agent/**',
      'packages/tests/fixtures/**',
      'packages/playground/**',
      'apps/docs/.astro/**',
      'apps/docs/playwright-report/**',
      'apps/docs/test-results/**',
      'apps/docs/src/content/docs/api/reference/**',
      'apps/docs/src/content/docs/v1/api/reference/**',
      'typedoc.config.mjs',
      'typedoc.markdown.mjs'
    ],
    name: 'local-global-ignores'
  },
  ...await defineConfig({
    // Root lists tailwindcss for tooling; do not enable Tailwind ESLint for the whole monorepo.
    detection: { libraries: false },
    formats: [Format.Mdx, Format.Markdown],
    libraries: [],
    testing: [Testing.Vitest],
    tsconfigRootDir: import.meta.dirname,
    typescript: true
  }),
  {
    files: [
      'scripts/**/*',
      'packages/tests/**/*',
      'packages/typescript/src/index.ts',
      'packages/basic/src/cli.ts',
      'packages/basic/src/agent-skill-generator.ts',
      'packages/core/src/utils/detection.ts',
      'packages/basic/src/index.ts'
    ],
    name: 'local-overrides',
    rules: {
      '@typescript-eslint/no-empty-function': 'off',
      'no-use-before-define': 'off',
      'security/detect-non-literal-fs-filename': 'off'
    }
  }
]
