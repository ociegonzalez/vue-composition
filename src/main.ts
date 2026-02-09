import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './config/yup'

import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)
app.use(Toast)

app.mount('#app')
