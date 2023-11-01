import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./Home.vue";
import Movie from "./Movie.vue";
import About from "./About.vue";
import NotFound from "./NotFound.vue"

export default createRouter({
  history: createWebHashHistory(),
  scrollBehavior(){ // 페이지가 달라졌을 때, 스크롤을 최상단으로 초기화 시켜주는 옵션
    return{ top : 0 }
  },
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/movie/:id",
      component: Movie,
    },
    {
      path: "/about",
      component: About,
    },
    {
      path: "/:notFound(.*)",
      component: NotFound
    },
  ],
});
