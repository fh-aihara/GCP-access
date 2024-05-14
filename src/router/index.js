import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

import LoginView from "../views/LoginPage.vue";
import KycCheckPageView from "../views/KycCheck";
import KycListPageView from "../views/KycList";
import TableViewPageView from "../views/TableView";

const routes = [
  {
    path: "/kyc/:id",
    name: "kyc",
    component: KycCheckPageView,
    meta: { requiresAuth: true },
  },
  {
    path: "/kyc-list",
    name: "kycList",
    component: KycListPageView,
    meta: { requiresAuth: true },
  },
  {
    path: "/table-view",
    name: "tableView",
    component: TableViewPageView,
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
