<template>
  <div class="login-form">
    <div v-if="!!this.error" class="errors">
      {{ this.error }}
    </div>
    <center>
      <i v-if="showPreloader" class="material-icons preloader">cached</i>
    </center>
      <form v-if="!showPreloader" class="login-form" onsubmit="return false">
        <div class="username">
          <input v-model="username" required type="text" tabindex="1" placeholder="Логин">
        </div>
        <div class="password">
          <input v-model="password" required type="password" tabindex="2" placeholder="Пароль">
        </div>
        <router-link class="recover" to="/recover" tabindex="-1">Забыли пароль?</router-link>
        <button @click="check" class="btn btn-default" tabindex="3">Войти</button>
      </form>
    <button @click="hide" class="btn btn-default dec" tabindex="3">Отмена</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
      showPreloader: false
    };
  },
  http: {
    root: '/api'
  },
  methods: {
    submitLogin(username, password) {
      this.showPreloader = true;
      const body = {
        "username": username,
        "password": password
      };
      this.$http.post('login', body).then(res => {
        if(res.body.success) {
          this.showPreloader = false;
          this.$store.dispatch('login', res.body.token);
          this.$router.push({ path: '/profile' });
        } else {
          this.showPreloader = false;
          this.error = 'Неверный пароль';
        }
      }).catch(err => {
          this.showPreloader = false;
          this.error = 'Неверный логин';
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

.dec {
  margin-left: 10px;
}

::-webkit-input-placeholder { color: white; opacity: 0.8; }
::-moz-placeholder          { color: white; opacity: 0.8; }/* Firefox 19+ */
:-moz-placeholder           { color: white; opacity: 0.8; }/* Firefox 18- */
:-ms-input-placeholder      { color: white; opacity: 0.8; }

.login-form input {
  border-color: white;
} .login-form input:active,
  .login-form input:focus {
  border-color: black;
}

a.recover {
  color: white;
  opacity: 0.8;
} a.recover:hover {
  opacity: 1;
}
</style>
