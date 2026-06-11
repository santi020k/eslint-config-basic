import type { BaseSchema, CollectionConfig } from 'astro/content/config'
import { defineCollection } from 'astro:content'

import { docsLoader } from '@astrojs/starlight/loaders'
import { docsSchema } from '@astrojs/starlight/schema'

export const collections: Record<string, CollectionConfig<BaseSchema>> = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema()
  })
}
