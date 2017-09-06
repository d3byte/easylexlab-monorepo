<template>
<div class="vertical-center">
  <center>
    <div class="container-fluid flashcards">
      <h1>Flashcards</h1>
      <h3>Пройдено раз: {{ doneAttempts }}/{{ totalAttempts }}</h3>
      <div class="row">
        <button @click="restart" class="flat-btn">Перезапуск</button>
      </div>
      <div v-if="done || lose" @click="show()" class="vertical-center box">
        <h1 :class="done ? 'text-success': 'text-danger'">{{ lose ? 'Неудача :(' : 'Победа!' }}!</h1>
        <h2>{{ Math.round(know.length * 100 / pairs.length) }}/100%</h2>
        <p v-if="lose" @click="restart">Попробуйте еще раз.</p>
      </div>
        <div class="col-lg-4 cards-left" v-show="!done && !lose">
          <div class="row-col dark white-text vertical-center cards-left">
            <h3>Осталось карточек: {{ pairsLeft - 1 }}</h3>
          </div>
          <div class="p-a vertical-center box" id="nextkey">
            <h3>{{ nextKey }}</h3>
          </div>
        </div>
          <div class="col-lg-4 task-card">
            <div v-show="!done && !lose" class="pair">
              <div v-show="!showDef" @click="show()" class="vertical-center box task-card">
                <h1>{{ currentPair.key }}</h1>
              </div>
              <div v-show="showDef" @click="show()" class="vertical-center box task-card">
                <h1>{{ currentPair.value }}</h1>
              </div>
            </div>
          </div>
          <div class="col-lg-4 game-btns box" v-show="!done && !lose">
            <div class="vertical-center" id="game-btns-center">
            <button @click="toKnow()" class="btn btn-success">Знаю</button>
            <br>
            <button @click="toDontKnow()" class="btn btn-danger">Не знаю</button>
          </div>
          </div>
    </div>
    <div v-if="done && showTest" class="row">
      <button @click="tryTest" class="btn">Пройти тест</button>
    </div>
</center>
</div>
</div>
</template>

<script>
import _ from 'lodash';

