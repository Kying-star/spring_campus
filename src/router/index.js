import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@views/Home.vue"),
  },
  {
    path: "/block",
    component: () => import("@views/BlockSelect.vue"),
  },
  {
    path: "/roll",
    component: () => import("@views/RollList.vue"),
  },
  {
    path: "/game",
    component: () => import("@views/Game.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
