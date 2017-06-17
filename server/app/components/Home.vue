<template>
  <div>
    <app-header></app-header>
    <mail></mail>
  </div>
</template>

<script>
import Header from './Header.vue';
import SendMail from './SendMail.vue';

export default {
  components: {
    'app-header': Header,
    'mail': SendMail
  }
}
</script>

<style lang="css">
</style>
