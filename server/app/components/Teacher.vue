<template>
<div>
  <div class="item">
    <div class="item-bg" style="background-image: linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ce5488 66%, #c64f81 100%);"></div>
    <div class="container">
        <div style="padding-top: 10px;" class="col-sm-12" :class="showAd ? 'col-md-8' : 'col-md-12'">
          <a href class="pull-left m-r-md hidden-xs-down">
            <span class="avatar" :style="{ backgroundColor: color }">
              <span v-if="!!!image.length">{{ token.permissions == 'teacher' ? 'T' : 'S' }}</span>
              <img v-else :src="`data:image/${ext};base64,${image}`">
            </span>
          </a>
          <div class="clear text-white teacher-info">
            <h6 class="m-a-0 m-b-xs calc text-white"><b>{{ firstName + ' ' + lastName }}</b></h6>
            <p class="text-white">
              <h6 class="m-r"><b>{{ token.permissions == 'student' ? 'Ученик' : 'Учитель' }}</b></h6>
              <h6 style="margin-right: 10px">ОУ: <b>{{ school }}</b><b><i class="fa fa-map-marker m-r-xs"></i> {{ city }}</b></h6>
            </p>
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
      backgroundUrl: '',
      color: '',
      background: '',
      showAd: false,
      showAdContainer: false,
      image: localStorage.img ? localStorage.img : '',
      ext: localStorage.ext ? localStorage.ext : ''
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
  width: 140px;
  height: 140px;
  border: 2px solid rgb(144, 197, 246);
  display: inline-flex;
  align-items: center;
  justify-content: center;
} .avatar img {
  width: 140px;
  height: 140px;
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
  padding:0px 25px;
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.teacher-info {
  margin-top: 30px;
}
</style>
