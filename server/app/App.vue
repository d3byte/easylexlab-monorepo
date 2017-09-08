<template>
  <div id="app">
    <newgroup v-if="logged" />
    <newmsg v-if="logged && $route.params.id" />
    <regcode v-if="logged && $route.params.id" />
    <history v-if="logged && $route.params.id && $route.path.slice(0, 6) == '/group'" />
    <delete v-if="logged"/>
    <newtask v-if="logged" />
    <feedback v-if="logged" />
    <test-aval v-if="logged && testAvailable" />
    <router-view></router-view>
  </div>
</template>

<script>
import NewGroup from './components/NewGroup.vue';
import NewMsg from './components/NewMsg.vue';
import RegCode from './components/RegCode.vue';
import NewTask from './components/NewTask.vue';
import Feedback from './components/Feedback.vue';
import TaskHistory from './components/TaskHistory.vue';
import TaskDelete from './components/TaskDelete.vue';
import TestAval from './components/TestAval.vue';

export default {
  computed: {
    logged() {
        return this.$store.getters.loginState
    },
    testAvailable() {
      return this.$store.getters.testAvailable
    }
  },
  components: {
    'newgroup': NewGroup,
    'newmsg': NewMsg,
    'regcode': RegCode,
    'newtask': NewTask,
    'feedback': Feedback,
    'history': TaskHistory,
    'delete': TaskDelete,
    'test-aval': TestAval
  }
}
</script>

<style>
#app {
  max-width: 100%;
  width: 100%;
}
</style>
