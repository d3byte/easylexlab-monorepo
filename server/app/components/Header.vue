<template>
  <div class="header">
    <h3 class="naming">
      <router-link to="/" tabindex="-1">The Lexach</router-link>
    </h3>
    <div v-if="!logged" class="login">
      <login v-if="showLogin"></login>
      <button v-if="!showLogin" @click="show" class="login-btn">Вход</button>
      <button v-if="!showLogin" class="contact-btn">Связаться с нами</button>
    </div>
    <div v-if="logged" class="logged">
      <button class="nav-item flat-btn">Статистика</button>
      <button class="nav-item flat-btn">Новая группа</button>
      <i class="nav-item notifications material-icons">notifications</i>
      <div class="nav-item profile dropdown">
        <button class="avatar dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
              <li class="dropdown-header">Меню</li>
              <li><a href="#">Профиль</a></li>
              <li><a href="#">Настройки</a></li>
              <li role="separator" class="divider"></li>
              <li><router-link to="/logout">Выйти</router-link></li>
            </ul>
        </button>
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
  components: {
    'login': Login
  }
}

</script>

<style lang="css">
h1, h2, h3, h4, h5, h6 {
  margin: 0;
}

.header {
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

.login, .logout {
  font-size: 16px;
  margin-right: 20px;
  color: white;
}

.login-btn {
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
  background: white;
  color: #2B303A;
}

.contact-btn {
  text-align: center;
  border: 1px solid transparent;
  border-radius: 2px;
  background: #5688C7;
  font-size: 16px;
  transition: 0.4s;
  padding-left: 10px;
  padding-right: 10px;
} .contact-btn:hover {
  background: #176087;
  border: 1px solid #ccc;
}

.logout {
  transition: 0.2s;
}

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
} .nav-item {
  margin-right: 20px;
  padding-left: 20px;
  position: relative;
} .nav-item:last-child {
  padding-left: 0;
} .nav-item:last-child:hover {
  cursor: pointer;
} .nav-item:nth-child(3) {
  padding: 0 20px;
} .nav-item:nth-child(2)::before,
  .nav-item:nth-child(3)::before {
  content: " ";
  position: absolute;
  width: 2px;
  height: 25px;
  left: 0;
  top: 0;
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
} .nav-item::after:hover,
  .nav-item::before:hover {
    cursor: default;
} .nav-item:nth-child(3)::before,
  .nav-item:nth-child(3)::after {
  top: 3px;
}


</style>
