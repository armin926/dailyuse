import type { App } from 'vue'
import Breadcrumb from './Breadcrumb.vue'

Breadcrumb.install = (app: App): void => {
  app.component(Breadcrumb.__name as string, Breadcrumb)
}

export default Breadcrumb
