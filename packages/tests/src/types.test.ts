import { describe, expect, it } from 'vitest'

import { ExtensionOption, LibraryOption, SettingOption, ToolOption } from '@santi020k/eslint-config-basic'

describe('Type Exports', () => {
  it('should have all LibraryOption values', () => {
    const options = Object.values(LibraryOption)
    expect(options).toContain('tailwind')
    expect(options).toContain('vitest')
    expect(options).toContain('playwright')
  })

  it('should have all ToolOption values', () => {
    const options = Object.values(ToolOption)
    expect(options).toContain('prettier')
    expect(options).toContain('mdx')
  })

  it('should have all ExtensionOption values', () => {
    const options = Object.values(ExtensionOption)
    expect(options).toContain('regexp')
    expect(options).toContain('unicorn')
    expect(options).toContain('sonarjs')
  })

  it('should have all SettingOption values', () => {
    const options = Object.values(SettingOption)

    expect(options).toContain('gitignore')
    expect(options).toContain('no-gitignore')
  })
})
