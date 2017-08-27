<template>
  <div id="newtask" class="modal fade" data-backdrop="true" style="display: none;" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Новое задание</h5>
        </div>
        <div class="modal-body text-center p-lg">
          <h5 v-if="success" class="success">Задание успешно создано.</h5>
          <form class="login-form" onsubmit="return false" v-if="this.showEditor">
            <table class="table table-striped b-t b-b">
              <tr>
                <th>Слово</th>
                <th>Перевод</th>
              </tr>
              <tr v-for="pair in tasks[0].content">
                <td>
                  <div class="form-group row">
                    <label class="col-sm-2 form-control-label">Слово</label>
                    <div class="col-sm-10">
                      <input type="text" v-model="pair.key" required>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="form-group row">
                    <label class="col-sm-2 form-control-label">Перевод</label>
                    <div class="col-sm-10">
                      <input type="text" v-model="pair.value" required>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="new" colspan="2">
                  <center>
                    <i @focus="newPair(tasks[0])" @click="newPair(tasks[0])" class="fa fa-plus newpair" aria-hidden="true"></i>
                  </center>
                </td>
              </tr>
            </table>
            <center>
              <button @click="confirm" class="btn btn-primary">Готово</button>
            </center>
          </form>
          <div v-if="this.showPost">
            <form onsubmit="return false">
              <div class="form-group row">
                <label class="col-sm-6 form-control-label">Название задания</label>
                <div class="col-sm-6">
                  <input type="text" v-model="name" required>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-6 form-control-label">Кол-во дней на выполнение</label>
                <div class="col-sm-6">
                  <input type="number" v-model="timeToDo" min="1">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-6 form-control-label">Кол-во повторений змейки</label>
                <div class="col-sm-6">
                  <input type="number" v-model="snakeAttempts" min="1">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-6 form-control-label">Кол-во повторений перебора букв</label>
                <div class="col-sm-6">
                  <input type="number" v-model="scrambleAttempts" min="1">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-6 form-control-label">Кол-во повторений флеш карточек</label>
                <div class="col-sm-6">
                  <input type="number" v-model="flashcardsAttempts" min="1">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-6 form-control-label">Кол-во повторений соотношения(matching)</label>
                <div class="col-sm-6">
                  <input type="number" v-model="matchingAttempts" min="1">
                </div>
              </div>
              <hr>
              <button @click="post" class="btn dark-white p-x-md" v-if="!success">Создать</button>
              <button type="button" class="btn dark-white p-x-md" data-dismiss="modal" v-if="!success">Отмена</button>
              <button type="button" class="btn dark-white p-x-md" data-dismiss="modal" v-else>Закрыть</button>
            </form>
          </div>
        </div>
      </div>
    </div>
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
  http: {
    root: '//ealapi.tw1.ru/api'
  },
  methods: {
    refresh() {
      this.errorMsg = '';
      this.timeToDo = 1;
      this.snakeAttempts = 1;
      this.flashcardsAttempts = 1;
      this.matchingAttempts = 1;
      this.scrambleAttempts = 1;
      this.name = '';
      this.success = false;
      this.showPost = false;
      this.showEditor = true;
      this.tasks = [];
      var task = {
        content: [],
        repeat: 1,
        active: true
      }
      this.tasks.push(task);
      this.tasks[0].content = [];
      for(let i = 0; i < 4; i++) {
        this.tasks[0].content.push({
          key: '',
          value: '',
          test: ''
        });
      }
    },
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
  },
  created() {
    this.refresh();
  }
}
</script>

<style lang="css" scoped>

input {
  color: black;
}
</style>
