<template>
  <div>
    <h1>Word Scramble</h1>
    <h3>Пройдено раз: {{ $store.getters.attempts }}/{{ this.stack.attempts }}</h3>
    <div class="dashboard">
      <button @click="start" class="flat-btn">Перезапуск</button>
      <button class="flat-btn" @click="hideGames">Назад</button>
      <button v-if="win && showTest" @click="tryTest" class="flat-btn">Пройти тест</button>
    </div>
    <div v-if="win" class="win box">
      <h3 class="text-success">Победа!</h3>
      <h4>Теперь вы можете пройти тест.</h4>
      <button v-if="win && showTest" @click="tryTest" class="flat-btn">Пройти тест</button>
    </div>
    <div class="box game" v-if="!win">
      <h3 class="key"><b>{{ currentPair.key }}</b></h3>
      <button class="flat-btn" @click="next" v-if="correct">Следующее слово</button>
      <draggable v-model="shuffledLetters" @end="onEnd" element="h3" class="value" :class="correct ?'correct':'default'">
        <span v-for="letter in shuffledLetters">
         {{ letter }}
        </span>
     </draggable>
    </div>
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
      if(this.shuffledLetters.join('') == this.currentPair.value) {
        this.correct = true;
        this.totalCorrect++;
        if(this.totalCorrect == this.pairs.length) {
          this.$store.dispatch('incrementAttemps');
          if(this.$store.getters.attempts == this.stack.attempts) {
            this.$store.dispatch('testAvailable');
          }
          this.win = true;
          return;
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
      this.shuffledLetters = this.currentPair.value.split('');
      this.shuffledLetters = _.shuffle(this.shuffledLetters);
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

<style lang="css">
  .game, .win {
    min-width: 80px;
    max-width: 240px;
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
</style>
