<template>
  <div class="container-fluid box padding">
    <center>
      <i v-if="showPreloader" class="material-icons preloader">cached</i>
      <div v-if="success" class="signup">
        <h3 class="success">Вы прошли тест</h3>
        <h4>Ваш результат: {{ percentage }}/100%</h4>
        <h4>Вы выучили {{ wordsLearnt }} слов</h4>
        <h5 @click="toProfile">Вернуться</h5>
      </div>
    </center>
    <form v-if="!showPreloader && !success" class="padding" onsubmit="return false">
      <div class="row padding">
        <h1>Тест</h1>
        <hr>
        <div class="md-form-group" v-for="pair in typeVal">
          <input type="text" v-model="pair.test" class="md-input" placeholder="Перевод" required>
          <label>{{ pair.key }}</label>
        </div>
        <div class="md-form-group" v-for="pair in typeKey">
          <input type="text" v-model="pair.test" class="md-input" placeholder="Слово" required>
          <label>{{ pair.value }}</label>
        </div>
        <button @click="submit" class="btn btn-primary">Готово</button>
      </div>
    </form>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  props: ['stack'],
  data() {
    return {
      pairs: [],
      typeKey: [],
      typeVal: [],
      correct: 0,
      percentage: 0,
      showPreloader: false,
      done: false,
      lose: false
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    gamesConditions() {
      return this.$store.getters.finishedGames
    }
  },
  methods: {
    allDone() {
      if(Math.round(this.incorrect * 100 / this.correct.length) <= 10) {
        this.$store.dispatch('incrementAttempts', 'matching');
        this.$store.dispatch('gameFinished', 'matching');
        this.done = true;
        return;
      }
      this.lose = true;
    }
  },
  created() {
    for(let task of this.stack.tasks) {
      Array.prototype.push.apply(this.pairs, task.content);
    }
    this.pairs = _.shuffle(this.pairs);
    for(let i = 0; i < this.pairs.length; i++) {
      if(i <= this.pairs.length * 0.3)
        this.typeKey.push(this.pairs[i]);
      else if(i > this.pairs.length * 0.3 && i <= this.pairs.length * 0.6)
        this.typeVal.push(this.pairs[i]);
    }
  },
  http: {
    root: '//ealapi.tw1.ru/api'
  }
}
</script>

<style lang="css" scoped>
  .preloader {
    color: black;
    font-size: 30px;
  }

  h5 {
    transition: 0.2s;
  } h5:hover {
    cursor: pointer;
    color: #5688C7;
    text-decoration: none;
  }
</style>
