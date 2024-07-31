import { defineClientConfig } from 'vuepress/client'
import homePage from './components/homePage.vue'
export default defineClientConfig({
  enhance({ app }) {
    app.component('homePage', homePage)
  },
  setup() {},
  rootComponents: [],
})