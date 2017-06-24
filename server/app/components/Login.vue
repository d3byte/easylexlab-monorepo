<template>
  <div class="login-form">
    <div v-if="!!this.error" class="errors">
      {{ this.error }}
    </div>
    <form class="login-form" onsubmit="return false">
      <div class="username">
        <input v-model="username" required type="text" tabindex="1" placeholder="Логин">
      </div>
      <div class="password">
        <input v-model="password" required type="password" tabindex="2" placeholder="Пароль">
      </div>
      <router-link class="recover" to="/recover" tabindex="-1">Забыли пароль?</router-link>
      <button @click="check" class="login-btn" tabindex="3">Войти</button>
    </form>
    <button @click="hide" class="contact-btn" tabindex="3">Отмена</button>
  </div>
</template>

<script>
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
        if(res.body.success) {
          this.$store.dispatch('login', res.body.token);
          this.$router.push({ path: '/profile' });
        } else {
          this.error = 'Неверный пароль';
        }
      }).catch(err => {
        this.error = 'Неверный логин';
        throw err;
      });
    },
    check() {
      if(!!this.username.trim() && !!this.password.trim())
        this.submitLogin(this.username, this.password);
    },
    hide() {
      this.$store.dispatch('hideOrShowLogin');
    }
  }
}
</script>

<style lang="css" scoped>
.login-form {
  display: inline-flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.login-form input:first-of-type {
  margin-right: 10px;
}

.errors {
  margin-right: 10px;
  font-size: 16px;
  color: #DB5461;
}
</style>
