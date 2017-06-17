<template>
  <div>
    <app-header style="margin-bottom: 250px;"></app-header>
    <h3>Профиль {{user.username}}</h3>
    <h4>
      Доступ: {{ user.permissions }}
    </h4>
    <hr>
  </div>
</template>

<script>
import Header from './Header.vue';

export default {
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  components: {
    'app-header': Header
  },
  created() {
    if(!this.$store.getters.loginState)
      this.$router.push('/login');
  }
}
</script>

<style lang="css">
</style>
