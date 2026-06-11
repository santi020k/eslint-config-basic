import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { expectNoUnexpectedAccessibilityViolations } from './helpers/accessibility.js'

import { test } from '@playwright/test'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/* eslint-disable security/detect-non-literal-fs-filename */

const getDocUrls = (dir: string, baseDir = dir): string[] => {
  const urls: string[] = []
  if (!fs.existsSync(dir)) {
    return urls
  }
  const files = fs.readdirSync(dir, { withFileTypes: true })
  for (const file of files) {
    const res = path.resolve(dir, file.name)
    if (file.isDirectory()) {
      urls.push(...getDocUrls(res, baseDir))
    } else if (file.name.endsWith('.md') || file.name.endsWith('.mdx')) {
      const relativePath = path.relative(baseDir, res)
      // Remove file extension
      const withoutExt = relativePath.replace(/\.(md|mdx)$/, '')
      
      // Convert to URL path format (using forward slashes, lowercase)
      let urlPath = '/' + withoutExt.split(path.sep).join('/').toLowerCase()
      
      // If it ends with /index, map to the directory itself
      if (urlPath === '/index') {
        urlPath = '/'
      } else if (urlPath.endsWith('/index')) {
        urlPath = urlPath.slice(0, -5) // keep trailing slash
      } else {
        urlPath = urlPath + '/'
      }
      
      urls.push(urlPath)
    }
  }
  return urls
}

const docsDir = path.resolve(__dirname, '../src/content/docs')
const urls = getDocUrls(docsDir).sort()

test.describe('Accessibility', () => {
  for (const url of urls) {
    test(`page ${url} should have no accessibility violations`, async ({ page }) => {
      await page.goto(url)
      await page.waitForLoadState('networkidle')
      await expectNoUnexpectedAccessibilityViolations(page, [
        {
          htmlIncludes: 'role="region"',
          id: 'landmark-unique'
        }
      ])
    })
  }
})
