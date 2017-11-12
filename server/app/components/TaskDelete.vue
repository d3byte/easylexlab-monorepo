<template lang="html">
  <div id="delete" class="modal fade" data-backdrop="true" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header" style="background:rgb(161, 196, 226);">
            <h5 class="modal-title text-center text-white">
              <b>
                УДАЛЕНИЕ ГРУППЫ
              </b>
            </h5>
          </div>
        <div class="modal-body text-center p-lg">
          <h3>
            Подтвердите удаление группы, введя название группы.
           </h3>
           <p>
             При удалении группы удалятся все задания,<br>
             созданные для этой группы.
           </p>
           <form role="form" class="" onsubmit="return false">
             <div class="form-group">
               <center>
               <div class="row flexme">
                 <div class="col-sm-12">
               <label>Введите название группы:</label>
             </div>
             <div class="col-sm-4"></div>
             <div class="col-sm-4">
               <label class="errormsg">{{ error }}</label>
               <label class="success">{{ success }}</label>
               <input type="name" class="form-control" v-model="name">
             </div>
             <div class="col-sm-4"></div>
           </div>
           <br>
             <button @click="submit" type="submit" class="btn btn-danger m-t">Удалить группу</button>
           </center>
          </div>
       </form>
      </div>
      <div class="modal-footer text-center">
        <button type="button" class="btn btn-success p-x-md" data-dismiss="modal">Отмена</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      error: '',
      group: {}
    }
  },
  http: {
    root: '//ealapi.tw1.ru/api'
    // root: '/api'
  },
  methods: {
    submit() {
      if(this.name == this.group.name) {
        this.$http.post('deletegroup', { groupId: this.group._id }, {
          headers: {
            'Content-type' : 'application/json',
            'Authorization': 'Bearer ' + this.$store.getters.userToken
          }
        }).then(res => {
          if(res.body.success) {
            $('#delete').modal('hide');
            this.$router.push('/profile');
          } else {
            this.error = 'Произошла ошибка во время удаления. Попробуйте позже.'
          }
        });
      } else {
        this.error = 'Введённое имя не совпадает с именем группы.';
      }
    }
  },
  created() {
    this.$http.post('getgroup', {
      groupId: this.$route.params.id
    }, {
      headers: {
        'Content-type' : 'application/json',
        'Authorization': 'Bearer ' + this.$store.getters.userToken
      }
    }).then(res => {
      this.group = res.body.group;
    });
  }
}
</script>

<style lang="css">
.hover:hover {
  cursor: pointer;
}
</style>
