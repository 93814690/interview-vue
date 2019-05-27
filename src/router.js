import Vue from 'vue'
import Router from 'vue-router'
import Interview from "./views/Interview";
import Category from "./views/Category";
import AddSubject from "./views/AddSubject";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Interview
    },
    {
      path: '/category',
      name: 'category',
      component: Category
    },
    {
      path: '/subject/add',
      name: 'addSubject',
      component: AddSubject
    }
  ]
})
