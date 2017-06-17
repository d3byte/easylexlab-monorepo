<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-3">
        <h3 class="name">{{ user.username }}</h3>
        <h5 class="role">Учитель</h5>
      </div>
      <div class="col-lg-2">
        <router-link class="login" to="/profile/settings">Настройки аккаунта</router-link>
      </div>
      <div class="col-lg-2">
        <router-link class="login" to="/profile/newgroup">Создать группу</router-link>
      </div>
      <div class="col-lg-2">
        <router-link class="login" to="/profile/newtask">Создать задание</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
}
</script>

<style lang="css">
</style>
