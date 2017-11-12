<template>
<!-- Modal -->
<div id="testavailable" class="modal fade" data-backdrop="true" style="display: none;" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Все игры пройдены!</h5>
      </div>
      <div class="modal-body text-center p-lg">
        <h5>
            Вы прошли все игры!
          </h5>
        <h6>
          Теперь Вы можете перейти к тесту.
        </h6>
        <br>
        <button class="btn btn-primary goto" id="hide" data-dismiss="modal" @click="hideModal">Пройти тест</button>
        <br>
      </div>
    </div>
    <!-- /.modal-content -->
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  http: {
    root: '//ealapi.tw1.ru/api'
    // root: '/api'
  },
  methods: {
    hideModal() {
      // $('.ui.basic.modal').modal('hide');
      this.$store.dispatch('hideGames');
      this.$store.dispatch('showTest');
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
