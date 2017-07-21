<template>
  <div class="container-fluid">
    <h2>{{ group.name }}</h2>
    <hr>
    <div class="row">
      <h3>Невыполненные задания</h3>
      <div v-for="test in group._tests" class="box col-lg-3 col-md-3 col-sm-6 col-xs-12">
        <h3>{{ test.name }}</h3>
        <router-link to="#">Перейти</router-link>
      </div>
    </div>
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
.box {
  padding: 10px;
}
</style>
