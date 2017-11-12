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
                <a class="nav-link block" href data-toggle="tab" data-target="#tab-3">Управление фото</a>
              </li>
              <li class="nav-item">
                <a class="nav-link block" href data-toggle="tab" data-target="#tab-4">Управление группами</a>
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
                <label class="text-danger"><b>{{ errorInfo }}</b></label>
              </div>
              <div class="form-group" v-for="success in infoSuccess">
                <label class="text-success"><b>{{ success }}</b></label>
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
              <button :disabled="updatingInfo ? true : false" type="submit" class="btn btn-info m-t" @click="submitInfo">
                <i v-if="updatingInfo" class="material-icons preloader">cached</i>
                <span v-else>Обновить</span>
              </button>
            </form>
          </div>

          <div class="tab-pane" id="tab-3">
            <div class="p-a-md dker _600">Управление фото</div>
            <form onsubmit="return false" class="p-a-md col-md-6">
              <div class="form-group" v-if="colorSuccess">
                <label class="text-success">Фотография успешно загружена.</label>
              </div>
              <span class="avatar w-96">
                <img v-if="!!image.length" :src="`data:image/${ext};base64,${image}`">
                <img v-else :src="imageSrc">
              </span>
              <div class="form-file">
                <input @change="uploadImage" name="image" type="file" accept="image/*" id="ava">
                <button class="btn white">Загрузить фотографию</button>
              </div>
            </form>
          </div>

          <div class="tab-pane" id="tab-2">
            <div class="p-a-md dker _600">Настройки аккаунта</div>
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

          <div class="tab-pane" id="tab-4">
            <div class="p-a-md dker _600">Управление группами</div>
            <div class="p-a-md">
              <div class="clearfix m-b-lg">
                <div class="row" v-for="group in groups">
                  <div class="box group p-a">
                    <div class="icon">
                      <i class="material-icons">&#xE7FB;</i>
                    </div>
                    <div class="group-info">
                      <span class="text-bold">
                        {{ group.name }} <br>
                        <span class="text-muted">Дата создания: {{ group.createdAt }}</span>
                      </span>
                    </div>
                    <button class="flat-btn text-bold" style="margin-left:10px" @click="leaveGroup(group._id)">
                      <i class="material-icons">&#xE879;</i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
import { EventBus } from './event';
import jwtDecode from 'jwt-decode';
import Header from './Header.vue';
import axios from 'axios';

export default {
  data() {
    return {
      errorInfo: '',
      errorLogin: '',
      errorPassword: '',
      updatingInfo: false,
      infoSuccess: [],
      loginSuccess: '',
      passwordSuccess: '',
      colorSuccess: false,
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
      color: localStorage.color,
      background: localStorage.background,
      options: {
        url: '/upload-image'
      },
      groups: [{
        name: '',
        id: '',
        createdAt: ''
      }],
      image: localStorage.img ? localStorage.img : '',
      imageSrc: '',
      ext: localStorage.ext ? localStorage.ext : ''
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
    root: '//ealapi.tw1.ru/api'
    // root: '/api'
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
          this.errorPassword = 'Старый пароль неверен. Попробуйте еще раз.';
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
        this.updatingInfo = true;
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
              this.groupCode = '';
              this.updatingInfo = false;
              if(res.body.success) {
                this.infoSuccess.push('Вы успешно присоединились к группе!');
              } else {
                this.errorInfo = 'Вы уже состоите в этой группе!'
              }
            });
          } else {
            this.updatingInfo = false;
            this.errorInfo = 'Вы уже состоите в этой группе!';
          }
        }
        if(!!this.firstName || !!this.lastName) {
          this.updatingInfo = true;
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
            this.updatingInfo = false;
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
    uploadImage(e) {
      const files = e.target.files;
      if (!files[0]) {
        return;
      }
      const data = new FormData();
      data.append('userName', this.user._id);
      data.append('image', files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = e.target.result;
        this.image = '';
        this.ext = '';
      };

      axios.post('//ealapi.tw1.ru/api/upload-image', data, {
        headers: {
          'Content-type': 'multipart/form-data',
          'Authorization': 'Bearer ' + this.$store.getters.userToken
        }
      }).then(res => {
        this.errorInfo = '';
        this.infoSuccess.push('Информация успешно обновлена!');
        reader.readAsDataURL(files[0]);
        this.colorSuccess = true;
      })
    },
    leaveGroup(id) {
      if(confirm('Вы действительно хотите покинуть группу?')) {
        const body = {
          groupId: id
        };
        this.$http.post('leavegroup', body, {
          headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + this.$store.getters.userToken
          }
        }).then(res => {
          this.groups = this.groups.filter(group => group._id != id);
        })
      }
    }
  },
  created() {
    if(!this.$store.getters.loginState)
      this.$router.push('/login');
    this.$http.post('user', {}, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.$store.getters.userToken
      }
    }).then(res => {
      this.$store.dispatch('userInfo', res.body.user);
      EventBus.$emit('requested');
    });
    EventBus.$once('requested', event => {
      this.groups = this.user._groups;
    });
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

<style lang="css" scoped>
.color {
  width: 30px;
  height: 30px;
  border-radius: 2px;
  margin-left: 25px;
  margin-top: 6px;
  vertical-align: middle;
}

.form-file {
  display: flex;
  align-items: center;
}

.group {
  display: flex;
  align-items: center;
  width: 340px;
} .group .icon {
  margin-right: 15px;
} .icon i {
  font-size: 24px;
} .group button {
  font-size: 24px;
}

.avatar img {
  width: 200px;
  height: 200px;
} .avatar {
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
  border-radius: 50%;
  border: 1px solid black;
  background: rgb(177, 212, 218);
}

.btn.white {
  background-color: rgb(60, 192, 220) !important;
  color: white !important;
}
</style>
