export default {
   userToken(state) {
     return state.user.token
   },
   loginState(state) {
     return state.user.logged
   },
   showLogin(state) {
     return state.header.showLogin
   }
}
