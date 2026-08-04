import { createPackageBuildConfig } from '../../scripts/tsup-config.ts'

export default createPackageBuildConfig({ entry: ['src/*.ts', '!src/*.d.ts'] })
