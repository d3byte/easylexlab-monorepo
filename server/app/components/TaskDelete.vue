<template lang="html">
  <div id="delete" class="modal fade" data-backdrop="true" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Удаление группы</h5>
        </div>
        <div class="modal-body text-center p-lg">
          <h1> Да ты просто лох! </h1>
        </div>
        <div class="modal-footer text-center">
          <button type="button" class="btn dark-white p-x-md" data-dismiss="modal">Закрыть</button>
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
  created() {
  }
}
</script>

<style lang="css">
.hover:hover {
  cursor: pointer;
}
</style>
