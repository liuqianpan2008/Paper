import { createApp } from 'vue'
import naive from 'naive-ui'
import App from './App.vue'
import routes from './routes'
import vueaxios from 'vue-axios'

createApp(App)
.use(naive)
.use(routes)
.use(vueaxios)

.mount('#app')
