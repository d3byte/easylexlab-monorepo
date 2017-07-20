export default {
  login(state, token) {
    state.user.logged = true;
    state.user.token = token;
    localStorage.token = token;
  },
  logout(state) {
    state.header.showLogin = false;
    state.user.logged = false;
    state.user.token = '';
    localStorage.token = '';
  },
  hideOrShowLogin(state) {
    state.header.showLogin = !state.header.showLogin;
  },
  changeGroup(state, group) {
    state.currentGroup = group;
  }
}
