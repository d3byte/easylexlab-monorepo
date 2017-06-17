import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import { store } from './store/store';

import App from './App.vue';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Profile from './components/Profile.vue';




Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/profile', component: Profile }
];

const router = new VueRouter({routes, mode: 'history'});

new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
});
