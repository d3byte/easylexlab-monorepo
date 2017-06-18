<template>
  <div class="">
    <center>
      <h3>Создание группы</h3>
      <h5 class="success" v-if="success">
        Группа успешно создана!
        <router-link to="/profile">Перейти</router-link>
      </h5>
      <form class="login-form" onsubmit="return false">
        <div class="name">
          <label>Имя группы</label><br>
          <input v-model="name" required type="text" name="name" tabindex="1">
        </div>
        <div class="grade">
          <label>Класс</label><br>
          <input v-model="grade" required type="number" name="grade" tabindex="2">
        </div>
        <center><button @click="create" class="btn" name="create" tabindex="3">Создать</button></center>
      </form>
    </center>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: this.$store.getters.userToken,
      name: '',
      grade: null,
      success: false,
      newGroupId: ''
    }
  },
  http: {
    root: '/api'
  },
  methods: {
    create() {
      const body = {
        'name': this.name,
        'grade': this.grade
      };
      this.$http.post('addgroup', body,
      {
        headers: {
          'Content-type' : 'application/json',
          'Authorization': 'Bearer ' + this.token
        }
      }).then(res => {
        this.newGroupId = res.body.data._id;
        this.success = true;
      }).catch(err => {
        throw err;
      });
    },
  }
}
</script>

<style lang="css">
.success {
  color: #307351;
}
.name input,
.grade input {
  border-bottom: 1px solid white;
}
</style>
