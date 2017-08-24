<template>
  <div id="app">
    <newgroup v-if="logged" />
    <router-view></router-view>
  </div>
</template>

<script>
import NewGroup from './components/NewGroup.vue';
export default {
  computed: {
    logged() {
        return this.$store.getters.loginState
    }
  },
  components: {
    'newgroup': NewGroup
  }
}
</script>

<style>
</style>
