<template>
  <div class="navigator">
    <h3>
      <router-link to="/" tabindex="-1">EasyLexLab</router-link>
    </h3>
    <div v-if="!logged" class="login">
      <login v-if="showLogin"></login>
      <div>
        <a class="login" v-if="!showLogin" @click="show">Вход</a>
        <router-link to="/signup"><a v-if="!showLogin">Зарегистрироваться</a></router-link>
      </div>
    </div>
    <div v-if="logged" class="logged">
      <div class="nav-item">
        <a><router-link to="/profile/stats">Статистика</router-link></a>
      </div>
      <div :class="user.permissions == 'student' ? 'nav-item select' : 'nav-item'">
        <a v-if="user.permissions == 'teacher'"><router-link to="/profile/newgroup">Новая группа</router-link></a>
        <div  v-if="user.permissions == 'student'" class="ui dropdown list">
          <div v-if="isCurrentGr" class="text">{{ currentGroup.name }}</div>
          <div id="test" v-else class="text">Выбор группы</div>
          <i class="dropdown icon"></i>
          <div class="menu">
            <div v-for="group in groups" @click="changeGroup(group)" class="item">{{ group.name }}</div>
          </div>
        </div>
      </div>
      <div class="nav-item">
        <i class="notifications material-icons">notifications</i>
      </div>
      <div class="ui right pointing dropdown nav-item profile">
        <button class="avatar">
        </button>
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

export default {
  data() {
    return {
      requested: false,
      isCurrentGr: false,
      currentGroup: {}
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
      return this.$store.state.user.groups;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$store.dispatch('hideGames');
      this.$router.push({ path: '/' });
      localStorage.clear();
    },
    show() {
      this.$store.dispatch('hideOrShowLogin');
    },
    changeGroup(group) {
      this.$store.dispatch('changeGroup', group);
      this.currentGroup = group;
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
    for(let groupId of this.user.groups) {
      this.$http.post('groups',{ groupId } , { headers: {
            'Content-type' : 'application/json',
            'Authorization': 'Bearer ' + this.$store.getters.userToken
          }}).then(res => {
          this.$store.state.user.groups.push(res.body.group);
          if(this.$store.state.user.groups.length == 1) {
            this.$store.dispatch('changeGroup', res.body.group);
            this.isCurrentGr = true;
            this.currentGroup = res.body.group;
          }
        });
    }
    setTimeout(() => {
      this.$http.post('gettests', { groupId: this.$store.state.currentGroup._id }, {
        headers: {
          'Content-type' : 'application/json',
          'Authorization': 'Bearer ' + this.$store.getters.userToken
        }
      }).then(res => {
        this.$store.dispatch('addTests', res.body.stacks);
      });
    }, 100);
  },
  components: {
    'login': Login
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


.naming {
  margin: 0;
  padding: 0;
  position: relative;
  padding-left: 32px;
} .naming a {
  font-family: 'Patrick Hand SC', cursive;
  font-size: 30px;
  color: rgb(0,162,238) !important;
/*} .naming:hover {
  cursor: default;*/
} .naming::before {
  content: ' ';
  position: absolute;
  width: 25px;
  height: 25px;
  left: 0;
  top: 4px;
  border-radius: 2px;
  background: #D8D8D8;
}

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
} .avatar {
  border: none;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.notifications {
  text-shadow: 0 1px 3px black;
  font-size: 26px;
} .notifications:hover {
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
  position: relative;
} .nav-item:last-child {
  padding: 0;
  margin: 0 20px;
} .nav-item:nth-child(3)::before,
  .nav-item:nth-child(3)::after {
  bottom: 0;
  top: 7px;
} .nav-item a {
  /*color: white;*/
}

.item {
  color: black;
} .item:hover {
  color: black;
}

.preloader {
  color: white;
}

[login] {
  transform: translateX(-400px);
}

.list {
  background: transparent;
} .list > option:first-of-type {
  color: white !important
}

.nav-item.select::before {
  top: 0;
} .text {
  color: white;
  text-shadow: 0 1px 1px black;
}

.text {
  color: black !important;
  text-shadow: none !important;
}

</style>
