<template>
  <center>
    <div class="sendmail">
      <form class="login-form" onsubmit="return false">
        <div class="username">
          <label>ФИО</label><br>
          <input v-model="name" required type="text" name="name" tabindex="1">
        </div>
        <div class="password">
          <label>E-mail</label><br>
          <input v-model="email" required type="email" name="email" tabindex="2">
        </div>
        <div class="agree">
          <label>
            Согласен на обработку персональных данных<br>
            <input required type="checkbox" name="agree" value="" tabindex="3">
          </label>
        </div>
        <center><button @click="send" class="btn" name="send" tabindex="3">Отправить</button></center>
      </form>
    </div>
  </center>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: ''
    }
  }
}
</script>

<style lang="css">
</style>
