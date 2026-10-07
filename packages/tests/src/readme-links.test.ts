import { describe, expect, test } from 'vitest'

import { resolvePublishedReadmeLinks } from '../../../scripts/readme-links.mjs'

describe('published README links', () => {
  test('resolves repository images, dark-mode sources, support guides, and licenses', () => {
    const published = resolvePublishedReadmeLinks(
      '<img src="assets/readme/hero-light.svg"><source srcset="assets/readme/hero-dark.svg">' +
      '<a href="LICENSE">License</a> [MIT](LICENSE) [Help](.github/CONTRIBUTING.md)'
    )

    expect(published).toContain('src="https://raw.githubusercontent.com/santi020k/eslint-config-basic/main/assets/readme/hero-light.svg"')
    expect(published).toContain('srcset="https://raw.githubusercontent.com/santi020k/eslint-config-basic/main/assets/readme/hero-dark.svg"')
    expect(published).toContain('href="https://github.com/santi020k/eslint-config-basic/blob/main/LICENSE"')
    expect(published).toContain('[MIT](https://github.com/santi020k/eslint-config-basic/blob/main/LICENSE)')
    expect(published).toContain('[Help](https://github.com/santi020k/eslint-config-basic/blob/main/.github/CONTRIBUTING.md)')
  })

  test('preserves external links, section anchors, and example code', () => {
    const content = '[Docs](https://eslint.santi020k.com/) [Start](#quick-start) import { defineConfig }'

    expect(resolvePublishedReadmeLinks(content)).toBe(content)
  })

  test('is idempotent', () => {
    const published = resolvePublishedReadmeLinks('<img src="assets/readme/hero-light.svg"> [MIT](LICENSE)')

    expect(resolvePublishedReadmeLinks(published)).toBe(published)
  })
})
