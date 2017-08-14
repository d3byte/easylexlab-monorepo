<template lang="html">
  <div>
    <button class="btn back" @click="hideGames">Назад</button>
</div>
</template>

<script>
import _ from 'lodash';
export default {
  props: ['stack'],
  data() {
    return {
      currentPair: {},
      pairs: []
      // done: false
    }
  },
  computed: {
    showTest() {
      return this.$store.getters.testAvailable
    }
  },
  http: {
    root: '//ealapi.tw1.ru/api'
  },
  methods: {
    hideGames() {
      this.$store.dispatch('hideGames');
    }
  }x
}
</script>

<style lang="css">
</style>
