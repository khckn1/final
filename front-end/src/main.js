import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import comments from "./comments.js";
import UUID from "vue-uuid";

Vue.use(UUID);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false;

let data = {
  posts: Array,
  postId: '',
  comments: comments,
  user: null,
};

new Vue({
  router,
  data,
  render: (h) => h(App),
}).$mount("#app");
