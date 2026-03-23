import { describe, expect, it } from 'vitest'

import { Extension, Format, Library, Setting, Testing, Tool } from '@santi020k/eslint-config-basic'

describe('Type Exports', () => {
  it('should have all Library values', () => {
    const options = Object.values(Library)

    expect(options).toContain('tailwind')

    expect(options).toContain('i18next')

    expect(options).toContain('stencil')

    expect(options).toContain('tanstack-query')

    expect(options).toContain('tanstack-router')

    expect(options).toContain('storybook')
  })

  it('should have all Tool values', () => {
    const options = Object.values(Tool)

    expect(options).toContain('cspell')

    expect(options).toContain('prettier')

    expect(options).toContain('jsdoc')

    expect(options).toContain('swagger')
  })

  it('should have all Testing values', () => {
    const options = Object.values(Testing)

    expect(options).toContain('vitest')

    expect(options).toContain('playwright')
  })

  it('should have all Format values', () => {
    const options = Object.values(Format)

    expect(options).toContain('mdx')

    expect(options).toContain('markdown')

    expect(options).toContain('jsonc')

    expect(options).toContain('yaml')

    expect(options).toContain('toml')
  })

  it('should have all Extension values', () => {
    const options = Object.values(Extension)

    expect(options).toContain('regexp')

    expect(options).toContain('unicorn')

    expect(options).toContain('sonarjs')

    expect(options).toContain('security')

    expect(options).toContain('perfectionist')
  })

  it('should have all Setting values', () => {
    const options = Object.values(Setting)

    expect(options).toContain('gitignore')

    expect(options).toContain('no-gitignore')
  })
})
