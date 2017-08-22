<template>
  <div class="col-lg-12">
    <center>
      <div>
        <h1>Matching</h1>
        <h3>Пройдено раз: {{ doneAttempts }}/{{ totalAttempts }}</h3>
        <br>
        <div class="row">
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
      <div v-if="showTest" class="row">
        <button @click="tryTest" class="btn">Пройти тест</button>
      </div>
      <div class="last-menu">
        <div class="ui dropdown btn">
          <div class="text game">Выбрать игру</div>
          <div class="menu">
            <div @click="showMatching" class="item">
              Matching
            </div>
            <div @click="showFlashcards" class="item">
              Flashcards
            </div>
          </div>
        </div>
        <button class="btn back" @click="hideGames">Назад</button>
      </div>
    </center>
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
      selected: {
        first: null,
        second: null
      },
      done: false
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
      setTimeout(() => {
        this.newPairs = _.shuffle(this.newPairs);
        this.correct = [];
        this.selected.first = null;
        this.selected.second = null;
      }, 10);
    },
    allDone() {
      this.done = true;
    },
    tryTest() {
      this.$store.dispatch('hideGames');
      this.$store.dispatch('showTest');
    },
    checkConditions() {
      $('*').removeClass('correct');
      if(this.correct.length == this.oldPairs.length &&
         this.doneAttempts + 1 < this.totalAttempts) {
          this.$store.dispatch('incrementAttemps', 'matching');
          this.restart();
      } else if(this.correct.length == this.oldPairs.length &&
                this.doneAttempts + 1 >= this.totalAttempts) {
                  this.$store.dispatch('incrementAttemps', 'matching');
                  this.$store.dispatch('gameFinished', 'matching');
                  if(this.gamesConditions[0] && this.gamesConditions[1] && this.gamesConditions[2] && this.gamesConditions[3])
                    this.$store.dispatch('testAvailable');
                  this.allDone();
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
  },
  mounted() {
    $('.ui.dropdown').dropdown();
  }
}
</script>

<style lang="css" scoped>
  .box {
    height: 50px;
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
