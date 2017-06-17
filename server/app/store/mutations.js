export default {
  login(state, token) {
    state.user.logged = true;
    state.user.token = token;
    localStorage.token = token;
  },
  logout(state) {
    state.user.logged = false;
    state.user.token = '';
    localStorage.token = '';
  }
}
