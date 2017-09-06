<template>
<div>
  <app-header></app-header>

  <div class="item">
    <div class="item-bg" style="background: lightgray;">
    </div>

    <div class="p-a-md">
      <div class="row m-t">
        <div class="col-sm-7">
          <div class="clear m-b">
            <h3 class="m-a-0 m-b-xs">Название урока: {{ task.name }}</h3><br>
            <h4 class="hidden-sm-down text-muted" v-show="!showTest && !games.matching.show && !games.flashcards.show && !games.snake.show && !games.scramble.show && !games.typein.show">Выберите вид деятельности</h4>
            <h6 class="hidden-md-up text-muted">Игры недоступны в мобильной версии. Чтобы пройти игры с мобильного устройства, воспользуетесь мобильным приложением.</h6>
          </div>
        </div>
        <div class="col-sm-5">
        </div>
      </div>
    </div>
  </div>

  <div class="dker p-x" v-show="games.matching.show || games.flashcards.show || games.snake.show || games.scramble.show || games.typein.show">
    <div class="row">
      <div class="col-sm-6 push-sm-6">
      </div>
      <div class="col-sm-6 pull-sm-6">
        <div class="p-y-md clearfix nav-active-primary">
          <ul class="nav nav-pills nav-sm">
            <li class="nav-item">
              <a class="nav-link" @click="hideGames">Назад</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="showFlashcards">
                Flashcards <i v-if="games.flashcards.win" class="material-icons">done</i><br>
                {{ games.flashcards.done + '/' + games.flashcards.attempts }}
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="showMatching">
                Matching <i v-if="games.matching.win" class="material-icons">done</i><br>
                {{ games.matching.done + '/' + games.matching.attempts }}
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="showTypein">
                Type In <i v-if="games.typein.win" class="material-icons">done</i><br>
                {{ games.typein.done + '/' + games.typein.attempts }}
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="showSnake">
                Змейка <i v-if="games.snake.win" class="material-icons">done</i><br>
                {{ games.snake.done + '/' + games.snake.attempts }}
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="showScramble">
                Word Scramble <i v-if="games.scramble.win" class="material-icons">done</i><br>
                {{ games.scramble.done + '/' + games.scramble.attempts }}
              </a>
            </li>
            <li class="nav-item" v-if="testAvailable">
              <a class="nav-link" @click="tryTest">Пройти тест</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>


  <div class="padding" id="gameblock" v-show="!showTest && !games.matching.show && !games.flashcards.show && !games.snake.show && !games.scramble.show && !games.typein.show">
    <div class="row">
    <div class="col-sm-4 hidden-sm-down">
      <div class="col box">
        <div class="row-col success white-text">
          <h3>Учить</h3></div>
        <div class="p-a text-center">
          <ul class="nav nav-pills nav-sm">
            <li class="nav-item">
              <a class="nav-link" @click="showFlashcards">Flashcards</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="showMatching">Matching</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="showTypein">Type In</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="col-sm-4 hidden-sm-down">
      <div class="col box">
        <div class="row-col info white-text">
          <h3>Играть</h3></div>
        <div class="p-a text-center">
          <ul class="nav nav-pills nav-sm">
            <li class="nav-item">
              <a class="nav-link" @click="showSnake">Змейка</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="showScramble">Word Scramble</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-sm-4 hidden-sm-down">
      <div class="col box">
        <div class="row-col danger white-text">
          <h3>Тест</h3></div>
        <div class="p-a text-center">
          <ul class="nav nav-pills nav-sm">
            <li class="nav-item">
              <a class="nav-link" v-if="testAvailable" @click="tryTest">Пройти тест</a>
              <a class="nav-link" v-else>Тест будет доступен после прохождения всех игр</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="row col-lg-12" id="translate">
    <div class="box">
      <div class="row-col grey white-text">
        <h3>Повторить</h3>
      </div>
      <div class="p-a table-responsive">
        <table class="table table-striped table-hover">
          <thead>
          <tr>
            <th>Слово</th>
            <th>Перевод</th>
          </tr>
        </thead>
        <tbody v-for="task in task.tasks">
          <tr v-for="pair in task.content">
            <td>{{ pair.key }}</td>
            <td>{{ pair.value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</div>



      <div class="row">
      <flashcards v-if="games.flashcards.show" :stack="task"></flashcards>
      <matching v-if="games.matching.show" :stack="task"></matching>
      <snake v-if="games.snake.show" :stack="task"></snake>
      <scramble v-if="games.scramble.show" :stack="task"></scramble>
      <typein v-if="games.typein.show" :stack="task"></typein>
      <test v-if="showTest" :stack="task"></test>
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
import { EventBus } from './event';
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
  },
  created() {
    EventBus.$once('requested-header', () => {
      if(!this.$store.getters.loginState)
        this.$router.push('/login');
      if(this.token.permissions != 'student')
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
        if(!haveThisStack)
          this.$router.push('/profile');
        let done = false;
        this.task.results.map(result => {
          if(result.userId == this.user._id && result.result >= 80) {
            done = true;
          }
        });
        if(done)
          this.$store.dispatch('testAvailable');
        this.$store.dispatch('setGames', this.task.attempts);
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
      this.$store.dispatch('showTest');
    },
    hideGames() {
      this.$store.dispatch('hideGames');
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

<style lang="css">
  h2 {
    margin-bottom: 20px;
  }

  .container {
    margin-bottom: 50px;
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
</style>
