<template>
  <div class="col-lg-12">
    <div class="container">
    <center>
      <div>
        <h1>Matching</h1>
        <h3>Пройдено раз: {{ doneAttempts }}/{{ totalAttempts }}</h3>
        <br>
        <div class="dashboard">
          <button @click="restart" class="flat-btn">Перезапуск</button>
          <button class="flat-btn" @click="hideGames">Назад</button>
          <button v-if="showTest" @click="tryTest" class="flat-btn">Пройти тест</button>
        </div><br>
        <div v-if="done || lose" @click="show()" class="vertical-center box">
          <h1 :class="done ? 'text-success': 'text-danger'">{{ lose ? 'Неудача :(' : 'Победа!' }}!</h1>
          <h2>{{ Math.round(100 - incorrect * 100 / correct.length) }}/100%</h2>
          <p v-if="lose" @click="restart">Попробуйте еще раз.</p>
        </div>
        <div class="row" v-if="!done && !lose">
          <div v-for="item in newPairs" class="col-lg-3">
            <div class="box"
                 :id="item.key"
                 :class="selected.first == item.key ||
                         selected.second == item.key
                         ? item.index + ' selected' : item.index"
                 @click="select(item.key)">
              <h2>{{ item.word }}</h2>
            </div>
          </div>
        </div>
        <br>
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
        this.$store.dispatch('incrementAttempts', 'matching');
        this.$store.dispatch('gameFinished', 'matching');
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

  .selected {
    background: #1DA1F2;
  }

  .correct {
    background: #307351;
  }

  .error {
    background: #DB5461;
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
</style>
