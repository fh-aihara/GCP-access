import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

import LoginView from "../views/LoginPage.vue";
import QueryView from "../views/Query";

const routes = [
  {
    path: "/query",
    name: "query",
    component: QueryView,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "logIn",
    component: LoginView,
    beforeEnter: (to, from, next) => {
      if (store.getters.userId) {
        next({
          path: "/table-view",
        });
      } else {
        next();
      }
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "logIn",
    component: LoginView,
    beforeEnter: (to, from, next) => {
      if (store.getters.userId) {
        next({
          path: "/table-view",
        });
      } else {
        next();
      }
    },
  },
];

// routerで遷移した際にページトップに戻す処理
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  }
  return { top: 0 };
};

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    if (!store.getters.userId) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
