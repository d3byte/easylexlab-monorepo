export default {
   userToken(state) {
     return state.user.token
   },
   loginState(state) {
     return state.user.logged
   },
   showLogin(state) {
     return state.header.showLogin
   },
   currentGroup(state) {
     return state.currentGroup
   },
   user(state) {
     return state.user
   },
   showTest(state) {
     return state.games.showTest
   },
   games(state) {
     return state.games
   },
   attempts(state) {
     return state.games.attempts
   },
   testAvailable(state) {
     return state.games.testAvailable
   },
   requested(state) {
     return state.user.requested
   }
}
