import { createApp } from "vue";
import App from "@/App.vue";

// Router
import router from "@/router";

// Axios
import axios from "axios";
import VueAxios from "vue-axios";

// Store
import store from "@/store";

// Dark style
import "element-plus/theme-chalk/dark/css-vars.css";
import "element-plus/dist/index.css";

const app = createApp(App);

app.use(VueAxios, axios);
app.use(router);
app.use(store);

app.provide("axios", app.config.globalProperties.axios);
app.provide("$store", app.config.globalProperties.$store);

app.mount("#app");
