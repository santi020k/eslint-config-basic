// @ts-check
import svelte from '@santi020k/eslint-config-svelte'
import { ConfigOption, eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  config: [ConfigOption.Svelte, ConfigOption.Ts],
  frameworks: {
    svelte
  }
})
