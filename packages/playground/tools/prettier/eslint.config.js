// @ts-check
import { defineConfig, Tool } from '../../../basic/dist/index.js'

export default await defineConfig({
  tools: [Tool.Prettier],
  tsconfigRootDir: import.meta.dirname
})
