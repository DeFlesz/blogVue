import { createApp, markRaw } from 'vue'
import { createPinia } from "pinia";

import App from './App.vue'
import router from "./router";

import './assets/main.css'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const pinia = createPinia()
const app = createApp(App)

pinia.use(({store}) => {
    store.$router = markRaw(router)
})
app.use(router)
app.use(pinia)
app.mount('#app')

// createApp(App).mount('#app')
