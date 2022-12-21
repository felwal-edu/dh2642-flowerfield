import { createRouter, createWebHashHistory } from "vue-router";
import HomePresenter from "@/presenters/homePresenter.js";
import Collection from "@/presenters/collectionPresenter.js";
import LoginPresenter from "@/presenters/loginPresenter.js";
import ProfilePresenter from "@/presenters/profilePresenter";
import UploadPresenter from "@/presenters/uploadPresenter";
import SignUpPresenter from "@/presenters/signupPresenter";
import ErrorPresenter from "@/presenters/errorPresenter";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePresenter
  },
  {
    path: "/login",
    name: "login",
    component: LoginPresenter
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpPresenter
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
  },
  {
    // catch missing pages 404 - define at the very end (VUE 3 Version)
    path: "/:pathMatch(.*)*",
    component: ErrorPresenter
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active-route"
});

export default router;
