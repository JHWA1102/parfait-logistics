import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";
import "@/assets/styles/variables.css";
import "@/assets/styles/forms.css";
import "@/assets/styles/scrollbar.css";

const app = createApp(App);

const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);

app.mount("#app");
