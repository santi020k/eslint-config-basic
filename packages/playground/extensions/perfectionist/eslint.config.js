// @ts-check
import { defineConfig, Extension } from '../../../basic/dist/index.js'

export default await defineConfig({
  extensions: [Extension.Perfectionist],
  tsconfigRootDir: import.meta.dirname
})
