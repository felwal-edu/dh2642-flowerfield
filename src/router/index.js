import { createRouter, createWebHistory } from 'vue-router'
import About from '@/components/presenters/aboutPresenter.js'
import Home from '@/components/presenters/homePresenter.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
