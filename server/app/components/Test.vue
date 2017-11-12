<template>
  <div>
    <center>
      <div v-if="success" class="box done">
        <div class="done-header">
          <h3 class="text-bold">Вы прошли тест</h3>
        </div>
        <div class="done-body">
          <!-- <h5 v-if="msg.slice(0, 6) == 'Хорошо'">{{ msg.slice(7, msg.length) }}</h5> -->
          <h5 class="text-bold">Ваш результат: {{ percentage }}%</h5>
          <h5>Вы выучили {{ wordsLearnt }} слов</h5>
          <button id="restart" class="btn btn-sm rounded" @click="toProfile">Ок</button>
        </div>
      </div>
    </center>
    <div class="container box game padding" v-if="!success" style="margin-top:50px;">
      <center>
        <i v-if="showPreloader" class="material-icons preloader">cached</i>
      </center>
      <form v-if="!showPreloader && !success" onsubmit="return false">
        <div class="row padding">
          <h1>Тест</h1>
          <hr>
          <div class="md-form-group" v-for="pair in typeVal">
            <input type="text" v-model="pair.test" class="md-input" placeholder="Перевод" required>
            <label>{{ pair.key }}</label>
          </div>
          <div class="md-form-group" v-for="pair in typeKey">
            <input type="text" v-model="pair.test" class="md-input" placeholder="Слово" required>
            <label>{{ pair.value }}</label>
          </div>
          <button @click="submit" class="btn" style="background:rgb(251, 106, 33);color:white;box-shadow:none;padding-left:40px;padding-right:40px;">Готово</button>
        </div>
      </form>
    </div>
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
      success: false,
      wordsLearnt: 0
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
      if (this.percentage >=90){
        if (this.percentage == 100){
          this.msg = 'Отлично!';
        } else {
          this.msg = 'Очень хорошо!';
        }
      } else if (this.percentage < 90 && this.percentage >= 60){
        this.msg = 'Хорошо, но необходимо пройти задание повторно!';
        this.done = true;
        return;
      } else if (this.percentage < 60) {
        this.msg = 'Пройди задание повторно!';
        this.done = true;
      }
      let done = false;
      this.stack.results.map(result => {
        if(result.userId == this.user._id)
          done = true;
      })
      if(!done) {
        this.wordsLearnt = Math.round(this.pairs.length * (this.percentage / 100));
        const body = {
          result: this.percentage,
          stackId: this.stack._id,
          name: this.user.firstName + ' ' + this.user.lastName,
          username: this.user.username,
          userId: this.user._id
        };
        this.$http.patch('words', {
          amount: this.wordsLearnt,
          stackId: this.stack._id,
          userResult: this.percentage,
          pairsLength: this.pairs.length
        }, {
          headers: {
            'Content-type' : 'application/json',
            'Authorization': 'Bearer ' + this.$store.getters.userToken
          }
        }).then(res => {
          this.wordsLearnt = res.body.wordsLearnt;
          this.$http.patch('addresult', body, {
            headers: {
              'Content-type' : 'application/json',
              'Authorization': 'Bearer ' + this.$store.getters.userToken
            }
          }).then(response => {
            this.success = true;
            this.showPreloader = false;
          });
        })
      } else {
        const body = {
          result: this.percentage,
          stackId: this.stack._id
        };
        this.wordsLearnt = Math.round(this.pairs.length * (this.percentage / 100));
        this.$http.patch('words', {
          amount: this.wordsLearnt,
          stackId: this.stack._id,
          userResult: this.percentage,
          pairsLength: this.pairs.length
        }, {
          headers: {
            'Content-type' : 'application/json',
            'Authorization': 'Bearer ' + this.$store.getters.userToken
          }
        }).then(res => {
          this.wordsLearnt = res.body.wordsLearnt;
          this.$http.patch('updateresult', body, {
            headers: {
              'Content-type' : 'application/json',
              'Authorization': 'Bearer ' + this.$store.getters.userToken
            }
          }).then(response => {
            this.success = true;
            this.showPreloader = false;
            this.$store.dispatch('zeroAttempts');
            this.$store.dispatch('showTest');
            this.$store.dispatch('testNotAvailable');
          });
        });
      }
    },
    toProfile() {
      this.$router.push('/profile');
    }
  },
  created() {
    for(let task of this.stack.tasks) {
      Array.prototype.push.apply(this.pairs, task.content);
    }
    this.pairs = _.shuffle(this.pairs);
    for(let i = 0; i < this.pairs.length; i++) {
      if(i <= this.pairs.length * 0.5)
        this.typeKey.push(this.pairs[i]);
      else if(i > this.pairs.length * 0.5 && i <= this.pairs.length)
        this.typeVal.push(this.pairs[i]);
    }
  },
  http: {
    root: '//ealapi.tw1.ru/api'
    // root: '/api'
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

  label {
    font-size: 14px;
  }

  .box.game {
    border-top: 5px solid #5ee6af;
    border-radius: 4px;
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
  }
</style>
