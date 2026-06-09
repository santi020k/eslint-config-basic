// @ts-check
import { defineConfig, Tool } from '../../../basic/dist/index.js'

export default await defineConfig({
  tools: [Tool.Jsdoc],
  tsconfigRootDir: import.meta.dirname
})
