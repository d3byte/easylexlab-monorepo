<template>
  <div class="box">
    <h2>{{ group.name }}</h2>
  </div>
</template>

<script>
export default {
  computed: {
    group() {
      return this.$store.getters.currentGroup;
    }
  }
}
</script>

<style lang="css">
</style>
