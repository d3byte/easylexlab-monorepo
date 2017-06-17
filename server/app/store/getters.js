import jwtDecode from 'jwt-decode';

export default {
   userToken(state) {
     return state.user.token;
   },
   loginState(state) {
     return state.user.logged;
   },
   user(state) {
     return jwtDecode(state.user.token);
   }
}
