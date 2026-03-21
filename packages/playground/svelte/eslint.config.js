// @ts-check
import { ConfigOption, eslintConfig } from '@santi020k/eslint-config-basic'
import svelte from '@santi020k/eslint-config-svelte'

export default eslintConfig({
  config: [ConfigOption.Svelte, ConfigOption.Ts],
  frameworks: {
    svelte
  }
})
