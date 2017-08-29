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
                <a class="nav-link block" href data-toggle="tab" data-target="#tab-3">Фотографии</a>
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
            <form role="form" class="p-a-md col-md-6" enctype="multipart/form-data" onsubmit="return false">
              <div class="form-group" v-if="!!errorInfo">
                <label class="text-danger">{{ errorInfo }}</label>
              </div>
              <div class="form-group" v-for="success in infoSuccess">
                <label class="text-success">{{ success }}</label>
              </div>
              <div class="form-group">
                <label>Имя</label>
                <input v-model="firstName" type="text" class="form-control" :placeholder="firstNamePlaceholder">
              </div>
              <div class="form-group">
                <label>Фамилия</label>
                <input v-model="lastName" type="text" class="form-control" :placeholder="lastNamePlaceholder">
              </div>
              <div class="form-group" v-if="token.permissions === 'student'">
                <label>Присоединиться к группе</label>
                <input v-model="groupCode" type="text" class="form-control">
              </div>
              <button type="submit" class="btn btn-info m-t" @click="submitInfo">Обновить</button>
            </form>
          </div>

          <div class="tab-pane" id="tab-3">
            <div class="p-a-md dker _600">Загрузить фото</div>
            <form action="/api/upload" onsubmit="return false" class="p-a-md col-md-6" enctype="multipart/form-data" method="post">
              <div class="form-group" v-if="!!errorPhoto">
                <label class="text-danger">{{ erroPhoto }}</label>
              </div>
              <div class="form-group" v-if="loginSuccess">
                <label class="text-success">Фотография(и) успешно загружены</label>
              </div>
              <input type="hidden" name="id" v-model="user.id">
              <div class="form-group">
                <label>Фотографии</label>
                <div class="form-file">
                  <input type="file" id="ava" name="ava">
                  <button class="btn white">Фотография профиля</button>
                </div><br>
                <div class="form-file">
                  <input type="file" id="background" name="background">
                  <button class="btn white">Фон профиля</button>
                </div>
              </div>
              <button @click="upload" class="btn btn-info m-t">Загрузить</button>
            </form>
          </div>

          <div class="tab-pane" id="tab-2">
            <div class="p-a-md dker _600">Account settings</div>
            <form role="form" class="p-a-md col-md-6" onsubmit="return false">
              <div class="form-group" v-if="!!errorLogin">
                <label class="text-danger">{{ errorLogin }}</label>
              </div>
              <div class="form-group" v-if="!!loginSuccess">
                <label class="text-success">{{ loginSuccess }}</label>
              </div>
              <div class="form-group">
                <label>Логин</label>
                <input v-model="newUsername" type="text" class="form-control">
              </div>
              <button type="submit" class="btn btn-info m-t" @click="changeUsername">Обновить</button>
            </form>
          </div>

          <div class="tab-pane" id="tab-5">
            <div class="p-a-md dker _600">Безопасность</div>
            <div class="p-a-md">
              <div class="clearfix m-b-lg">
                <form role="form" class="col-md-6 p-a-0" onsubmit="return false">
                  <div class="form-group" v-if="!!errorPassword">
                    <label class="text-danger">{{ errorPassword }}</label>
                  </div>
                  <div class="form-group" v-if="!!passwordSuccess">
                    <label class="text-success">{{ passwordSuccess }}</label>
                  </div>
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
                  <button type="submit" class="btn btn-info m-t" @click="checkPass">Обновить</button>
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
import jwtDecode from 'jwt-decode';
import Header from './Header.vue';

