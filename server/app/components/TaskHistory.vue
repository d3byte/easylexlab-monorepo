<template lang="html">
  <div id="history" class="modal fade" data-backdrop="true" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header" style="background:rgb(161, 196, 226);">
          <h5 class="modal-title text-center text-white">
            <b>
              <!-- <i class="material-icons">&#xE8DE;</i> -->
              <img src="../pics/showtaskhistory.png">
              ИСТОРИЯ ЗАДАНИЙ
            </b>
          </h5>
        </div>
        <div class="modal-body">
          <div class="table-responsive box">
            <table class="table table-striped table-hover">
              <thead>
                <tr class="headers">
                  <th class="">Название задания</th>
                  <th>Выполнили:</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody class="task" v-for="task in group._tests">
                <tr>
                  <td>{{ task.name }}</td>
                  <td>{{ task.results.length }}/{{ group._students.length }}</td>
                  <td @click="showOrHideWords(task._id)" class="hover">
                    <i class="material-icons" v-if="show == task._id">&#xE15D;</i>
                    <i class="material-icons" v-else>&#xE148;</i>
                    Показать слова
                  </td>
                  <td @click="removeTask(task._id)" class="hover"><i class="material-icons">remove_circle</i> Удалить</td>
                </tr>
                <tr v-show="show == task._id" class="body-row">
                  <td><b>Слово</b></dh>
                  <td><b>Перевод</b></td>
                </tr>
                <tr class="body-row" v-show="show == task._id" v-for="pair in task.tasks[0].content">
                  <td>{{ pair.key }}</td>
                  <td>{{ pair.value }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer text-center">
          <button type="button" style="background:rgb(207, 208, 209);color:white" class="btn" data-dismiss="modal">Закрыть</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      group: {},
      show: ''
    }
  },
  http: {
    // root: '//ealapi.tw1.ru/api'
    // root: '/api'
  },
  methods: {
    showOrHideWords(id) {
      if(this.show == id) {
        this.show = '';
        return;
      }
      this.show = id;
    },
    removeTask(id) {
      if(confirm('Вы действительно хотите удалить задание?')) {
        const body = {
          stackId: id
        }
        this.$http.post('removetask', body, {
          headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + this.$store.getters.userToken
          }
        }).then(res => {
          if(res.body.success) {
            this.group._tests = this.group._tests.filter(test => test._id != id);
          }
        });
      }
    },
    fetchData() {
      const body = {
        'groupId': this.$route.params.id
      };
      this.$http.post('getgroup', body, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.getters.userToken
        }
      }).then(res => {
        this.group = res.body.group;
      });
    }
  },
  created() {
    this.fetchData();
  }
}
</script>

<style lang="css" scoped>
.hover:hover {
  cursor: pointer;
}

.body-row:nth-child(odd) {
  background: rgb(226, 236, 237) !important;
}

.headers > th {
  vertical-align: middle;
} .headers:hover {
  background: rgb(98, 171, 242) !important;
  color: white !important;
}
</style>
