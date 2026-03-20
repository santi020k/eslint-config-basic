// @ts-check
import angular from '@santi020k/eslint-config-angular'
import { ConfigOption, eslintConfig } from '@santi020k/eslint-config-basic'

export default eslintConfig({
  config: [ConfigOption.Angular, ConfigOption.Ts],
  frameworks: {
    angular
  }
})
