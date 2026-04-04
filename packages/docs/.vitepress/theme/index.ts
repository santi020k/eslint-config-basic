import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import HomePageSections from './components/HomePageSections.vue'
import Layout from './Layout.vue'

import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('HomePageSections', HomePageSections)
  }
} satisfies Theme
