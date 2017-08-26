<template>
  <div class="center-block w-xxl w-auto-xs p-y-md">
    <div class="p-a-md box-color r box-shadow-z1 text-color m-a">
      <div class="m-b text-sm">
        Вход в EasyLexLab
      </div>
      <div v-if="!!this.error" class="m-b text-sm text-danger">
        {{ this.error }}
      </div>
      <form name="form" onsubmit="return false">
        <div class="md-form-group">
          <input type="text" class="md-input" v-model="username" required>
          <label>Логин</label>
        </div>
        <div class="md-form-group">
          <input type="password" class="md-input" v-model="password" required>
          <label>Пароль</label>
        </div>
        <button @click="check" class="btn primary btn-block p-x-md">Войти</button>
      </form>
    </div>

    <div class="p-v-lg text-center">
      <div class="m-b"><router-link to="/forgotpassword" class="text-primary _600">Забыли пароль?</router-link></div>
      <div>Нет аккаунта? <router-link to="/signup" class="text-primary _600">Зарегистрируйтесь</router-link></div>
    </div>
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
          this.fetchUserInfo();
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
    fetchUserInfo() {
      this.$http.post('user', {}, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.getters.userToken
        }
      }).then(res => {
          this.$store.dispatch('userInfo', res.body.user);
          this.$store.dispatch('changeCurrentGroup', res.body.user._groups[0]);
          this.notifications = res.body.user.notifications;
          localStorage.firstName = res.body.user.firstName;
          localStorage.lastName = res.body.user.lastName;
          localStorage.school = res.body.user.school;
          localStorage.city = res.body.user.city;
          this.$router.push({ path: '/profile' });
        });
    },
  },
  created() {
    if (this.$store.getters.loginState)
        this.$router.push('/profile');
  }
}
</script>

<style lang="css" scoped>
</style>
