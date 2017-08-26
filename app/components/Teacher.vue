<template>
<div>
<div class="item">
  <div class="item-bg">
    <img src="../assets/images/a6.jpg" class="blur opacity-3">
  </div>
  <div class="p-a-md">
    <div class="row m-t">
      <div class="col-sm-7">
        <a href class="pull-left m-r-md">
              <span class="avatar w-96">
                <img src="../assets/images/a0.jpg">
              </span>
            </a>
        <div class="clear m-b">
          <h3 class="m-a-0 m-b-xs">{{ firstName + ' ' + lastName }}</h3>
          <p class="text-muted"><span class="m-r">{{ token.permissions == 'student' ? 'Ученик' : 'Учитель' }}</span> <small><i class="fa fa-map-marker m-r-xs"></i>{{ school }}, {{ city }}</small></p>
        </div>
      </div>
      <div class="col-sm-5">
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
      city: ''
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
    this.setDate();
  }
}
</script>

<style lang="css" scoped>
.date h1, .date h5 {
  font-family: 'Roboto', sans-serif !important;
}

.number {
  margin-bottom: -15px;
  font-size: 52px;
} .month {
  font-size: 20px;
}

h5.white-text {
  opacity: 0.75;
}

.deadline {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.col-lg-8.box, .row {
  padding: 0 !important;
}

.ava {
  justify-content: center;
  min-height: 160px;
}

.permissions {
  font-size: 16px;
  opacity: 0.75;
}

.userinfo {
  padding: 20px;
  padding-left: 30px;
}

.name, .school {
  font-weight: bold;
} .school {
  opacity: 0.75;
}

.box {
  background-color: #fff;
  min-height: 160px;
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

.container {
  width: 75%;
}
</style>
