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

const truncate = (s, max = 130) => s.length > max ? `${s.slice(0, max - 1).trimEnd()}…` : s

const titleFontSize = title => {
  if (title.length <= 22) return 88

  if (title.length <= 40) return 74

  if (title.length <= 58) return 60

  return 48
}

// ─── Card template ────────────────────────────────────────────────────────────

const S = {
  accentBar: {
    backgroundImage: 'linear-gradient(90deg,#6319be 0%,#945df4 100%)',
    display: 'flex',
    flexShrink: 0,
    height: 3,
    width: 1200
  },
  accentLine: {
    backgroundImage: 'linear-gradient(90deg,#6319be,#945df4)',
    borderRadius: 999,
    display: 'flex',
    height: 3,
    width: 80
  },
  badge: {
    alignItems: 'center',
    backgroundImage: 'linear-gradient(135deg,#6319be,#945df4)',
    borderRadius: 999,
    display: 'flex',
    padding: '12px 24px'
  },
  badgeText: {
    color: '#fff',
    display: 'flex',
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase'
  },
  body: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: 22,
    justifyContent: 'center'
  },
  card: {
    backgroundImage: 'linear-gradient(135deg,#0d0d14 0%,#120d1e 100%)',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Montserrat, sans-serif',
    height: 630,
    width: 1200
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: '52px 64px'
  },
  description: {
    color: '#94a3b8',
    display: 'flex',
    fontSize: 22,
    lineHeight: 1.55,
    margin: 0,
    maxWidth: 900
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between'
  },
  logo: {
    display: 'flex',
    height: 72,
    width: 72
  },
  logoDomain: {
    color: '#4b5563',
    display: 'flex',
    fontSize: 14,
    letterSpacing: '0.4px'
  },
  logoGroup: {
    alignItems: 'center',
    display: 'flex',
    gap: 16
  },
  logoName: {
    color: '#a78bfa',
    display: 'flex',
    fontSize: 22,
    fontWeight: 600,
    letterSpacing: 1
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4
  }
}

const element = (type, props, ...children) => ({
  props: {
    ...props,
    children: children.length === 1 ? children[0] : children
  },
  type
})

const renderCard = ({ description, section, title }) => {
  const size = titleFontSize(title)

  const titleStyle = {
    color: '#fff',
    display: 'flex',
    fontSize: size,
    fontWeight: 900,
    letterSpacing: '-0.03em',
    lineHeight: 1.08,
    margin: 0,
    maxWidth: 1050
  }

  return element(
    'div', { style: S.card }, element('div', { style: S.accentBar }), element(
      'div', { style: S.content }, element(
        'div', { style: S.header }, element(
          'div', { style: S.logoGroup }, element('img', { src: ICON_URI, style: S.logo }), element(
            'div', { style: S.logoText }, element('span', { style: S.logoName }, 'eslint-config-basic'), element('span', { style: S.logoDomain }, 'eslint.santi020k.com')
          )
        ), element(
          'div', { style: S.badge }, element('span', { style: S.badgeText }, section)
        )
      ), element(
        'div', { style: S.body }, element('div', { style: S.accentLine }), element('h1', { style: titleStyle }, title), ...(description ? [element('p', { style: S.description }, truncate(description))] : [])
      )
    )
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * @param {{ title: string, description?: string, section: string }} props
 * @returns {Promise<Buffer>}
 */
export const renderOgImage = async props => {
  const markup = /** @type {Parameters<typeof satori>[0]} */ (renderCard(props))
  const svg = await satori(markup, { fonts: FONTS, height: 630, width: 1200 })
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng()

  return sharp(png).webp({ effort: 0, quality: 82 }).toBuffer()
}
