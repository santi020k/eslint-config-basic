import { defineConfig, Extension, Format, Preset, Testing, Tool } from "@santi020k/eslint-config-basic"

import tseslint from "typescript-eslint"

export default await defineConfig({
  // Root lists tailwindcss for tooling; do not enable Tailwind ESLint for the whole monorepo.
  // Disable framework auto-detection: playground packages (e.g. astro) would trigger loading
  // optional framework packages that aren't installed at the root.
  autoFrameworks: false,
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
    'typedoc.markdown.mjs',
    '**/CHANGELOG.md',
    'apps/docs/src/content/docs/guide/changelog.md',
    'apps/docs/src/content/docs/v1/guide/changelog.md'
  ],
  preset: Preset.Monorepo,
  testing: [Testing.Vitest],
  tools: [Tool.Pnpm],
  tsconfigRootDir: import.meta.dirname,
  typescript: true,
  workspacePrefixes: ['@santi020k']
},
  // packages/tests imports every workspace package. When projectService resolves
  // those imports it loads the full monorepo graph and hangs the language server.
  // Disabling type-aware linting here avoids the hang; type correctness is still
  // enforced by `pnpm typecheck`. All other packages now declare only their direct
  // workspace deps in their own tsconfig.json, so projectService stays scoped.
  {
    ...tseslint.configs.disableTypeChecked,
    files: ['packages/tests/**/*.ts'],
    name: 'local-tests-no-type-checking'
  },
  {
    files: ['packages/basic/src/cli.ts', 'packages/basic/src/agent-skill-generator.ts'],
    name: 'local-cli-console',
    rules: {
      'no-console': 'off'
    }
  },
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
)
