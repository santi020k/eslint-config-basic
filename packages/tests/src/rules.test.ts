import { coreConfig, createImportGroups, groups, rules } from '@santi020k/eslint-config-core'
import { reactConfig } from '@santi020k/eslint-config-react'
import { typescriptConfig } from '@santi020k/eslint-config-typescript'
import type { Linter } from 'eslint'
import { ESLint } from 'eslint'
import { describe, expect, test } from 'vitest'

import { getEffectiveRuleValue } from './test-utils.js'

// ─── Import group classification helper ──────────────────────────────────────

const classify = (importPath: string, groupPatterns: string[][]): number => {
  for (const [i, groupPattern] of groupPatterns.entries()) {
    for (const pattern of groupPattern) {
      if (importPath.match(pattern)) return i
    }
  }

  return -1
}

describe('Core Rules', () => {
  test('should export rules object', () => {
    expect(typeof rules).toBe('object')
  })

  test('should include expected core rules', () => {
    // Check for actual rules exported from the core package
    expect(rules['@stylistic/indent']).toBeDefined()
    expect(rules['@stylistic/quotes']).toBeDefined()
  })

  test('should have correct effective values for core rules', () => {
    expect(getEffectiveRuleValue(coreConfig, '@stylistic/semi')).toEqual(['warn', 'never'])
    expect(getEffectiveRuleValue(coreConfig, '@stylistic/quotes')).toEqual(['warn', 'single'])
    expect(getEffectiveRuleValue(coreConfig, '@stylistic/function-call-argument-newline'))
      .toEqual(['warn', 'consistent'])
    expect(getEffectiveRuleValue(coreConfig, '@stylistic/lines-around-comment')).toEqual([
      'warn',
      {
        allowBlockStart: true,
        allowClassStart: true,
        ignorePattern: '^\\*'
      }
    ])
    expect(getEffectiveRuleValue(coreConfig, '@stylistic/max-len')).toEqual([
      'warn',
      {
        code: 120,
        comments: 200,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreUrls: true,
        tabWidth: 2
      }
    ])
    expect(getEffectiveRuleValue(coreConfig, 'camelcase')).toEqual([
      'warn',
      { allow: ['database_specific', 'ecosystem_specific'], properties: 'never' }
    ])
    expect(getEffectiveRuleValue(coreConfig, 'no-void')).toEqual([
      'warn',
      { allowAsStatement: true }
    ])
    expect(getEffectiveRuleValue(coreConfig, 'no-unused-vars')).toBeDefined()
  })

  test.each([
    {
      name: 'long function calls',
      source: [
        'invoke(',
        '  firstArgumentWithADescriptiveName,',
        '  secondArgumentWithADescriptiveName',
        ')'
      ].join('\n')
    },
    {
      name: 'long constructor calls',
      source: [
        'new Example(',
        '  firstArgumentWithADescriptiveName,',
        '  secondArgumentWithADescriptiveName',
        ')'
      ].join('\n')
    },
    {
      name: 'long arrow predicates',
      source: [
        'items.find(item => (',
        '  firstConditionWithADescriptiveName(item) ||',
        '  secondConditionWithADescriptiveName(item)',
        '))'
      ].join('\n')
    },
    {
      name: 'long ternaries',
      source: [
        'const result = conditionWithADescriptiveName ?',
        '  firstResultWithADescriptiveName :',
        '  secondResultWithADescriptiveName'
      ].join('\n')
    },
    {
      name: 'long nullish-coalescing expressions',
      source: [
        'const result = firstValueWithADescriptiveName ??',
        '  secondValueWithADescriptiveName ??',
        '  fallbackValueWithADescriptiveName'
      ].join('\n')
    }
  ])('should converge after one autofix pass for $name', async ({ source }) => {
    const stylisticPlugins = coreConfig.find(config => config.plugins?.['@stylistic'])?.plugins
    const convergenceConfig: Linter.Config[] = [{
      files: ['**/*.js'],
      plugins: stylisticPlugins as unknown as Linter.Config['plugins'],
      rules: {
        '@stylistic/function-call-argument-newline': ['warn', 'consistent'],
        '@stylistic/implicit-arrow-linebreak': ['warn', 'beside'],
        '@stylistic/indent': ['warn', 2],
        '@stylistic/indent-binary-ops': ['warn', 2],
        '@stylistic/max-len': ['warn', { code: 120 }],
        '@stylistic/operator-linebreak': ['warn', 'after'],
        'arrow-body-style': ['warn', 'as-needed']
      }
    }]
    const eslint = new ESLint({
      fix: true,
      overrideConfig: convergenceConfig,
      overrideConfigFile: true
    })
    const [firstPass] = await eslint.lintText(source, { filePath: 'convergence.js' })
    const stableSource = firstPass.output ?? source
    const [secondPass] = await eslint.lintText(stableSource, { filePath: 'convergence.js' })

    expect(secondPass.output).toBeUndefined()
    expect(secondPass.messages.map(message => message.ruleId)).not.toContain('@stylistic/max-len')
  })

  test('should have config with stylistic rules', () => {
    const stylisticConfig = coreConfig.find(c => c.name === 'stylistic/recommended')
    expect(stylisticConfig).toBeDefined()
  })

  test('should have config with plugins', () => {
    const pluginsConfig = coreConfig.find(c => c.name === 'eslint-config/core-plugins')
    expect(pluginsConfig).toBeDefined()
  })
})

