<template>
  <div class="container">
    <center>
    <h1>Word Scramble</h1>
    <h3>Пройдено раз: {{ doneAttempts }}/{{ totalAttempts }}</h3>
    <div class="dashboard">
      <button @click="start" class="flat-btn">Перезапуск</button>
      <button class="flat-btn" @click="hideGames">Назад</button>
    </div>
    <div v-if="win" class="win box">
      <h3 class="text-success">Победа!</h3>
      <h5 @click="start" class="restart">Начать заново?</h5>
    </div>
    <div class="box game" v-if="!win">
      <h3 class="key"><b>{{ currentPair.value }}</b></h3>
      <button class="flat-btn" @click="next" v-if="correct">Следующее слово</button>
      <draggable v-model="shuffledLetters" @end="onEnd" element="h3" class="value" :class="correct ?'correct':'default'">
        <span class="letter" v-for="letter in shuffledLetters">
         {{ letter }}
        </span>
     </draggable>
    </div>
  </center>
  </div>
</template>

<script>
import _ from 'lodash';
import draggable from 'vuedraggable';

export default {
  props: ['stack'],
  data() {
    return {
      currentPair: {},
      shuffledLetters: [],
      pairs: [],
      correct: false,
      totalCorrect: 0,
      win: false
    }
  },
  computed: {
    showTest() {
      return this.$store.getters.testAvailable
    },
    doneAttempts() {
      return this.$store.getters.games.scramble.done
    },
    totalAttempts() {
      return this.$store.getters.games.scramble.attempts
    },
    gamesConditions() {
      return this.$store.getters.finishedGames
    }
  },
  http: {
    root: '/api'
  },
  methods: {
    tryTest() {
      this.$store.dispatch('hideGames');
      this.$store.dispatch('showTest');
    },
    hideGames() {
      this.$store.dispatch('hideGames');
    },
    onEnd() {
      if(this.shuffledLetters.join('') == this.currentPair.key) {
        this.correct = true;
        this.totalCorrect++;
        if(this.totalCorrect == this.pairs.length) {
          this.$store.dispatch('incrementAttempts', 'scramble');
          this.win = true;
        }
        if(this.doneAttempts == this.totalAttempts)
          this.$store.dispatch('gameFinished', 'scramble');
          if (this.gamesConditions[0] && this.gamesConditions[1] && this.gamesConditions[2] && this.gamesConditions[3] && this.gamesConditions[4]) {
            this.$store.dispatch('testAvailable');
            setTimeout(() => {
              $('#testavailable').modal('show');
            }, 50)
          }
      }
    },
    start() {
      this.pairs = _.shuffle(this.pairs);
      this.currentPair = this.pairs[0];
      this.shuffleLetters();
      this.correct = false;
      this.win = false;
      this.totalCorrect = 0;
    },
    next() {
      let currentIndex = this.pairs.indexOf(this.currentPair);
      if(this.pairs.length > currentIndex)
        currentIndex++;
      this.correct = false;
      this.currentPair = this.pairs[currentIndex];
      this.shuffleLetters();
    },
    shuffleLetters() {
      this.shuffledLetters = this.currentPair.key.split('');
      let copyShuffledLetters = this.shuffledLetters;
      while(this.shuffledLetters == copyShuffledLetters) {
        this.shuffledLetters = _.shuffle(this.shuffledLetters);
      }
    }
  },
  created() {
    for(let task of this.stack.tasks) {
      Array.prototype.push.apply(this.pairs, task.content);
    }
    this.start();
  },
  components: {
    draggable,
  }
}
</script>

<style lang="css" scoped>
  .game, .win {
    min-width: 80px;
    width: auto;
    max-width: 360px;
  }

  .correct {
    background: #307351;
    color: white;
  }

  .key, .flat-btn {
    margin-bottom: 10px;
  }

  .default {
    background: #ccc;
  }

  .restart:hover {
    cursor: pointer;
  }

  .letter {
    background: lightgray;
    font-size: 24px;
    border: 1px solid darkgray;
    margin-right: 2px;
  }

  .letter:last-child {
    margin-right: 0;
  }

  .value {
    text-align: center;
    vertical-align: middle;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .value > span {
    text-align: center !important;
  }

  .correct > .letter {
    background: transparent;
    border: none;
    margin-right: 0;
  }
</style>
