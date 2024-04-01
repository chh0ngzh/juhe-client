import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/qa/why",
    name: "Why",
    component: () => import("@/views/Why.vue"),
  },
  {
    path: "/setting",
    name: "Setting",
    component: () => import("@/views/Setting.vue"),
  },
  {
    path: "/firstuse",
    name: "FirstUse",
    component: () => import("@/views/FirstUse.vue"),
  },
  {
    path: "/error/server",
    name: "ServerError",
    component: () => import("@/views/ServerError.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
