import { defineConfig } from "@santi020k/eslint-config-basic"

export default await defineConfig({
  // Root lists tailwindcss for tooling; do not enable Tailwind ESLint for the whole monorepo.
  // Package detection is unnecessary because playgrounds and docs are ignored here.
  detection: { projects: false },
  extensions: ['boundaries', 'security'],
  formats: ['jsonc', 'markdown'],
  ignores: [
    '**/tsup.config.ts',
    'docs/*',
    'packages/tests/fixtures/**',
    'packages/playground/**',
    'apps/docs/**',
    'typedoc.config.mjs',
    'typedoc.markdown.mjs',
    '**/CHANGELOG.md',
    '.pnpm-store/**'
  ],
  preset: 'monorepo',
  root: import.meta.dirname,
  testing: ['vitest'],
  tools: ['pnpm'],
  typescript: {
    // tsconfig paths map all workspace packages to source. Type-aware linting
    // these fan-out files makes the language server load the whole graph.
    untypedFiles: ['packages/tests/**/*.ts', 'packages/lite/src/index.ts']
  },
  workspacePrefixes: ['@santi020k']
},
  {
    files: ['packages/basic/src/cli.ts', 'packages/basic/src/agent-skill-generator.ts'],
    name: 'local-cli-console',
    rules: {
      // Command dispatchers intentionally coordinate many independent CLI modes.
      complexity: 'off',
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
