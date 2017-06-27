<template>
  <div class="container-fluid">
    <div class="row">
      <div class="ava col-lg-4 col-md-4 col-sm-4 col-xs-4">
        <div class="avatar">

        </div>
      </div>
      <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8 userinfo">
        <h2 class="name">{{ user.username }}</h2>
        <h5 class="school">{{ user.school }}</h5>
        
      </div>
    </div>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode';

export default {
  computed: {
    user() {
      return jwtDecode(this.$store.getters.userToken);
    }
  }
}
</script>

<style lang="css" scoped>
.ava {
  padding-right: 20px;
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
  color: #6D696A;
  font-weight: bold;
} .school {
  opacity: 0.75;
}
</style>
