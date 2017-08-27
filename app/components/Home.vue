<template>
  <div>

    <app-header></app-header>
    <h1>Landing page</h1>
  </div>
</template>

<script>

    import Header from './Header.vue';
    import SendMail from './SendMail.vue';
    import Login from './Login.vue';

    export default {
        components: {
            'app-header': Header,
            'mail': SendMail,
            'login': Login
        }
    }
</script>

<style lang="css">
</style>
