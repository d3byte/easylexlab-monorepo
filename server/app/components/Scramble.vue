<template>
  <div class="container">
    <center>
    <div class="name">
      <img src="../pics/scramble.png">
      <h2><b>Скрэмбл</b></h2>
    </div>
    <h3>Пройдено раз: {{ doneAttempts }}/{{ totalAttempts }}</h3>
    <!-- <div v-if="win" class="win box">
      <h3 class="text-success">Победа!</h3>
      <h5 @click="start" class="restart">Начать заново?</h5>
    </div> -->
    <div v-if="win" class="box done">
      <div class="done-header">
        <h3 class="text-bold">Победа!</h3>
      </div>
      <div class="done-body">
        <button id="restart" class="btn btn-sm rounded" @click="start">Перезапуск</button>
      </div>
    </div>
    <div class="box game" v-if="!win">
      <div class="background">
        <h3 class="key"><b>{{ currentPair.value }}</b></h3>
        <draggable v-model="shuffledLetters" @end="onEnd" element="div" class="value" :class="correct ?'correct':'default'">
          <div class="letter" v-for="letter in shuffledLetters" :class="letter == ' ' ? 'empty' : ''">
           {{ letter }}
         </div>
       </draggable>
      </div>
    </div>
    <div class="dashboard" v-if="!win">
      <button style="text-transform:none;" id="restart" class="btn btn-sm rounded" @click="start">Перезапуск</button>
      <button style="background:rgb(249, 106, 48);box-shadow: none;text-transform:none;" class="btn btn-sm rounded" @click="next" v-if="correct">Следующее слово</button>
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
          const props = {
            game: 'scramble',
            id: this.$route.params.id
          };
          this.$store.dispatch('incrementAttempts', props);
          this.win = true;
        }
        if(this.doneAttempts == this.totalAttempts) {
          const props = {
            game: 'scramble',
            id: this.$route.params.id
          };
          this.$store.dispatch('gameFinished', props);
        }

        if(this.gamesConditions[0] && this.gamesConditions[1] && this.gamesConditions[2] && this.gamesConditions[3] && this.gamesConditions[4]) {
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
    display: inline-block;
    min-width: 360px;
    max-width: 95%;
    border-top: 3px solid rgb(123, 227, 170);
    border-radius: 5px;
    padding: 0;
  }

  .correct {
    background: #307351;
    color: white;
    z-index: 6 !important;
    opacity: 1 !important;
  }

  .restart:hover {
    cursor: pointer;
  }

  .letter {
    background: rgb(207, 232, 253);
    font-size: 24px;
    border: 1px solid darkgray;
    margin-right: 2px;
    width: 34px;
    z-index: 7 !important;
    border-radius: 5px;
  }

  .empty {
    height: 38px;
  }

  .letter:last-child {
    margin-right: 0;
  }

  .value {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    z-index: 6 !important;
  }

  .correct > .letter {
    background: transparent;
    border: none;
    margin-right: 0;
    width: 24px;
    z-index: 7 !important;
  }

  .background {
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 5;
  } .background:after {
    content : "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('../pics/letters-2.jpg') no-repeat;
    background-size: cover;
    opacity: 0.165;
  }


  .key, .flat-btn {
    margin-bottom: 10px;
    font-weight: bold;
    z-index: 7;
  }

  .higher {
    z-index: 7 !important;
  }

  .name {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  } .name img {
    width: 70px;
    height: 25px;
    margin-right: 10px;
  }

  button {
    font-size: 14px;
    font-weight: bold;
    opacity: 1;
    text-transform: none !important;
  }

  #restart {
    background: rgb(207, 233, 254);
    box-shadow: none;
  }

  .done {
    display: inline-block;
    min-width: 300px;
    border-radius: 4px;
  } .done-header {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(34, 166, 69);
    border-top: 5px solid rgb(17, 131, 47);
    padding: 10px;
    color: white;
    font-weight: bold;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  } .done-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
  } .done-body h5 {
    margin-bottom: 10px !important;
  }
</style>
