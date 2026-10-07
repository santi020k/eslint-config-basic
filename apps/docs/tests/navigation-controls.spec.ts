import { expect, test } from '@playwright/test'

import { expectNoUnexpectedAccessibilityViolations } from './helpers/accessibility.js'

for (const width of [320, 1440]) {
  for (const { theme, nextTheme } of [{ theme: 'light', nextTheme: 'dark' }, { theme: 'dark', nextTheme: 'light' }] as const) {
    test(`${width}px ${theme} search and theme controls remain usable`, async ({ page }) => {
      await page.setViewportSize({ height: 900, width })

      await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' })

      await page.goto('/guide/installation/')

      const toggle = page.locator('.s2k-docs-dock [data-ui-theme-toggle]')

      await expect(toggle).toBeVisible()

      await expect(page.locator('html')).toHaveAttribute('data-theme', theme)

      await toggle.focus()

      await page.keyboard.press('Enter')

      await expect(page.locator('html')).toHaveAttribute('data-theme', nextTheme)

      await expect(toggle).toHaveAttribute('aria-pressed', String(nextTheme === 'dark'))

      await page.reload()

      await expect(page.locator('html')).toHaveAttribute('data-theme', nextTheme)

      await page.keyboard.press('Control+k')

      const dialog = page.getByRole('dialog', { name: 'Search' })
      const input = dialog.locator('.pagefind-ui__search-input')

      await expect(dialog).toBeVisible()

      await expect(input).toBeFocused()

      const hint = dialog.locator('.s2k-search-hint')

      await expect(hint).toBeVisible()

      await expect(input).toHaveAttribute('aria-describedby', 's2k-search-hint')

      await input.fill('installation')

      await expect(hint).toBeHidden()

      await expect(dialog.locator('.pagefind-ui__result').first()).toBeVisible()

      await expectNoUnexpectedAccessibilityViolations(page)

      const bounds = await dialog.evaluate(element => {
        const { left, right, top, bottom } = element.getBoundingClientRect()

        return { bottom, left, right, top }
      })

      expect(bounds.left).toBeGreaterThanOrEqual(0)

      expect(bounds.right).toBeLessThanOrEqual(width)

      expect(bounds.top).toBeGreaterThanOrEqual(0)

      expect(bounds.bottom).toBeLessThanOrEqual(900)

      await input.fill('x'.repeat(80))

      await expect(dialog.locator('.pagefind-ui__message')).toHaveText('No results found. Try a shorter term or a framework name.')

      await expect(hint).toBeHidden()

      await dialog.locator('.pagefind-ui__search-clear').click()

      await expect(hint).toBeVisible()

      await page.keyboard.press('Escape')

      await expect(dialog).toBeHidden()
    })
  }
}

test('theme follows system appearance until an explicit choice is saved', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' })

  await page.goto('/')

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')

  await page.emulateMedia({ colorScheme: 'dark' })

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')

  await page.locator('.s2k-docs-dock [data-ui-theme-toggle]').click()

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')

  await page.emulateMedia({ colorScheme: 'light' })

  await page.emulateMedia({ colorScheme: 'dark' })

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
})

test('GitHub mark is visible inside an accessible repository link', async ({ page }) => {
  await page.goto('/')

  const github = page.getByRole('link', { name: 'GitHub repository', exact: true })

  await expect(github).toHaveAttribute('href', 'https://github.com/santi020k/eslint-config-basic')

  await expect(github).toHaveAttribute('rel', 'noreferrer noopener')

  await expect(github.locator('svg')).toBeVisible()

  await github.focus()

  await expect(github).toBeFocused()
})

for (const theme of ['light', 'dark'] as const) {
  test(`${theme} utility buttons share a quiet hover without movement`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: theme })

    await page.goto('/')

    const states = []

    for (const selector of ['.s2k-nav-github', '.s2k-docs-dock .s2k-nav-theme']) {
      const control = page.locator(selector)

      await control.hover()

      await expect(control).toHaveCSS('transform', 'none')

      states.push(await control.evaluate(async element => {
        await Promise.all(element.getAnimations().map(animation => animation.finished))

        const style = getComputedStyle(element)

        return { background: style.backgroundColor, color: style.color, transition: style.transition }
      }))
    }

    expect(states[0]).toEqual(states[1])
  })
}
