<template>
    <div id="feedback" class="modal fade" data-backdrop="true" style="display: none;" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Новое сообщение</h5>
          </div>
          <div class="modal-body text-center p-lg">
            <h5 v-if="success && !showPreloader" class="success">Сообщение успешно отправлено.</h5>
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
                  <input type="text" v-model="email" required>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-4 form-control-label">Отзыв</label>
                <div class="col-sm-8">
                  <textarea class="form-control" v-model="text" required></textarea>
                </div>
              </div>
              <!-- <div class="white-text">
                <textarea v-model="text" placeholder="Сообщение" required></textarea>
              </div> -->
              <center>
                <button @click="send" class="btn dark-white p-x-md" v-if="!success">Создать</button>
                <button @click="refresh" type="button" class="btn dark-white p-x-md" data-dismiss="modal" v-if="!success">Отмена</button>
                <button @click="refresh" type="button" class="btn dark-white p-x-md" data-dismiss="modal" v-else>Закрыть</button>
              </center>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: ['group'],
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
        groupId: this.groupId,
        msgText: this.text
      };
      this.success = true;
    },
    refresh() {
      this.success = false;
      this.text = '';
    }
  },
  http: {
    root: '//ealapi.tw1.ru/api'
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
