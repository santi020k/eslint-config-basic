import { defineConfig, Extension, Format, Preset, Testing, Tool } from "@santi020k/eslint-config-basic"

export default [
  ...await defineConfig({
    // Root lists tailwindcss for tooling; do not enable Tailwind ESLint for the whole monorepo.
    detection: { libraries: false },
    detectRootDir: import.meta.dirname,
    extensions: [Extension.Boundaries],
    formats: [Format.Jsonc, Format.Mdx, Format.Markdown],
    ignores: [
      '**/tsup.config.ts',
      'docs/*',
      'packages/tests/fixtures/**',
      'packages/playground/**',
      'apps/docs/src/content/docs/api/reference/**',
      'apps/docs/src/content/docs/v1/api/reference/**',
      'typedoc.config.mjs',
      'typedoc.markdown.mjs'
    ],
    preset: Preset.Monorepo,
    testing: [Testing.Vitest],
    tools: [Tool.Pnpm],
    tsconfigRootDir: import.meta.dirname,
    typescript: true,
    workspacePrefixes: ['@santi020k']
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
