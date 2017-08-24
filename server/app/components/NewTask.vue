<template>
  <div class="container-fluid">
    <h3>Создать задание</h3>
    <div class="row">
      <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3"></div>
      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 container">
        <center>
          <h4 v-if="!!this.errorMsg" class="errormsg">{{ this.errorMsg }}</h4>
            <div v-if="this.showEditor">
              <div class="row task" v-for="(task, index) in tasks" v-show="task.active">
                <form class="login-form" onsubmit="return false">
                  <table>
                    <tr>
                      <th>Слово</th>
                      <th>Перевод</th>
                    </tr>
                    <tr v-for="pair in task.content">
                      <td>
                        <input type="text" v-model="pair.key" required placeholder="Слово">
                      </td>
                      <td>
                        <input type="text" v-model="pair.value" required placeholder="Перевод">
                      </td>
                    </tr>
                    <tr>
                      <td class="new" colspan="2">
                        <center>
                          <i @focus="newPair(task)" @click="newPair(task)" class="fa fa-plus newpair" aria-hidden="true"></i>
                        </center>
                      </td>
                    </tr>
                  </table>
                  <button @click="confirm" class="btn btn-primary"><i class="fa fa-check-square-o" aria-hidden="true"></i> Готово</button>
                </form>
              </div>
            </div>
            <h4 v-if="this.success" class="success">Задание успешно создано! <span class="link" @click="goto(groupId)">Вернуться</span></h4>
            <div class="login-form" v-if="this.showPost">
              <label>
                Имя теста<br>
              <input type="text" v-model="name">
              </label><br>
              <label>
                Кол-во дней на выполнение<br>
                <input type="number" v-model="timeToDo" min="1">
              </label><br>
              <label>
                Кол-во повторений змейки<br>
                <input type="number" v-model="snakeAttempts" min="1">
              </label><br>
              <label>
                Кол-во повторений перебора букв<br>
                <input type="number" v-model="scrambleAttempts" min="1">
              </label><br>
              <label>
                Кол-во повторений флеш карточек<br>
                <input type="number" v-model="flashcardsAttempts" min="1">
              </label><br>
              <label>
                Кол-во повторений соотношения(matching)<br>
                <input type="number" v-model="matchingAttempts" min="1">
              </label><br>
              <button @click="post" class="btn"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Создать</button>
            </div>
          </center>
        </div>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3"></div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [],
      showEditor: true,
      showPost: false,
      errorMsg: '',
      timeToDo: 1,
      snakeAttempts: 1,
      flashcardsAttempts: 1,
      matchingAttempts: 1,
      scrambleAttempts: 1,
      name: '',
      success: false,
      groupId: this.$route.params.id
    }
  },
  created() {
    var task = {
      content: [],
      repeat: 1,
      active: true
    }
    this.tasks.push(task);
    for(let i = 0; i < 4; i++) {
      this.tasks[0].content.push({
        key: '',
        value: '',
        test: ''
      });
    }

  },
  http: {
    root: '//ealapi.tw1.ru/api'
  },
  methods: {
    newPair(task) {
      for(let i = 0; i < 4; i++) {
        this.tasks[0].content.push({
          key: '',
          value: '',
          test: ''
        });
      }
    },
    confirm() {
      this.tasks[0].content = this.tasks[0].content.filter(pair => pair.key.length != 0 && pair.value.length != 0
        || pair.key.length == 0 && pair.value.length != 0 || pair.key.length != 0 && pair.value.length == 0);
      this.errorMsg = '';
      this.showEditor = false;
      this.showPost = true;
    },
    post() {
      console.log(this.$route.params.id);
      const body = {
        name: this.name,
        tasks: this.tasks,
        timeToDo: this.timeToDo,
        groupId: this.$route.params.id,
        attempts: {
          snake: this.snakeAttempts,
          flashcards: this.flashcardsAttempts,
          matching: this.matchingAttempts,
          scramble: this.scrambleAttempts
        }
      };

      this.$http.post('newstack', body, {
        headers: {
          'Content-type' : 'application/json',
          'Authorization': 'Bearer ' + this.$store.getters.userToken
        }
      }).then(res => {
        var testId = res.body.stack._id;
        this.success = true;
        const body = {
          'groupId': this.$route.params.id,
          'stackId': testId
        };

        this.$http.post('addtest', body, {
          headers: {
            'Content-type' : 'application/json',
            'Authorization': 'Bearer ' + this.$store.getters.userToken
          }
        }).then(response => {}).catch(error => {
          throw error;
        });

      }).catch(err => {
        throw err;
      });
    },
    goto(id) {
      const path = '/group/' + id;
      this.$router.push({ path, alias: '/group' });
    }
  }
}
</script>

<style lang="css" scoped>
.nav {
  border-bottom: 1px solid black;
} .nav-item {
  transition: 0.3s;
  color: #808080;
} .active {
  color: #293132;
} .nav-item:hover {
  color: #293132;
}

.add:hover, .active:hover, .edittask:hover {
  cursor: pointer;
}

.new {
  cell-spacing: 2;
}

table {
  border-bottom: 1px solid black;
  margin-bottom: 20px;
} table tr td:last-of-type {
  border-left: 1px solid black;
} table tr:last-of-type td {
  border: none;
}

.newpair:hover {
  cursor: pointer;
}

.login-form input {
  background: transparent;
  border: none;
  color: #293132;
  font-size: 16px;
  transition: 0.4s;
  border-bottom: 1px solid black;
  margin-right: 10px;
} .login-form input:active,
  .login-form input:focus {
    outline: none;
    border-color: #5688C7;
}
</style>
