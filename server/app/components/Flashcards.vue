<template>
<div class="vertical-center">
  <center>
    <div class="container-fluid flashcards">
      <h2 style="margin-bottom:30px"><i class="fa fa-book" aria-hidden="true"></i> Выучи слова</h2>
      <div v-if="done || lose" @click="show()" class="vertical-center box">
        <h1 :class="done ? 'text-success': 'text-danger'">{{ lose ? 'Неудача :(' : 'Победа!' }}!</h1>
        <h2>{{ Math.round(know.length * 100 / pairs.length) }}%</h2>
        <p v-if="lose" @click="restart">Попробуйте еще раз.</p>
      </div>
      <div class="col-md-4" v-show="!done && !lose">
        <div class="row-col red white-text left">
          <h5>Осталось карточек: {{ pairsLeft - 1 }}</h5>
        </div>
        <div class="p-a box cards-left needed-height" id="nextkey">
          <button style="background:rgb(248, 204, 199)" class="btn btn-md rounded">{{ nextKey }}</button>
        </div>
      </div>
      <div class="col-md-4" v-show="!done && !lose">
        <div class="p-a needed-height pair box" style="height:157px;" @click="show()">
          <button v-show="!showDef" style="background:rgb(234, 205, 156)" class="btn btn-lg rounded">{{ currentPair.key }}</button>
          <button v-show="showDef" style="background:rgb(234, 205, 156)" class="btn btn-lg rounded">{{ currentPair.value }}</button>
        </div>
      </div>
      <div class="col-md-4" v-show="!done && !lose">
        <div class="p-a box btns" style="height:157px;">
          <button @click="toKnow()" class="btn" style="background:rgb(251, 106, 33);color:white;">Знаю</button>
          <br>
          <button @click="toDontKnow()" class="btn" style="background:rgb(47, 135, 219);color:white;">Не знаю</button>
        </div>
      </div>
    </div>
    <div v-if="done && showTest" class="row">
      <button @click="tryTest" class="btn">Пройти тест</button>
    </div>
    <div class="row" style="margin-bottom:20px;margin-top:10px;">
      <h5 style="margin-bottom:10px;">Пройдено раз: {{ doneAttempts }}/{{ totalAttempts }}</h5>
      <button id="restart" class="btn btn-sm rounded" @click="restart">Перезапуск</button>
    </div>
  </center>
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
  .dashboard {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  #nextkey {
    word-break: break-all;
  }

  #game-btns-center {
    margin-top: 80px;
    margin-bottom: 100px;
  }

  .flashcards {
    width: 950px;
  }

  .box.vertical-center {
    justify-content: center;
    margin-bottom: 20px;
    -webkit-user-select: none;
    -moz-user-select: none;
  } .box.vertical-center:hover {
    cursor: pointer;
  }

  .game-btns {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    justify-content: center;
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

  .btn.back {
    background: #1DA1F2;
  }

  .game-item {
    height: 200px;
  }

  #restart {
    background: rgb(207, 233, 254);
    box-shadow: none;
  }

  .left {
    border-top: 3px solid rgb(208, 61, 47);
    border-radius: 5px;
  } .left h3 {
    background: #ccc;
  } .red {
    background: rgb(228, 77, 62);
    padding: 2px;
  } .red h5 {
    font-weight: bold;
    font-size: 16px;
    margin-top: 3px;
  }

  .needed-height {
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('../pics/letters-2.jpg') no-repeat;
    background-size: cover;
  }

  .btn.rounded {
    box-shadow: none;
    font-weight: bold;
  }

  .pair {
    border-top: 3px solid rgb(223, 146, 35);
    border-radius: 5px;
  }

  .btns {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-top: 3px solid rgb(123, 227, 170);
    border-radius: 5px;
    background: url('../pics/letters-2.jpg') no-repeat;
    background-size: cover;
  } .btns button {
    width: 140px;
    font-size: 14px;
    font-weight: bold;
  }
</style>
