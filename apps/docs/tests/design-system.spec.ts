import { expect, test } from '@playwright/test'

const representativeRoutes = [
  '/',
  '/guide/installation/',
  '/frameworks/react/',
  '/packages/basic/',
  '/tooling/testing/',
  '/api/',
  '/v1/guide/getting-started/',
  '/v2/guide/getting-started/'
] as const

test.describe('Shared documentation design system', () => {
  for (const colorScheme of ['light', 'dark'] as const) {
    for (const route of representativeRoutes) {
      test(`${colorScheme} ${route} remains readable on a narrow phone`, async ({ page }) => {
        const errors: string[] = []

        page.on('pageerror', error => errors.push(error.message))

        await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' })

        await page.setViewportSize({ height: 740, width: 320 })

        const response = await page.goto(route)

        expect(response?.status()).toBe(200)

        await expect(page.locator('main h1')).toBeVisible()

        await expect(page.locator('main h1')).toHaveCount(1)

        const layout = await page.evaluate(() => ({
          documentWidth: document.documentElement.scrollWidth,
          headingOpacity: getComputedStyle(document.querySelector('main h1') ?? document.body).opacity,
          viewportWidth: document.documentElement.clientWidth
        }))

        expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth)

        expect(layout.headingOpacity).toBe('1')

        expect(errors).toEqual([])
      })
    }
  }

  test('mobile sidebar opens with the keyboard and retains the active article', async ({ page }) => {
    await page.setViewportSize({ height: 740, width: 320 })

    await page.goto('/guide/getting-started/')

    const menu = page.getByRole('button', { name: 'Menu', exact: true })
    const sidebar = page.locator('#starlight__sidebar')

    await expect(menu).toBeVisible()

    await menu.focus()

    await page.keyboard.press('Enter')

    await expect(sidebar).toBeVisible()

    await expect(sidebar.locator('a[aria-current="page"]')).toHaveAttribute('href', '/guide/getting-started/')

    await page.keyboard.press('Escape')

    await expect(sidebar).toBeHidden()

    await expect(menu).toBeFocused()
  })

  test('native document navigation preserves appearance and initializes code tabs', async ({ page }) => {
    await page.goto('/')

    await page.locator('.s2k-docs-dock [data-ui-theme-toggle]').click()

    await page.getByRole('link', { name: 'Start with the guide', exact: true }).click()

    await expect(page).toHaveURL(/\/guide\/getting-started\/?$/u)

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')

    await expect(page.locator('#s2k-version-switcher select')).toHaveCount(1)

    const tabs = page.locator('.ui-code-tabs').first()
    const firstTab = tabs.getByRole('tab').first()
    const secondTab = tabs.getByRole('tab').nth(1)

    await firstTab.focus()

    await page.keyboard.press('ArrowRight')

    await expect(secondTab).toBeFocused()

    await expect(secondTab).toHaveAttribute('aria-selected', 'true')

    await expect(tabs.locator('[role="tabpanel"]:not([hidden])')).toHaveCount(1)

    await page.goBack()

    await expect(page).toHaveURL(/\/$/u)

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')

    await expect(page.locator('#s2k-version-switcher select')).toHaveCount(1)
  })

  test('version navigation keeps the matching archive route and sidebar', async ({ page }) => {
    await page.goto('/guide/getting-started/')

    await page.locator('#s2k-version-switcher select').selectOption('v2')

    await expect(page).toHaveURL(/\/v2\/guide\/getting-started\/?$/u)

    await expect(page.locator('html')).toHaveAttribute('data-docs-version', 'v2')

    await expect(page.locator('#s2k-version-switcher select')).toHaveValue('v2')

    await page.locator('#s2k-version-switcher select').selectOption('v3')

    await expect(page).toHaveURL(/\/guide\/getting-started\/?$/u)

    await expect(page.locator('html')).toHaveAttribute('data-docs-version', 'v3')

    await expect(page.locator('#s2k-version-switcher select')).toHaveValue('v3')
  })

  test('reduced motion keeps decorative content visible and controls still', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })

    await page.goto('/')

    await expect(page.locator('#s2k-version-switcher')).toHaveCSS('opacity', '1')

    await expect(page.locator('#s2k-version-switcher')).toHaveCSS('animation-name', 'none')

    await expect(page.locator('#s2k-version-switcher')).toHaveCSS('transform', 'none')

    await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto')

    const card = page.locator('.s2k-home-row').first()

    await card.hover()

    await expect(card).toHaveCSS('transform', 'none')

    const reveals = page.locator('[data-ui-scroll-reveal], [data-ui-reveal-group]')

    for (const reveal of await reveals.all()) {
      await expect(reveal).toHaveCSS('opacity', '1')
    }
  })
})

