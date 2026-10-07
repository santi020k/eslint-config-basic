import { defineCollection } from 'astro:content'

import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders'
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema'
import type { BaseSchema, CollectionConfig } from 'astro/content/config'

export const collections: Record<string, CollectionConfig<BaseSchema>> = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema()
  }),
  i18n: defineCollection({
    loader: i18nLoader(),
    schema: i18nSchema()
  })
}
