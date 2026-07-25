import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { expect, type Page, test } from '@playwright/test'

import { getDocUrls } from './helpers/docs.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const docsDir = path.resolve(__dirname, '../src/content/docs')
const urls = getDocUrls(docsDir).sort()

const auditLayout = async (page: Page) => page.evaluate(() => {
  const codeTabs = [...document.querySelectorAll<HTMLElement>('[data-ui-tabs]')]
    .map(root => ({
      selectedTabs: root.querySelectorAll('[role="tab"][aria-selected="true"]').length,
      visiblePanels: [...root.querySelectorAll<HTMLElement>('[role="tabpanel"]')]
        .filter(panel => !panel.hidden)
        .length
    }))

  return {
    codeTabs,
    documentWidth: document.documentElement.scrollWidth,
    headingCount: document.querySelectorAll('main h1').length,
    viewportWidth: document.documentElement.clientWidth
  }
})

test.describe('Responsive page health', () => {
  for (const url of urls) {
    test(`page ${url} stays within its viewport`, async ({ page }) => {
      const consoleErrors: string[] = []

      page.on('console', message => {
        if (message.type() === 'error') consoleErrors.push(message.text())
      })

      await page.setViewportSize({ height: 800, width: 1280 })

      const response = await page.goto(url)

      expect(response?.status()).toBeLessThan(400)

      for (const viewport of [
        { height: 800, width: 1280 },
        { height: 844, width: 390 }
      ]) {
        await page.setViewportSize(viewport)

        const layout = await auditLayout(page)

        expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth)

        expect(layout.headingCount).toBe(1)

        for (const tabs of layout.codeTabs) {
          expect(tabs.selectedTabs).toBe(1)

          expect(tabs.visiblePanels).toBe(1)
        }
      }

      expect(consoleErrors).toEqual([])
    })
  }

  test('homepage Lumen primitives retain their intended visual roles', async ({ page }) => {
    await page.setViewportSize({ height: 844, width: 390 })

    await page.goto('/')

    const badge = page.locator('.s2k-quickstart .ui-badge')
    const badgeParent = badge.locator('..')
    const visibleCode = page.locator('.s2k-quickstart [role="tabpanel"]:not([hidden]) code')

    await expect(badge).toBeVisible()

    expect((await badge.boundingBox())?.width).toBeLessThan((await badgeParent.boundingBox())?.width ?? 0)

    await expect(visibleCode).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')

    await expect(visibleCode).toHaveCSS('border-top-width', '0px')
  })

  test('mobile documentation tables scroll without producing oversized rows', async ({ page }) => {
    await page.setViewportSize({ height: 844, width: 390 })

    await page.goto('/guide/installation/')

    const tables = await page.locator('table').evaluateAll(elements => elements.map(element => {
      const table = element as HTMLTableElement

      return {
        clientWidth: table.clientWidth,
        maximumRowHeight: Math.max(...[...table.rows].map(row => row.getBoundingClientRect().height)),
        scrollWidth: table.scrollWidth
      }
    }))

    expect(tables.length).toBeGreaterThan(0)

    for (const table of tables) {
      expect(table.clientWidth).toBeLessThanOrEqual(358)

      expect(table.maximumRowHeight).toBeLessThan(250)

      expect(table.scrollWidth).toBeGreaterThanOrEqual(table.clientWidth)
    }
  })

  test('CodeTabs keep their compact Lumen layout inside Starlight content', async ({ page }) => {
    await page.setViewportSize({ height: 800, width: 1280 })

    await page.goto('/frameworks/react/')

    const codeTabs = page.locator('.ui-code-tabs').first()
    const visiblePanel = codeTabs.locator('[role="tabpanel"]:not([hidden])')
    const copyButton = visiblePanel.getByRole('button', { name: 'Copy code to clipboard' })

    await expect(codeTabs).toHaveClass(/not-content/)

    expect((await codeTabs.boundingBox())?.height).toBeLessThan(130)

    await expect(visiblePanel.locator('pre')).toHaveCSS('margin-top', '0px')

    expect((await copyButton.boundingBox())?.width).toBeLessThan(32)

    await expect(copyButton.locator('.ui-code__copy-icon')).toBeVisible()

    await expect(copyButton.locator('.ui-code__check-icon')).toBeHidden()
  })
})
