import { createRouter, createWebHistory } from "vue-router";
import Landing from "../pages/landingPage/index.vue";
import Dashboard from "../pages/dashboard/index.vue";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
