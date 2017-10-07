import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Chartkick from 'chartkick';
import VueChartkick from 'vue-chartkick';

import { store } from './store/store';

import App from './App.vue';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Profile from './components/Profile.vue';
import Settings from './components/Settings.vue';
import Stats from './components/Stats.vue';
import NewGroup from './components/NewGroup.vue';
import NewTask from './components/NewTask.vue';
import ForgotPassword from './components/ForgotPassword.vue';
import ProfileFooter from './components/ProfileFooter.vue';
import Group from './components/Group.vue';
import Students from './components/Students.vue';
import Signup from './components/Signup.vue';
import Eula from './components/Eula.vue';
import Stack from './components/Stack.vue';
import RecoverPass from './components/RecoverPass.vue';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueChartkick, { Chartkick });

const routes = [
  { path: '/', component: Home },
  { path: '/signup/student', component: Signup },
  { path: '/signup/teacher', component: Signup },
  { path: '/login', component: Login },
  { path: '/forgotpassword', component: ForgotPassword },
  { path: '/recover', redirect: '/forgotpassword' },
  { path: '/recover/:token', component: RecoverPass },
  { path: '/info/rules', component: Eula },
  { path: '/settings', component: Settings },
  { path: '/stats', component: Stats },
  {
    path: '/profile', component: Profile,
    children: [
      {
        path: '',
        component: ProfileFooter
      }
    ]
  },
  {
    path: '/profile/msg', component: Profile,
    children: [
      {
        path: '',
        component: ProfileFooter
      }
    ]
  },
  { path: '/group/:id', component: Group },
  { path: '/group', redirect: '/profile' },
  { path: '/task/:id', component: Stack },
  { path: '/task', redirect: '/profile' }
];

const router = new VueRouter({routes, mode: 'history'});

new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
});
