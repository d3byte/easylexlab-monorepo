<template>
  <div class="vertical-center">
    <center>
      <div class="container flashcards">
        <h1>Flashcards</h1>
        <h3>Пройдено раз: {{ $store.getters.attempts }}/{{ this.stack.attempts }}</h3>
        <div class="dashboard">
          <button @click="restart" class="flat-btn">Перезапуск</button>
          <button class="flat-btn">Помощь</button>
        </div>
        <div v-show="!done" class="pair">
          <div v-show="!showDef" @click="show()" class="vertical-center box">
            <h1>{{ currentPair.key }}</h1>
          </div>
          <div v-show="showDef" @click="show()" class="vertical-center box">
            <h1>{{ currentPair.value }}</h1>
          </div>
          <div class="main-menu">
            <button @click="toKnow()" class="btn btn-success">Знаю</button>
            <button @click="toDontKnow()" class="btn btn-danger">Не знаю</button>
          </div>
        </div>
        <div v-if="done" @click="show()" class="vertical-center box">
          <h1 class="text-success">Готово!</h1>
          <h2>{{ Math.round(know.length * 100 / pairs.length) }}/100%</h2>
        </div>
        <div v-if="done && showTest" class="row">
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
      index: 0,
      pairs: [],
      know: [],
      dontKnow: [],
      showDef: false,
      done: false
    }
  },
  computed: {
    showTest() {
      return this.$store.getters.testAvailable
    }
  },
  created() {
    this.currentPair = this.stack.tasks[0].content[0];
    for(let task of this.stack.tasks) {
      Array.prototype.push.apply(this.pairs, task.content);
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
    },
    toKnow() {
      this.know.push(this.currentPair);
      for(let i = 0; i < this.pairs.length; i++) {
        if(this.index + 1 == this.pairs.length &&
           this.$store.getters.attempts + 1 == this.stack.attempts) {
             this.$store.dispatch('incrementAttemps');
             this.$store.dispatch('testAvailable');
             this.done = true;
             break;
        } else if(this.index + 1 == this.pairs.length) {
            this.$store.dispatch('incrementAttemps');
            this.done = true;
            break;
        }
        if(this.index < i) {
          this.currentPair = this.pairs[i];
          this.index += 1;
          break;
        }
      }
    },
    toDontKnow() {
      this.dontKnow.push(this.currentPair);
      for(let i = 0; i < this.pairs.length; i++) {
        if(this.index + 1 == this.pairs.length &&
           this.$store.getters.attempts + 1 >= this.stack.attempts) {
             this.$store.dispatch('incrementAttemps');
             this.$store.dispatch('testAvailable');
             this.done = true;
             break;
        } else if(this.index + 1 == this.pairs.length) {
            this.$store.dispatch('incrementAttemps');
            this.done = true;
            break;
        }
        if(this.index < i) {
          this.currentPair = this.pairs[i];
          this.index += 1;
          break;
        }
      }
    },
    tryTest() {
      this.$store.dispatch('hideGames');
      this.$store.dispatch('showTest');
    },
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

  .flashcards {
    width: 300px;
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

  .main-menu {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
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
