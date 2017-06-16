<template>
  <div>
    <nav class="header">
      <div class="left">
        <h4>*Project name*</h4>
      </div>
      <div class="right">
        <h4 class="login"><router-link class="login" to="/">Вход</router-link></h4>
      </div>
    </nav>
  </div>
</template>

<script>
import VueRouter from 'vue-router';

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
}

</script>

<style lang="css">
.right {
  float: right;
  width: 25%;
}
</style>
