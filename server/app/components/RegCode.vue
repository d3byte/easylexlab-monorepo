<template lang="html">
  <div id="regcode" class="modal fade" data-backdrop="true" style="display: none;" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header" style="background:rgb(161, 196, 226);">
          <h5 class="modal-title text-center text-white">
            <b>
              <i class="material-icons">&#xE8D3;</i>
              КОД РЕГИСТРАЦИИ
            </b>
          </h5>
        </div>
        <div class="modal-body" style="background:rgb(227, 243, 254)">
          <h5 class="border">Дайте этот код ученикам и они смогут присоединиться к группе!</h5>
          <h4 class="text-center" style="margin-bottom:20px;"><b>{{ groupCode }}</b></h4>
          <center>
            <button type="button" style="background:rgb(207, 208, 209);color:white" class="btn" data-dismiss="modal">Закрыть</button>
          </center>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      groupId: this.$route.params.id,
      groupCode: ''
    }
  },
  http: {
    root: '//ealapi.tw1.ru/api'
  },
  methods: {
    code() {
      const body = {
        'groupId': this.groupId
      };
      this.$http.post('regcode', body, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.getters.userToken
        }
      }).then(res => {
        this.groupCode = res.body.groupCode;
      });
    }
  },
  created() {
    this.code();
  }
}
</script>

<style lang="css">
.border {
  padding: 5px;
  border-bottom: 3px solid rgb(207, 208, 209);
  margin-bottom: 20px;
}
</style>
