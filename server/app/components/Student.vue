<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8 box">
        <div class="col-lg-3 ava blue vertical-center">
          <h2 class="white-text">Аватарка</h2>
        </div>
        <div class="col-lg-9 userinfo">
          <h2 class="name"><b>{{ user.name }}</b><span class="permissions"> - {{ user.permissions == 'student' ? 'ученик' : 'учитель' }}</span></h2>
          <h3><span  class="school">{{ user.school }}</span></h3>
        </div>
      </div>
      <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1"></div>
      <div class="col-lg-3 box blue vertical-center date">
        <h5 class="white-text"> Ближайший день сдачи </h5><br>
        <h1 class="number white-text">{{ date.slice(0, 2) }}</h1>
        <h1 class="month white-text">{{ date.slice(2) }}</h1>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      date: null
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
  },
  created() {
    this.$store.dispatch('hideGames');
    this.$store.dispatch('zeroAttempts');
    this.$store.dispatch('testNotAvailable');
    moment.locale('ru');
    let date = moment().format('LL');
    date = date.slice(0, date.length - 8);
    this.date = date;
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
