<template lang="html">
  <div class="center-block w-xxl w-auto-xs p-y-md">
    <div class="p-a-md box-color r box-shadow-z1 text-color m-a" v-if="!done">
      <div class="m-b">
        Забыли пароль?
        <p class="text-xs m-t">Введите электронную почту, на которую зарегистрирован Ваш аккаунт, и мы отправим вам инструкции, как поменять пароль.</p>
      </div>
      <form name="reset" onsubmit="return false">
        <div class="md-form-group">
          <input type="email" class="md-input" required v-model="email">
          <label>Email</label>
        </div>
        <button type="submit" @click="sendMail"class="btn primary btn-block p-x-md">Отправить</button>
      </form>
    </div>
    <div class="p-a-md box-color r box-shadow-z1 text-color m-a" v-else>
      <div class="m-b">
        <span class="text-success text-bold">Письмо успешно отправлено!</span>
        <p class="text-xs m-t">Следуйте инструкциям из письма, чтобы восстановить пароль.</p>
      </div>
    </div>
    <p id="alerts-container"></p>
    <div class="p-v-lg text-center"><router-link to="/login"class="text-primary _600">Войти</router-link></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      done: false
    }
  },
  methods: {
    sendMail() {
      const body = {
        email: this.email
      };
      this.$http.post('recover', body).then(res => {

      });
      this.done = true;
    },
    changePassword() {
      if(this.password.length > 5) {
        const body = {
          newPassword: this.password
        };
        this.$http.patch('newpassword', body, {
          headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + this.$store.getters.userToken
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
    root: '/api'
  }
}
</script>

<style lang="css">
</style>