describe('TypeScript Rules', () => {
  test('should include TypeScript parser configuration', () => {
    const tsConfig = typescriptConfig.find(c => c.languageOptions?.parser)
    expect(tsConfig).toBeDefined()
  })

  test('should target TypeScript files', () => {
    const hasTypeScriptFiles = typescriptConfig.some(c => c.files?.some((pattern: unknown) => typeof pattern === 'string' && pattern.includes('.ts')))
    expect(hasTypeScriptFiles).toBe(true)
  })

  test('should have correct effective values for TS rules', () => {
    // Note: Since we are using typescriptConfig directly, we can check its rules
    expect(getEffectiveRuleValue(typescriptConfig, '@typescript-eslint/no-explicit-any')).toBeDefined()
    expect(getEffectiveRuleValue(typescriptConfig, '@typescript-eslint/no-unnecessary-condition')).toBeDefined()
  })
})

describe('React Rules', () => {
  test('should include React plugin configuration', () => {
    const hasReactPlugin = reactConfig.some(c => c.plugins && ('@eslint-react' in c.plugins || 'react-hooks' in c.plugins))
    expect(hasReactPlugin).toBe(true)
  })

  test('should have React Hooks rules enabled', () => {
    expect(getEffectiveRuleValue(reactConfig, '@eslint-react/exhaustive-deps')).toBe('warn')
  })

  test('should include official React Compiler diagnostics without duplicate hook rules', () => {
    expect(getEffectiveRuleValue(reactConfig, 'react-hooks/config')).toBe('warn')
    expect(getEffectiveRuleValue(reactConfig, 'react-hooks/immutability')).toBe('warn')
    expect(getEffectiveRuleValue(reactConfig, 'react-hooks/exhaustive-deps')).toBeUndefined()
  })
})

describe('Import Groups', () => {
  test('groups should be a non-empty array of regex pattern arrays', () => {
    expect(Array.isArray(groups)).toBe(true)
    expect(groups.length).toBeGreaterThan(0)
    for (const group of groups) {
      expect(Array.isArray(group)).toBe(true)
      for (const pattern of group) {
        expect(() => ''.match(pattern)).not.toThrow()
      }
    }
  })

  test('should classify Node built-ins correctly', () => {
    expect(classify('node:fs', groups)).toBe(1)
    expect(classify('node:path', groups)).toBe(1)
    expect(classify('fs', groups)).toBe(1)
    expect(classify('path', groups)).toBe(1)
  })

  test('should classify framework virtuals before externals', () => {
    expect(classify('virtual:icons', groups)).toBe(2)
    expect(classify('astro:content', groups)).toBe(2)
    expect(classify('$app/navigation', groups)).toBe(2)
    expect(classify('#imports', groups)).toBe(2)
  })

  test('should classify internal UI layer before externals', () => {
    expect(classify('components/Button', groups)).toBe(3)
    expect(classify('@/components/Button', groups)).toBe(3)
    expect(classify('~/pages/Home', groups)).toBe(3)
  })

  test('should classify internal app layer before externals', () => {
    expect(classify('hooks/useAuth', groups)).toBe(4)
    expect(classify('@/utils/format', groups)).toBe(4)
    expect(classify('constants/routes', groups)).toBe(4)
  })

  test('should classify style imports before externals and relatives', () => {
    // All style import styles land in group 5
    expect(classify('./Button.module.css', groups)).toBe(5)
    expect(classify('../styles/globals.scss', groups)).toBe(5)
    expect(classify('theme.sass', groups)).toBe(5)
    expect(classify('@/styles/theme.css', groups)).toBe(5)
  })

  test('should classify external npm packages correctly', () => {
    // Without workspace groups, externals are at index 6
    expect(classify('react', groups)).toBe(6)
    expect(classify('@tanstack/query', groups)).toBe(6)
    expect(classify('lodash', groups)).toBe(6)
  })

  test('should NOT misclassify @/ path aliases as external packages', () => {
    // @/router is not an npm package — should NOT land in externals (6)
    expect(classify('@/router', groups)).not.toBe(6)
  })

  test('createImportGroups with workspacePrefixes inserts workspace group before externals', () => {
    const ws = createImportGroups({ workspacePrefixes: ['@acme'] })
    const defaultExternalsIdx = 6
    const wsExternalsIdx = 7 // shifted by the extra workspace group

    expect(classify('@acme/shared', ws)).toBe(defaultExternalsIdx)     // workspace group
    expect(classify('@acme/ui', ws)).toBe(defaultExternalsIdx)
    expect(classify('react', ws)).toBe(wsExternalsIdx)                  // externals pushed down
    expect(classify('@tanstack/query', ws)).toBe(wsExternalsIdx)
  })

  test('createImportGroups with workspacePrefixes should not affect non-matching scopes', () => {
    const ws = createImportGroups({ workspacePrefixes: ['@acme'] })

    expect(classify('@other/pkg', ws)).toBe(7) // goes to externals, not workspace
  })
})
