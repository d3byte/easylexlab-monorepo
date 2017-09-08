<template lang="html">
  <div id="delete" class="modal fade" data-backdrop="true" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Удаление группы</h5>
        </div>
        <div class="modal-body text-center p-lg">
          <h3>
            Подтвердите удаление группы вводом своего пароля.
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
               <label>Введите пароль:</label>
             </div>
             <div class="col-sm-4"></div>
             <div class="col-sm-4">
               <input type="password" class="form-control">
             </div>
             <div class="col-sm-4"></div>
           </div>
           <br>
             <button type="submit" class="btn btn-success m-t" @click="">Удалить группу</button>
           </center>
         </div>
         </form>
        </div>
        <div class="modal-footer text-center">
          <button type="button" class="btn danger p-x-md" data-dismiss="modal">Отмена</button>
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
    }
  },
  http: {
    root: '//ealapi.tw1.ru/api'
  },
  methods: {

  },
  created() {}
}
</script>

<style lang="css">
.hover:hover {
  cursor: pointer;
}
</style>
