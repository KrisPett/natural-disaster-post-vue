import { createWebHistory, createRouter } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import ContactTheNewsroomView from "@/views/ContactTheNewsroomView.vue";
import NewsView from "@/views/NewsItemView.vue";

declare module "vue-router" {
  interface RouteMeta {
    title?: string;
    description?: string;
  }
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: {
      title: "The Natural Disaster Post",
      description: "Welcome to our news website",
    },
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
    meta: {
      title: "About Us - Natural Disaster Post",
      description: "Learn more about our mission and team",
    },
  },
  {
    path: "/contact_the_newsroom",
    name: "ContactNewsroom",
    component: ContactTheNewsroomView,
    meta: {
      title: "Contact the Newsroom - Natural Disaster Post",
      description: "Get in touch with our editorial team",
    },
  },
  {
    path: "/news/:id",
    name: "News",
    component: NewsView,
    meta: {
      title: "Latest News - Natural Disaster Post",
      description: "Read our latest news articles",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFoundView.vue"),
    meta: {
      title: "Page Not Found - Natural Disaster Post",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to) => {
  document.title = to.meta.title || "Natural Disaster Post";
  if (to.meta.description) {
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", to.meta.description);
  }
});

export default router;
