<template>
<div>
  <div class="item">
    <div class="item-bg" :style="{ background: background }"></div>
    <div class="container">
        <div style="padding-top: 10px;" class="col-sm-12" :class="showAd ? 'col-md-8' : 'col-md-12'">
          <a href class="pull-left m-r-md hidden-xs-down">
            <span class="avatar w-96" :style="{ backgroundColor: color }">
              <h1 class="text-white"><b>{{ firstName.slice(0, 1) + lastName.slice(0, 1) }}</b></h1>
            </span>
          </a>
          <div class="clear m-b">
            <h5 class="m-a-0 m-b-xs calc text-white"><b>{{ firstName + ' ' + lastName }}</b></h5>
            <p class="text-white"><span class="m-r">{{ token.permissions == 'student' ? 'Ученик' : 'Учитель' }}</span><small><i class="fa fa-map-marker m-r-xs"></i>{{ school }}, {{ city }}</small></p>
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
    this.background = localStorage.background ? localStorage.background : 'linear-gradient(to right, rgb(56, 155, 180), rgb(121, 101, 190)';
    this.color = localStorage.color ? localStorage.color : 'rgb(98, 171, 242)';
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
  border: 2px solid rgb(144, 197, 246);
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

.container {
  width: 75%;
  margin-bottom: 10px;
  padding:5px 25px;
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
