import { createPackageBuildConfig } from '../../scripts/tsup-config.ts'

export default createPackageBuildConfig({
  entry: [
    'src/index.ts',
    'src/types.ts',
    'src/rules.ts',
    'src/utils/index.ts',
    'src/utils/detection.ts',
    'src/settings/index.ts',
    'src/settings/gitignore.ts',
    'src/compose.ts',
    'src/feature.ts',
    'src/lazy.ts',
    'src/config-helpers.ts'
  ]
})
