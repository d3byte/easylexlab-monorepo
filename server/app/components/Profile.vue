<template>
  <div>
    <app-header></app-header>
  </div>
</template>

<script>
import Header from './Header.vue';

export default {
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