for (const colorScheme of ['light', 'dark'] as const) {
  test(`split navigation keeps ${colorScheme} controls separate from the brand`, async ({ page }) => {
    await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' })

    for (const width of [320, 390, 800, 1440]) {
      await page.setViewportSize({ height: 900, width })

      await page.goto('/guide/installation/')

      const controls = page.locator('.s2k-docs-dock__controls')
      const search = controls.locator('button[data-open-modal]')
      const brandRight = await page.locator('.s2k-docs-dock .site-title').evaluate(element => element.getBoundingClientRect().right)

      const controlsBox = await controls.evaluate(element => {
        const { left, right } = element.getBoundingClientRect()

        return { left, right }
      })

      expect(brandRight).toBeLessThan(controlsBox.left)

      expect(controlsBox.right).toBeLessThanOrEqual(width)

      await search.focus()

      await page.keyboard.press('Enter')

      await expect(page.getByRole('dialog', { name: 'Search' })).toBeVisible()

      await page.keyboard.press('Escape')

      await expect(search).toBeFocused()
    }
  })

  test(`mobile ${colorScheme} search and menu do not overlap`, async ({ page }) => {
    await page.emulateMedia({ colorScheme })

    for (const width of [320, 390]) {
      await page.setViewportSize({ height: 900, width })

      await page.goto('/guide/installation/')

      const menuBox = await page.locator('.sl-menu-button').evaluate(element => {
        const { left, right } = element.getBoundingClientRect()

        return { left, right }
      })

      const controlsRight = await page.locator('.s2k-docs-dock__controls').evaluate(element => element.getBoundingClientRect().right)
      const searchRight = await page.locator('button[data-open-modal]').evaluate(element => element.getBoundingClientRect().right)

      expect(searchRight).toBeLessThanOrEqual(menuBox.left)

      expect(menuBox.right).toBeLessThanOrEqual(controlsRight)
    }
  })

  test(`desktop ${colorScheme} cluster contains version and theme controls`, async ({ page }) => {
    await page.emulateMedia({ colorScheme })

    await page.goto('/guide/installation/')

    const controls = page.locator('.s2k-docs-dock__controls')

    await expect(controls.locator('#s2k-version-switcher select')).toBeVisible()

    await expect(controls.locator('[data-ui-theme-toggle]')).toBeVisible()
  })
}

for (const route of ['/guide/cli/', '/tooling/overview/']) {
  test(`code blocks on ${route} support keyboard scrolling`, async ({ page }) => {
    await page.setViewportSize({ height: 900, width: 320 })

    await page.emulateMedia({ reducedMotion: 'reduce' })

    await page.goto(route)

    await page.evaluate(async () => document.fonts.ready)

    const blocks = page.locator('.expressive-code pre')

    const overflow = await blocks.evaluateAll(elements => elements
      .map((element, index) => ({ index, overflows: element.scrollWidth > element.clientWidth }))
      .filter(item => item.overflows)
      .map(item => item.index))

    const firstOverflow = overflow.at(0) ?? -1

    expect(firstOverflow).toBeGreaterThanOrEqual(0)

    for (const index of overflow) {
      await expect(blocks.nth(index)).toHaveAttribute('tabindex', '0')
    }

    const scrollable = blocks.nth(firstOverflow)

    await scrollable.focus()

    await expect(scrollable).toBeFocused()

    await page.keyboard.press('ArrowRight')

    await expect.poll(() => scrollable.evaluate(element => element.scrollLeft)).toBeGreaterThan(0)
  })
}
