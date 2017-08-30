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
            <h5 class="m-a-0 text-md text-muted">Слов выучено: <b>{{ wordsLearnt }}</b></h5>
            <br>
            <h5 class="m-a-0 text-md text-muted">Ближайший день сдачи: <b> {{ date }}</b></h5>
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
    <label for="padding">Показать выполненные</label>
  </div>
  <div class="row">
    <div class="col-sm-12 col-lg-12 padding">
      <div class="tab-content">
        <div v-if="showTasks">
          <div class="tab-pane p-v-sm padding" id="tab_1">
            <h3 v-if="!!!uncompletedTasks.length && !showPreloader && !showAll">Невыполненных заданий нет</h3>
            <h3 v-if="!!!tasks.length && !showPreloader && showAll">Заданий нет</h3>
            <i v-if="showPreloader" class="material-icons preloader">cached</i>
            <div v-if="!showPreloader" class="row">
              <div v-show="!showAll" v-for="test in uncompletedTasks" class="col-lg-3 col-md-3 col-sm-6 col-xs-12 box task">
                <div class="taskcontentouter">
                  <div class="taskcontent">
                    <center>
                      <h3>{{ test.name }}</h3>
                      <p>Крайний срок сдачи: {{ test.deadline }}</p>
                      <button class="btn btn-primary"><router-link :to="'/task/' + test._id">Перейти</router-link></button>
                    </center>
                  </div>
                </div>
              </div>
              <div v-show="showAll" v-for="test in completedTasks" class="col-lg-3 col-md-3 col-sm-6 col-xs-12 box task done">
                <div class="taskcontentouter">
                  <div class="taskcontent">
                    <div class="pull-right success">
                      <i class="material-icons">done</i>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <center>
                        <h3>{{ test.name }} – <span v-for="result in test.results" v-if="result.userId == user._id">{{ result.result }}%</span></h3>
                        <button class="btn btn-primary"><router-link :to="'/task/' + test._id">Улучшить результат</router-link></button>
                      </center>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



    <div v-if="showMsgs">
      <div class="col-lg-12 col-sm-12">
        <div class="padding">
          <div class="tab-pane p-v-sm" id="tab_2">
            <h3 v-if="!!!messages.length && !showPreloader">Сообщений нет</h3>
            <i v-if="showPreloader" class="material-icons preloader">cached</i>
            <div v-if="!!messages.length && !showPreloader" class="row">
              <div class="box">
                <div class="box-header">
                  <h2>Входящие сообщения</h2>
                </div>
                <div class="table-responsive">
                  <table ui-jp="dataTable" class="table table-striped b-t b-b">
                    <thead>
                      <tr>
                        <th style="width:2%">#</th>
                        <th style="width:10%">Дата</th>
                        <th style="width:15%">Сообщение</th>
                        <th style="width:15%">От кого</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(msg, index) in slicedMessages">
                        <td>{{ index + 1}}</td>
                        <td></td>
                        <td>{{ msg.text}}</td>
                        <td>{{ msg.author}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <center>
                <button @click="nextFive" class="btn btn-primary">Показать еще</button>
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
import { EventBus } from './event';

export default {
  data() {
    return {
      date: null,
      firstName: '',
      lastName: '',
      school: '',
      city: '',
      tasks: [],
      completedTasks: [],
      uncompletedTasks: [],
      messages: [],
      slicedMessages: [],
      showPreloader: true,
      showTasks: true,
      showMsgs: false,
      showAll: false,
      wordsLearnt: 0,
      sliceIndex: 0,
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
      let dates = this.uncompletedTasks.map(task => {
        return {
          timeToDo: task.timeToDo,
          deadline: task.deadline
        }
      });
      let closestDay = 0;
      let closest = '';
      for (let date of dates) {
        if (+date.deadline.slice(0, 2).trim() > closestDay) {
          closestDay = +date.deadline.slice(0, 2);
          closest = date.deadline;
        }
      }
      this.date = closest;
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
      this.setDate();
    },
    sortTasks() {
      this.completedTasks = [];
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
          } else {
            this.completedTasks.push(test);
          }
          this.tasks.push(test);
        }
      }
    },
    nextFive() {
      this.sliceIndex += 5;
      this.slicedMessages = this.slicedMessages.concat(this.messages.slice(this.sliceIndex, this.sliceIndex + 5));
    }
  },
  created() {
    if(localStorage.ad == 'true') {
      this.showAd = true;
      localStorage.ad = 'false';
    };
    this.firstName = localStorage.firstName;
    this.lastName = localStorage.lastName;
    this.school = localStorage.school;
    this.city = localStorage.city;
    this.background = localStorage.background ? localStorage.background : '#ccc';
    this.color = localStorage.color ? localStorage.color : 'white';
    this.$store.dispatch('hideGames');
    this.$store.dispatch('zeroAttempts');
    this.$store.dispatch('testNotAvailable');
    EventBus.$once('requested', event => {
      this.wordsLearnt = this.user.wordsLearnt;
      this.sortTasks();
      this.setDate();
      this.showPreloader = false;
      if(this.group && this.group.messages) {
        for (var msg of this.group.messages) {
          this.messages.push(msg);
        }
        this.messages = this.messages.reverse();
        this.slicedMessages = this.messages.slice(0, 5);
      }
    });
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
  margin-left: 30px;
  width: 10px;
}

#msg_card {
  padding: 10px;
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

.success {
  border-radius: 50%;
  margin-left: 5px;
  margin-top: -25px;
} .success > i {
  color: white;
  font-size: 30px;
}

.avatar {
  width: 130px;
  height: 130px;
  border: 2px solid #343A3F;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
