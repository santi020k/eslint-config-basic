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

      await input.fill('installation')

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

      await expect(dialog.locator('.pagefind-ui__message')).toContainText(/no results/iu)

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
