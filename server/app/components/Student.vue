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
            <p class="text-muted"><span class="m-r">{{ token.permissions == 'student' ? 'Ученик' : 'Учитель' }}</span> <small><i class="fa fa-map-marker m-r-xs"></i>{{ school }}</small></p>
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
            <li class="nav-item">
              <a class="nav-link" @click="switchTasks" data-target="#tab_1">Задания</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="switchMsgs" data-target="#tab_2">Сообщения</a>

            </li>
            <li class="nav-item" v-for="group in user._groups">
              <a class="nav-link" @click="changeGroup(group)">{{ group.name }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div v-show="showTasks" class="row checkbox">
    <input type="checkbox" id="padding" v-model="showAll">
    <label for="padding" id="nope">Показывать все задания</label>
  </div>
  <div class="row">
    <div class="col-sm-8 col-lg-8">
      <div class="tab-content">
        <div v-if="showTasks">
          <div class="tab-pane p-v-sm" id="tab_1">
            <h3 v-if="!!!uncompletedTasks.length && !showPreloader && !showAll">Невыполненных заданий нет</h3>
            <h3 v-if="!!!tasks.length && !showPreloader && showAll">Заданий нет</h3>
            <!-- Нужно, чтобы этот h3 показывался при условии, как и все задания, даже выполненные -->
            <i v-if="showPreloader" class="material-icons preloader">cached</i>
            <div v-if="!showPreloader" class="row">
              <div v-show="!showAll" v-for="test in uncompletedTasks" class="col-lg-3 col-md-3 col-sm-6 col-xs-12 box task">
                <div class="taskcontentouter">
                  <div class="taskcontent">
                    <center>
                      <h3>{{ test.name }}</h3>
                      <button class="btn btn-primary"><router-link :to="'/task/' + test._id">Перейти</router-link></button>
                    </center>
                  </div>
                </div>
              </div>
              <div v-show="showAll" v-for="test in tasks" class="col-lg-3 col-md-3 col-sm-6 col-xs-12 box task">
                <div class="taskcontentouter">
                  <div class="taskcontent">
                    <center>
                      <h3>{{ test.name }}</h3>
                      <button class="btn btn-primary"><router-link :to="'/task/' + test._id">Перейти</router-link></button>
                    </center>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div v-if="showTasks" class="col-sm-4 col-lg-4">
      <div>
        <center>
          <div class="box blue vertical-center date">
            <h4>Ближайший день сдачи:</h4>
            <br>
            <h3><b>{{ date.slice(0, 2) + " " + date.slice(2) }}</b> </h3>
          </div>
        </center>
      </div>
    </div>


        <div v-if="showMsgs">
          <div class="col-lg-12 col-sm-12">
          <div class="padding">
          <div class="tab-pane p-v-sm" id="tab_2">
            <h3 v-if="!!!group.messages.length && !showPreloader">Сообщений нет</h3>
            <i v-if="showPreloader" class="material-icons preloader">cached</i>
            <div v-if="!showPreloader" class="row">
              <!-- <div id="msg_card" v-for="msg in group.messages" class="box col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <h5>От кого: <b>{{ msg.author }}</b></h5>
                <p>Содержание: {{ msg.text }}</p>
                <tr>
                <td></td>
              </tr>
              </div> -->

                <div class="box" v-for="(msg, index) in group.messages">
                  <div class="box-header">
                    <h2>Входящие сообщения</h2>
                  </div>
                  <div class="table-responsive">
                    <table ui-jp="dataTable" class="table table-striped b-t b-b">
                      <thead>
                        <tr>
                          <th style="width:2%">#</th>
                          <th style="width:10%">Дата</th>
                          <th style="width:15%">От кого</th>
                          <th style="width:15%">Сообщение</th>
                        </tr>
                      </thead>
                      <tbody>
                        <td>{{ index + 1}}</td>
                        <td></td>
                        <td>{{ msg.author}}</td>
                        <td>{{ msg.text}}</td>
                      </tbody>
                    </table>
                  </div>
                </div>
                <center>
                  <button class="btn btn-primary">Показать еще</button>
                </center>

              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
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
      tasks: [],
      uncompletedTasks: [],
      messages: [],
      showPreloader: true,
      showTasks: true,
      showMsgs: false,
      showAll: false
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
    switchTasks() {
      this.showTasks = true;
      this.showMsgs = false;
    },
    switchMsgs() {
      this.showTasks = false;
      this.showMsgs = true;
    },
    changeGroup(group) {
      this.$store.dispatch('changeCurrentGroup', group);
      this.sortTasks();
    },
    sortTasks() {
      this.tasks = [];
      this.uncompletedTasks = [];
      for (var test of this.group._tests) {
        var done = false;
        if (test.results) {
          for (let result of test.results) {
            if (result.username == this.user.username) {
              done = true;
            }
          }
          if (!done) {
            this.uncompletedTasks.push(test);
          }
        }
        this.tasks.push(test);
      }
    },
    msgNum() {
      var x = 0;
      for (msg in group.messages) {
        x++;
      }
    }
  },
  created() {
    this.firstName = localStorage.firstName;
    this.lastName = localStorage.lastName;
    this.school = localStorage.school;
    this.$store.dispatch('hideGames');
    this.$store.dispatch('zeroAttempts');
    this.$store.dispatch('testNotAvailable');
    this.setDate();
    setTimeout(() => {
      if (this.group._tests) {
        this.sortTasks();
      }
      this.showPreloader = false;
      if (this.group.messages) {
        for (var msg of this.group.messages) {
          this.messages.push(msg);
        }
      }
    }, 150);
  }
}
</script>

<style lang="css" scoped>
.date h1, .date h5 {
  font-family: 'Roboto', sans-serif !important;
}

.task {
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
}

#padding {
  margin-left: 20px;
}

#msg_card {
  padding: 10px;
}

#nope {
  padding-left: 10px !important;
}

.checkbox {
  display: flex;
  justify-content: start;
}

.taskcontentouter {
  display: flex;
  justify-content: center;
  padding: 5% 0;
}

.taskcontent {
  padding: 10% 0;
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
