<template>
  <div class="header">
      <div class="left">
        <h3 class="naming">
          <router-link to="/" tabindex="-1">EasyFlexLab</router-link>
        </h3>
      </div>
      <div class="right login">
        <login v-if="showLogin"></login>
        <button v-if="!logged && !showLogin" @click="show" class="login-btn">Вход</button>
        <button v-if="!logged && !showLogin" class="contact-btn">Связаться с нами</button>
        <div v-if="logged">
          <router-link class="login" to="/profile" tabindex="-1">Профиль</router-link>
          <span @click="logout" class="login logout" tabindex="-1">Выход</span>
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
  box-shadow: 0 1px 5px black;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #333533;
  padding: 8px;
  padding-left: 36px;
  padding-right: 36;
  color: white;
  z-index: 5;
}

.login, .logout {
  font-size: 20px;
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
}.logout:hover {
  color: #CCDAD1;
  text-decoration: none;
}

.naming {
  color: white;
} .naming:hover {
  cursor: default;
}
</style>
