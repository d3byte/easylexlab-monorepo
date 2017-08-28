<template lang="html">
  <div class="center-block w-xxl w-auto-xs p-y-md">
    <div class="navbar">
      <div class="pull-center">
        <div ui-include="'../views/blocks/navbar.brand.html'"></div>
      </div>
    </div>
    <div class="p-a-md box-color r box-shadow-z1 text-color m-a">
      <div class="m-b">
        Забыли пароль?
        <p class="text-xs m-t">Введите ваш email адрес, и мы отправим вам инструкции, как поменять пароль.</p>
      </div>
      <form name="reset">
        <div class="md-form-group">
          <input type="email" class="md-input" required v-model="email">
          <label>Email</label>
        </div>
        <button type="submit" class="btn primary btn-block p-x-md">Отправить</button>
      </form>
    </div>
    <p id="alerts-container"></p>
    <div class="p-v-lg text-center">Вернуться <router-link ui-sref="/login" href="signin.html" class="text-primary _600">Sign in</router-link></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: ''
    }
  },
  methods: {
    sendMail() {

    }
  },
  http: {
    root: '/api'
  }
}
</script>

<style lang="css">
</style>
