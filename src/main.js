import { createApp } from "vue";
import "uno.css";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";
import { pinia } from "./stores";
import { registerDirectives } from "./directives";

import "./assets/css/main.scss";
import "./utils/addEvent";

// userStore.login()

const app = createApp(App);

app.use(pinia.use(piniaPluginPersistedstate));
app.use(router);
registerDirectives(app);

app.mount("#app");
