import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/components/presenters/homePresenter.js'
import About from '@/components/presenters/aboutPresenter.js'
import Collection from '@/components/presenters/collectionPresenter.js'
import Login from '@/components/presenters/loginPresenter.js'
import Profile from '@/components/presenters/profilePresenter'
import Upload from '@/components/presenters/uploadPresenter'

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
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/collection',
    name: 'collection',
    component: Collection
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/upload',
    name: 'upload',
    component: Upload
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active-route"
});

export default router;
