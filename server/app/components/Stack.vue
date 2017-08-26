<template>
<div>
  <app-header></app-header>

  <div class="item">
    <div class="item-bg">
      <img src="../assets/images/a6.jpg" class="blur opacity-3">
    </div>

    <div class="p-a-md">
      <div class="row m-t">
        <div class="col-sm-7">
          <div class="clear m-b">
            <h3 class="m-a-0 m-b-xs">{{ task.name }}</h3>
            <h4> Выберите игру: </h4>
          </div>
        </div>
        <div class="col-sm-5">
        </div>
      </div>
    </div>
  </div>


  <div class="padding" id="gameblock" v-show="!showTest && !games.matching.show && !games.flashcards.show && !games.snake.show && !games.scramble.show">
    <div class="row">
    <div class="col-sm-6">
      <div class="col box">
        <div class="row-col success white-text text-center">
          <h1>Учить</h1></div>
        <div class="p-a text-center">
          <h4 @click="showMatching">Matching</h4>
          <h4 @click="showFlashcards">Flashcards</h4>
        </div>
      </div>
    </div>

    <div class="col-sm-6">
      <div class="col box">
        <div class="row-col warn white-text text-center">
          <h1>Играть</h1></div>
        <div class="p-a text-center">
          <h4 @click="showSnake">Змейка</h4>
          <h4 @click="showScramble">Word Scramble</h4>
        </div>
      </div>
    </div>
  </div>
</div>

            <!-- <button v-if="testAvailable" @click="tryTest" class="btn">Пройти тест</button> -->
      <div class="container">
        <div class="row box">
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

      <div class="col-sm-3"></div>
      <div class="col-sm-3" v-if="testAvailable">
        <div class="col box">
          <div class="row-col danger white-text text-center">
            <h1>Тест</h1></div>
          <div class="p-a text-center">
            <h4 @click="tryTest">Пройти тест</h4>
          </div>
        </div>
      </div>
      <div class="col-sm-3"></div>

      <flashcards v-if="games.flashcards.show" :stack="task"></flashcards>
      <matching v-if="games.matching.show" :stack="task"></matching>
      <snake v-if="games.snake.show" :stack="task"></snake>
      <scramble v-if="games.scramble.show" :stack="task"></scramble>
      <test v-if="showTest" :stack="task"></test>

    </div>

</template>

<script>
import Header from './Header.vue';
import Flashcards from './Flashcards.vue';
import Matching from './Matching.vue';
import Snake from './Snake.vue';
import Scramble from './Scramble.vue';
import Test from './Test.vue';

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
    }
  },
  http: {
    root: '/api'
  },
  created() {
    if (!this.$store.getters.loginState || this.user.permissions != 'student') {
      this.$router.push('/profile');
    }
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
      this.$store.dispatch('setGames', this.task.attempts);
    });
  },
  mounted() {
    $('.ui.dropdown').dropdown();
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
    tryTest() {
      this.$store.dispatch('showTest');
    }
  },
  components: {
    'app-header': Header,
    'flashcards': Flashcards,
    'snake': Snake,
    'matching': Matching,
    'scramble': Scramble,
    'test': Test
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

  .col-container {
    display: table;
    width: 100%;
}

  .col {
    display: table-cell;
}
</style>
