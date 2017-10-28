<template>
<div class="container padding">
  <center>
    <i v-if="showPreloader" class="material-icons preloader">cached</i>
    <div v-if="done" @click="show()" class="box done">
      <div class="done-header">
        <h3 v-if="msg.slice(0, 6) != 'Хорошо'" class="text-bold">{{ msg }}!</h3>
        <h3 v-if="msg.slice(0, 6) == 'Хорошо'" class="text-bold">{{ msg.slice(0, 6) }}</h3>
      </div>
      <div class="done-body">
        <h5 v-if="msg.slice(0, 6) == 'Хорошо'">{{ msg.slice(7, msg.length) }}</h5>
        <h5 class="text-bold">Ваш результат: {{ percentage }}%</h5>
        <button id="restart" class="btn btn-sm rounded" @click="restart">Перезапуск</button>
        <button v-if="doneAttempts >= totalAttempts" style="background:rgb(111,198,138);margin-top:10px;text-transform:none" class="btn btn-sm rounded" @click="nextGame('Snake')">Следующее задание</button>
      </div>
    </div>
  </center>
  <form v-if="!showPreloader && !done && !lose" class="padding" onsubmit="return false">
    <div class="row padding">
      <center>
        <h1><b>Введи слово</b></h1>
        <h4>Пройдено раз: {{ doneAttempts}}/{{ totalAttempts }}</h4>
      </center>
    </div>
    <div class="row padding box game background">
      <center>
      <h3 style="color: #0062b0">{{ currentPair.value }}</h3>
    </center>
      <div class="md-form-group" style="z-index:6;width:100%">
        <center>
          <input style="width:100%;border-bottom:2px solid rgb(50,124,191);" id="formItem" autocomplete="off" type="text" v-model="currentPair.test" class="md-input" placeholder="Слово">
          <h4 v-if="wrong" class="text-danger" style="margin:10px 0"><b>Неверно! Исправь ошибку!</b></h4>
          <button class="btn btn-check" style="background:rgb(251, 106, 33);color:white;margin-top: 15px;" @click="check">Дальше</button>
        </center>
      </div>
    </div>
  </form>
</div>
</template>

<script>
import _ from 'lodash';

export default {
  props: ['stack', 'nextGame'],
  data() {
    return {
      pairs: [],
      typeVal: [],
      correct: 0,
      incorrect: 0,
      percentage: 0,
      showPreloader: false,
      done: false,
      lose: false,
      wrong: false,
      currentPair: {}
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    gamesConditions() {
      return this.$store.getters.finishedGames
    },
    doneAttempts() {
      return this.$store.getters.games.typein.done
    },
    totalAttempts() {
      return this.$store.getters.games.typein.attempts
    },
  },
  methods: {
    allDone() {
      if (this.percentage >= 90) {
        if (this.percentage == 100) {
          this.msg = 'Отлично!';
        } else {
          this.msg = 'Очень хорошо!';
        }
        const props = {
          game: 'typein',
          id: this.$route.params.id
        };
        this.$store.dispatch('incrementAttempts', props);
        this.$store.dispatch('gameFinished', props);
        this.done = true;
      } else if (this.percentage < 90 && this.percentage >= 60) {
        this.msg = 'Хорошо, но необходимо пройти задание повторно!';
        this.done = true;
        return;
      } else if (this.percentage < 60) {
        this.msg = 'Пройди задание повторно!';
        this.done = true;
      }
      if (this.gamesConditions[0] && this.gamesConditions[1] && this.gamesConditions[2] && this.gamesConditions[3] && this.gamesConditions[4]) {
        this.$store.dispatch('testAvailable');
        setTimeout(() => {
          $('#testavailable').modal('show');
        }, 50)
      }
      this.stack.tasks[0].content.map(pair => pair.test = '');
    },
    restart() {
      this.newPairs = _.shuffle(this.newPairs);
      this.currentPair = this.pairs[0];
      this.correct = 0;
      this.incorrect = 0;
      this.done = false;
      this.lose = false;
      this.wrong = false;
    },
    check() {
      if (this.currentPair.test == this.currentPair.key) {
        this.currentPair.test = '';
        this.wrong = false;
        // Обнуляю тест, чтобы привести пару к исходному состоянию
        // Потому что в this.pairs поле test пустое изначально
        let index = this.pairs.indexOf(this.currentPair);
        this.correct = this.correct + 1;
        if (index != this.pairs.length - 1) {
          this.currentPair = this.pairs[index + 1];
          return;
        } else {
          this.percentage = Math.round(100 - this.incorrect * 100 / this.pairs.length);
          this.allDone(this.percentage);
        }
      } else if (this.currentPair.test != this.currentPair.key) {
        this.currentPair.test = '';
        if(!this.wrong) {
           this.incorrect++;
        }
        this.wrong = true;
        let index = this.pairs.indexOf(this.currentPair);
        if (index != this.pairs.length - 1) {
          // this.currentPair = this.pairs[index + 1];
          return;
        } else {
          this.percentage = Math.round(100 - this.incorrect * 100 / this.pairs.length);
          this.allDone(this.percentage);
        }
      }
        // this.percentage = Math.round(this.correct * 100 / this.pairs.length);
      },
      hideGames() {
          this.$store.dispatch('hideGames');
        },
        start() {
          this.typeKey = [];
          this.typeVal = [];
          this.pairs = _.shuffle(this.pairs);
          this.currentPair = this.pairs[0]; //Берем первую пару. Нам понадобится цикл.
        }
    },
    created() {
      for (let task of this.stack.tasks) {
        Array.prototype.push.apply(this.pairs, task.content);
      }
      this.start();
    },
    http: {
      root: '//ealapi.tw1.ru/api'
    }
  }
</script>

<style lang="css" scoped>
  .preloader {
    color: black;
    font-size: 30px;
  }

  h5 {
    transition: 0.2s;
  } h5:hover {
    cursor: pointer;
    color: #5688C7;
    text-decoration: none;
  }

  .btn-check {
    margin-top: 40px;
  }

  .box.game {
    border-top: 3px solid #5ee6af;
  }

  input {
   text-align:center;
   font-size: 22px;
}

.background {
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
    z-index: 0;
    background: url('../pics/letters-2.png') no-repeat;
    background-size: cover;
    opacity: 1;
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

  #restart {
    background: rgb(207, 233, 254);
    box-shadow: none;
    text-transform: none !important;
  }
</style>
