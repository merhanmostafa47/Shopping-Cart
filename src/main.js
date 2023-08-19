import { createApp } from 'vue'

import store from './store'
import App from './App.vue'
// import currency from './currency'

const app = createApp(App)
// app.filter('currency', currency)

app.use(store)
app.mount('#app')
