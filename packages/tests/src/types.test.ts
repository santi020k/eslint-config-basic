import { describe, expect, it } from 'vitest'

import { ExtensionOption, LibraryOption, SettingOption, ToolOption } from '@santi020k/eslint-config-basic'

describe('Type Exports', () => {
  it('should have all LibraryOption values', () => {
    const options = Object.values(LibraryOption)
    expect(options).toContain('tailwind')
    expect(options).toContain('vitest')
    expect(options).toContain('i18next')
    expect(options).toContain('stencil')
    expect(options).toContain('playwright')
    expect(options).toContain('tanstack-query')
    expect(options).toContain('tanstack-router')
    expect(options).toContain('storybook')
  })

  it('should have all ToolOption values', () => {
    const options = Object.values(ToolOption)
    expect(options).toContain('mdx')
    expect(options).toContain('markdown')
    expect(options).toContain('cspell')
    expect(options).toContain('prettier')
    expect(options).toContain('jsdoc')
    expect(options).toContain('swagger')
    expect(options).toContain('jsonc')
    expect(options).toContain('yaml')
    expect(options).toContain('toml')
  })

  it('should have all ExtensionOption values', () => {
    const options = Object.values(ExtensionOption)
    expect(options).toContain('regexp')
    expect(options).toContain('unicorn')
    expect(options).toContain('sonarjs')
    expect(options).toContain('security')
    expect(options).toContain('perfectionist')
  })

  it('should have all SettingOption values', () => {
    const options = Object.values(SettingOption)

    expect(options).toContain('gitignore')
    expect(options).toContain('no-gitignore')
  })
})
