import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/sites",
    name: "Sites",
    component: () => import("@/views/Sites.vue"),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/facts",
    name: "Facts",
    component: () => import("@/views/Facts.vue"),
    meta: {
      requiresAuth: false
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;