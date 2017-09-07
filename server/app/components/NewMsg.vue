<template>
    <div id="newmsg" class="modal fade" data-backdrop="true" style="display: none;" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Новое сообщение</h5>
          </div>
          <div class="modal-body text-center p-lg">
            <h5 v-if="success && !showPreloader" class="success">Сообщение успешно отправлено.</h5>
            <center>
              <button v-if="success && !showPreloader" @click="refresh" type="button" class="btn dark-white p-x-md" data-dismiss="modal">Закрыть</button>
            </center>
            <form v-if="!success" class="login-form" onsubmit="return false">
              <div class="form-group row">
                <label class="col-sm-2 form-control-label">Текст сообщения</label>
                <div class="col-sm-10">
                  <textarea class="form-control" rows="5" v-model="text" required></textarea>
                </div>
              </div>
              <!-- <div class="white-text">
                <textarea v-model="text" placeholder="Сообщение" required></textarea>
              </div> -->
              <center>
                <button @click="send" class="btn btn-primary p-x-md" v-if="!success">Отправить</button>
                <button @click="refresh" type="button" class="btn dark-white p-x-md" data-dismiss="modal">Отмена</button>
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
      showPreloader: false,
      success: false,
      groupId: this.$route.params.id
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
      const headers = {
        'Content-type' : 'application/json',
        'Authorization': 'Bearer ' + this.$store.getters.userToken
      };
      this.$http.post('newmsg', body, { headers }).then(res => {
        this.success = true;
        this.showPreloader = false;
      });
    },
    refresh() {
      this.success = false;
      this.text = '';
      this.showPreloader = false;
    }
  },
  http: {
    root: '//ealapi.tw1.ru/api'
  }
}
</script>

<style lang="css">
textarea {
  color: black;
  padding: 10px;
  border-radius: 2px;
}
</style>
