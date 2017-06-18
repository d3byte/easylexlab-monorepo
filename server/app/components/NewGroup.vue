<template>
  <div class="">
    <center>
      <h3>Создание группы</h3>
      <h5 class="success" v-if="success">
        Группа успешно создана!
        <router-link to="/profile">Перейти</router-link>
      </h5>
      <h5 class="errormsg" v-if="error">
        Группа с таким именем уже существует.
      </h5>
      <form class="login-form" onsubmit="return false">
        <div class="name">
          <label>Имя группы</label><br>
          <input v-model="name" required type="text" name="name" tabindex="1">
        </div>
        <div class="grade">
          <label>Класс</label><br>
          <input v-model="grade" required type="number" name="grade" tabindex="2" min="1">
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
      error: false,
      newGroupId: ''
    }
  },
  http: {
    root: '/api'
  },
  methods: {
    create() {
      if(this.name.length > 0 && this.grade > 0) {
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
          this.error = false;
        }).catch(err => {
          this.success = false;
          this.error = true;
          throw err;
        });
      }
    },
  }
}
</script>

<style lang="css">
.success {
  color: #307351;
}

.name, .grade {
  margin-bottom: 5px;
}

.name input,
.grade input {
  border-bottom: 1px solid white;
}
</style>
