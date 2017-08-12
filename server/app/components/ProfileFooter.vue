<template>
  <div>
    <groups v-if="user.permissions == 'teacher'"/>
    <student v-else />
  </div>
</template>

<script>
import Groups from './Groups.vue';
import StudentWidget from './StudentWidget.vue';
import jwtDecode from 'jwt-decode'

export default {
  computed: {
    user() {
      return jwtDecode(this.$store.getters.userToken)
    }
  },
  created() {
    console.log('Created');
  },
  components: {
    'groups': Groups,
    'student': StudentWidget
  }
}
</script>

<style lang="css">
</style>
