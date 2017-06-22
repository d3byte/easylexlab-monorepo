<template>
  <div>
    <nav class="header">
      <div class="left">
        <h3 class="naming">
          <router-link to="/" tabindex="-1">EasyFlexLab</router-link>
        </h3>
      </div>
      <div class="right login">
        <router-link v-if="!logged" class="login" to="/login">Вход</router-link>
        <div v-else>
          <router-link class="login" to="/profile" tabindex="-1">Профиль</router-link>
          <span @click="logout" class="login logout" tabindex="-1">Выход</span>
        </div>
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
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push({ path: '/' });
      localStorage.clear();
    }
  }
}

</script>

<style lang="css">
h1, h2, h3, h4, h5, h6 {
  margin: 0;
}

.login, .logout {
  font-size: 20px;
}

.logout {
  transition: 0.2s;
}.logout:hover {
  color: #CCDAD1;
  text-decoration: none;
}
</style>
