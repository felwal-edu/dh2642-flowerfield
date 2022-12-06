import { createApp } from 'vue';
import App from './components/views/app.js';
import router from './router';
import { vuetify } from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import { createPinia } from 'pinia';
import useFlowerStore from './data/flowerStore.js';

loadFonts()

const app = createApp(App)
  .use(router)
  .use(createPinia())
  .use(vuetify);

app.mount("#app");

useFlowerStore().initUser();
