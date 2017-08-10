<template>
  <div>
    <groups v-if="user.permissions == 'teacher'"/>
    <student v-else />
  </div>
</template>

<script>
import Groups from './Groups.vue';
import StudentWidget from './StudentWidget.vue';

export default {
  computed: {
    user() {
      return this.$store.getters.user
    },
  },
  components: {
    'groups': Groups,
    'student': StudentWidget
  }
}
</script>

<style lang="css">
</style>
