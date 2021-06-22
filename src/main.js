/*
 * @Author: your name
 * @Date: 2020-12-29 17:12:32
 * @LastEditTime: 2021-06-22 20:57:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nineteenth-committee-fe/src/main.js
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/reset.css";
import Vconsole from "vconsole";
new Vconsole();
createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
