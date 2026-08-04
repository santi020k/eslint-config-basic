import { createPackageBuildConfig } from '../../scripts/tsup-config.ts'

export default createPackageBuildConfig({
  entry: ['src/index.ts'],
  external: [/^@santi020k\//],
  outDir: 'dist',
  skipNodeModulesBundle: true,
  sourcemap: false
})
