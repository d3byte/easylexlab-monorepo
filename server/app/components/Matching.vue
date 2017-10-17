<template>
  <div class="col-lg-12">
    <div class="container">
    <center>
      <div>
        <div class="name">
          <img src="../pics/matching.png">
          <h2>Найди пару</h2>
        </div>
        <h3 style="margin:10px 0 20px 0;">Пройдено раз: {{ doneAttempts }}/{{ totalAttempts }}</h3>
        <div v-if="done || lose" @click="show()" class="vertical-center box">
          <h1 :class="done ? 'text-success': 'text-danger'">{{ lose ? 'Неудача :(' : 'Победа!' }}!</h1>
          <h2>{{ Math.round(100 - incorrect * 100 / correct.length) > 0 ? Math.round(100 - incorrect * 100 / correct.length) : 0}}%</h2>
          <p v-if="lose" @click="restart">Попробуйте еще раз.</p>
        </div>
        <div class="row words box" v-if="!done && !lose">
          <div v-for="item in newPairs" style="z-index:6" class="col-lg-4" id="dju">
            <div class="box word"
                 :id="item.key"
                 :class="selected.first == item.key ||
                         selected.second == item.key
                         ? item.index + ' selected' : item.index"
                 @click="select(item.key)">
              <h2>{{ item.word }}</h2>
            </div>
          </div>
        </div>
        <button style="margin-bottom:20px" id="restart" class="btn btn-sm rounded" @click="restart">Перезапуск</button>
      </div>
    </center>
  </div>
</div>
</template>

<script>
import _ from 'lodash';
import randomize from 'randomatic';

export default {
  props: ['stack'],
  data() {
    return {
      oldPairs: [],
      newPairs: [],
      correct: [],
      incorrect: 0,
      selected: {
        first: null,
        second: null
      },
      done: false,
      lose: false
    }
  },
  computed: {
    showTest() {
      return this.$store.getters.testAvailable
    },
    doneAttempts() {
      return this.$store.getters.games.matching.done
    },
    totalAttempts() {
      return this.$store.getters.games.matching.attempts
    },
    gamesConditions() {
      return this.$store.getters.finishedGames
    }
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
    restart() {
      $('*').removeClass('correct');
      setTimeout(() => {
        this.newPairs = _.shuffle(this.newPairs);
        this.correct = [];
        this.incorrect = 0;
        this.done = false;
        this.lose = false;
        this.selected.first = null;
        this.selected.second = null;
      }, 10);
    },
    allDone() {
      if(Math.round(this.incorrect * 100 / this.correct.length) <= 10) {
        const props = {
          game: 'matching',
          id: this.$route.params.id
        };
        this.$store.dispatch('incrementAttempts', props);
        this.$store.dispatch('gameFinished', props);
        this.done = true;
        return;
      }
      this.lose = true;
    },
    tryTest() {
      this.$store.dispatch('hideGames');
      this.$store.dispatch('showTest');
    },
    checkConditions() {
      if(this.correct.length == this.oldPairs.length &&
         this.doneAttempts + 1 < this.totalAttempts) {
          this.allDone();
      } else if(this.correct.length == this.oldPairs.length &&
                this.doneAttempts + 1 >= this.totalAttempts) {
                  this.allDone();
                  if (this.gamesConditions[0] && this.gamesConditions[1] && this.gamesConditions[2] && this.gamesConditions[3] && this.gamesConditions[4]) {
                    this.$store.dispatch('testAvailable');
                    setTimeout(() => {
                      $('#testavailable').modal('show');
                    }, 50)
                  }
      }
    },
    select(key) {
      this.checkConditions();
      const check = _.find(this.newPairs, word => {
        return word.key == key
      });
      $('.selected').off();
      $('.error').removeClass('error');
      if(this.selected.first && this.selected.first != key && !this.correct.includes(check.index)) {
        this.selected.second = key;
        const first = _.find(this.newPairs, word => {
          return word.key == this.selected.first
        });
        const second = _.find(this.newPairs, word => {
          return word.key == this.selected.second
        });
        if(first.index == second.index) {
          this.correct.push(second.index);
          setTimeout(() => {
            $(`.${second.index}`).addClass('correct');
          }, 10);
          setTimeout(() => {
            this.checkConditions();
          }, 10);
          this.selected.first = null;
          this.selected.second = null;
        } else if(first.index != second.index) {
          setTimeout(() => {
            $(`#${first.key}`).addClass('error');
            $(`#${second.key}`).addClass('error');
          }, 10);
          this.incorrect++;
          this.selected.first = null;
          this.selected.second = null;
        }
      } else if(!this.selected.first && !this.correct.includes(check.index)) {
        this.selected.first = key;
      }
    }
  },
  created() {
    for(let task of this.stack.tasks) {
      if(this.oldPairs.length == 8)
        break;
      Array.prototype.push.apply(this.oldPairs, task.content);
    }
    for(let pair of this.oldPairs) {
      let index = randomize('0', 10);
      let key = {
        word: pair.key,
        key: randomize('0', 10),
        index
      };
      let def = {
        word: pair.value,
        key: randomize('0', 10),
        index
      };
      this.newPairs.push(key);
      this.newPairs.push(def);
    }

    this.newPairs = _.shuffle(this.newPairs);
  }
}
</script>

<style lang="css" scoped>
  .col-lg-3 .box {
    height: 50px;
  }

  .box {
    padding: 10px;
  }

  #dju {
    word-break: break-all;
  }

  #restart {
    background: rgb(207, 233, 254);
    box-shadow: none;
  }

  .selected {
    background: rgb(240, 211, 49) !important;
  }

  .correct {
    background: rgb(123, 227, 170) !important;
  }

  .error {
    background: #DB5461 !important;
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

  .col-lg-12 {
    display: flex;
    justify-content: center;
  }

  .container {
    width: 60%;
    padding: 0 30px;
  }

  .words {
    border-top: 7px solid rgb(123, 227, 170);
    border-radius: 5px;
    z-index: 5;
    min-height: 100px;
    overflow: hidden;
  } .words:after {
    content : "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background: url('../pics/letters-2.jpg') no-repeat;
    background-size: cover;
    opacity: 0.165;
  }

  .word {
    background: rgb(207, 232, 253);
  } .word h2 {
    font-size: 16px;
    font-weight: bold;
  }

  .name {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  } .name img {
    width: 50px;
    height: 25px;
    margin-right: 10px;
  }

  button {
    font-size: 14px;
    font-weight: bold;
    opacity: 1;
    text-transform: uppercase !important;
  }
</style>
