<template>
<div class="container padding">
  <center>
    <i v-if="showPreloader" class="material-icons preloader">cached</i>
    <div v-if="done" class="signup">
      <h3 class="success">Победа!</h3>
      <h4>Ваш результат: {{ percentage }}%</h4>
      <h5 @click="hideGames">Вернуться</h5>
    </div>
    <div v-if="lose" class="signup">
      <h3 class="text-danger"> Неудача ;c </h3>
      <h4>Ваш результат: {{ percentage }}%</h4>
      <button @click="restart" class="btn btn-primary"> Попробовать еще раз </button>
    </div>
  </center>
  <form v-if="!showPreloader && !done && !lose" class="padding" onsubmit="return false">
    <div class="row padding">
      <center>
        <h1>Type In</h1>
        <h4>Пройдено раз: {{ doneAttempts}}/{{ totalAttempts }}</h4>
      </center>
    </div>
    <div class="row padding box">
      <div class="md-form-group" v-for="pair in pairs">
        <input type="text" v-model="pair.test" class="md-input" placeholder="Слово" required>
        <label>{{ pair.value }}</label>
      </div>
      <button @click="allDone" class="btn btn-primary">Готово</button>
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
    },
    doneAttempts() {
      return this.$store.getters.games.typein.done
    },
    totalAttempts() {
      return this.$store.getters.games.typein.attempts
    },
  },
  methods: {
    allDone() {
      this.check();
      if (this.percentage >= 90) {
        this.$store.dispatch('incrementAttempts', 'typein');
        if (this.doneAttempts == this.totalAttempts)
          this.$store.dispatch('gameFinished', 'typein');
        if (this.gamesConditions[0] && this.gamesConditions[1] && this.gamesConditions[2] && this.gamesConditions[3] && this.gamesConditions[4]) {
          this.$store.dispatch('testAvailable');
          setTimeout(() => {
            $('#testavailable').modal('show');
          }, 50)
        }
        this.done = true;
      } else {
        this.lose = true;
      }
      this.stack.tasks[0].content.map(pair => pair.test = '');
    },
    restart() {
      this.newPairs = _.shuffle(this.newPairs);
      this.correct = 0;
      this.incorrect = 0;
      this.done = false;
      this.lose = false;
    },
    check() {
      this.pairs.map(pair => {
        if (pair.test == pair.key) {
          this.correct++;
        }
      });
      this.percentage = Math.round(this.correct * 100 / this.pairs.length);
    },
    hideGames() {
      this.$store.dispatch('hideGames');
    },
    start() {
      this.typeKey = [];
      this.typeVal = [];
      this.pairs = _.shuffle(this.pairs);
    }
  },
  created() {
    for (let task of this.stack.tasks) {
      Array.prototype.push.apply(this.pairs, task.content);
    }
    this.start();
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
