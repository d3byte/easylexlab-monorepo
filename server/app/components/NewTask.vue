<template>
  <div class="container-fluid">
    <h3>Создать задание</h3>
    <div class="row">
      <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3"></div>
      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 container">
        <center>
          <h4 v-if="!!this.errorMsg" class="errormsg">{{ this.errorMsg }}</h4>
            <div v-if="this.showEditor" class="row nav">
                <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1" v-for="(task, index) in tasks">
                    <h3 class="nav-item active" v-if="task.active"><i class="fa fa-thumb-tack" aria-hidden="true"></i></h3>
                    <h3 class="nav-item edittask" v-else @click="editTask(task)"><i class="fa fa-square-o" aria-hidden="true"></i></h3>
                </div>
              <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                <h3 @click="add" class="add"><i class="fa fa-plus-square-o" aria-hidden="true"></i></h3>
              </div>
            </div>
            <div v-if="this.showEditor">
              <div  class="row task" v-for="(task, index) in tasks" v-show="task.active">
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
                  <label>
                    Кол-во повторений <br>
                    <input type="number" value="1" min="1" v-model="task.repeat" required>
                  </label><br>
                  <button @click="confirm" class="btn"><i class="fa fa-check-square-o" aria-hidden="true"></i> Готово</button>
                </form>
              </div>
            </div>
            <h4 v-if="this.success" class="success">Задание успешно создано! <span class="link" @click="goto(groupid)">Вернуться</span></h4>
            <div class="login-form" v-if="this.showPost">
              <label>
                Имя теста<br>
              <input type="text" v-model="name">
              </label><br>
              <label>
                Кол-во дней на выполнение<br>
                <input type="number" v-model="timeToDo" min="1">
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
  props: ['groupid'],
  data() {
    return {
      tasks: [],
      showEditor: true,
      showPost: false,
      errorMsg: '',
      timeToDo: 1,
      name: '',
      success: false
    }
  },
  created() {
    var task = {
      content: [
        {
          key: '',
          value: ''
        }
      ],
      repeat: 1,
      active: true
    }
    this.tasks.push(task);
  },
  http: {
    root: '/api'
  },
  methods: {
    add() {
      var newTask = {
        content: [
          {
            key: '',
            value: ''
          }
        ],
        repeat: 1,
        active: false
      }
      this.tasks.push(newTask);
    },
    editTask(task) {
      for(let item of this.tasks) {
        item.active = false;
      }
      task.active = true;
    },
    newPair(task) {
      var newPair = {
        key: '',
        value: ''
      };
      task.content.push(newPair);
    },
    confirm() {
      var allGood = true;
      for(var task of this.tasks) {
        if(!allGood)
          break;
        for(var pair of task.content) {
          if(!allGood)
            break;
          if(pair.key.length == 0 || pair.value.length == 0) {
            allGood = false;
            this.errorMsg = 'Заполните все слова.';
          }
        }
      }
      if(allGood) {
        this.errorMsg = '';
        this.showEditor = false;
        this.showPost = true;
      }
    },
    post() {
      const body = {
        'name': this.name,
        'tasks': this.tasks,
        'timeToDo': this.timeToDo,
        'groupId': this.groupid
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
          'groupId': this.groupid,
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
  border-bottom: 1px solid white;
} .nav-item {
  transition: 0.3s;
} .active {
  color: white;
} .edittask:hover {

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

input {
  border-bottom: 1px solid white;
}

.newpair:hover {
  cursor: pointer;
}

.success {
  color: #307351;
}
</style>
