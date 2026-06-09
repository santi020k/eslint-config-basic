// @ts-check
import { defineConfig, Extension } from '../../../basic/dist/index.js'

export default defineConfig({
  extensions: [Extension.Perfectionist],
  tsconfigRootDir: import.meta.dirname
})
