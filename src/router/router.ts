import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ContactTheNewsroomView from '@/views/ContactTheNewsroomView.vue'
import NewsView from '@/views/NewsView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
  { path: '/contact_the_newsroom', component: ContactTheNewsroomView },
  { path: '/news', component: NewsView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router