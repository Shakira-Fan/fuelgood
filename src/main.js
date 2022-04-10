import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";

import Vue3Lottie from "vue3-lottie";

import VueTheMask from "vue-the-mask";

import "./assets/main.css";
import "./plugins/chart.js";
import "vue3-lottie/dist/style.css";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .use(Vue3Lottie)
  .use(VueTheMask)
  .use(VueSweetalert2)
  .mount("#app");
