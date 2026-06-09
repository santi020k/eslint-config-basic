// @ts-check
import { eslintConfig, Tool } from '../../../basic/dist/index.js'

export default eslintConfig({
  tools: [Tool.Swagger],
  tsconfigRootDir: import.meta.dirname
})
