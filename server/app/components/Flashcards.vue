<template>
<div class="vertical-center">
  <center>
    <div class="container-fluid flashcards">
      <div class="name" v-if="!done">
        <img src="../pics/flashcards.png">
        <h2><b>Выучи слова</b></h2>
      </div>
      <h3 v-if="!done" style="margin-bottom:10px;">Пройдено раз: {{ doneAttempts }}/{{ totalAttempts }}</h3>
      <div v-if="done" @click="show()" class="box done">
        <div class="done-header">
          <h3 v-if="msg.slice(0, 6) != 'Хорошо'">{{ msg }}!</h3>
          <h3 v-if="msg.slice(0, 6) == 'Хорошо'">{{ msg.slice(0, 6) }}</h3>
        </div>
        <div class="done-body">
          <h5 v-if="msg.slice(0, 6) == 'Хорошо'">{{ msg.slice(7, msg.length) }}</h5>
          <h5 class="text-bold">Ваш результат: {{ Math.round(know.length * 100 / pairs.length) }}%</h5>
          <button id="restart" class="btn btn-sm rounded" @click="restart">Перезапуск</button>
          <button v-if="doneAttempts >= totalAttempts" style="background:rgb(111,198,138)" class="btn btn-sm rounded" @click="nextGame('Matching')">Следующее задание</button>
        </div>
      </div>
      <div class="col-md-4" v-show="!done">
        <div class="row-col red white-text left">
          <h5>Осталось карточек: {{ pairsLeft - 1 }}</h5>
        </div>
        <div class="p-a box cards-left needed-height" id="nextkey">
          <button style="background:rgb(248, 204, 199);z-index:6;" class="btn btn-md rounded">{{ nextKey }}</button>
        </div>
      </div>
      <div class="col-md-4" v-show="!done">
        <div class="p-a needed-height pair box" style="height:157px;" @click="show()">
          <button v-show="!showDef" style="background:rgb(234, 205, 156);z-index:6;" class="btn btn-lg rounded">{{ currentPair.key }}</button>
          <button v-show="showDef" style="background:rgb(234, 205, 156);z-index:6;" class="btn btn-lg rounded">{{ currentPair.value }}</button>
        </div>
      </div>
      <div class="col-md-4" v-show="!done">
        <div class="p-a box btns" style="height:157px;">
          <button @click="toKnow()" class="btn" style="background:rgb(251, 106, 33);color:white;z-index:6;">Знаю</button>
          <br>
          <button @click="toDontKnow()" class="btn" style="background:rgb(47, 135, 219);color:white;z-index:6;">Не знаю</button>
        </div>
      </div>
    </div>
    <div v-if="done && showTest" class="row">
      <button @click="tryTest" class="btn">Пройти тест</button>
    </div>
    <div class="row" style="margin-bottom:20px;margin-top:10px;">
      <button v-if="!done" id="restart" class="btn btn-sm rounded" @click="restart">Перезапуск</button>
    </div>
  </center>
</div>
</template>

<script>
import _ from 'lodash';

export default {
  props: ['stack', 'nextGame'],
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
      msg: ''
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
      this.showDef = false;
    },
    toKnow() {
      this.showDef = false;
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
          var percent = Math.round(this.know.length * 100 / this.pairs.length);
          if (percent >= 90) {
            if(percent == 100) {
              this.msg = 'Отлично!';
            } else {
              this.msg = 'Очень хорошо!';
            }
            const props = {
              game: 'flashcards',
              id: this.$route.params.id
            };
            this.$store.dispatch('incrementAttempts', props);
            this.$store.dispatch('gameFinished', props);
          } else if(percent < 90 && percent >= 60) {
            this.msg = 'Хорошо, но необходимо пройти задание повторно!';
            this.done = true;
            return;
          } else if(percent < 60) {
            this.msg = 'Пройди задание повторно!';
            this.done = true;
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
          var percent = Math.round(this.know.length * 100 / this.pairs.length);
          if (percent >= 90) {
            if(percent == 100) {
              this.msg = 'Отлично!';
            } else {
              this.msg = 'Очень хорошо!';
            }
            const props = {
              game: 'flashcards',
              id: this.$route.params.id
            };
            this.$store.dispatch('incrementAttempts', props);
            this.$store.dispatch('gameFinished', props);
          } else if(percent < 90 && percent >= 60) {
            this.msg = 'Хорошо, но необходимо пройти задание повторно!';
            this.done = true;
            return;
          } else if(percent < 60) {
            this.msg = 'Пройди задание повторно!';
            this.done = true;
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
      this.showDef = false;
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
          var percent = Math.round(this.know.length * 100 / this.pairs.length);
          if (percent >= 90) {
            if(percent == 100) {
              this.msg = 'Отлично!';
            } else {
              this.msg = 'Очень хорошо!';
            }
            const props = {
              game: 'flashcards',
              id: this.$route.params.id
            };
            this.$store.dispatch('incrementAttempts', props);
            this.$store.dispatch('gameFinished', props);
          } else if(percent < 90 && percent >= 60) {
            this.msg = 'Хорошо, но необходимо пройти задание повторно!';
            this.done = true;
            return;
          } else if(percent < 60) {
            this.msg = 'Пройди задание повторно!';
            this.done = true;
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
          var percent = Math.round(this.know.length * 100 / this.pairs.length);
          if (percent >= 90) {
            if(percent == 100) {
              this.msg = 'Отлично!';
            } else {
              this.msg = 'Очень хорошо!';
            }
            const props = {
              game: 'flashcards',
              id: this.$route.params.id
            };
            this.$store.dispatch('incrementAttempts', props);
            this.$store.dispatch('gameFinished', props);
          } else if(percent < 90 && percent >= 60) {
            this.msg = 'Хорошо, но необходимо пройти задание повторно!';
            this.done = true;
            return;
          } else if(percent < 60) {
            this.msg = 'Пройди задание повторно!';
            this.done = true;
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
    margin-bottom: 10px;
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
    height: 133px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
  } .needed-height:after {
    content : "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background: url('../pics/letters-2.png') no-repeat;
    background-size: cover;
    opacity: 1;
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
    z-index: 5;
  } .btns:after {
    content : "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background: url('../pics/letters-2.png') no-repeat;
    background-size: cover;
    opacity: 1;
  }

  .btns button {
    width: 140px;
    font-size: 14px;
    font-weight: bold;
    opacity: 1;
    text-transform: uppercase !important;
  }

  button {
    text-transform: none;
  }

  .name {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  } .name img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
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
