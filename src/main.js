import App from "./views/app";
import { createApp } from "vue";
import router from "./router";
import { vuetify } from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createPinia } from "pinia";
import { setUpFirebase } from "./persistence/firebaseModel";

loadFonts();

const app = createApp(App)
  .use(createPinia())
  .use(router)
  .use(vuetify);

app.mount("#app");

setUpFirebase();
