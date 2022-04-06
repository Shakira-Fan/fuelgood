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

// import LottieAnimation from "lottie-web-vue";

createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .use(Vue3Lottie)
  // .use(LottieAnimation)
  .mount("#app");
