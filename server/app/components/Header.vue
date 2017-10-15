<template>
    <div class="app-header white box-shadow">
      <div class="container hidden-sm-down">

        <div class="navbar-item pull-left h4" id="pageTitle">
          <router-link to="/">
            <img src="../pics/logo.png" class="logo">
          </router-link>
        </div>

        <ul class="nav navbar-nav pull-right text-primary-hover" v-if="logged">
          <li class="nav-item text-primary-hover hidden-sm-down border-right-nav" style="border-left:1px solid #ccc" v-if="token.permissions === 'student'">
            <router-link class="nav-link" to="/stats">
              <span>Мои результаты</span>
            </router-link>
          </li>
          <li class="nav-item text-primary-hover hidden-sm-down border-right-nav" style="border-left:1px solid #ccc" v-if="token.permissions === 'teacher'">
            <a class="nav-link" href data-toggle="modal" data-target="#m-a-f">
              <span>Создать группу</span>
            </a>
          </li>
          <li class="nav-item dropdown pos-stc-xs hidden-sm-down border-right-nav" style="padding-right:25px">
            <a class="nav-link" href data-toggle="dropdown">
              <i class="material-icons">&#xe7f5;</i>
              <span v-if="!!notifications.length" class="label label-sm up warn" style="margin-right:-5px;">{{ notifications.length }}</span>
            </a>
            <!-- dropdown -->
            <div class="dropdown-menu pull-right w-xl animated fadeInUp no-bg no-border no-shadow">
              <div class="scrollable" style="max-height: 220px">
                <ul class="list-group list-group-gap m-a-0">
                  <li class="list-group-item box-shadow-z0 b" :class="notification.type == 'newMsg' ? 'dark-white text-color' : 'black'" v-for="notification in notifications">
                    <span class="pull-right m-r hover" @click="removeNotif(notification.id)"><i class="material-icons">delete</i></span>
                    <span class="pull-left m-r">
                      <img :src="notification.pic" class="w-40 img-circle">
                    </span>
                    <span class="clear block">
                      {{ notification.text }}<br>
                      <small class="text-muted">{{ notification.date }}</small>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <!-- / dropdown -->
          </li>
          <li class="nav-item border-right-nav dropdown hidden-sm-down">
            <a class="nav-link clear" href data-toggle="dropdown">
              <div style="background: rgb(176, 212, 219)" class="circle w-32">
                <i class="fa fa-user-circle-o" aria-hidden="true"></i>
              </div>
              <!-- <div class="avatar w-32" >
                <span>
                  <i class="fa fa-user-circle" aria-hidden="true"></i>
                </span>
              </div> -->
            </a>
            <div class="dropdown-menu pull-right dropdown-menu-scale" style="background: rgb(176, 212, 219);border-radius:6px;">
              <router-link class="dropdown-item" to="/profile" style="color:rgb(78, 114, 128)">
                <i class="material-icons" style="color: rgb(227, 239, 243)">&#xE8A6;</i>
                Профиль
              </router-link>
              <router-link class="dropdown-item" to="/settings" style="color:rgb(78, 114, 128)">
                <i class="material-icons" style="color: rgb(227, 239, 243)">&#xE8B8;</i>
                Настройки
              </router-link>
              <span class="dropdown-item hover" data-toggle="modal" data-target="#feedback" style="color:rgb(78, 114, 128)">
                <i class="material-icons" style="color: rgb(227, 239, 243)">&#xE0C9;</i>
                Оставить отзыв
              </span>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" @click="logout" style="color:rgb(78, 114, 128)">
                <i class="material-icons" style="color: rgb(227, 239, 243)">&#xE0B2;</i>
                Выход
              </a>
            </div>
          </li>
          <li class="nav-item hidden-md-up">
            <a class="nav-link" data-toggle="collapse" data-target="#collapse">
              <i class="material-icons">&#xE5D2;</i>
            </a>
          </li>
        </ul>

        <ul class="nav navbar-nav pull-right text-primary-hover hidden-sm-down" v-else>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">
              <span>
                <i class="material-icons">&#xE890;</i>
                Войти
              </span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/signup" class="nav-link">
              <span>
                <i class="material-icons">&#xE895;</i>
                Зарегистрироваться
              </span>
            </router-link>
          </li>
        </ul>
        <ul class="nav navbar-nav pull-right hidden-md-up" v-if="!logged">
          <li class="nav-item">
            <a class="nav-link" data-toggle="collapse" data-target="#collapse">
              <i class="material-icons">&#xE5D2;</i>
            </a>
          </li>
        </ul>

      </div>

      <div class="navbar hidden-md-up">
        <!-- Page title - Bind to $state's title -->
        <div class="navbar-item pull-left h5" id="pageTitle">
          <router-link to="/">
            <img src="../pics/logo.png" class="logo">
            EasyLexLab
          </router-link>
        </div>

        <!-- navbar right -->
        <ul class="nav navbar-nav pull-right text-primary-hover" v-if="logged">
          <li class="nav-item text-primary-hover hidden-sm-down" v-if="token.permissions === 'student'">
            <router-link class="nav-link" to="/stats">
              <span>Мои результаты</span>
            </router-link>
          </li>
          <li class="nav-item text-primary-hover hidden-sm-down" v-if="token.permissions === 'teacher'">
            <a class="nav-link" href data-toggle="modal" data-target="#m-a-f">
              <span>Создать группу</span>
            </a>
          </li>
          <li class="nav-item dropdown pos-stc-xs hidden-sm-down">
            <a class="nav-link" href data-toggle="dropdown">
              <i class="material-icons">&#xe7f5;</i>
              <span v-if="user && user.notifications" class="label label-sm up warn">{{ user.notifications.length }}</span>
            </a>
            <!-- dropdown -->
            <div class="dropdown-menu pull-right w-xl animated fadeInUp no-bg no-border no-shadow">
              <div class="scrollable" style="max-height: 220px">
                <ul class="list-group list-group-gap m-a-0">
                  <li class="list-group-item box-shadow-z0 b" :class="notification.type == 'newMsg' ? 'dark-white text-color' : 'black'" v-for="notification in notifications">
                    <span class="pull-right m-r hover" @click="removeNotif(notification.id)"><i class="material-icons">delete</i></span>
                    <span class="pull-left m-r">
                      <img :src="notification.pic" class="w-40 img-circle">
                    </span>
                    <span class="clear block">
                      {{ notification.text }}<br>
                      <small class="text-muted">{{ notification.date }}</small>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <!-- / dropdown -->
          </li>
          <li class="nav-item dropdown hidden-sm-down">
            <a class="nav-link clear" href data-toggle="dropdown">
              <span class="avatar w-32">
                  <span>{{ token.permissions == 'teacher' ? 'T' : 'S' }}</span>
              </span>
            </a>
            <div class="dropdown-menu pull-right dropdown-menu-scale">
              <router-link class="dropdown-item" to="/profile">
                <i class="material-icons">&#xE8A6;</i>
                Профиль
              </router-link>
              <router-link class="dropdown-item" to="/settings">
                <i class="material-icons">&#xE8B8;</i>
                Настройки
              </router-link>
              <span class="dropdown-item hover" data-toggle="modal" data-target="#feedback">
                <i class="material-icons">&#xE0C9;</i>
                Оставить отзыв
              </span>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" @click="logout">
                <i class="material-icons">&#xE0B2;</i>
                Выход
              </a>
            </div>
          </li>
          <li class="nav-item hidden-md-up">
            <a class="nav-link" data-toggle="collapse" data-target="#collapse-xs">
              <i class="material-icons">&#xE5D2;</i>
            </a>
          </li>
        </ul>
        <ul class="nav navbar-nav pull-right text-primary-hover hidden-sm-down" v-else>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">
              <span>
                <i class="material-icons">&#xE890;</i>
                Войти
              </span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/signup" class="nav-link">
              <span>
                <i class="material-icons">&#xE895;</i>
                Зарегистрироваться
              </span>
            </router-link>
          </li>
        </ul>
        <ul class="nav navbar-nav pull-right hidden-md-up" v-if="!logged">
          <li class="nav-item">
            <a class="nav-link" data-toggle="collapse" data-target="#collapse-xs">
              <i class="material-icons">&#xE5D2;</i>
            </a>
          </li>
        </ul>

      </div>

      <div class="container hidden-xs-down">
        <div class="hidden-md-up collapse navbar-toggleable-sm" id="collapse">
          <div ui-include="'../views/blocks/navbar.form.right.html'"></div>
          <!-- link and dropdown -->
          <ul class="nav navbar-nav text-primary-hover" v-if="logged">
            <li class="nav-item">
              <router-link class="dropdown-item" to="/profile">
                <i class="material-icons">&#xE8A6;</i>
                Профиль
              </router-link>
              <a class="dropdown-item" href data-toggle="dropdown">
                Оповещения
                <span v-if="!!notifications.length" class="label label-sm up warn">{{ notifications.length }}</span>
              </a>
              <!-- dropdown -->
              <div class="dropdown-menu pull-right w-xl animated fadeInUp no-bg no-border no-shadow">
                <div class="scrollable" style="max-height: 220px">
                  <ul class="list-group list-group-gap m-a-0">
                    <li class="list-group-item box-shadow-z0 b" :class="notification.type == 'newMsg' ? 'dark-white text-color' : 'black'" v-for="notification in notifications">
                      <span class="pull-right m-r hover" @click="removeNotif(notification.id)"><i class="material-icons">delete</i></span>
                      <span class="pull-left m-r">
                        <img :src="notification.pic" class="w-40 img-circle">
                      </span>
                      <span class="clear block">
                        {{ notification.text }}<br>
                        <small class="text-muted">{{ notification.date }}</small>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <router-link class="dropdown-item" to="/settings">
                <i class="material-icons">&#xE8B8;</i>
                Настройки
              </router-link>
              <router-link class="dropdown-item" to="/stats" v-if="token.permissions === 'student'">
                <span>Мои результаты</span>
              </router-link>
              <a class="dropdown-item" href data-toggle="modal" data-target="#m-a-f" v-if="token.permissions === 'teacher'">
                <span>Создать группу</span>
              </a>
              <a class="dropdown-item" data-toggle="modal" data-target="#feedback">
                <i class="material-icons">&#xE0C9;</i>
                Оставить отзыв
              </a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" @click="logout">
                <i class="material-icons">&#xE0B2;</i>
                Выход
              </a>
            </li>
          </ul>

          <ul class="nav navbar-nav" v-else>
            <li class="nav-item">
              <router-link to="/login" class="dropdown-item">
                <span>
                  <i class="material-icons">&#xE890;</i>
                  Войти
                </span>
              </router-link>
              <router-link to="/signup" class="dropdown-item">
                <span>
                  <i class="material-icons">&#xE895;</i>
                  Зарегистрироваться
                </span>
              </router-link>
            </li>
          </ul>
          <!-- / -->
        </div>
      </div>
      <div class="hidden-md-up">
        <div class="hidden-md-up collapse navbar-toggleable-sm" id="collapse-xs">
          <div ui-include="'../views/blocks/navbar.form.right.html'"></div>
          <!-- link and dropdown -->
          <ul class="nav navbar-nav text-primary-hover" v-if="logged">
            <li class="nav-item">
              <router-link class="dropdown-item" to="/profile">
                <i class="material-icons">&#xE8A6;</i>
                Профиль
              </router-link>
              <a class="dropdown-item" href data-toggle="dropdown">
                Оповещения
                <span v-if="!!notifications.length" class="label label-sm up warn">{{ notifications.length }}</span>
              </a>
              <!-- dropdown -->
              <div class="dropdown-menu pull-right w-xl animated fadeInUp no-bg no-border no-shadow">
                <div class="scrollable" style="max-height: 220px">
                  <ul class="list-group list-group-gap m-a-0">
                    <li class="list-group-item box-shadow-z0 b" :class="notification.type == 'newMsg' ? 'dark-white text-color' : 'black'" v-for="notification in notifications">
                      <span class="pull-right m-r hover" @click="removeNotif(notification.id)"><i class="material-icons">delete</i></span>
                      <span class="pull-left m-r">
                        <img :src="notification.pic" class="w-40 img-circle">
                      </span>
                      <span class="clear block">
                        {{ notification.text }}<br>
                        <small class="text-muted">{{ notification.date }}</small>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <router-link class="dropdown-item" to="/settings">
                <i class="material-icons">&#xE8B8;</i>
                Настройки
              </router-link>
              <router-link class="dropdown-item" to="/stats" v-if="token.permissions === 'student'">
                <span>Мои результаты</span>
              </router-link>
              <a class="dropdown-item" href data-toggle="modal" data-target="#m-a-f" v-if="token.permissions === 'teacher'">
                <span>Создать группу</span>
              </a>
              <a class="dropdown-item" data-toggle="modal" data-target="#feedback">
                <i class="material-icons">&#xE0C9;</i>
                Оставить отзыв
              </a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" @click="logout">
                <i class="material-icons">&#xE0B2;</i>
                Выход
              </a>
            </li>
          </ul>

          <ul class="nav navbar-nav" v-else>
            <li class="nav-item">
              <router-link to="/login" class="dropdown-item">
                <span>
                  <i class="material-icons">&#xE890;</i>
                  Войти
                </span>
              </router-link>
              <router-link to="/signup" class="dropdown-item">
                <span>
                  <i class="material-icons">&#xE895;</i>
                  Зарегистрироваться
                </span>
              </router-link>
            </li>
          </ul>
          <!-- / -->
        </div>
      </div>

    </div>
