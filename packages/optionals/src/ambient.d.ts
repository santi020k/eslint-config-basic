declare module 'cross-dirname' {
  export function getDirname(): string
}

declare module '@stencil-community/eslint-plugin' {
  const plugin: {
    rules: Record<string, unknown>
  }

  export default plugin
}

declare module 'eslint-plugin-better-tailwindcss' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const plugin: {
    configs: {
      recommended: TSESLint.FlatConfig.Config
    }
  }

  export default plugin
}

declare module 'eslint-plugin-i18next' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const plugin: TSESLint.FlatConfig.Plugin

  export default plugin
}

declare module 'eslint-config-prettier' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const config: TSESLint.FlatConfig.Config

  export default config
}

declare module 'eslint-plugin-unicorn' {
  const plugin: {
    rules: Record<string, unknown>
  }

  export default plugin
}

declare module 'eslint-plugin-playwright' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const plugin: {
    configs: {
      'flat/recommended': TSESLint.FlatConfig.Config
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

declare module '@tanstack/eslint-plugin-query' {
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

declare module '@tanstack/eslint-plugin-router' {
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

declare module 'eslint-plugin-jsonc' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const plugin: {
    configs: {
      'flat/recommended-with-jsonc': TSESLint.FlatConfig.ConfigArray
    }
    rules: Record<string, unknown>
  }

  export default plugin
}

declare module 'eslint-plugin-yml' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const plugin: {
    configs: {
      'flat/recommended': TSESLint.FlatConfig.ConfigArray
    }
    rules: Record<string, unknown>
  }

  export default plugin
}

declare module 'eslint-plugin-toml' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const plugin: {
    configs: {
      'flat/recommended': TSESLint.FlatConfig.ConfigArray
    }
    rules: Record<string, unknown>
  }

  export default plugin
}

declare module 'eslint-plugin-storybook' {
  import type { TSESLint } from '@typescript-eslint/utils'

  const plugin: {
    configs: {
      'flat/recommended': TSESLint.FlatConfig.ConfigArray
    }
    rules: Record<string, unknown>
  }

  export default plugin
}
