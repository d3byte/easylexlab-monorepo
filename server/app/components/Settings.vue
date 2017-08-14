<template>
  <div class="box">
    <center>
      <div class="row">
        <div class="col-lg-12">
          <h2>Пользовательские настройки</h2>
          <br>
        </div>
      </div>
      <div class="row pad">
        <div class="col-lg-4">
          <h3>Изменение пароля</h3>
          <br>
          <h5 class="errormsg" v-if="errOldPass && !errNewPass">Введен неправильный пароль. Попробуйте еще раз. </h5>
          <h5 class="errormsg" v-if="!errOldPass && errNewPass">Введенные пароли не совпадают. Попробуйте еще раз. </h5>
          <h5 class="success" v-if="passChanged">Пароль успешно изменен.</h5>
          <form onsubmit="return false">
            <div class="old_pass">
            <input type="password" v-model="oldPass" placeholder="Старый пароль">
          </div>
            <br>
            <div class="new_pass" v-if="passwordIsCorrect">
            <input type="password" minlength="6" v-model="newPass" placeholder="Новый пароль">
          </div>
            <br>
            <div class="new_pass_conf" v-if="passwordIsCorrect">
            <input type="password" v-model="confPass" placeholder="Подтвердите пароль">
          </div>
          <br>
          <button @click="checkPass" class="btn btn-primary" v-if="!passwordIsCorrect">Проверить пароль</button>
          <button @click="changePass" class="btn btn-primary" v-if="passwordIsCorrect">Сменить пароль</button>
          </form>
        </div>
        <div class="col-lg-4">
          <h3>Изменение данных о пользователе</h3>
          <br>
          <h5 class="success" v-if="changeInfo">Информация успешно обновлена. </h5>
          <form onsubmit="return false">
            <div class="change_name">
              <input v-model="newName" type="text" placeholder="Ваше имя">
            </div>
            <br>
            <div class="change_username">
              <input v-model="newUsername" minlength="5" type="text" placeholder="Ваш логин"> <!-- тут тоже -->
            </div>
            <br>
            <button @click="submitInfo" class="btn btn-primary">Применить изменения</button>
          </form>
        </div>
        <div class="col-lg-4" v-if="user.permissions == 'student'">
          <h3>Присоединение к группе</h3>
          <br>
          <h5 class="success" v-if="joinGroup">Вы успешно присоединились к группе. </h5>
          <form onsubmit="return false">

          <!-- временный костыль -->
          <div class="hideme">
          <input type="text">
        </div>
        <br>
        <div class="join_group">
        <input type="text" minlength="5" v-model="groupCode" required placeholder="Код группы">
      </div>
          <br>
          <div class="hideme">
          <input type="text">
        </div>
        <br>
        <!-- конец костыля -->
          <button @click="addGroup" class="btn btn-primary">Присоединиться к группе</button>
          </form>
        </div>
      </div>
    </center>
</div>
</template>

<script>
export default {
  data() {
    return {
      passwordIsCorrect: false,
      oldPass: '',
      newPass: '',
      confPass: '',
      passChanged: false,
      errOldPass: false,
      errNewPass: false,
      successPass: false,
      newName: '',
      newUsername: '',
      changeInfo: false,
      groupCode: '',
      joinGroup: false,
      errShortPass: false
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  http: {
    root: '/api'
  },
  methods: {
    checkPass() {
      const body = {
        password: this.oldPass
      };
      this.$http.post('verifypassword', body, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.getters.userToken
        }
      }).then(res => {
        // console.log(res);
        if(res.body.success) {
          this.passwordIsCorrect = true;
          this.errOldPass = false;
        } else {
          this.errOldPass = true;
        }
      });
    },
    changePass() {
      if(this.newPass == this.confPass && !!this.password.length) {
        const body = {
          newPassword: this.newPass
        };
        this.$http.patch('newpassword', body, {
          headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.getters.userToken
          }
        }).then(res => {
          if(res.body.success) {
              this.errNewPass = false;
              this.errOldPass = false;
              this.passChanged = true;
          }
        });
      } else {
        this.errNewPass = true;
      }
    },
    submitInfo() {
      const body = {
        name: this.newName,
        username: this.newUsername
      };
      this.$http.patch('newinfo', body, {
        headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.$store.getters.userToken
        }
      }).then(res => {
        this.changeInfo = true;
      })
    },
    addGroup() {
      const body = {
        groupCode: this.groupCode
      };
      this.$http.patch('addgroup', body, {
        headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.$store.getters.userToken
        }
      }).then(res => {
        this.joinGroup = true;
      })
    },
  },
  created() {
    this.$store.dispatch('hideGames');
    this.$store.dispatch('zeroAttempts');
    this.$store.dispatch('testNotAvailable');
  }
}
</script>

<style lang="css">
.hideme{
  visibility: hidden;
}

.pad{
  padding: 20px;
}
</style>
