// @ts-check
import { eslintConfig, Tool } from '../../../basic/dist/index.js'

export default eslintConfig({
  tools: [Tool.Prettier],
  tsconfigRootDir: import.meta.dirname
})
