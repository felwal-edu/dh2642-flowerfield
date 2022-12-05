import { createApp } from 'vue'
import App from './components/views/app.js'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'

loadFonts()


const app = createApp(App).use(router)

app.use(createPinia()).use(router).use(vuetify);

app.mount("#app");
