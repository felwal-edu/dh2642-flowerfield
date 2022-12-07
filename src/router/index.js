import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/presenters/homePresenter.js";
import Collection from "@/components/presenters/collectionPresenter.js";
import LoginPresenter from "@/components/presenters/loginPresenter.js";
import ProfilePresenter from "@/components/presenters/profilePresenter";
import UploadPresenter from "@/components/presenters/uploadPresenter";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: LoginPresenter
  },
  {
    path: "/collection",
    name: "collection",
    component: Collection
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfilePresenter
  },
  {
    path: "/upload",
    name: "upload",
    component: UploadPresenter
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active-route"
});

export default router;
