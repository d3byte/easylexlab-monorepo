<template>
<div>
  <div class="item">
    <div class="item-bg" :style="{ background: background }">

    </div>
    <div class="p-a-md">
      <div class="row m-t">
        <div class="col-sm-7">
          <a href class="pull-left m-r-md">
            <span class="avatar w-96" :style="{ backgroundColor: color }">
              <h1>{{ token.permissions == 'teacher' ? 'T' : 'S' }}</h1>
            </span>
          </a>
          <div class="clear m-b">
            <h3 class="m-a-0 m-b-xs">{{ firstName + ' ' + lastName }}</h3>
            <p class="text-muted"><span class="m-r">{{ token.permissions == 'student' ? 'Ученик' : 'Учитель' }}</span> <small><i class="fa fa-map-marker m-r-xs"></i>{{ school }}, {{ city }}</small></p>
          </div>
        </div>
        <div class="col-sm-5">
          <div class="ad padding" v-if="showAd">
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
    },
    group() {
      return this.$store.getters.currentGroup
    }
  },
  methods: {
    setDate() {
      moment.locale('ru');
      let date = moment().format('LL');
      date = date.slice(0, date.length - 8);
      this.date = date;
    },
    changeGroup(group) {
      this.$store.dispatch('changeCurrentGroup', group);
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
      // localStorage.ad = 'false';
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
  /*width: 300px;*/
}
</style>
