// @ts-check
import { eslintConfig, Runtime } from '../../basic/dist/index.js'

export default eslintConfig({
  frameworks: {
    hono: true
  },
  runtime: Runtime.Worker,
  tsconfigRootDir: import.meta.dirname,
  typescript: true
})
