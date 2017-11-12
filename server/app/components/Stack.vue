<template>
<div class="body">
  <app-header></app-header>

  <div class="item">
    <div class="item-bg" :style="{ background: background }">
    </div>

    <div class="p-a-sm main">
      <div class="row">
        <div class="container">
          <div class="col-sm-12">
            <div class="text-white">
              <h4> <img src="../pics/task.png" style="margin-left:12px"> Название урока: <b>{{ task.name }}</b></h4>
              <h5 class="hidden-sm-down" style="margin-left:59px !important;" v-show="!showTest && !games.matching.show && !games.flashcards.show && !games.snake.show && !games.scramble.show && !games.typein.show">Выберите задание</h5>
              <h6 class="no-margin hidden-md-up" style="padding:5px">Чтобы проходить задание с мобильного устройства, воспользуйтесь нашим мобильным приложением.</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div style="margin-bottom:50px;background:#0457a7;" class="dker p-x" v-show="games.matching.show || games.flashcards.show || games.snake.show || games.scramble.show || games.typein.show || showTest">
    <div class="container" style="height: 50px;">
      <div class="row" style="color:white">
        <div class="col-sm-12">
          <center>
          <div class="nav-active-border b-light top">
                <a class="nav-link" @click="hideGames">Назад<br><span style="visibility:hidden;">DoItNow inc.</span></a>
                <a class="nav-link" @click="showFlashcards">
                  Выучи слова <i v-if="games.flashcards.win" class="material-icons">done</i><br>
                  {{ games.flashcards.done + '/' + games.flashcards.attempts }}
                </a>
                <a class="nav-link" @click="showMatching">
                  Найди пару <i v-if="games.matching.win" class="material-icons">done</i><br>
                  {{ games.matching.done + '/' + games.matching.attempts }}
                </a>
                <a class="nav-link" @click="showTypein">
                  Введи слово <i v-if="games.typein.win" class="material-icons">done</i><br>
                  {{ games.typein.done + '/' + games.typein.attempts }}
                </a>
                <a class="nav-link" @click="showSnake">
                  Змейка <i v-if="games.snake.win" class="material-icons">done</i><br>
                  {{ games.snake.done + '/' + games.snake.attempts }}
                </a>
                <a class="nav-link" @click="showScramble">
                  Скрэмбл <i v-if="games.scramble.win" class="material-icons">done</i><br>
                  {{ games.scramble.done + '/' + games.scramble.attempts }}
                </a>
                <a v-if="testAvailable" class="nav-link" @click="tryTest">Пройти тест<br><span style="visibility:hidden;">DoItNow inc.</span></a>
          </div>
        </center>
        </div>
      </div>
    </div>
  </div>

  <div class="container" style="margin-top:-30px">
    <div class="padding" id="gameblock" v-show="!showTest && !games.matching.show && !games.flashcards.show && !games.snake.show && !games.scramble.show && !games.typein.show">
      <div class="row">

        <div class="col-sm-4 hidden-sm-down">
          <div class="col box" style="border-radius:4px;">
            <div class="row-col danger white-text headpadding" style="border-top-left-radius:4px;border-top-right-radius:4px;">
              <center>
                <h3><img src="../pics/learn.png" style="width:25px;height:30"> Учить</h3>
              </center>
            </div>
            <div class="p-a block">
              <center>
                <div class="nav-item">
                  <button style="margin:0;" class="btn btn-sm btn-danger rounded" @click="showFlashcards">Выучи слова</button>
                </div>
                <div class="nav-item">
                  <button class="btn btn-sm btn-danger rounded" @click="showMatching">Найди пару</button>
                </div>
                <div class="nav-item">
                  <button class="btn btn-sm btn-danger rounded" @click="showTypein">Введи слово</button>
                </div>
              </center>
            </div>
          </div>
        </div>

        <div class="col-sm-4 hidden-sm-down">
          <div class="col box" style="border-radius:4px;">
            <div class="row-col warn white-text headpadding" style="border-top-left-radius:4px;border-top-right-radius:4px;">
              <center>
                <h3><img src="../pics/play.png" style="width:25px;height:30"> Играть</h3>
              </center>
            </div>
            <div class="p-a block">
              <center>
                <div class="nav-item">
                  <button class="btn btn-sm btn-warning rounded" @click="showSnake">Змейка</button>
                </div>
                <div class="nav-item">
                  <button class="btn btn-sm btn-warning rounded" @click="showScramble">Скрэмбл</button>
                </div>
              </center>
            </div>
          </div>
        </div>
        <div class="col-sm-4 hidden-sm-down">
          <div class="col box" style="border-radius:4px;">
            <div class="row-col success white-text headpadding" style="border-top-left-radius:4px;border-top-right-radius:4px;">
              <center>
                <h3><img src="../pics/test.png" style="width:25px;height:30"> Тест</h3>
              </center>
            </div>
            <div class="p-a block">
              <div>
                <center>
                  <button class="btn btn-sm btn-success rounded" v-if="testAvailable" @click="tryTest">Пройти тест</button>
                  <button class="btn btn-sm btn-success rounded" v-else>Выполните все задания</button>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row hidden-sm-down" id="translate">
        <div class="col-sm-12" style="border-radius:4px;">
          <div class="box">
            <div class="row-col white-text headpadding" style="border-top-left-radius:4px;border-top-right-radius:4px;background:rgb(113,108,183)">
              <h3 class="text-center"><img src="../pics/repeat.png" style="width:25px;height:30"> Повторить</h3>
            </div>
            <center>
              <div class="table-responsive">
                <table class="table table-striped table-hover" v-if="!showPreloader">
                  <thead>
                    <tr class="headers" style="background:rgb(221,236,252);">
                      <th style="color:black;">Слово</th>
                      <th style="color:black;">Перевод</th>
                    </tr>
                  </thead>
                  <tbody v-for="task in task.tasks">
                    <tr class="body-row" v-for="pair in task.content">
                      <td>{{ pair.key }}</td>
                      <td>{{ pair.value }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </center>
          </div>
        </div>
      </div>
    </div>
  </div>



  <div class="row">
    <flashcards v-if="games.flashcards.show" :stack="task" :nextGame="nextGame"></flashcards>
    <matching v-if="games.matching.show" :stack="task" :nextGame="nextGame"></matching>
    <snake v-if="games.snake.show" :stack="task" :nextGame="nextGame"></snake>
    <scramble v-if="games.scramble.show" :stack="task" :nextGame="nextGame"></scramble>
    <typein v-if="games.typein.show" :stack="task" :nextGame="nextGame"></typein>
    <test v-if="showTest && !games.typein.show && !games.scramble.show && !games.snake.show && !games.matching.show && !games.flashcards.show" :stack="task"></test>
  </div>

</div>
</template>

<script>
import jwtDecode from 'jwt-decode';
import Header from './Header.vue';
import Flashcards from './Flashcards.vue';
import Matching from './Matching.vue';
import Snake from './Snake.vue';
import Scramble from './Scramble.vue';
import Test from './Test.vue';
import {
  EventBus
} from './event';
import Typein from './Typein.vue';

export default {
  data() {
    return {
      testId: this.$route.params.id,
      task: {}
    }
  },
  computed: {
    games() {
      return this.$store.getters.games
    },
    showTest() {
      return this.$store.getters.showTest
    },
    testAvailable() {
      return this.$store.getters.testAvailable
    },
    user() {
      return this.$store.getters.user
    },
    gamesConditions() {
      return this.$store.getters.finishedGames
    },
    token() {
      return jwtDecode(this.$store.getters.userToken)
    },
  },
  http: {
    root: '//ealapi.tw1.ru/api'
    // root: '/api'
  },
  created() {
    this.background = localStorage.background ? localStorage.background : 'linear-gradient(to right, rgb(56, 155, 180), rgb(121, 101, 190)';
    EventBus.$once('requested-header', () => {
      if (!this.$store.getters.loginState)
        this.$router.push('/login');
      if (this.token.permissions != 'student')
        this.$router.push('/profile');
      this.$store.dispatch('hideTest');
      this.$store.dispatch('testNotAvailable');
      this.$store.dispatch('hideGames');
      this.$store.dispatch('zeroAttempts');
      this.$http.post('gettest', {
        testId: this.testId
      }, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.getters.userToken
        }
      }).then(res => {
        this.task = res.body.stack;
        var haveThisStack = false;
        for (let group of this.user._groups) {
          if (haveThisStack)
            break;
          for (let stack of group._tests) {
            if (stack._id == this.task._id) {
              haveThisStack = true;
              break;
            }
          }
        }
        if (!haveThisStack)
          this.$router.push('/profile');
        let done = false;
        this.task.results.map(result => {
          if(result.userId == this.user._id && result.result >= 80) {
            done = true;
          }
        });
        if(done)
          this.$store.dispatch('testAvailable');
        var state = JSON.parse(localStorage.games);
        const id = this.$route.params.id;
        const props = {
          id,
          attempts: this.task.attempts
        };
        if(!!state.length && !done) {
          var found = false;
          state.map(item => {
            if(item.games.id == props.id) {
              this.$store.dispatch('loadGames', props);
            }
          })
          if(!found) {
            this.$store.dispatch('setGames', props);
          }
        } else if(!!!state.length && !done) {
          this.$store.dispatch('setGames', props);
        }
      });
    });
  },
  methods: {
    showMatching() {
      this.$store.dispatch('showMatching');
    },
    showFlashcards() {
      this.$store.dispatch('showFlashcards');
    },
    showSnake() {
      this.$store.dispatch('showSnake');
    },
    showScramble() {
      this.$store.dispatch('showScramble');
    },
    showTypein() {
      this.$store.dispatch('showTypein');
    },
    tryTest() {
      this.$store.dispatch('hideGames');
      this.$store.dispatch('showTest');
    },
    hideGames() {
      this.$store.dispatch('hideGames');
      this.$store.dispatch('hideTest');
    },
    nextGame(name) {
      this.$store.dispatch('show' + name);
    }
  },
  components: {
    'app-header': Header,
    'flashcards': Flashcards,
    'snake': Snake,
    'matching': Matching,
    'scramble': Scramble,
    'test': Test,
    'typein': Typein
  }
}
</script>

