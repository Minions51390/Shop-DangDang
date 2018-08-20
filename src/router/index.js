import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const routes = [
  { path: '/home', name: 'home', component: resolve => require(['../view/home'], resolve) },
  { path: '/register', name: 'register', component: resolve => require(['../view/register'], resolve) },
  { path: '/searchItem', name: 'searchItem', component: resolve => require(['../view/searchItem'], resolve) },
  { path: '/item', name: 'item', component: resolve => require(['../view/item'], resolve) },
  { path: '/itemList', name: 'itemList', component: resolve => require(['../view/itemList'], resolve) },
  { path: '/bookCar', name: 'bookCar', component: resolve => require(['../view/bookCar'], resolve) },
  { path: '/newOrder', name: 'newOrder', component: resolve => require(['../view/newOrder'], resolve) },
  { path: '/myOrder', name: 'myOrder', component: resolve => require(['../view/myOrder'], resolve) },
  { path: '/judgeOrder', name: 'judgeOrder', component: resolve => require(['../view/judgeOrder'], resolve) },
  { path: '/adminLog', name: 'adminLog', component: resolve => require(['../view/adminLog'], resolve) },
  { path: '/adminOrder', name: 'adminOrder', component: resolve => require(['../view/adminOrder'], resolve) }
]

export default new Router({
  mode: 'history',
  routes
})
