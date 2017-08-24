<template>
  <!-- Modal -->
  <div id="m-a-f" class="modal fade" data-backdrop="true" style="display: none;" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal</h5>
        </div>
        <div class="modal-body text-center p-lg">
          <h5 class="success" v-if="success">
            Группа успешно создана!
            <br>
            <button class="btn btn-primary goto" id="hide" data-dismiss="modal" @click="goto(newGroupId)"> Перейти</button>
            <br>
          </h5>
          <form class="login-form" onsubmit="return false">
            <div class="name white-text">
              <label>Название группы</label><br>
              <input v-model="name" required type="text" tabindex="1">
            </div>
            <div class="grade white-text">
              <label>Класс</label><br>
              <input v-model="grade" required type="number" tabindex="2" min="1" max="11">
            </div>
            <center>
              <button @click="create" class="btn dark-white p-x-md" tabindex="3">Создать</button>
              <button type="button" class="btn dark-white p-x-md" data-dismiss="modal">Отмена</button>
            </center>
          </form>
        </div>
      </div><!-- /.modal-content -->
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      token: this.$store.getters.userToken,
      name: '',
      grade: null,
      success: false,
      error: false,
      errormsg: '',
      newGroupId: ''
    }
  },
  http: {
    root: '//ealapi.tw1.ru/api'
  },
  methods: {
    hideModal() {
      $('.ui.basic.modal').modal('hide');
    },
    goto(id) {
      const path = '/group/' + id;
      this.$router.push({ path, alias: '/group' });
    },
    create() {
      if(this.name.length > 0 && this.grade >= 1 && this.grade <= 11) {
        const body = {
          'name': this.name,
          'grade': this.grade
        };
        this.$http.post('addgroup', body,
        {
          headers: {
            'Content-type' : 'application/json',
            'Authorization': 'Bearer ' + this.token
          }
        }).then(res => {
          this.newGroupId = res.body.data._id;
          this.success = true;
          this.error = false;
        }).catch(err => {
          this.success = false;
          this.error = true;
          this.errormsg = err;
          throw err;
        });
      }
    },
  }
}
</script>

<style lang="css">
.success {
  color: #307351;
}

.goto{
  margin:20px;
}

.name, .grade {
  margin-bottom: 5px;
}

.link {
  transition: 0.3s;
} .link:hover {
  cursor: pointer;
  color: #FCA311;
}
</style>
