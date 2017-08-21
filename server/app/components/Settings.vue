<template>
  <div>
    <app-header/>
    <div class="row-col">
      <div class="col-sm-3 col-lg-2">
        <div class="p-y">
          <div class="nav-active-border left b-primary">
            <ul class="nav nav-sm">
              <li class="nav-item">
                <a class="nav-link block active" href data-toggle="tab" data-target="#tab-1">Профиль</a>
              </li>
              <li class="nav-item">
                <a class="nav-link block" href data-toggle="tab" data-target="#tab-2">Настройки аккаунта</a>
              </li>
              <li class="nav-item">
                <a class="nav-link block" href data-toggle="tab" data-target="#tab-5">Безопасность</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-sm-9 col-lg-10 light lt bg-auto">
        <div class="tab-content pos-rlt">
          <div class="tab-pane active" id="tab-1">
            <form role="form" class="p-a-md col-md-6" onsubmit="return false">
              <div class="form-group">
                <label>Аватарка</label>
                <div class="form-file">
                  <input type="file">
                  <button class="btn white">Загрузить новую фотографию</button>
                </div>
              </div>
              <div class="form-group">
                <label>Имя</label>
                <input v-model="firstName" type="text" class="form-control">
              </div>
              <div class="form-group">
                <label>Фамилия</label>
                <input v-model="lastName" type="text" class="form-control">
              </div>
              <div class="form-group">
                <label>Присоединиться к группе</label>
                <input v-model="groupCode" type="text" class="form-control">
              </div>
              <button type="submit" class="btn btn-info m-t" @click="">Обновить</button>
            </form>
          </div>

          <div class="tab-pane" id="tab-2">
            <div class="p-a-md dker _600">Account settings</div>
            <form role="form" class="p-a-md col-md-6" onsubmit="return false">
              <div class="form-group">
                <label>Логин</label>
                <input v-model="newUsername" type="text" class="form-control">
              </div>
              <button type="submit" class="btn btn-info m-t">Обновить</button>
            </form>
          </div>

          <div class="tab-pane" id="tab-5">
            <div class="p-a-md dker _600">Безопасность</div>
            <div class="p-a-md">
              <div class="clearfix m-b-lg">
                <form role="form" class="col-md-6 p-a-0" onsubmit="return false">
                  <div class="form-group">
                    <label>Старый пароль</label>
                    <input v-model="oldPass" type="password" class="form-control">
                  </div>
                  <div class="form-group">
                    <label>Новый пароль</label>
                    <input v-model="newPass" type="password" class="form-control">
                  </div>
                  <div class="form-group">
                    <label>Повторите новый пароль</label>
                    <input v-model="confPass" type="password" class="form-control">
                  </div>
                  <button type="submit" class="btn btn-info m-t">Обновить</button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue';

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
      firstName: '',
      lastName: '',
      newUsername: '',
      errShortUsername: false,
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
        if (res.body.success) {
          this.passwordIsCorrect = true;
          this.errOldPass = false;
        } else {
          this.errOldPass = true;
        }
      });
    },
    changePass() {
      if (this.newPass == this.confPass && !!this.password.length) {
        const body = {
          newPassword: this.newPass
        };
        this.$http.patch('newpassword', body, {
          headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + this.$store.getters.userToken
          }
        }).then(res => {
          if (res.body.success) {
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
      if(this.newUsername.length < 5)
        this.errShortUsername = true;
      else {
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
          this.errShortUsername = false;
          this.changeInfo = true;
        })
      }
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
  },
  components: {
    'app-header': Header
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

.col-container {
    display: table; /* Make the container element behave like a table */
    width: 100%; /* Set full-width to expand the whole page */
}

.col {
    display: table-cell; /* Make elements inside the container behave like table cells */
}
</style>
