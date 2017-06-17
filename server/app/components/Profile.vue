<template>
  <div>
    <app-header style="margin-bottom: 150px;"></app-header>
    <admin v-if="this.isAdmin"></admin>
    <teacher v-if="this.isTeacher"></teacher>
    <student v-if="this.isStudent"></student>
  </div>
</template>

<script>
import Header from './Header.vue';
import Teacher from './Teacher.vue';
import Student from './Student.vue';
import Admin from './Admin.vue';

export default {
  data() {
    return {
      isAdmin: (this.$store.getters.user.permissions == 'admin' ? true : false),
      isTeacher: (this.$store.getters.user.permissions == 'teacher' ? true : false),
      isStudent: (this.$store.getters.user.permissions == 'student' ? true : false)
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  components: {
    'app-header': Header,
    'admin': Admin,
    'teacher': Teacher,
    'student': Student
  },
  created() {
    if(!this.$store.getters.loginState)
      this.$router.push('/login');
  }
}
</script>

<style lang="css">
</style>
