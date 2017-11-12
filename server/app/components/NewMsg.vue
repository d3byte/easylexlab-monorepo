<template>
    <div id="newmsg" class="modal fade" data-backdrop="true" style="display: none;" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header" style="background:rgb(161, 196, 226);">
            <h5 class="modal-title text-center text-white">
              <b>
                <!-- <i class="material-icons">&#xE0C9;</i> -->
                <img src="../pics/newmsg.png">
                НОВОЕ СООБЩЕНИЕ
              </b>
            </h5>
          </div>
          <div class="modal-header" style="background:rgb(227, 243, 254);padding:5px 10px;padding-top:10px">
            <h6 v-if="!success" style="color:rgb(116, 154, 184)">
              <i class="material-icons">&#xE150;</i>
              <b>Введите сообщение и нажмите кнопку "Отправить". <br> <span style="margin-left:22px;">Сообщение будет доставлено всем ученикам данной группы.</span></b>
            </h6>
          </div>
          <div class="modal-body p-lg" style="background:rgb(227, 243, 254)">
            <center>
            <h5 v-if="success && !showPreloader">Сообщение успешно отправлено.</h5>
            </center>
            <center>
              <button style="margin-top:20px;" v-if="success && !showPreloader" @click="refresh" type="button" class="btn dark-white p-x-md" data-dismiss="modal">Закрыть</button>
            </center>
            <form v-if="!success" class="login-form" onsubmit="return false">
              <div class="form-group row">
                <div class="col-sm-12">
                  <textarea class="form-control" rows="5" v-model="text" required></textarea>
                </div>
              </div>
              <!-- <div class="white-text">
                <textarea v-model="text" placeholder="Сообщение" required></textarea>
              </div> -->
              <center>
                <button @click="send" style="background:rgb(251, 106, 33);color:white;margin-right:10px;width:220px !important;height:50px !important;" class="btn" v-if="!success">Отправить</button>
                <button @click="refresh" style="background:rgb(207, 208, 209);color:white;width:220px !important;height:50px !important;" type="button" class="btn" data-dismiss="modal">Отмена</button>
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
      // text: `Введите сообщение и нажмите кнопку "Отправить".\nСообщение будет доставлено всем ученикам данной группы.`,
      text: 'Текст сообщения',
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
    // root: '/api'
  }
}
</script>

<style lang="css">
textarea {
  color: black;
  padding: 10px;
  border-radius: 2px;
}

.modal-content {
  border-radius: 5px;
}
</style>
