<template>
  <div>
    <div class="row box">
      <div @click="switchTasks" class="navbar-item" :class="showTasks ? 'active' : ''">
        Задания
      </div>
      <div @click="switchMsgs" class="navbar-item" :class="showMsgs ? 'active' : ''">
        Сообщения
      </div>
    </div>
    <div v-if="showTasks" class="row box">
      <h3 v-if="!!!tasks.length && !showPreloader">Заданий нет</h3>
      <i v-if="showPreloader" class="material-icons preloader">cached</i>
      <div v-if="!showPreloader" class="row">
        <div id="test_card" v-for="test in tasks" class="box col-lg-3 col-md-3 col-sm-6 col-xs-12">
          <h3>{{ test.name }}</h3>
          <router-link :to="'/task/' + test._id">Перейти</router-link>
        </div>
      </div>
    </div>
    <div v-if="showMsgs" class="row box">
      <h3 v-if="!!!messages.length && !showPreloader">Сообщений нет</h3>
      <i v-if="showPreloader" class="material-icons preloader">cached</i>
      <div v-if="!showPreloader" class="row">
        <div id="test_card" v-for="msg in messages" class="box col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <h4>{{ msg.author }}</h4>
          <hr>
          <p>{{ msg.text }}</p>
        </div>
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
      messages: [],
      showPreloader: true,
      showTasks: true,
      showMsgs: false
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
  methods: {
    switchTasks() {
      this.showTasks = true;
      this.showMsgs = false;
    },
    switchMsgs() {
      this.showTasks = false;
      this.showMsgs = true;
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
              }
            }
            if(!done) {
              this.tasks.push(test);
            }
          }
        }
      }
      this.showPreloader = false;
    }, 150);
    setTimeout(() => {
      if(this.group.messages) {
        for(var msg of this.group.messages) {
          this.messages.push(msg);
        }
      }
      this.showPreloader = false;
    }, 150);
  }
}
</script>

<style lang="css" scoped>
.box {
  padding: 10px;
  margin-bottom: 30px;
}

.preloader {
  color: black;
  font-size: 30px;
}

.row.box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 20px;
}

.row.box:nth-of-type(2) {
  padding: 10px 20px;
} .row.box:nth-of-type(2) h3 {
  font-weight: normal;
}

.navbar-item {
  padding: 7px 0;
  transition: 0.3s;
  border-bottom: 2px solid transparent;
}

.active {
  border-color: rgb(29,157,244);
}

.navbar-item:hover {
  cursor: pointer;
  border-color: rgb(29,157,244);
}

.navbar-item:first-of-type {
  margin-right: 60px;
}

#test_card{
  margin: 20px;
}
</style>
