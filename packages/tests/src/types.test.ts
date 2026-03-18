import { describe, expect, it } from 'vitest'

import { ConfigOption, OptionalOption, SettingOption } from '@santi020k/eslint-config-basic'

describe('Type Exports', () => {
  it('should have all ConfigOption values', () => {
    const options = Object.values(ConfigOption)

    expect(options).toContain('ts')

    expect(options).toContain('react')

    expect(options).toContain('next')

    expect(options).toContain('vue')
  })

  it('should have all OptionalOption values', () => {
    const options = Object.values(OptionalOption)

    expect(options).toContain('tailwind')

    expect(options).toContain('vitest')

    expect(options).toContain('prettier')

    expect(options).toContain('regexp')

    expect(options).toContain('unicorn')

    expect(options).toContain('sonarjs')

    expect(options).toContain('playwright')
  })

  it('should have all SettingOption values', () => {
    const options = Object.values(SettingOption)

    expect(options).toContain('gitignore')

    expect(options).toContain('no-gitignore')
  })
})
