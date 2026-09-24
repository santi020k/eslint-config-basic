import { defineAuditConfig } from '@santi020k/og/audit/config'
import { standardAuditRules } from '@santi020k/og/audit/rules'

export default defineAuditConfig({
  directory: 'dist',
  manifest: 'public/og/manifest.json',
  requireUniqueTitles: false,
  siteUrl: 'https://eslint.santi020k.com',
  ...standardAuditRules({ sitemap: { reportOrphans: true } })
})
