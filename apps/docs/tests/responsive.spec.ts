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
})
