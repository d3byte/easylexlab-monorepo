<template>
<div>
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8 box">
        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 vertical-center ava">
          <div class="avatar"></div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 userinfo">
          <h2 class="name">{{ user.name }}</h2>
          <h3 class="permissions">{{ user.permissions == 'student' ? 'Ученик' : 'Учитель' }}</h3>
          <h3 class="school">{{ user.school }}</h3>
        </div>
      </div>
      <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1"></div>
      <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 box blue marg">
        <div class="vertical-center">
          <h3> Ближайший день сдачи </h3>
          <br>
          <h1>{{ date }}</h1>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</div>
</template>

<script>
import jwtDecode from 'jwt-decode';

export default {
  data() {
    return {
      date: null
    }
  },
  computed: {
    user() {
      return jwtDecode(this.$store.getters.userToken);
    }
  },
  created() {
    this.$store.dispatch('hideGames');
    this.$store.dispatch('zeroAttempts');
    this.$store.dispatch('testNotAvailable');
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    dd < 10 ? dd = '0' + dd : dd = dd;
    mm < 10 ? mm = '0' + mm : mm = mm;
    today = dd + '/' + mm + '/' + yyyy;
    this.date = today;
  }
}
</script>

<style lang="css" scoped>
.ava {
  justify-content: center;
  min-height: 220px;
}

.avatar {
  width: 170px;
  height: 170px;
  border: 7px solid #6D696A;
  border-radius: 50%;
  background: #ADA8A8;
  float: right;
}

.userinfo {
  padding-left: 40px;
}

.name, .school {
  font-weight: bold;
} .school {
  opacity: 0.75;
}

.box {
  background-color:#fff;
  min-height:220px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23), 0 7px 6px rgba(0,0,0,0.23) ;
  border-radius: 2px;
}

.row:first-of-type {
  margin-bottom: 25px;
}

.row:nth-of-type(2) {
  display: flex;
  justify-content: space-between;
}

.blue { /* лабуди лабудай */
  background-color: rgb(29,157,244);
  color: white;
}

.row {
  display: flex; /* equal height of the children */
}

.col {
  flex: 1; /* additionally, equal width */

  padding: 1em;
  border: solid;
}

.container{
  width:85%;
}
</style>
