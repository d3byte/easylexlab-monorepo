<template>
  <div>
    <app-header style="margin-bottom: 80px;"/>
    <div class="row">
    <div class="col-lg-12">
      <center>
        <h1> Пользовательское соглашение</h1>
        <br>
        <h2>
          Просим Вас подробно ознакомиться с настоящим
          Пользовательским соглашением (далее — «Соглашение»),
           принять на себя налагаемую им ответственность
          и подтвердить свое полное и безоговорочное согласие с ним.
        </h2>
      </center>
    </div>
  </div>
  </div>
</template>

<script>
import Header from './Header.vue';
import Teacher from './Teacher.vue';
import Student from './Student.vue';
import Admin from './Admin.vue';
import jwtDecode from 'jwt-decode';

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
      return jwtDecode(this.$store.getters.userToken);
    }
  },
  components: {
    'app-header': Header,
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
