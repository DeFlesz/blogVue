import { createApp, markRaw } from 'vue'
import { createPinia } from "pinia";

import App from './App.vue'
import router from "./router";

import './assets/main.css'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const pinia = createPinia()
const app = createApp(App)
const query = '(prefers-color-scheme: dark)'


function updateTheme() {
    const theme = window.matchMedia(query).matches ? 'dark' : 'light'
    document.querySelector('html').setAttribute('data-bs-theme', theme)
}

updateTheme();

window.matchMedia(query).addEventListener('change', () => {
    updateTheme();
})

pinia.use(({store}) => {
    store.$router = markRaw(router)
})
app.use(router)
app.use(pinia)
app.mount('#app')

// createApp(App).mount('#app')
