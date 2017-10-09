'use strict';

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _vueResource = require('vue-resource');

var _vueResource2 = _interopRequireDefault(_vueResource);

var _chartkick = require('chartkick');

var _chartkick2 = _interopRequireDefault(_chartkick);

var _vueChartkick = require('vue-chartkick');

var _vueChartkick2 = _interopRequireDefault(_vueChartkick);

var _store = require('./store/store');

var _App = require('./App.vue');

var _App2 = _interopRequireDefault(_App);

var _Home = require('./components/Home.vue');

var _Home2 = _interopRequireDefault(_Home);

var _Login = require('./components/Login.vue');

var _Login2 = _interopRequireDefault(_Login);

var _Profile = require('./components/Profile.vue');

var _Profile2 = _interopRequireDefault(_Profile);

var _Settings = require('./components/Settings.vue');

var _Settings2 = _interopRequireDefault(_Settings);

var _Stats = require('./components/Stats.vue');

var _Stats2 = _interopRequireDefault(_Stats);

var _NewGroup = require('./components/NewGroup.vue');

var _NewGroup2 = _interopRequireDefault(_NewGroup);

var _NewTask = require('./components/NewTask.vue');

var _NewTask2 = _interopRequireDefault(_NewTask);

var _ForgotPassword = require('./components/ForgotPassword.vue');

var _ForgotPassword2 = _interopRequireDefault(_ForgotPassword);

var _ProfileFooter = require('./components/ProfileFooter.vue');

var _ProfileFooter2 = _interopRequireDefault(_ProfileFooter);

var _Group = require('./components/Group.vue');

var _Group2 = _interopRequireDefault(_Group);

var _Students = require('./components/Students.vue');

var _Students2 = _interopRequireDefault(_Students);

var _Signup = require('./components/Signup.vue');

var _Signup2 = _interopRequireDefault(_Signup);

var _Eula = require('./components/Eula.vue');

var _Eula2 = _interopRequireDefault(_Eula);

var _Stack = require('./components/Stack.vue');

var _Stack2 = _interopRequireDefault(_Stack);

var _RecoverPass = require('./components/RecoverPass.vue');

var _RecoverPass2 = _interopRequireDefault(_RecoverPass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);
_vue2.default.use(_vueResource2.default);
_vue2.default.use(_vueChartkick2.default, { Chartkick: _chartkick2.default });

var routes = [{ path: '/', component: _Home2.default }, { path: '/signup/student', component: _Signup2.default }, { path: '/signup/teacher', component: _Signup2.default }, { path: '/login', component: _Login2.default }, { path: '/forgotpassword', component: _ForgotPassword2.default }, { path: '/recover', redirect: '/forgotpassword' }, { path: '/recover/:token', component: _RecoverPass2.default }, { path: '/info/rules', component: _Eula2.default }, { path: '/settings', component: _Settings2.default }, { path: '/stats', component: _Stats2.default }, {
  path: '/profile', component: _Profile2.default,
  children: [{
    path: '',
    component: _ProfileFooter2.default
  }]
}, {
  path: '/profile/msg', component: _Profile2.default,
  children: [{
    path: '',
    component: _ProfileFooter2.default
  }]
}, { path: '/group/:id', component: _Group2.default }, { path: '/group', redirect: '/profile' }, { path: '/task/:id', component: _Stack2.default }, { path: '/task', redirect: '/profile' }];

var router = new _vueRouter2.default({ routes: routes, mode: 'history' });

new _vue2.default({
  el: "#app",
  store: _store.store,
  router: router,
  render: function render(h) {
    return h(_App2.default);
  }
});
//# sourceMappingURL=main.js.map