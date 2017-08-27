<template>
  <div>
    <app-header></app-header>
    <h1>Landing page</h1>
  </div>
</template>

<script>
  import Header from './Header.vue';
  import Login from './Login.vue';

  export default {
      components: {
          'app-header': Header
      }
  }
</script>

<style lang="css">
</style>
