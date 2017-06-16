<template>
  <div id="app">
    <app-header></app-header>
    <h1>Vue.js is here!</h1>
    <p>Just testing</p>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  components: {
    'app-header': Header
  }
}
</script>

<style>
</style>
