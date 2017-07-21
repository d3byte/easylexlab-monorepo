<template>
  <div>
    <h1>Flashcards</h1>
    <div class="ui dropdown">
      <div class="text game">Выбрать игру</div>
      <div class="menu">
        <div @click="showMatching" class="item">
          Matching
        </div>
        <div @click="showFlashcards" class="item">
          Flashcards
        </div>
      </div>
    </div>
    <button class="btn" @click="hideGames">Назад</button>
  </div>
</template>

<script>
export default {
  props: ['task'],
  methods: {
    hideGames() {
      this.$store.dispatch('hideGames');
    },
    showMatching() {
      this.$store.dispatch('showMatching');
    },
    showFlashcards() {
      this.$store.dispatch('showFlashcards');
    }
  },
  mounted() {
    $('.ui.dropdown').dropdown();
  }
}
</script>

<style lang="css">
</style>
