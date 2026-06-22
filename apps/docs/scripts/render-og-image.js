/**
 * Satori-based OG card renderer for eslint-config-basic docs.
 * Design mirrors the astro-doctor docs card: dark gradient, favicon in header,
 * purple accent, title + optional description in the body.
 */

import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'
import * as satoriHtml from 'satori-html'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
// ─── Assets ──────────────────────────────────────────────────────────────────
const faviconSvg = readFileSync(path.join(ROOT, 'public', 'favicon.svg'))

const iconBuf = await sharp(faviconSvg)
  .resize(72, 72, { background: { alpha: 0, b: 0, g: 0, r: 0 }, fit: 'contain' })
  .png()
  .toBuffer()

const ICON_URI = `data:image/png;base64,${iconBuf.toString('base64')}`

// ─── Fonts ───────────────────────────────────────────────────────────────────

const FONTS = [
  {
    data: readFileSync(path.join(ROOT, 'public', 'fonts', 'Montserrat-Regular.ttf')),
    name: 'Montserrat',
    style: 'normal',
    weight: 400
  },
  {
    data: readFileSync(path.join(ROOT, 'public', 'fonts', 'Montserrat-ExtraBold.ttf')),
    name: 'Montserrat',
    style: 'normal',
    weight: 900
  }
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

const escape = s => s
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll('\'', '&#39;')

const truncate = (s, max = 130) => s.length > max ? `${s.slice(0, max - 1).trimEnd()}…` : s

const titleFontSize = title => {
  if (title.length <= 22) return 88

  if (title.length <= 40) return 74

  if (title.length <= 58) return 60

  return 48
}

// ─── Card template ────────────────────────────────────────────────────────────

const S = {
  card: 'display:flex;width:1200px;height:630px;flex-direction:column;' +
    'background:linear-gradient(135deg,#0d0d14 0%,#120d1e 100%);font-family:\'Montserrat\',sans-serif;',
  accentBar: 'display:flex;width:1200px;height:3px;flex-shrink:0;' +
    'background:linear-gradient(90deg,#6319be 0%,#945df4 100%);',
  content: 'display:flex;flex:1;flex-direction:column;padding:52px 64px;',
  header: 'display:flex;align-items:center;justify-content:space-between;',
  logoGroup: 'display:flex;align-items:center;gap:16px;',
  logoText: 'display:flex;flex-direction:column;gap:4px;',
  logoName: 'display:flex;font-size:22px;font-weight:600;color:#a78bfa;letter-spacing:1px;',
  logoDomain: 'display:flex;font-size:14px;color:#4b5563;letter-spacing:0.4px;',
  badge: 'display:flex;align-items:center;padding:12px 24px;border-radius:999px;' +
    'background:linear-gradient(135deg,#6319be,#945df4);',
  badgeText: 'display:flex;font-size:16px;font-weight:700;color:#fff;' +
    'letter-spacing:0.14em;text-transform:uppercase;',
  body: 'display:flex;flex-direction:column;flex:1;justify-content:center;gap:22px;',
  accentLine: 'display:flex;width:80px;height:3px;border-radius:999px;' +
    'background:linear-gradient(90deg,#6319be,#945df4);',
  desc: 'display:flex;margin:0;font-size:22px;line-height:1.55;color:#94a3b8;max-width:900px;'
}

const renderCard = ({ description, section, title }) => {
  const size = titleFontSize(title)

  const h1Style = `display:flex;margin:0;font-size:${size}px;font-weight:900;` +
    'line-height:1.08;letter-spacing:-0.03em;color:#fff;max-width:1050px;'

  const descHtml = description ?
    `<p style="${S.desc}">${escape(truncate(description))}</p>` :
    ''

  return `
    <div style="${S.card}">

      <!-- Top accent bar -->
      <div style="${S.accentBar}"></div>

      <!-- Content -->
      <div style="${S.content}">

        <!-- Header: icon + name/domain left, section badge right -->
        <div style="${S.header}">
          <div style="${S.logoGroup}">
            <img src="${ICON_URI}" style="display:flex;width:72px;height:72px;" />
            <div style="${S.logoText}">
              <span style="${S.logoName}">eslint-config-basic</span>
              <span style="${S.logoDomain}">eslint.santi020k.com</span>
            </div>
          </div>
          <div style="${S.badge}">
            <span style="${S.badgeText}">${escape(section)}</span>
          </div>
        </div>

        <!-- Body: accent line + title + description -->
        <div style="${S.body}">
          <div style="${S.accentLine}"></div>
          <h1 style="${h1Style}">${escape(title)}</h1>
          ${descHtml}
        </div>

      </div>
    </div>
  `
}

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * @param {{ title: string, description?: string, section: string }} props
 * @returns {Promise<Buffer>}
 */
export const renderOgImage = async props => {
  const html = renderCard(props).trim()
  const markup = /** @type {Parameters<typeof satori>[0]} */ (satoriHtml.html(html))
  const svg = await satori(markup, { fonts: FONTS, height: 630, width: 1200 })
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng()

  return sharp(png).webp({ effort: 0, quality: 82 }).toBuffer()
}
