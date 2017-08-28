<template>
    <div class="app-header white box-shadow">
      <div class="navbar">
        <!-- Page title - Bind to $state's title -->
        <div class="navbar-item pull-left h5" id="pageTitle">
          <img src="../pics/logo.png" class="logo">
          EasyLexLab
        </div>

        <!-- navbar right -->
        <ul class="nav navbar-nav pull-right" v-if="logged">
          <li class="nav-item" v-if="token.permissions === 'student'">
            <router-link to="/stats" class="nav-link">Мои результаты</router-link>
          </li>
          <li class="nav-item" v-if="token.permissions === 'teacher'">
            <span class="nav-link hover" data-toggle="modal" data-target="#m-a-f">Создать группу</span>
          </li>
          <li class="nav-item dropdown pos-stc-xs">
            <a class="nav-link" href data-toggle="dropdown">
              <i class="material-icons">&#xe7f5;</i>
              <span class="label label-sm up warn">{{ notifications.length }}</span>
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
          <li class="nav-item dropdown">
            <a class="nav-link clear" href data-toggle="dropdown">
              <span class="avatar w-32">
                <img src="../assets/images/a0.jpg" alt="...">
                <i class="on b-white bottom"></i>
              </span>
            </a>
            <div class="dropdown-menu pull-right dropdown-menu-scale">
              <router-link class="dropdown-item" to="/profile">
                Профиль
              </router-link>
              <router-link class="dropdown-item" to="/settings">
                Настройки
              </router-link>
              <span class="dropdown-item hover" data-toggle="modal" data-target="#feedback">
                Оставить отзыв
              </span>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" @click="logout">Выход</a>
            </div>
          </li>
          <li class="nav-item hidden-md-up">
            <a class="nav-link" data-toggle="collapse" data-target="#collapse">
              <i class="material-icons">&#xe5d4;</i>
            </a>
          </li>
        </ul>

        <ul class="nav navbar-nav pull-right text-primary-hover" v-else>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">
              <span>Войти</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/signup" class="nav-link">
              <span>Зарегистрироваться</span>
            </router-link>
          </li>
        </ul>
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
                newNotifsInt: 0
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
                this.$store.dispatch('changeCurrentGroup', res.body.user._groups[0]);
                this.notifications = res.body.user.notifications;
                EventBus.$emit('requested');
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
    width: 50px;
    height: 50px;
    margin-right: -5px;
  }

  .hover:hover {
    cursor: pointer;
  }
</style>
