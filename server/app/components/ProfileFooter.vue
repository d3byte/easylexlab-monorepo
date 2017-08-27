<template>
  <div>
    <groups v-if="token.permissions == 'teacher'"/>
    <student v-else />
  </div>
</template>

<script>
import Groups from './Groups.vue';
import StudentWidget from './StudentWidget.vue';
import jwtDecode from 'jwt-decode'

export default {
  computed: {
    token() {
      return jwtDecode(this.$store.getters.userToken)
    }
  },
  components: {
    'groups': Groups,
    'student': StudentWidget
  }
}
</script>

<style lang="css">
</style>
