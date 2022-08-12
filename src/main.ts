import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";
import { createApp } from "vue";
import App from "./App.vue";

import "./assets/scss/main.scss";

createApp(App).use(FloatingVue).mount("#app");
