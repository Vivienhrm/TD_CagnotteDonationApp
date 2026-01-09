import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import apiPlugin from './plugins/api'
import toolsPlugin from './plugins/tools'

const app = createApp(App)

app.use(router)

// Restoring plugins required for the TD
app.use(apiPlugin, {
    baseURL: 'https://donations.edu.netlor.fr',
    apiKey: 'eiIiqcFzzt_K'
})

app.use(toolsPlugin, {
    cutTextLength: 40
})

app.mount('#app')
