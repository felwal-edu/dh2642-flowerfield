import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/components/presenters/homePresenter.js'
import AboutView from '@/components/presenters/aboutPresenter.js'
import Login from '@/components/presenters/loginPresenter';
import LoginView from '@/components/views/loginView';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
