<template>
  <div class="col-lg-12">
    <center>
    <h1>Matching</h1>
    <br>
    <div class="row">
      <div class="col-lg-3">
        <div class="box">
          <h2> Cheese </h2>
        </div>
        <div class="box">
          <h2> Textbook</h2>
        </div>
      </div>
      <div class="col-lg-3">
        <div class="box">
          <h2> Сэр </h2>
        </div>
        <div class="box">
          <h2> Учебник </h2>
        </div>
      </div>
      <div class="col-lg-3">
        <div class="box">
          <h2> Нога </h2>
        </div>
        <div class="box">
          <h2> Sir </h2>
        </div>
      </div>
      <div class="col-lg-3">
        <div class="box">
          <h2> Foot</h2>
        </div>
        <div class="box">
          <h2> Сыр </h2>
        </div>
      </div>
    </div>
    <div class="row">

    </div>
    <div class="row">

    </div>

    <div class="row">
    <button class="btn btn-primary" @click="hideGames">Закончить игру</button>
  </div>
  <br>
  <div class="row">
    <button class="btn btn-primary" @click="hideGames">Назад</button>
  </div>
    </center>
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
