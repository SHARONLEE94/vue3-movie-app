import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./Home.vue";
import About from "./About.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/about",
      component: About,
    },
  ],
});
