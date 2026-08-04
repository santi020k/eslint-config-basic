import { createPackageBuildConfig } from '../../scripts/tsup-config.ts'

export default createPackageBuildConfig({ entry: ['src/index.ts', 'src/rules.ts'] })
