<template>
  <div>
    <app-header style="margin-bottom: 80px;"/>
    <admin v-if="this.isAdmin" />
    <teacher v-if="this.isTeacher" />
    <student v-if="this.isStudent" />
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
      isAdmin: '',
      isTeacher: '',
      isStudent: ''
    }
  },
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
      this.$router.push('/login');
    this.isAdmin = (this.user.permissions == 'admin' ? true : false);
    this.isTeacher = (this.user.permissions == 'teacher' ? true : false);
    this.isStudent = (this.user.permissions == 'student' ? true : false);
  }
}
</script>

<style lang="css">
</style>
