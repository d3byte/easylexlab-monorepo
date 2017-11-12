<template>
    <div id="feedback" class="modal fade" data-backdrop="true" style="display: none;" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header" style="background:rgb(161, 196, 226);">
            <h5 class="modal-title text-center text-white">
              <b>
                <i class="material-icons">&#xE0C9;</i>
                ОСТАВЬТЕ ОТЗЫВ
              </b>
            </h5>
          </div>
          <div class="modal-body text-center p-lg">
            <h5 v-if="success">Сообщение успешно отправлено.</h5>
            <form class="login-form" onsubmit="return false">
              <div class="form-group row">
                <label class="col-sm-4 form-control-label">ФИО</label>
                <div class="col-sm-8">
                  <input type="text" v-model="name" required>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-4 form-control-label">Электронная почта</label>
                <div class="col-sm-8">
                  <input type="email" v-model="email" required>
                </div>
              </div>
              <div class="form-group row" style="margin-bottom:20px;">
                <label class="col-sm-4 form-control-label">Отзыв</label>
                <div class="col-sm-8">
                  <textarea class="form-control" v-model="text" required></textarea>
                </div>
              </div>
              <center>
                <button @click="send" style="background:rgb(251, 106, 33);color:white;margin-right:10px" class="btn" v-if="!success">Создать</button>
                <button @click="refresh" style="background:rgb(207, 208, 209);color:white" type="button" class="btn" data-dismiss="modal" v-if="!success">Отмена</button>
                <button @click="refresh" style="background:rgb(207, 208, 209);color:white" type="button" class="btn" data-dismiss="modal" v-else>Закрыть</button>
              </center>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      name: '',
      email: '',
      success: false
    }
  },
  computed: {
    user() {
        return this.$store.getters.user
    }
  },
  methods: {
    send() {
      const body = {
        name: this.name,
        text: this.text,
        email: this.email
      };
      this.$http.post('feedback', body, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.getters.userToken
        }
      }).then(res => {
        if(res.body.success)
          this.success = true;
      });
    },
    refresh() {
      this.success = false;
      this.name = '';
      this.email = '';
      this.text = '';
    }
  },
  http: {
    // root: '//ealapi.tw1.ru/api'
    root: '/api'
  }
}
</script>

<style lang="css" scoped>
textarea {
  color: black;
  padding: 10px;
  border-radius: 2px;
}

input {
  width: 300px;
}
</style>
