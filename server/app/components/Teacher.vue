<template>
<div class="container">
  <div class="row">
    <div class="box">
      <div class="ava col-lg-4 col-md-4 col-sm-4 col-xs-4">
          <div class="avatar" style="margin-top:50px;"></div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 userinfo">
          <h1 class="name">{{ user.username }}</h1>
          <h2 class="school">{{ user.school }}</h2>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
          <center>
          <h1> Социальные сети </h1>

          <br>
          <div class="col-lg-6"><a href="https://vk.com/dierk" target="_blank" class="btn-social btn-vk"><i class="fa fa-vk"></i></a></div>
          <div class="col-lg-6"><a href="http://facebook.com/" target="_blank" class="btn-social btn-facebook"><i class="fa fa-facebook"></i></a></div>
          <br>
          <div class="col-lg-6"><a href="https://twitter.com/russiankenny" target="_blank" class="btn-social btn-twitter"><i class="fa fa-twitter"></i></a></div>
          <div class="col-lg-6"><a href="http://instagram.com/dierk.prod" target="_blank" class="btn-social btn-instagram"><i class="fa fa-instagram"></i></a></div>
          </center>
        </div>
      </div>
      <hr>
    </div>
    <br>
      <div class="row">
    <div class="box">
      <router-view></router-view>
    </div>
  </div>
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

.cntr{
  display: flex;
  flex-direction: column;
  align-items: center;
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

.box{
    background-color:#fff;
      min-height:300px;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23), 0 7px 6px rgba(0,0,0,0.23) ;
     border-radius: 2px;
}


a.btn-social,
.btn-social
{
    border-radius: 50%;
    color: #ffffff !important;
    display: inline-block;
    height: 54px;
    line-height: 54px;
    margin: 8px 4px;
    text-align: center;
    text-decoration: none;
    transition: background-color .3s;
    webkit-transition: background-color .3s;
    width: 54px;
}

.btn-social .fa,.btn-social i
{
    backface-visibility: hidden;
    moz-backface-visibility: hidden;
    ms-transform: scale(1);
    o-transform: scale(1);
    transform: scale(1);
    transition: all .25s;
    webkit-backface-visibility: hidden;
    webkit-transform: scale(1);
    webkit-transition: all .25s;
}
.btn-social:hover,.btn-social:focus
{
    color: #fff;
    outline: none;
    text-decoration: none;
}
.btn-social:hover .fa,.btn-social:focus .fa,.btn-social:hover i,.btn-social:focus i
{
    ms-transform: scale(1.3);
    o-transform: scale(1.3);
    transform: scale(1.3);
    webkit-transform: scale(1.3);
}
.btn-social.btn-xs
{
    font-size: 9px;
    height: 24px;
    line-height: 13px;
    margin: 6px 2px;
    width: 24px;
}
.btn-social.btn-sm
{
    font-size: 13px;
    height: 36px;
    line-height: 18px;
    margin: 6px 2px;
    width: 36px;
}
.btn-social.btn-lg
{
    font-size: 22px;
    height: 72px;
    line-height: 40px;
    margin: 10px 6px;
    width: 72px;
}

.btn-twitter
{
    background-color: #55acee;
}
.btn-twitter:hover
{
    background-color: #83c3f3;
}

.btn-vk
{
    background-color: #45668e;
}
.btn-vk:hover
{
    background-color: #587fae;
}

.btn-instagram
{
    background-color: #3f729b;
}
.btn-instagram:hover
{
    background-color: #548cb9;
}

.btn-facebook
{
    background-color: #3b5998;
}
.btn-facebook:hover
{
    background-color: #4c70ba;
}
</style>
