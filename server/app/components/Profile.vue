<template>
  <div>
    <app-header />
    <admin v-if="token.permissions == 'admin'" />
    <teacher v-if="token.permissions == 'teacher'" />
    <student v-if="token.permissions == 'student'" />
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode';
import Header from './Header.vue';
import Teacher from './Teacher.vue';
import Student from './Student.vue';
import Admin from './Admin.vue';

export default {
  computed: {
    token() {
      return jwtDecode(this.$store.getters.userToken)
    },
    requested() {
      return this.$store.getters.requested
    }
  },
  http: {
    root: '/api'
  },
  components: {
    'app-header': Header,
    'admin': Admin,
    'teacher': Teacher,
    'student': Student
  },
  created() {
    if(!this.$store.getters.loginState)
      this.$router.push('/');
    this.$http.post('user', {}, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.$store.getters.userToken
      }
    }).then(res => {
      this.$store.dispatch('userInfo', res.body.user);
      this.$store.dispatch('changeCurrentGroup', res.body.user._groups[0]);
      this.notifications = res.body.user.notifications;
    });
  }
}
</script>

<style lang="css">
</style>
