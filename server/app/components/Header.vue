<template>
    <div class="app-header white box-shadow">
      <div class="navbar">
        <!-- Page title - Bind to $state's title -->
        <div class="navbar-item pull-left h5" id="pageTitle">Логотип</div>

        <!-- navbar right -->
        <ul class="nav navbar-nav pull-right" v-if="logged">
          <li class="nav-item" v-if="token.permissions === 'student'">
            <router-link to="/profile/stats" class="nav-link">Статистика</router-link>
          </li>
          <li class="nav-item" v-if="token.permissions === 'teacher'">
            <span @click="showModal" class="nav-link">Новая группа</span>
          </li>
          <li class="nav-item dropdown pos-stc-xs">
            <a class="nav-link" href data-toggle="dropdown">
              <i class="material-icons" @click="showNotifs">&#xe7f5;</i>
              <span class="label label-sm up warn">3</span>
            </a>
            <!-- dropdown -->
            <div class="dropdown-menu pull-right w-xl animated fadeInUp no-bg no-border no-shadow">
              <div class="scrollable" style="max-height: 220px">
                <ul class="list-group list-group-gap m-a-0">
                  <li class="list-group-item black lt box-shadow-z0 b">
                    <span class="pull-left m-r">
                      <img src="../assets/images/a0.jpg" alt="..." class="w-40 img-circle">
                    </span>
                    <span class="clear block">
                      Use awesome <a href class="text-primary">animate.css</a><br>
                      <small class="text-muted">10 minutes ago</small>
                    </span>
                  </li>
                  <li class="list-group-item black lt box-shadow-z0 b">
                    <span class="pull-left m-r">
                      <img src="../assets/images/a1.jpg" alt="..." class="w-40 img-circle">
                    </span>
                    <span class="clear block">
                      <a href class="text-primary">Joe</a> Added you as friend<br>
                      <small class="text-muted">2 hours ago</small>
                    </span>
                  </li>
                  <li class="list-group-item dark-white text-color box-shadow-z0 b">
                    <span class="pull-left m-r">
                      <img src="../assets/images/a2.jpg" alt="..." class="w-40 img-circle">
                    </span>
                    <span class="clear block">
                      <a href class="text-primary">Danie</a> sent you a message<br>
                      <small class="text-muted">1 day ago</small>
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
              <router-link class="dropdown-item" to="/profile/settings">
                Настройки
              </router-link>
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

    export default {
        data() {
            return {
                requested: false,
                isCurrentGr: false,
                notifications: []
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
              this.$router.push({
                  path: '/'
              });
              localStorage.clear();
            },
            show() {
              this.$store.dispatch('hideOrShowLogin');
            },
            changeGroup(group) {
              this.$store.dispatch('changeCurrentGroup', group);
            },
            showNotifs() {
              if(!!this.notifications) {
                this.$http.post('readnotifs', {}, {
                  headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + this.$store.getters.userToken
                  }
                }).then(res => { });
                }
              }
        },
        http: {
            root: '/api'
        },
        mounted() {

        },
        created() {
          if(!this.$store.state.user.requested && this.$store.state.user.logged) {
            this.$http.post('user', {}, {
              headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + this.$store.getters.userToken
              }
            }).then(res => {
              this.$store.dispatch('userInfo', res.body.user);
              this.$store.dispatch('changeCurrentGroup', res.body.user._groups[0]);this.notifications = res.body.user.notifications;
            });
          }
          if(this.user.notifications)
            this.notifications = this.user.notifications;
          this.isCurrentGr = true;
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
</style>
