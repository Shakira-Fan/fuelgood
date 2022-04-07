import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import "./assets/main.css";
import "./plugins/chart.js";

import Vue3Lottie from "vue3-lottie";
import "vue3-lottie/dist/style.css";
import VueTheMask from "vue-the-mask";

createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .use(Vue3Lottie)
  .use(VueTheMask)
  .mount("#app");
