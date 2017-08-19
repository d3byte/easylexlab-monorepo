<template>
  <div>
    <h1>Word Scramble</h1>
    <h3>Пройдено раз: {{ $store.getters.attempts }}/{{ this.stack.attempts }}</h3>
    <div class="dashboard">
      <button @click="start" class="flat-btn">Перезапуск</button>
      <button class="flat-btn" @click="hideGames">Назад</button>
      <button v-if="win && showTest" @click="tryTest" class="flat-btn">Пройти тест</button>
    </div>
    <div class="box game">
      <h3><b>{{ currentPair.key }}</b></h3>
      <hr>
      <draggable v-model="shuffledLetters" @end="onEnd" element="h3" :class="correct ?'correct':''">
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
      if(this.shuffledLetters.join('') == this.currentPair.value)
        this.correct = true;
    },
    start() {

    },
  },
  created() {
    this.currentPair = this.stack.tasks[0].content[0];
    this.shuffledLetters = this.currentPair.value.split('');
    this.shuffledLetters = _.shuffle(this.shuffledLetters);
    for(let task of this.stack.tasks) {
      Array.prototype.push.apply(this.pairs, task.content);
    }
  },
  components: {
    draggable,
  }
}
</script>

<style lang="css">
  .game {
    min-width: 80px;
    max-width: 200px;
  }

  .correct {
    background: #307351;
  }
</style>
