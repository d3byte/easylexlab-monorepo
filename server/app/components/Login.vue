<template>
  <div>
    <app-header></app-header>
    <div class="parent-login">
        <div v-if="this.error.length > 0" class="errors">
          <h4 class="errormsg">{{ this.error }}</h4>
        </div>
        <form class="login-form" onsubmit="return false">
          <div class="username">
            <label><i class="fa fa-id-card" aria-hidden="true"></i> Имя пользователя</label><br>
            <input v-model="username" required type="text" name="username" tabindex="1">
          </div>
          <div class="password">
            <label><i class="fa fa-lock" aria-hidden="true"></i> Пароль</label><br>
            <input v-model="password" required type="password" name="password" tabindex="2">
          </div>
          <router-link class="recover" to="/recover" tabindex="-1">Забыли пароль?</router-link>
          <center><button @click="check" class="btn" name="login" tabindex="3">Войти</button></center>
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
      password: '',
      error: ''
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
        this.error = 'Неверный логин или пароль.';
        throw err;
      });
    },
    check() {
      if(this.username.trim().length > 0 && this.password.trim().length > 0)
        this.submitLogin(this.username, this.password);
    },
  },
  components: {
    'app-header': Header
  }
}
</script>

<style lang="css">
</style>
