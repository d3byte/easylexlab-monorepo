<template>
<div>
  <div class="item">
    <div class="item-bg" :style="{ background: background }"></div>
    <div class="p-a-md">
      <div class="row m-t">
        <div class="col-sm-12 hidden-md-up ad" style="margin-bottom: 10px;">
          <div class="padding box" v-if="showAd">
            <span class="pull-right m-r hover" @click="hideAd"><i class="material-icons">&#xE5CD;</i></span>
            <center>
              <h4>А еще мы сделали приложение</h4>
              <img src="../pics/googleplay.png" width="135px" height="40px"></img>
              <img src="../pics/appstore.svg"></img>
            </center>
          </div>
        </div>
        <div class="col-md-8 col-sm-12">
          <a href class="pull-left m-r-md hidden-xs-down">
            <span class="avatar w-96" :style="{ backgroundColor: color }">
              <h1>{{ token.permissions == 'teacher' ? 'T' : 'S' }}</h1>
            </span>
          </a>
          <div class="clear m-b">
            <h3 class="m-a-0 m-b-xs">{{ firstName + ' ' + lastName }}</h3>
            <p class="text-muted"><span class="m-r">{{ token.permissions == 'student' ? 'Ученик' : 'Учитель' }}</span> <small><i class="fa fa-map-marker m-r-xs"></i>{{ school }}, {{ city }}</small></p>
          </div>
        </div>
        <div class="col-md-4 ad hidden-sm-down">
          <div class="padding box" v-if="showAd">
            <span class="pull-right m-r hover" @click="hideAd"><i class="material-icons">&#xE5CD;</i></span>
            <center>
              <h4>А еще мы сделали приложение</h4>
              <img src="../pics/googleplay.png" width="135px" height="40px"></img>
              <img src="../pics/appstore.svg"></img>
            </center>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="dker p-x">
    <div class="row">
      <div class="col-sm-6 push-sm-6">
      </div>
      <div class="col-sm-6 pull-sm-6">
        <div class="p-y-md clearfix nav-active-primary">
          <ul class="nav nav-pills nav-sm">
            <li class="nav-item" v-for="group in user._groups">
              <a class="nav-link" @click="changeGroup(group)">{{ group.name }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <router-view></router-view>
</div>
</template>

<script>
import moment from 'moment';
import jwtDecode from 'jwt-decode';

export default {
  data() {
    return {
      date: null,
      firstName: '',
      lastName: '',
      school: '',
      city: '',
      color: '',
      background: '',
      showAd: false,
      showAdContainer: false
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    token() {
      return jwtDecode(this.$store.getters.userToken)
    }
  },
  methods: {
    hideAd() {
      this.showAd = false;
    }
  },
  created() {
    this.firstName = localStorage.firstName;
    this.lastName = localStorage.lastName;
    this.school = localStorage.school;
    this.city = localStorage.city;
    this.background = localStorage.background ? localStorage.background : '#ccc';
    this.color = localStorage.color ? localStorage.color : 'white';
    this.setDate();
    if(localStorage.ad == 'true') {
      this.showAd = true;
      localStorage.ad = 'false';
    }
  }
}
</script>

<style lang="css" scoped>
.avatar {
  width: 130px;
  height: 130px;
  border: 2px solid #343A3F;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.google {
  padding: 0px;
  margin: 0px;
}

.ad {
  display: flex;
  vertical-align: center;
  justify-content: center;
}
</style>
