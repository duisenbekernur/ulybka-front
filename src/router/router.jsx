import { createRouter, createWebHistory } from "vue-router";
import { getLocalStorage } from "@/utils/local-storage";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: () => import("../views/Landing.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/Profile.vue"),
    },
    {
      path: "/discount",
      name: "discount",
      component: () => import("../views/Discount.vue"),
    },
    {
      path: "/services",
      name: "services",
      component: () => import("../views/Services.vue"),
    },
    {
      path: "/dentists/:id",
      name: "dentist_id",
      component: () => import("../views/DentistPage.vue"),
    },
    {
      path: "/dentists",
      name: "dentists",
      component: () => import("../views/Dentists.vue"),
    },
    {
      path: "/blog",
      name: "blog",
      component: () => import("../views/Blog.vue"),
    },
  ],
});

router.beforeEach((to, from) => {
  const isAuthenticated = getLocalStorage("user");

  if (to.name !== "login" && to.name !== "register" && to.name !== "landing" && !isAuthenticated) {
    return { name: "login" }; // Не авторизован
  }
  if ((to.name === "login" || to.name === "register") && isAuthenticated) {
    return { name: "landing" };
  }
  return true; // Авторизован
});

export default router;
