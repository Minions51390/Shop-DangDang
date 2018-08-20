// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import store from './store/store.js'
import Vuex from 'vuex'
import uploader from 'vue-easy-uploader'
import axios from 'axios'
axios.defaults.withCredentials = true;
Vue.prototype.$http = axios;
Vue.use(Vuex);
let store = new Vuex.Store({});
Vue.use(uploader, store);
Vue.config.productionTip = false;

/* eslint-disable no-new */
window.app = new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});