<style lang="css" scoped>
  h2 {
    margin-bottom: 20px;
  }

  .text.game {
    color: black;
    text-shadow: none;
  }

  .white-text {
    color: white;
    padding: 35px;
  }

  #gameblock {
    margin-top: 20px;
  }

  #translate {
    margin-top: 20px;
    background: transparent;
  }

  .col-container {
    display: table;
    width: 100%;
}

  .padding {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }

  .col {
    display: table-cell;
}

  .grey {
    background-color: rgb(117, 117, 117)
  }

  ul {
    list-style-type: none;
  }

  .block {
    height: 105px;
  }

  .container {
    width: 75%;
    padding: 0 20px;
  }

  .no-margin {
    margin: 0;
  }

  .table-responsive {
    /*border-top: 5px solid rgb(144, 197, 246);
    border-bottom: 5px solid rgb(211, 215, 217);
    border-radius: 5px;*/
    /*width: 1041px !important;*/
  }

  .headers {
    background: #a88add;
    pointer-events: none;
  }

  .body {
      max-width: 100% !important;
      overflow-x: hidden !important;
  }

  .ad {
    display: flex;
    vertical-align: center;
    justify-content: center;
  }

  .nav-active-border {
    color:white !important;
  }

  .nav-link {
    padding-left: 5px !important;
    padding-right: 5px !important;
  }

  .headpadding {
    padding:10px;
  }

  .btn {
    background: transparent !important;
    color: black;
    border-color: transparent !important;
    box-shadow: none !important;
    text-transform: none !important;
  } .btn-danger:hover {
    background: rgb(241, 70, 89) !important;
  } .btn-warning:hover {
    background: rgb(251, 192, 45) !important;
  } .btn-success:hover {
    background: rgb(107, 191, 133) !important;
  }

</style>
