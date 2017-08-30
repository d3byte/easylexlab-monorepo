<template lang="html">
  <div id="history" class="modal fade" data-backdrop="true" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">История заданий</h5>
        </div>
        <div class="modal-body text-center p-lg">
          <table class="table table-striped b-t b-b box">
            <thead>
              <tr>
                <th>Название задания</th>
                <th>Выполнили:</th>
              </tr>
            </thead>
            <tbody class="task" v-for="task in group._tests">
              <tr>
                <td>{{ task.name }}</td>
                <td>{{ task.results.length }}/{{ group._students.length }}</td>
                <td @click="showOrHideWords(task._id)" class="hover">
                  <i class="fa fa-eercast" aria-hidden="true" v-if="show == task._id"></i>
                  <i class="fa fa-bandcamp" aria-hidden="true" v-else></i>
                  Показать слова
                </td>
              </tr>
              <tr v-show="show == task._id">
                <td><b>Слово</b></dh>
                <td><b>Перевод</b></td>
              </tr>
              <tr v-show="show == task._id" v-for="pair in task.tasks[0].content">
                <td>{{ pair.key }}</td>
                <td>{{ pair.value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer text-center">
          <button type="button" class="btn dark-white p-x-md" data-dismiss="modal">Закрыть</button>
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
    root: '//ealapi.tw1.ru/api'
  },
  methods: {
    showOrHideWords(id) {
      if(this.show == id) {
        this.show = '';
        return;
      }
      this.show = id;
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

<style lang="css">
.hover:hover {
  cursor: pointer;
}
</style>
