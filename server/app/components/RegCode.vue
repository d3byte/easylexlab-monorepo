<template lang="html">
  <div id="regcode" class="modal fade" data-backdrop="true" style="display: none;" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Код регистрации</h4>
        </div>
        <div class="modal-body text-center p-lg">
          <h5>Дайте этот код ученикам и они смогут присоединиться к группе!</h5>
          <h4><b>{{ groupCode }}</b></h4>
          <center>
            <button type="button" class="btn dark-white p-x-md" data-dismiss="modal">Закрыть</button>
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
</style>
