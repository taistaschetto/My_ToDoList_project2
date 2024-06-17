import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AuthView from "@/views/AuthView.vue";
import Dashboard from "@/views/Dashboard.vue";
import NotFoundView from "@/views/NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/auth",
      name: "Auth",
      component: AuthView,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFoundView,
    },
  ],
});

export default router;
