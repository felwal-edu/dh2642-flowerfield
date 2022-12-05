import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/components/views/homeView.js'
import AboutView from '@/components/views/aboutView.js'
import UploadView from '@/components/views/uploadView'
import UploadPresenter from '@/components/presenters/uploadPresenter'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AboutView
  },
  {
    path: '/upload',
    name: 'upload',
    component: UploadPresenter
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
