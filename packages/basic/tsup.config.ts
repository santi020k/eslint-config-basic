import { defineConfig } from 'tsup'

import { createPackageBuildConfig } from '../../scripts/tsup-config.ts'

const env = process.env.NODE_ENV

const shared = createPackageBuildConfig({
  splitting: true,
  minify: false,
  skipNodeModulesBundle: true,
  watch: env === 'development',
  outDir: 'dist'
})

export default defineConfig([
  {
    ...shared,
    entry: [
      'src/agent-skill-generator.ts',
      'src/cli-advanced.ts',
      'src/cli-migration.ts',
      'src/cli-package-manager.ts',
      'src/cli-preset.ts',
      'src/cli-workflows.ts',
      'src/define-config-metadata.ts',
      'src/index.ts',
      'src/frameworks.ts',
      'src/integrations.ts',
      'src/optional-package-errors.ts',
      'src/recommended.ts',
      'src/resolvers.ts',
      'src/tailwind.ts'
    ]
  },
  {
    ...shared,
    entry: ['src/cli.ts'],
    banner: { js: '#!/usr/bin/env node' }
  }
])
