import { ElMessage } from "element-plus";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/auth/login",
    },
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
          path: "author",
          component: () => import("@/views/home/AuthorView.vue"),
        },
        {
          path: "article",
          component: () => import("@/views/home/ArticleView.vue"),
        },
        {
          path: "articleinfo",
          component: () => import("@/views/home/ArticleInfoView.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (from.path.startsWith("/home") && !to.path.startsWith("/home")) {
    sessionStorage.removeItem("user");
  }

  if (to.path.startsWith("/home")) {
    const user = sessionStorage.getItem("user");
    if (!user) {
      ElMessage.error("请先登录");
      next("/auth/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
