<template>
  <div>
    <app-header style="margin-bottom: 80px;"/>
    <admin v-if="user.permissions == 'admin'" />
    <teacher v-if="this.user.permissions == 'teacher'" />
    <student v-if="user.permissions == 'student'" />
  </div>
</template>

<script>
import Header from './Header.vue';
import Teacher from './Teacher.vue';
import Student from './Student.vue';
import Admin from './Admin.vue';

export default {
  computed: {
    user() {
      return this.$store.getters.user
    },
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
  }
}
</script>

<style lang="css">
</style>
