declare module 'eslint-plugin-better-tailwindcss' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const plugin: {
    configs: {
      recommended: TSESLint.FlatConfig.Config
    }
  }

  export default plugin
}

declare module 'eslint-plugin-security' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const plugin: {
    configs: {
      recommended: {
        rules: TSESLint.FlatConfig.Rules
      }
    }
    rules: TSESLint.FlatConfig.Plugin['rules']
  }

  export default plugin
}

declare module 'eslint-plugin-vuejs-accessibility' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const plugin: {
    configs: {
      'flat/recommended': TSESLint.FlatConfig.ConfigArray
    }
  }

  export default plugin
}

declare module 'eslint-plugin-tsdoc' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const plugin: {
    rules: TSESLint.FlatConfig.Plugin['rules']
  }

  export default plugin
}

declare module 'eslint-plugin-zod' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const plugin: {
    configs: {
      recommended: TSESLint.FlatConfig.Config
    }
  }

  export default plugin
}

declare module 'eslint-config-biome' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const config: {
    rules: TSESLint.FlatConfig.Rules
  }

  export default config
}
