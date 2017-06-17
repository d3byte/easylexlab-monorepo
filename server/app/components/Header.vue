<template>
  <div>
    <nav class="header">
      <div class="left">
        <h3 class="naming">
          <router-link to="/" tabindex="-1">EasyFlexLab</router-link>
        </h3>
      </div>
      <div class="right">
        <h3 class="login">
          <router-link v-if="!logged" class="login" to="/login">Вход</router-link>
          <div v-else>
            <router-link class="login" to="/profile" tabindex="-1">Привет, <b>{{ username }}</b>!</router-link><br>
            <span @click="logout" class="login logout" tabindex="-1">Выход</span>
          </div>
        </h3>
      </div>
    </nav>
  </div>
</template>

<script>
import VueRouter from 'vue-router';
import jwtDecode from 'jwt-decode';

$(document).ready(function() {
  setInterval(checkScroll, 200);
});

function checkScroll() {
  var nav = $('.header').first();

  if($(document).scrollTop() > 0 && !nav.hasClass('scrolling'))
    nav.addClass('scrolling');
  else if($(document).scrollTop() === 0 && nav.hasClass('scrolling'))
    nav.removeClass('scrolling');
}

export default {
  computed: {
    logged() {
      return this.$store.getters.loginState;
    },
    username() {
      return jwtDecode(this.$store.getters.userToken).username;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      localStorage.clear();
      this.$router.push({ path: '/' });
    }
  }
}

</script>

<style lang="css">
</style>
