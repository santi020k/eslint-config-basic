import { createPackageBuildConfig } from '../../scripts/tsup-config.ts'

export default createPackageBuildConfig({
  entry: ['src/index.ts'],
  // eslint-plugin-solid's declaration file imports @typescript-eslint/utils,
  // causing rollup-plugin-dts to attempt to bundle the entire package and crash.
  // Mark it external so the import is preserved as-is in the output .d.ts.,
  external: [/^node:/, /@typescript-eslint/]
})
