import { createApp } from 'vue'
import naive from 'naive-ui'
import App from './App.vue'
import routes from './routes'

createApp(App)
.use(naive)
.use(routes)
.mount('#app')
