<template lang="html">
  <div class="center-block w-xxl w-auto-xs p-y-md">
    <div class="p-a-md box-color r box-shadow-z1 text-color m-a" v-if="trueRoute">
      <div class="m-b">
        Восстановление пароля
        <p class="text-xs m-t">Введите новый пароль</p>
      </div>
      <form name="reset" onsubmit="return false">
        <div class="form-group" v-if="!!errorPassword.length">
          <label class="text-danger">{{ errorPassword }}</label>
        </div>
        <div class="form-group" v-if="!!successMsg.length">
          <label class="text-success">{{ successMsg }}</label>
        </div>
        <div class="md-form-group">
          <input type="password" class="md-input" required v-model="password">
          <label>Пароль</label>
        </div>
        <button type="submit" @click="changePassword" class="btn primary btn-block p-x-md">Изменить</button>
      </form>
    </div>
    <p id="alerts-container"></p>
    <div class="p-v-lg text-center"><router-link to="/login"class="text-primary _600">Войти</router-link></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      successMsg: '',
      errorPassword: '',
      trueRoute: false
    }
  },
  methods: {
    changePassword() {
      if(this.password.length > 5) {
        const body = {
          newPassword: this.password
        };
        this.$http.patch('newpassword', body, {
          headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + this.$route.params.token
          }
        }).then(res => {
          if (res.body.success) {
            this.errorPassword = '';
            this.successMsg = 'Пароль успешно изменен!';
          }
        });
      } else {
        this.errorPassword = 'Пароль не должен быть короче 6 символов. Попробуйте еще раз.';
        this.successMsg = '';
      }
    }
  },
  http: {
    // root: '//ealapi.tw1.ru/api'
    // root: '/api'
  },
  created() {
    const token = this.$route.params.token;
    const body = {
      token
    };
    this.$http.post('checktoken', body).then(res => {
      if(res.body.success) {
        this.trueRoute = true;
      } else {
        this.$router.push('/forgotpassword');
      }
    });
  }
}
</script>

<style lang="css">
</style>
