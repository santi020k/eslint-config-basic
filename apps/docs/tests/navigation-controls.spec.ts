import { expect, type Locator, test } from '@playwright/test'

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

const expectCenteredMenuIcon = async (menu: Locator, iconName: string) => {
  const icon = menu.locator(`.${iconName}`)

  await expect(icon).toBeVisible()

  await expect(icon).toHaveCSS('opacity', '1')

  const offset = await icon.evaluate(element => {
    const bounds = element.getBoundingClientRect()
    const buttonBounds = element.closest('button')?.getBoundingClientRect()

    return buttonBounds ?
      {
        x: Math.abs(bounds.x + bounds.width / 2 - buttonBounds.x - buttonBounds.width / 2),
        y: Math.abs(bounds.y + bounds.height / 2 - buttonBounds.y - buttonBounds.height / 2)
      } :
      undefined
  })

  expect(offset?.x).toBeLessThan(1)

  expect(offset?.y).toBeLessThan(1)
}

for (const width of [320, 390, 768]) {
  for (const theme of ['light', 'dark'] as const) {
    test(`${width}px ${theme} menu icons align and keyboard dismissal restores focus`, async ({ page }) => {
      await page.setViewportSize({ height: 844, width })

      await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' })

      await page.goto('/frameworks/astro/')

      const menu = page.getByRole('button', { name: 'Menu', exact: true })
      const sidebar = page.locator('#starlight__sidebar')

      const controls = await page.locator([
        '.s2k-docs-dock button[data-open-modal]',
        '.s2k-docs-dock .s2k-nav-theme',
        '.sl-menu-button'
      ].join(', ')).evaluateAll(elements => elements.map(element => {
        const bounds = element.getBoundingClientRect()

        return {
          height: bounds.height,
          width: bounds.width,
          x: bounds.x + bounds.width / 2,
          y: bounds.y + bounds.height / 2
        }
      }))

      expect(controls).toHaveLength(3)

      for (const control of controls) {
        expect(control.width).toBeGreaterThanOrEqual(44)

        expect(control.height).toBeGreaterThanOrEqual(44)

        expect(Math.abs(control.y - controls[0].y)).toBeLessThan(1)
      }

      expect(Math.abs((controls[2].x - controls[1].x) - (controls[1].x - controls[0].x))).toBeLessThan(1)

      await expectCenteredMenuIcon(menu, 'open-menu')

      await menu.press('Enter')

      await expect(sidebar).toBeVisible()

      await expect(menu.locator('.open-menu')).toHaveCSS('opacity', '0')

      await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')

      await expectCenteredMenuIcon(menu, 'close-menu')

      await expectNoUnexpectedAccessibilityViolations(page)

      await menu.press('Escape')

      await expect(sidebar).toBeHidden()

      await expect(menu).toBeFocused()

      await expect(menu.locator('.open-menu')).toBeVisible()
    })
  }
}

for (const { icons, motion, properties } of [
  { icons: ['opacity', 'transform'], motion: 'no-preference', properties: ['filter', 'opacity', 'transform'] },
  { icons: [], motion: 'reduce', properties: [] }
] as const) {
  test(`${motion} mobile drawer transitions on entry and exit`, async ({ page }) => {
    await page.setViewportSize({ height: 844, width: 390 })

    await page.emulateMedia({ reducedMotion: motion })

    await page.goto('/frameworks/astro/')

    const sidebar = page.locator('#starlight__sidebar')
    const exitProperties = await page.evaluate(expected => CSS.supports('overlay', 'auto') ? expected : [], properties)

    for (const { expected, opacity, state } of [
      { expected: properties, opacity: '1', state: 'open' },
      { expected: exitProperties, opacity: '0', state: 'closed' }
    ]) {
      const transitions = await page.locator('.sl-menu-button').evaluate(async element => {
        const pane = document.querySelector('#starlight__sidebar')

        if (!(element instanceof HTMLButtonElement)) {
          throw new Error('Expected the native mobile menu button')
        }

        element.click()

        await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => {
          resolve()
        })))

        const iconAnimations = element.getAnimations({ subtree: true })

        const paneProperties = (pane?.getAnimations() ?? []).flatMap(animation => {
          if (animation instanceof CSSTransition) return [animation.transitionProperty]

          if (animation.effect instanceof KeyframeEffect) {
            return animation.effect.getKeyframes().flatMap(frame => Object.keys(frame))
          }

          return []
        }).filter(property => ['filter', 'opacity', 'transform'].includes(property))

        return {
          icons: [...new Set(iconAnimations.flatMap(animation => animation instanceof CSSTransition ?
            [animation.transitionProperty].filter(property => ['opacity', 'transform'].includes(property)) :
            []))].sort(),
          pane: [...new Set(paneProperties)].sort()
        }
      })

      expect(transitions.pane, state).toEqual(expected)

      expect(transitions.icons, state).toEqual(icons)

      await expect(sidebar).toHaveCSS('opacity', opacity)
    }

    await expect(sidebar).toBeHidden()

    await page.getByRole('button', { name: 'Menu', exact: true }).press('Enter')

    await expect(sidebar).toHaveCSS('filter', 'none')

    await expect(sidebar).toHaveCSS('transform', 'none')
  })
}