export default {
  props: ['stack'],
  data() {
    return {
      currentPair: {},
      pairsSeen: 0,
      pairsLeft: 0,
      index: 0,
      pairs: [],
      nextPairs: [],
      nextKey: '',
      pairsLength: 0,
      know: [],
      dontKnow: [],
      showDef: false,
      done: false,
      lose: false
    }
  },
  computed: {
    showTest() {
      return this.$store.getters.testAvailable
    },
    doneAttempts() {
      return this.$store.getters.games.flashcards.done
    },
    totalAttempts() {
      return this.$store.getters.games.flashcards.attempts
    },
    gamesConditions() {
      return this.$store.getters.finishedGames
    },
  },
  created() {
    this.currentPair = this.stack.tasks[0].content[0];
    for (let task of this.stack.tasks) {
      Array.prototype.push.apply(this.pairs, task.content);
    }
    this.pairsLeft = this.pairs.length;
    this.nextKey = this.pairs[1].key;
  },
  methods: {
    hideGames() {
      this.$store.dispatch('hideGames');
    },
    showMatching() {
      this.$store.dispatch('showMatching');
    },
    showFlashcards() {
      this.$store.dispatch('showFlashcards');
    },
    show() {
      this.showDef = !this.showDef;
    },
    shuffle() {
      this.pairs = _.shuffle(this.pairs);
      this.currentPair = this.pairs[0];
    },
    restart() {
      this.shuffle(this.pairs);
      this.currentPair = this.pairs[0];
      this.index = 0;
      this.know = [];
      this.dontKnow = [];
      this.done = false;
      this.lose = false;
      this.pairsLeft = this.pairs.length;
      this.nextKey = this.pairs[1].key;
    },
    toKnow() {
      this.pairsLeft--;
      this.know.push(this.currentPair);
      for (let i = 0; i < this.pairs.length; i++) {
        if (this.pairsLeft > 1) {
          this.nextKey = this.pairs[i + 1].key;
        } else if (this.pairsLeft == 1) {
          this.nextKey = 'Последняя карточка';
        }
        if (this.index + 1 == this.pairs.length &&
          this.doneAttempts + 1 >= this.totalAttempts) {
          if (Math.round(this.know.length * 100 / this.pairs.length) >= 90) {
            this.$store.dispatch('incrementAttempts', 'flashcards');
            this.$store.dispatch('gameFinished', 'flashcards');
          } else {
            this.lose = true;
            return;
          }
          if (this.gamesConditions[0] && this.gamesConditions[1] && this.gamesConditions[2] && this.gamesConditions[3] && this.gamesConditions[4]) {
            this.$store.dispatch('testAvailable');
            setTimeout(() => {
              $('#testavailable').modal('show');
            }, 50)
          }
          this.done = true;
          break;
        } else if (this.index + 1 == this.pairs.length) {
          if (Math.round(this.know.length * 100 / this.pairs.length) >= 90) {
            this.$store.dispatch('incrementAttempts', 'flashcards');
          } else {
            this.lose = true;
            return;
          }
          this.done = true;
          break;
        }
        if (this.index < i) {
          this.currentPair = this.pairs[i];
          this.index += 1;
          break;
        }
      }
    },
    toDontKnow() {
      this.pairsLeft--;
      this.dontKnow.push(this.currentPair);
      for (let i = 0; i < this.pairs.length; i++) {
        if (this.pairsLeft > 1) {
          this.nextKey = this.pairs[i + 1].key;
        } else if (this.pairsLeft == 1) {
          this.nextKey = 'Последняя карточка.';
        }
        if (this.index + 1 == this.pairs.length &&
          this.doneAttempts + 1 >= this.totalAttempts) {
          if (Math.round(this.know.length * 100 / this.pairs.length) >= 90) {
            this.$store.dispatch('incrementAttemps', 'flashcards');
            this.$store.dispatch('gameFinished', 'flashcards');
          } else {
            this.lose = true;
            return;
          }
          if (this.gamesConditions[0] && this.gamesConditions[1] && this.gamesConditions[2] && this.gamesConditions[3] && this.gamesConditions[4]) {
            setTimeout(() => {
              $('#testavailable').modal('show');
            }, 50)
          }
          this.done = true;
          break;
        } else if (this.index + 1 == this.pairs.length) {
          if (Math.round(this.know.length * 100 / this.pairs.length) >= 90) {
            this.$store.dispatch('incrementAttemps', 'flashcards');
          } else {
            this.lose = true;
            return;
          }
          this.done = true;
          break;
        }
        if (this.index < i) {
          this.currentPair = this.pairs[i];
          this.index += 1;
          break;
        }
      }
    },
    tryTest() {
      this.$store.dispatch('hideGames');
      this.$store.dispatch('showTest');
    }
  },
  mounted() {
    $('.ui.dropdown').dropdown();
  }
}
</script>

<style lang="css" scoped>
  h1 {
    margin-bottom: 20px;
  }

  .dashboard {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  #game-btns-center {
    margin-top: 80px;
    margin-bottom: 100px;
  }

  .flashcards {
    width: 700px;
  }

  .box.vertical-center {
    height: 150px;;
    justify-content: center;
    margin-bottom: 20px;
    -webkit-user-select: none;
    -moz-user-select: none;
  } .box.vertical-center:hover {
    cursor: pointer;
  }

  /*.main-menu {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
  }*/

  .game-btns {
    height: 268px;
  }

  .last-menu {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }

  .ui.dropdown {
    background: #1DA1F2;
  }

  .text.game {
    color: white;
  }

  #nextkey {
    height: 100px !important;
  }

  .task-card {
    height: 268px !important;
  }

  .cards-left {
    height: 150px !important;
  }

  .btn.back {
    background: #1DA1F2;
  }
</style>
