<template>
  <div class="container">
    <h2>{{ group.name }}</h2>
    <hr>
    <i v-if="showPreloader" class="material-icons preloader">cached</i>
    <div v-if="!showPreloader" class="row">
      <h3>Невыполненные задания</h3>
      <div v-for="test in tasks" class="box col-lg-3 col-md-3 col-sm-6 col-xs-12">
        <h3>{{ test.name }}</h3>
        <router-link :to="'/task/' + test._id">Перейти</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode';

export default {
  data() {
    return {
      tasks: [],
      showPreloader: true
    }
  },
  computed: {
    group() {
      return this.$store.getters.currentGroup
    },
    user() {
      return jwtDecode(this.$store.getters.userToken)
    }
  },
  created() {
    setTimeout(() => {
      if(this.group._tests) {
        for(var test of this.group._tests) {
          var done = false;
          if(test.results) {
            for(let result of test.results) {
              if(result.username == this.user.username) {
                done = true;
                break;
              }
            }
          }
          if(!done) {
            this.tasks.push(test);
          }
        }
      }
      this.showPreloader = false;
    }, 150);
  }
}
</script>

<style lang="css">
.box {
  padding: 10px;
  margin-bottom: 15px;
}

.preloader {
  color: black;
  font-size: 30px;
}
</style>