export default {
  data() {
    return {
      errorInfo: '',
      errorLogin: '',
      errorPassword: '',
      infoSuccess: [],
      loginSuccess: '',
      passwordSuccess: '',
      oldPass: '',
      newPass: '',
      confPass: '',
      firstName: '',
      firstNamePlaceholder: '',
      lastNamePlaceholder: '',
      lastName: '',
      newUsername: '',
      groupCode: '',
      userId: '',
      successPhoto: false,
      errorPhoto: ''
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    token() {
      return jwtDecode(this.$store.getters.userToken)
    }
  },
  http: {
    // root: '//ealapi.tw1.ru/api'
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
        if (res.body.success) {
          this.changePass();
        } else {
          this.errorPassword = 'Старый пароль не верный. Попробуйте еще раз';
          this.passwordSuccess = '';
        }
      });
    },
    changeUsername() {
      if(this.newUsername.length >= 5) {
        const body = {
          username: this.newUsername
        };
        this.$http.patch('newinfo', body, {
          headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + this.$store.getters.userToken
          }
        }).then(res => {
          if(res.body.error) {
            this.errorLogin = res.body.error;
            this.loginSuccess = '';
          } else {
            this.errorLogin = '';
            this.loginSuccess = 'Логин успешно обновлен!';
          }
        });
      } else {
        this.errorLogin = 'Логин должен быть не короче 5 символов. Попробуйте еще раз.';
      }
    },
    changePass() {
      if (this.newPass == this.confPass) {
        if(this.newPass.length > 5 || this.confPass.length > 5) {
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
              this.errorPassword = '';
              this.passwordSuccess = 'Пароль успешно изменен!';
            }
          });
        } else {
          this.errorPassword = 'Пароль не должен быть короче 6 символов. Попробуйте еще раз.';
          this.passwordSuccess = '';
        }
      } else {
        this.errorPassword = 'Введенные пароли не совпадают. Попробуйте еще раз.';
        this.passwordSuccess = '';
      }
    },
    submitInfo() {
      if(this.firstName || this.lastName || this.groupCode) {
        if(!!this.groupCode) {
          let inGroup = false;
          for(let group of this.user._groups) {
            if(group.code == this.groupCode) {
              inGroup = true;
              break;
            }
          }
          if(!inGroup) {
            this.$http.patch('addgroup', { groupCode: this.groupCode }, {
              headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + this.$store.getters.userToken
              }
            }).then(res => {
              this.errorInfo = '';
              this.infoSuccess.push('Вы успешно присоединились к группе!');
            });
          } else {
            this.errorInfo = 'Вы уже состоите в этой группе!';
          }
        }
        if(!!this.firstName || !!this.lastName) {
          const body = {
            firstName: this.firstName,
            lastName: this.lastName
          };
          this.$http.patch('newinfo', body, {
            headers: {
              'Content-type': 'application/json',
              'Authorization': 'Bearer ' + this.$store.getters.userToken
            }
          }).then(res => {
            this.errorInfo = '';
            this.infoSuccess.push('Информация успешно обновлена!');
            if(this.firstName)
              localStorage.firstName = this.firstName;
            if(this.lastName)
              localStorage.lastName = this.lastName;
          });
        }
      }
    },
    upload() {
      var ava = document.querySelector('#ava').files[0];
      var background = document.querySelector('#background').files[0];
      var formData = new FormData();
      if(ava || background) {
        if(ava)
          formData.append('ava', ava);
        if(background)
          formData.append('background', background);
        formData.append('id', this.userId);

        $.ajax({
           url: "/api/upload",
           type: "POST",
           data: formData,
           processData: false,
           contentType: false,
           success() {
               this.successPhoto = true;
               this.errorPhoto = '';
           },
           error(jqXHR, textStatus, errorMessage) {
               return
           }
        });
      } else {
        this.successPhoto = false;
        this.errorPhoto = 'Нужно загрузить хотя бы одну картинку.';
      }
    }
  },
  created() {
    this.$store.dispatch('hideGames');
    this.$store.dispatch('zeroAttempts');
    this.$store.dispatch('testNotAvailable');
    this.firstNamePlaceholder = localStorage.firstName;
    this.lastNamePlaceholder = localStorage.lastName;
    this.userId = localStorage.id;
  },
  components: {
    'app-header': Header
  }
}
</script>

<style lang="css">

</style>
