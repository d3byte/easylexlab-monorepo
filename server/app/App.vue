<template>
  <div id="app">
    <newgroup v-if="logged" />
    <newmsg v-if="logged" />
    <regcode v-if="logged" />
    <newtask v-if="logged" />
    <router-view></router-view>
  </div>
</template>

<script>
import NewGroup from './components/NewGroup.vue';
import NewMsg from './components/NewMsg.vue';
import RegCode from './components/RegCode.vue';
import NewTask from './components/NewTask.vue';

export default {
  computed: {
    logged() {
        return this.$store.getters.loginState
    }
  },
  components: {
    'newgroup': NewGroup,
    'newmsg': NewMsg,
    'regcode': RegCode,
    'newtask': NewTask
  }
}
</script>

<style>
</style>
