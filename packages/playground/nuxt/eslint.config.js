// @ts-check
import { defineConfig } from '@santi020k/eslint-config-basic'
import nuxt from '@santi020k/eslint-config-nuxt'
import vue from '@santi020k/eslint-config-vue'

export default defineConfig({ frameworks: { nuxt, vue }, runtime: 'universal' })
