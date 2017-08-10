<template>
<div class="navigator">
  <div class="logo-container horizontal-vert-center">
    <router-link to="/" tabindex="-1" class="ui small image logo">
      <img src="pics/logo-small.png">
    </router-link>
    <router-link to="/" tabindex="-1" class="logo-link">
      <h3>EasyLexLab</h3>
    </router-link>
  </div>
  <div v-if="!logged" class="login">
    <login v-if="showLogin"></login>
    <div>
      <a class="login" v-if="!showLogin" @click="show">Вход</a>
      <router-link to="/signup"><a v-if="!showLogin">Зарегистрироваться</a></router-link>
    </div>
  </div>
  <div v-if="logged" class="logged">
    <div v-if="user.permissions == 'student' ? true : false">
      <a>
        <router-link to="/profile/stats">Статистика</router-link>
      </a>
    </div>
    <div :class="user.permissions == 'student' ? 'nav-item select' : 'nav-item'">
      <span v-if="user.permissions == 'teacher'" class="black-text"
            @click="showModal">
        Новая группа
      </span>
      <div class="ui basic modal newGroup">
        <center>
          <div class="header"><b>Создание новой группы</b></div>
          <br>
          <div class="content">
            <newgroup></newgroup>
          </div>
        </center>
      </div>
      <div v-if="user.permissions == 'student'" class="ui dropdown list">
        <div v-if="isCurrentGr" class="text">{{ currentGroup.name }}</div>
        <div id="test" v-else class="text">Выбор группы</div>
        <i class="dropdown icon"></i>
        <div class="menu">
          <div v-for="group in groups" @click="changeGroup(group)" class="item">{{ group.name }}</div>
        </div>
      </div>
    </div>
    <div class="nav-item notif">
      <i v-if="notifications.length == 0" class="material-icons">notifications_off</i>
      <i @click="showNotifs" v-else class="material-icons haveNotifs">notifications_active</i>
    </div>
    <div class="ui pointing right dropdown nav-item profile">
      <img class="ui avatar image">
      <div class="menu">
        <div class="header">Меню</div>
        <router-link class="item" to="/profile">Профиль</router-link>
        <router-link class="item" to="/profile/settings">Настройки</router-link>
        <div class="ui divider"></div>
        <div class="item" @click="logout">Выход</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import jwtDecode from 'jwt-decode';
import Login from './Login.vue';
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
    showLogin() {
      return this.$store.getters.showLogin
    },
    user() {
      return jwtDecode(this.$store.getters.userToken)
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
    showModal() {
      $('.ui.dimmer.modals.page').addClass('active visible').show();
      $('.ui.basic.modal.newGroup').modal('show');
    },
    changeGroup(group) {
      this.$store.dispatch('changeCurrentGroup', group);
    },
    showNotifs() {
      if (!!this.notifications) {
        this.$http.post('readnotifs', {}, {
          headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + this.$store.getters.userToken
          }
        }).then(res => {});
      }
    }
  },
  http: {
    root: '/api'
  },
  mounted() {
    $('.ui.dropdown').dropdown();
    $('ui.selection.dropdown.list').dropdown();
  },
  created() {
    if(!this.$store.getters.requested) {
      // for (let groupId of this.user.groups) {
      //   this.$http.post('groups', {
      //     groupId
      //   }, {
      //     headers: {
      //       'Content-type': 'application/json',
      //       'Authorization': 'Bearer ' + this.$store.getters.userToken
      //     }
      //   }).then(res => {
      //     this.$store.state.user.groups.push(res.body.group);
      //     if (this.$store.state.user.groups.length == 1) {
      //       this.$store.dispatch('changeGroup', res.body.group);
      //       this.$store.dispatch('changeCurrentGroup', res.body.group);
      //       this.$store.dispatch('requestedIsTrue');
      //     }
      //   });
      // }
      this.$http.post('user', {}, { headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.getters.userToken
        }}).then(res => {
          console.log(res);
          this.$store.dispatch('userInfo', res.body.user);
          this.$store.dispatch('changeCurrentGroup', res.body.user._groups[0]);
          this.$store.dispatch('requestedIsTrue');
          this.notifications = res.body.user.notifications;
        });
    }
    this.isCurrentGr = true;
  },
  components: {
    'login': Login,
    'newgroup': NewGroup
  }
}
</script>

<style lang="css">
h1, h2, h3, h4, h5, h6 {
  margin: 0;
}

a {
  color: black;
}

.haveNotifs {
  color: rgb(29,157,244) !important;
}

.navigator {
  box-shadow: 0 3px 6px #ccc;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  padding: 8px;
  padding-left: 36px;
  padding-right: 36;
  color: white;
  z-index: 5;
}

.login {
  font-size: 16px;
  margin-right: 20px;
  /*color: white;*/
} .exit {
  color: black;
}

/*.login-btn {
  text-align: center;
  border-radius: 2px;
  background: transparent;
  border: 1px solid white;
  font-size: 16px;
  transition: 0.4s;
  padding-left: 25px;
  padding-right: 25px;
  margin-right: 15px;
} .login-btn:hover {
  /*background: white;*/
  /*color: black;*/


/*.contact-btn {
  text-align: center;
  border: 1px solid transparent;
  border-radius: 2px;
  background: #5688C7;
  font-size: 16px;
  transition: 0.4s;
  padding-left: 10px;
  padding-right: 10px;
} .contact-btn:hover {
  /*background: #176087;*/
  /*border: 1px solid #ccc;*/

.debug::before {
  content: ' ';
  position: absolute;
  width: 25px;
  height: 25px;
  left: 0;
  top: 4px;
  border-radius: 2px;
  background: #D8D8D8;
}

.recover {
  transition: 0.2s;
  color: darkgray;
  margin-left: 15px;
  margin-right: 15px;
  font-size: 12px;
}


.profile {
  background: #D8D8D8;
  /*box-shadow: 0 1px 4px black;*/
  width: 30px;
  height: 30px;
  margin-bottom: 0;
  margin-top: 0;
  border-radius: 50%;
}

.notif i {
  color: darkgray;
  font-size: 24px;
} .notif i:hover {
  cursor: pointer;
}

.logged {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
} .nav-item {
  padding: 0 20px;
} .nav-item:last-child {
  padding: 0;
  margin: 0 20px;
} .notif {
  padding-left: 0;
}

.item {
  color: black;
} .item:hover {
  color: black;
}

.preloader {
  color: darkgray;
}

.list {
  background: transparent;
} .list > option:first-of-type {
  color: white !important
}

.text {
  color: black !important;
  text-shadow: none !important;
  margin-bottom: 12px !important;
}

.logo-container {
  margin-left: 80px;
}

.logo-link h3 {
  font-size: 24px;
  font-family: 'Signika', sans-serif;
}

.logo {
  width: 25px !important;
  height: 25px !important;
  margin-bottom: 5px;
  margin-right: 10px;
}
</style>
