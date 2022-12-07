import { createRouter, createWebHistory } from "vue-router";
import Home from "@/presenters/homePresenter.js";
import Collection from "@/presenters/collectionPresenter.js";
import LoginPresenter from "@/presenters/loginPresenter.js";
import ProfilePresenter from "@/presenters/profilePresenter";
import UploadPresenter from "@/presenters/uploadPresenter";

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
