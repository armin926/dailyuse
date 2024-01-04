import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import DailyUI from '../dist/vue-daily-use.js'
// import '../dist/style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(DailyUI)

app.mount('#app')
