import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes/index.js";
// = import router from "./routes"; --> index 이름은 생략이 가능
import store from "./store/index.js";
// = import store from "./store";
import loadImage from "./plugins/loadImage";

createApp(App)
    .use(store) // $store
    .use(router) // $router, $route
    .use(loadImage) //$loadImage
    .mount("#app");
