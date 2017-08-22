<template>
  <div>
    <app-header style="margin-bottom: 60px;"></app-header>
    <flashcards v-if="games.flashcards.show" :stack="task"></flashcards>
    <matching v-if="games.matching.show" :stack="task"></matching>
    <snake v-if="games.snake.show" :stack="task"></snake>
    <scramble v-if="games.scramble.show" :stack="task"></scramble>
    <test v-if="showTest" :stack="task"></test>
    <div v-show="!showTest && !games.matching.show && !games.flashcards.show && !games.snake.show && !games.scramble.show">
      <div class="container">
        <div class="row box">
          <center>
            <h2>{{ task.name }}</h2>
              <div class="text game">Выбрать игру</div>
              <div class="menu">
                <div @click="showMatching" class="item">
                  Matching
                </div>
                <div @click="showFlashcards" class="item">
                  Flashcards
                </div>
                <div @click="showSnake" class="item">
                  Snake
                </div>
                <div @click="showScramble" class="item">
                  Word Scramble
                </div>
              </div>
            <button v-if="testAvailable" @click="tryTest" class="btn">Пройти тест</button>
          </center>
        </div>
      </div>
      <div class="container">
        <div class="row box">
          <center>
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
          </center>
        </div>
      </div>
    </div>
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
    }
  },
  http: {
    root: '/api'
  },
  created() {
    if(!this.$store.getters.loginState || this.user.permissions != 'student') {
      this.$router.push('/profile');
    }
    this.$http.post('gettest', { testId: this.testId }, {
      headers: {
        'Content-type' : 'application/json',
        'Authorization': 'Bearer ' + this.$store.getters.userToken
      }
    }).then(res => {
      this.task = res.body.stack;
      var haveThisStack = false;
      for(let group of this.user._groups) {
        if(haveThisStack)
          break;
        for(let stack of group._tests) {
          if(stack._id == this.task._id) {
            haveThisStack = true;
            break;
          }
        }
      }
      if(!haveThisStack)
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
</style>
