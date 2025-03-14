import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/auth",
      component: () => import("@/layouts/AuthLayout.vue"),
      children: [
        {
          path: "login",
          component: () => import("@/views/auth/LoginView.vue"),
          meta: { index: 2 },
        },
        {
          path: "register",
          component: () => import("@/views/auth/RegisterView.vue"),
          meta: { index: 1 },
        },
        {
          path: "updatePwd",
          component: () => import("@/views/auth/UpdatePwdView.vue"),
          meta: { index: 3 },
        },
      ],
    },
    {
      path: "/home",
      component: () => import("@/layouts/HomeLayout.vue"),
      children: [
        {
          path: "front",
          component: () => import("@/views/home/FrontView.vue"),
        },
        {
          path: "user",
          component: () => import("@/views/home/UserView.vue"),
        },
      ],
    },
  ],
});

export default router;
