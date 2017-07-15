<template>
  <div class="container">
    <div class="row">
      <div class="box">
        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 vertical-center ava">
          <div class="avatar"></div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 userinfo">
          <h2 class="name">{{ user.name }}</h2>
          <h3 class="permissions">{{ user.permissions == 'student' ? 'Ученик' : 'Учитель' }}</h3>
          <h3 class="school">{{ user.school }}</h3>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
          <center>
            <h2> Социальные сети </h2>
            <br>
            <div class="col-lg-6"><a href="https://vk.com/dierk" target="_blank" class="btn-social btn-vk"><i class="fa fa-vk"></i></a></div>
            <div class="col-lg-6"><a href="http://facebook.com/" target="_blank" class="btn-social btn-facebook"><i class="fa fa-facebook"></i></a></div>
            <br>
            <div class="col-lg-6"><a href="https://twitter.com/russiankenny" target="_blank" class="btn-social btn-twitter"><i class="fa fa-twitter"></i></a></div>
            <div class="col-lg-6"><a href="http://instagram.com/dierk.prod" target="_blank" class="btn-social btn-instagram"><i class="fa fa-instagram"></i></a></div>
          </center>
        </div>
      </div>
    </div>
    <router-view />
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
</style>
