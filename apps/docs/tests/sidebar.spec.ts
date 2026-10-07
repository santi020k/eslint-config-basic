import { expect, type Page, test } from '@playwright/test'

import { expectNoUnexpectedAccessibilityViolations } from './helpers/accessibility.js'

const openMobileMenu = async (page: Page, width: number) => {
  if (width < 800) {
    await page.getByRole('button', { name: 'Menu', exact: true }).press('Enter')
  }
}

for (const width of [320, 1440]) {
  for (const theme of ['light', 'dark'] as const) {
    test(`${width}px ${theme} sidebar supports disclosure and article navigation`, async ({ page }) => {
      await page.setViewportSize({ height: 900, width })

      await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' })

      await page.goto('/frameworks/astro/')

      await openMobileMenu(page, width)

      const sidebar = page.locator('.sidebar-content')
      const group = sidebar.locator('details').filter({ has: page.locator('summary', { hasText: /^Frameworks$/u }) }).filter({ has: page.locator('a[aria-current="page"]') }).last()
      const summary = group.locator('summary')
      const active = sidebar.locator('a[aria-current="page"]')

      await expect(active).toHaveAttribute('href', '/frameworks/astro/')

      await summary.press('Enter')

      await expect(group).not.toHaveAttribute('open')

      await expect(active).toBeHidden()

      await summary.press('Enter')

      await expect(active).toBeVisible()

      const links = await group.locator('a').evaluateAll(elements => elements.map(element => {
        const rect = element.getBoundingClientRect()

        return { height: rect.height, left: rect.left, right: rect.right }
      }))

      for (const link of links) {
        expect(link.height).toBeGreaterThanOrEqual(width < 800 ? 44 : 36)

        expect(link.left).toBeGreaterThanOrEqual(0)

        expect(link.right).toBeLessThanOrEqual(width)
      }

      await expectNoUnexpectedAccessibilityViolations(page)

      await sidebar.getByRole('link', { name: 'TypeScript Core', exact: true }).press('Enter')

      await expect(page).toHaveURL(/\/frameworks\/typescript\/$/u)

      await openMobileMenu(page, width)

      await expect(sidebar.locator('a[aria-current="page"]')).toContainText('TypeScript')

      await expectNoUnexpectedAccessibilityViolations(page)
    })
  }
}
