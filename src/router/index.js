import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress";

const routes = [
  {
    path: "/",
    component: () => import("@views/Home.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach(() => {
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});
export default router;
