import pluginQwik from 'eslint-plugin-qwik'

import type { TSESLint } from '@typescript-eslint/utils'

export const qwik: TSESLint.FlatConfig.ConfigArray = [
  {
    name: 'eslint-config/qwik',
    plugins: {
      qwik: pluginQwik
    },
    rules: {
      'qwik/use-method-usage': 'error',
      'qwik/valid-lexical-scope': 'error',
      'qwik/no-react-props': 'error',
      'qwik/prefer-classlist': 'warn',
      'qwik/jsx-no-script-url': 'warn',
      'qwik/loader-location': 'warn',
      'qwik/jsx-key': 'warn',
      'qwik/unused-server': 'error',
      'qwik/jsx-img': 'warn',
      'qwik/jsx-a11y/alt-text': 'warn',
      'qwik/jsx-a11y/anchor-has-content': 'warn',
      'qwik/jsx-a11y/anchor-is-valid': 'warn',
      'qwik/jsx-a11y/aria-activedescendant-has-tabindex': 'warn',
      'qwik/jsx-a11y/aria-props': 'warn',
      'qwik/jsx-a11y/aria-proptypes': 'warn',
      'qwik/jsx-a11y/aria-role': 'warn',
      'qwik/jsx-a11y/aria-unsupported-elements': 'warn',
      'qwik/jsx-a11y/click-events-have-key-events': 'warn',
      'qwik/jsx-a11y/heading-has-content': 'warn',
      'qwik/jsx-a11y/html-has-lang': 'warn',
      'qwik/jsx-a11y/iframe-has-title': 'warn',
      'qwik/jsx-a11y/img-redundant-alt': 'warn',
      'qwik/jsx-a11y/interactive-supports-focus': 'warn',
      'qwik/jsx-a11y/label-has-associated-control': 'warn',
      'qwik/jsx-a11y/media-has-caption': 'warn',
      'qwik/jsx-a11y/mouse-events-have-key-events': 'warn',
      'qwik/jsx-a11y/no-access-key': 'warn',
      'qwik/jsx-a11y/no-autofocus': 'warn',
      'qwik/jsx-a11y/no-distracting-elements': 'warn',
      'qwik/jsx-a11y/no-interactive-element-to-noninteractive-role': 'warn',
      'qwik/jsx-a11y/no-noninteractive-element-interactions': 'warn',
      'qwik/jsx-a11y/no-noninteractive-element-to-interactive-role': 'warn',
      'qwik/jsx-a11y/no-noninteractive-tabindex': 'warn',
      'qwik/jsx-a11y/no-redundant-roles': 'warn',
      'qwik/jsx-a11y/no-static-element-interactions': 'warn',
      'qwik/jsx-a11y/role-has-required-aria-props': 'warn',
      'qwik/jsx-a11y/role-supports-aria-props': 'warn',
      'qwik/jsx-a11y/scope': 'warn',
      'qwik/jsx-a11y/tabindex-no-positive': 'warn'
    }
  }
]
