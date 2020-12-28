import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/reset.css";
import Vconsole from "vconsole";
process.env.NODE_ENV === "development" && new Vconsole();
createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
