<template>
  <div>
    <app-header></app-header>
    <div class="parent-login">
        <form class="login-form">
          <div class="username">
            <label>Имя пользователя</label><br>
            <input v-model="username" required type="text" name="username">
          </div>
          <div class="password">
            <label>Пароль</label><br>
            <input v-model="password" required type="password" name="password">
          </div>
          <router-link class="recover" to="/recover">Забыли пароль?</router-link>
          <center><span @click="check" class="btn" name="login">Войти</span></center>
        </form>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  http: {
    root: '/api'
  },
  methods: {
    submitLogin(username, password) {
      const body = {
        "username": username,
        "password": password
      };
      this.$http.post('login', body).then(res => {
        this.$store.dispatch('login', res.body.token);
        this.$router.push({ path: '/profile' });
      }).catch(err => {
        throw err;
      });
    },
    check() {
      if(this.username.trim().length > 0 && this.password.trim().length > 0) {
        this.submitLogin(this.username, this.password);
      }
    },
  },
  components: {
    'app-header': Header
  }
}
</script>

<style lang="css">
</style>
