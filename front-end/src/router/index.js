import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Post from "../views/Post.vue";
import Login from "../components/Login.vue";
import Create from "../views/Create.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Post/:id",
    name: "Post",
    component: Post,
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Create",
    name: "Create",
    component: Create,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