</template>

<script>
    import jwtDecode from 'jwt-decode';
    import NewGroup from './NewGroup.vue';
    import { EventBus } from './event';

    export default {
        data() {
            return {
                requested: false,
                isCurrentGr: false,
                notifications: [],
                newNotifsInt: 0,
                color: ''
            }
        },
        computed: {
            logged() {
                return this.$store.getters.loginState
            },
            token() {
              return jwtDecode(this.$store.getters.userToken)
            },
            user() {
                return this.$store.getters.user
            },
            groups() {
                return this.$store.state.user.groups
            },
            currentGroup() {
                return this.$store.state.currentGroup
            }
        },
        methods: {
            logout() {
              this.$store.dispatch('logout');
              this.$store.dispatch('hideGames');
              this.$store.dispatch('testNotAvailable');
              this.$router.push({
                  path: '/'
              });
              localStorage.clear();
            },
            fetchUserInfo() {
              this.$http.post('user', {}, {
                headers: {
                  'Content-type': 'application/json',
                  'Authorization': 'Bearer ' + this.$store.getters.userToken
                }
              }).then(res => {
                this.$store.dispatch('userInfo', res.body.user);
                this.notifications = res.body.user.notifications;
                this.$store.dispatch('changeCurrentGroup', res.body.user._groups[0]);
                EventBus.$emit('requested-header');
                });
            },
            show() {
              this.$store.dispatch('hideOrShowLogin');
            },
            changeGroup(group) {
              this.$store.dispatch('changeCurrentGroup', group);
            },
            removeNotif(id) {
              const body = {
                id
              };
              this.$http.post('removenotif', body, {
                headers: {
                  'Content-type': 'application/json',
                  'Authorization': 'Bearer ' + this.$store.getters.userToken
                }
              }).then(res => {
                  this.notifications = res.body.notifications;
              });
            }
        },
        http: {
            root: '//ealapi.tw1.ru/api'
        },
        created() {
          this.color = localStorage.color  ? localStorage.color : '#ccc';
          EventBus.$once('requested', event => {
            this.notifications = this.user.notifications.reverse();
          });
          if(this.$route.path.slice(0, 5) == '/task') {
            this.fetchUserInfo();
          } else if(this.$route.path.slice(0, 6) == '/group') {
            this.fetchUserInfo();
          }
        },
        components: {
            'newgroup': NewGroup
        }
    }
</script>

<style lang="css" scoped>
  .app-header {
    width: 100%;
  }
  .h5 {
    margin-top: 0;
  }

  .navbar {
    border-radius: 0;
    box-shadow: none;
  }

  .navbar-nav {
    margin: 0;
  }

  .nav > li > a:hover, .nav > li > a:focus {
    background: none;
  }

  .logo {
    width: 140px;
    height: 45px;
    margin-right: -5px;
  }

  .hover:hover {
    cursor: pointer;
  }

  .avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
  }

 .container {
   box-sizing: border-box;
   width: 75%;
   margin-bottom: 0;
   padding:0 30px;
   padding-right: 40px;
 }

 .border-right-nav {
   padding: 0 10px;
   border-right: 1px solid #ccc;
 } .border-right-nav > .nav-link {
   border: none;
 }

.h4 {
  margin-top: 0;
  font-family: 'Fredericka the Great', cursive;
  color: rgb(29, 68, 170);
}

.circle {
  border-radius: 50%;
  vertical-center: center;
  text-align: center;
  margin-right: 15px;
  font-size: 20px;
  color: rgb(227, 239, 243);
}
</style>
