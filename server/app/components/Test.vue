<template>
  <div class="container-fluid box">
    <center>
      <i v-if="showPreloader" class="material-icons preloader">cached</i>
      <div v-if="success" class="signup">
        <h3 class="success">Вы прошли тест</h3>
        <h4>Ваш результат: {{ percentage }}/100%</h4>
        <h5 @click="toProfile">Вернуться</h5>
      </div>
    </center>
    <form v-if="!showPreloader && !success" onsubmit="return false">
      <div class="row">
        <h1>Тест</h1>
        <hr>
        <div class="ui divided selection list typeVal">
          <a v-for="pair in typeVal" class="item">
            <div class="ui blue horizontal label">{{ pair.key }}</div>
            <div class="ui input">
              <input type="text" v-model="pair.test" placeholder="Перевод" required>
            </div>
          </a>
        </div>
        <div class="ui divided selection list typeKey">
          <a v-for="pair in typeKey" class="item">
            <div class="ui blue horizontal label">{{ pair.value }}</div>
            <div class="ui input">
              <input type="text" v-model="pair.test" placeholder="Слово" required>
            </div>
          </a>
        </div>
        <button @click="submit" class="btn btn-primary">Готово</button>
      </div>
    </form>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  props: ['stack'],
  data() {
    return {
      pairs: [],
      typeKey: [],
      typeVal: [],
      correct: 0,
      percentage: 0,
      showPreloader: false,
      success: false
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    submit() {
      this.showPreloader = true;
      for(let pair of this.typeKey) {
        if(pair.test.toLowerCase() == pair.key.toLowerCase()) {
          this.correct += 1;
        }
      }
      for(let pair of this.typeVal) {
        if(pair.test.toLowerCase() == pair.value.toLowerCase()) {
          this.correct += 1;
        }
      }
      this.percentage = Math.round(this.correct / (this.typeKey.length + this.typeVal.length) * 100);
      const body = {
        result: this.percentage,
        stackId: this.stack._id,
        name: this.user.name,
        username: this.user.username,
        userId: this.user._id
      };
      this.$http.patch('addresult', body, {
        headers: {
          'Content-type' : 'application/json',
          'Authorization': 'Bearer ' + this.$store.getters.userToken
        }
      }).then(res => {
        this.$http.patch('userresult', {
          stackName: this.stack.name,
          result: this.percentage
        }, {
          headers: {
            'Content-type' : 'application/json',
            'Authorization': 'Bearer ' + this.$store.getters.userToken
          }
        }).then(res => {
          this.showPreloader = false;
          this.success = true;
        });
      });
    },
    toProfile() {
      this.$store.dispatch('zeroAttempts');
      this.$store.dispatch('hideGames');
      this.$router.push('/profile');
    }
  },
  created() {
    for(let task of this.stack.tasks) {
      Array.prototype.push.apply(this.pairs, task.content);
    }
    this.pairs = _.shuffle(this.pairs);
    for(let i = 0; i < this.pairs.length; i++) {
      if(i <= this.pairs.length * 0.3)
        this.typeKey.push(this.pairs[i]);
      else if(i > this.pairs.length * 0.3 && i <= this.pairs.length * 0.6)
        this.typeVal.push(this.pairs[i]);
    }
  },
  http: {
    root: '/api'
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
</style>
