<template>
  <div id="app">
    <newgroup v-if="logged" />
    <newmsg v-if="logged && $route.params.id" />
    <regcode v-if="logged && $route.params.id" />
    <newtask v-if="logged" />
    <feedback v-if="logged" />
    <router-view></router-view>
  </div>
</template>

<script>
import NewGroup from './components/NewGroup.vue';
import NewMsg from './components/NewMsg.vue';
import RegCode from './components/RegCode.vue';
import NewTask from './components/NewTask.vue';
import Feedback from './components/Feedback.vue';

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
    'newtask': NewTask,
    'feedback': Feedback
  }
}
</script>

<style>
</style>
