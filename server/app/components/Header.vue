<template>
  <div class="navigator">
    <h3 class="naming">
      <router-link to="/" tabindex="-1">EasyLexLab</router-link>
    </h3>
    <div v-if="!logged" class="login">

      <login v-if="showLogin"></login>
      <transition name="fade" mode="out-in">
        <div>
          <button v-if="!showLogin" @click="show" class="btn btn-default">Вход</button>
          <router-link to="/signup"><button v-if="!showLogin" class="btn btn-default">Зарегистрироваться</button></router-link>
        </div>
      </transition>
    </div>
    <div v-if="logged" class="logged">
      <div class="nav-item">
        <button class="btn btn-default"><router-link to="/profile/stats">Статистика</router-link></button>
      </div>
      <div :class="user.permissions == 'student' ? 'nav-item select' : 'nav-item'">
        <button v-if="user.permissions == 'teacher'" class="btn btn-default"><router-link to="/profile/newgroup">Новая группа</router-link></button>
        <div v-if="user.permissions == 'student'" class="ui selection dropdown list">
          <input type="hidden" name="group" v-model="this.$store.state.currentGroup">
          <i class="dropdown icon"></i>
          <div class="default text">Выбор группы</div>
          <div class="menu">
            <div v-for="group in user.groups" :data-value="group.name">{{ group.name }}</div>
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
  computed: {
    logged() {
      return this.$store.getters.loginState
    },
    showLogin() {
      return this.$store.getters.showLogin
    },
    user() {
      return jwtDecode(this.$store.getters.userToken)
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push({ path: '/' });
      localStorage.clear();
    },
    show() {
      this.$store.dispatch('hideOrShowLogin');
    }
  },
  mounted() {
    $('.ui.dropdown').dropdown();
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

.navigator {
  box-shadow: 0 3px 8px black;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #1DA1F2;
  padding: 8px;
  padding-left: 36px;
  padding-right: 36;
  color: white;
  z-index: 5;
}

.login {
  font-size: 16px;
  margin-right: 20px;
  color: white;
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
  color: white;
  font-family: 'Patrick Hand SC', cursive;
  font-size: 30px;
} .naming:hover {
  cursor: default;
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

.recover {
  transition: 0.2s;
  color: darkgray;
  margin-left: 15px;
  margin-right: 15px;
  font-size: 12px;
}


.profile {
  background: #D8D8D8;
  box-shadow: 0 1px 4px black;
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
  text-shadow: 0 1px 8px black;
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
} .nav-item:nth-child(2) {
  padding: 1px 20px;
} .nav-item {
  padding: 0 20px;
  position: relative;
} .nav-item:last-child {
  padding: 0;
  margin: 0 20px;
} .nav-item:last-child:hover {
  cursor: pointer;
} .nav-item:nth-child(3) {
  padding: 0 20px;
  padding-top: 5px;
} .nav-item:nth-child(2)::before,
  .nav-item:nth-child(3)::before {
  content: " ";
  position: absolute;
  width: 2px;
  height: 25px;
  left: 0;
  top: 8px;
  box-shadow: 0 1px 4px black;
  background: white;
  border-radius: 2px;
} .nav-item:nth-child(3)::after {
  content: ' ';
  position: absolute;
  width: 2px;
  height: 25px;
  right: 0;
  box-shadow: 0 1px 4px black;
  background: white;
  border-radius: 2px;
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

.select::before {
  top: 10px !important;
}

.list {
  background: transparent;
} .list > option:first-of-type {
  color: white !important
}


</style>
