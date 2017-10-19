<template>
<div class="body">
  <div class="item">
    <div class="item-bg" :style="{ background: background }"></div>
    <div class="container">
      <div class="p-a-md">
        <div class="row m-t">
          <div class="col-sm-12" :class="showAd ? 'col-md-8' : 'col-md-12'">
            <a href class="pull-left m-r-md hidden-xs-down">
            <span class="avatar" :style="{ backgroundColor: color }">
              <span v-if="!!!image.length">{{ token.permissions == 'teacher' ? 'T' : 'S' }}</span>
              <img v-else :src="`data:image/${ext};base64,${image}`">
            </span>
          </a>
            <div class="clear m-b">
              <h4 class="text-white m-a-0 m-b-xs"><b>{{ firstName + ' ' + lastName }}</b></h4>
              <h6 class="text-white"><span class="m-r">{{ token.permissions == 'student' ? 'Ученик,' : 'Учитель,' }}</span>ОУ: {{ school }}, <i class="fa fa-map-marker "></i> {{ city }}</h6>
              <br>
              <h5 class="m-a-0 text-white">Слов выучено: <b>{{ wordsLearnt }}</b></h5>
              <br>
              <h5 class="m-a-0 text-white">Выбранная группа: <b>{{ currentGroup.name }}</b></h5>
              <h5 class="m-a-0 text-white" v-if="date">Ближайший день сдачи: <b> {{ date }}</b></h5>
              <h5 class="m-a-0 text-white" v-else>Ближайшего дня сдачи нет</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div style="margin-top: -50px;">
    <div class="row hidden-xs-down" style="padding:0;">
      <div class="col-sm-12" style="background: #5a7fb9;padding:0;">
        <div class="p-y-md clearfix nav-active-primary container" style="margin-bottom:-5px;">
          <ul class="nav nav-pills nav-sm text-white" style="margin-left:95px;">
            <li class="nav-item">
              <button style="font-size: 13px" class="btn btn btn-outline rounded button-task" @click="switchTasks" data-target="#tab_1"><b><i class="fa fa-file-text-o" aria-hidden="true"></i> Задания</b></button>
            </li>
            <li class="nav-item" style="padding-right:90px">
              <button style="font-size: 13px" class="btn btn btn-outline rounded button-msg" @click="switchMsgs" data-target="#tab_2"><b><i class="fa fa-envelope-open-o" aria-hidden="true"></i> Сообщения</b></button>
            </li>
            <li class="nav-item groupbtn" v-for="(group, index) in user._groups">
              <button style="font-size: 13px" class="btn btn btn-outline rounded" @click="changeGroup(group)" 
                v-bind:class="{
                  'group-1':index == 0,
                  'group-2':index == 1,
                  'group-3':index == 2,
                  'group-4':index == 3,
                  'group-5':index == 4}"
                  >
                <b>{{ group.name }}</b>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row hidden-sm-up">
      <div class="col-sm-12 col-xs-12" style="background: rgb(98, 171, 242)">
        <div class="p-y-md clearfix nav-active-primary container" style="margin-bottom:-5px">
          <ul class="nav nav-pills nav-sm text-white">
            <li class="nav-item">
              <button class="btn btn-sm btn-outline rounded button-task" @click="switchTasks" data-target="#tab_1"><i class="fa fa-file-text-o" aria-hidden="true"></i> <b>Задания</b></button>
            </li>
            <li class="nav-item" style="margin-bottom:20px">
              <button class="btn btn-sm btn-outline rounded button-msg" @click="switchMsgs" data-target="#tab_2"><i class="fa fa-envelope-open-o" aria-hidden="true"></i> <b>Сообщения</b></button>
            </li>
            <li class="nav-item" style="margin-top:5px" v-for="group in user._groups">
              <button class="btn btn-sm btn-outline rounded" @click="changeGroup(group)" 
                v-bind:class="{
                  'group-1':index == 0,
                  'group-2':index == 1,
                  'group-3':index == 2,
                  'group-4':index == 3,
                  'group-5':index == 4}"
                  >
                <b>{{ group.name }}</b>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="container" style="margin-top:-40px">
    <div class="row padding">
      <div v-if="showTasks" class="p-v-sm padding">
        <div class="form-check" style="margin-right:25px">
          <label class="form-check-label">
          <input class="form-check-input" type="checkbox" v-model="showAll">
          Показать выполненные задания
        </label>
        </div>
        <h3 v-if="!!!uncompletedTasks.length && !showPreloader && !showAll">Невыполненных заданий нет</h3>
        <h3 v-if="!!!tasks.length && !showPreloader && showAll">Выполненных заданий нет</h3>
        <i v-if="showPreloader" class="material-icons preloader">cached</i>
          <div v-show="!showAll" v-for="(test, index) in uncompletedTasks" class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <div class="col-lg col-md col-sm col-xs box task taskbox" 
              :class="{
                'task-1':  index % 10 == 0,
                'task-2':  index % 10 == 1,
                'task-3':  index % 10 == 2,
                'task-4':  index % 10 == 3,
                'task-5':  index % 10 == 4,
                'task-6':  index % 10 == 5,
                'task-7':  index % 10 == 6,
                'task-8':  index % 10 == 7,
                'task-9':  index % 10 == 8,
                'task-10':  index % 10 == 9 }"
              >
              <div class="taskcontentouter">
                <div class="taskcontent">
                  <center>
                    <h3>
                    <img src="../pics/task-icon.png" class="task-icon">
                    {{ test.name }}
                    </h3>
                    <p> Выполнить до: {{ test.deadline }}</p>
                    <button class="btn btn-primary"><router-link :to="'/task/' + test._id">Перейти</router-link></button>
                  </center>
                </div>
              </div>
            </div>
          </div>
          <div v-show="showAll" v-for="(test, index) in completedTasks" class="col-lg-4 col-md-4 col-sm-6 col-xs-12" style="margin-bottom: 10px;">
            <div class="col-lg col-md col-sm col-xs box task taskbox" 
              :class="{
                'task-1':  index % 10 == 0,
                'task-2':  index % 10 == 1,
                'task-3':  index % 10 == 2,
                'task-4':  index % 10 == 3,
                'task-5':  index % 10 == 4,
                'task-6':  index % 10 == 5,
                'task-7':  index % 10 == 6,
                'task-8':  index % 10 == 7,
                'task-9':  index % 10 == 8,
                'task-10':  index % 10 == 9 }"
              >
              <div class="taskcontentouter">
                <div class="taskcontent">
                  <div class="pull-right success">
                    <i class="material-icons">done</i>
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <center>
                      <h3>
                        <img src="../pics/task-icon.png" class="task-icon">
                        {{ test.name }}
                      </h3>
                      <small>Результат: <span v-for="result in test.results" v-if="result.userId == user._id">{{ result.result }}%</span></small>
                      <button style="margin-top:10px" class="btn btn-primary"><router-link :to="'/task/' + test._id">Улучшить результат</router-link></button>
                    </center>
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
                          <td>{{ msg.text }}</td>
                          <td>{{ msg.author }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <center>
                  <button v-show="slicedMessages.length != messages.length" @click="nextFive" class="btn btn-primary">Показать еще</button>
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
</div>
</template>

<script>
import moment from 'moment';
import jwtDecode from 'jwt-decode';
import {
  EventBus
} from './event';

export default {
  data() {
    return {
      date: null,
      firstName: '',
      lastName: '',
        backgroundUrl: '',
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
      showAdContainer: false,
      currentGroup: {
        name: '',
        _tests: []
      },
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
    setDate() {
      moment.locale('ru');
      let dates = this.uncompletedTasks.map(task => {
        return {
          timeToDo: task.timeToDo,
          deadline: task.deadline
        }
      });
      dates = dates.sort((a, b) => a.timeToDo > b.timeToDo);
      let today = +moment().format('LL').slice(0, 2);
      let closest = '';
      for (let date of dates) {
        if (+date.deadline.slice(0, 2) > today) {
          closest = date.deadline;
          break;
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
      this.currentGroup = group;
      this.sortTasks();
      this.setDate();
    },
    sortTasks() {
      this.completedTasks = [];
      this.uncompletedTasks = [];
      for (var test of this.currentGroup._tests) {
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
    },
    hideAd() {
      this.showAd = false;
    }
  },
  created() {
    if (localStorage.ad == 'true') {
      this.showAd = true;
      localStorage.ad = 'false';
    };
    if (this.$route.path.slice(9) == 'msg') {
      this.showTasks = false;
      this.showMsgs = true;
    }
    this.firstName = localStorage.firstName;
    this.lastName = localStorage.lastName;
    this.school = localStorage.school;
    this.city = localStorage.city;
    this.background = localStorage.background ? localStorage.background : 'linear-gradient(to right, rgb(56, 155, 180), rgb(121, 101, 190))';
    this.color = localStorage.color ? localStorage.color : 'white';
    this.$store.dispatch('hideGames');
    this.$store.dispatch('zeroAttempts');
    this.$store.dispatch('testNotAvailable');
    EventBus.$once('requested', event => {
      this.wordsLearnt = this.user.wordsLearnt;
      if(this.user._groups[0]) {
        this.currentGroup = this.user._groups[0];
        this.sortTasks();
        this.setDate();
      }
      this.showPreloader = false;
      if (this.group && this.group.messages) {
        for (var group of this.user._groups) {
          group.messages.map(msg => this.messages.push(msg));
        }
        this.messages = this.messages.reverse();
        this.slicedMessages = this.messages.slice(0, 5);
      }
    });
  }
}
</script>

<style lang="css" scoped>

.body {
    max-width: 100% !important;
    overflow-x: hidden !important;
}

#padding {
  margin-left: 20px;
  width: 10px;
}

#msg_card {
  padding: 10px;
}


.checkbox {
  display: flex;
  justify-content: center
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

.button-task {
 background-color: #f45c42 !important;
}

.button-msg {
 background-color: #f9ca20 !important;
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


.task-1 {
 border-top: 3px solid rgb(228, 78, 60);
}
.task-2 {
 border-top: 3px solid blue;
}
.task-3 {
 border-top: 3px solid rgb(37, 198, 218);
}
.task-4 {
 border-top: 3px solid rgb(49, 137, 225);
}
.task-5 {
 border-top: 3px solid rgb(234, 168, 59);
}
.task-6 {
 border-top: 3px solid #59C3C3;
}
.task-7 {
 border-top: 3px solid rgb(211, 52, 216);
}
.task-8 {
 border-top: 3px solid rgb(216, 52, 139);
}
.task-9 {
 border-top: 3px solid rgb(216, 117, 52);
}
.task-10 {
 border-top: 3px solid rgb(117, 216, 52);
}

.task-1 button {
 background-color: rgb(228, 78, 60) !important;
 border: none !important;
}
.task-2 button {
 background-color: blue !important;
 border: none !important;
}
.task-3 button {
 background-color: rgb(37, 198, 218) !important;
 border: none !important;
}
.task-4 button {
 background-color: rgb(49, 137, 225) !important;
 border: none !important;
}
.task-5 button {
 background-color: rgb(234, 168, 59) !important;
 border: none !important;
}
.task-6 button {
 background-color: #59C3C3 !important;
 border: none !important;
}
.task-7 button {
 background-color: rgb(211, 52, 216) !important;
 border: none !important;
}
.task-8 button {
 background-color:rgb(216, 52, 139) !important;
 border:none !important; 
}
.task-9 button {
 background-color: rgb(216, 117, 52) !important;
 border: none !important;
}
.task-10 button {
 background-color: rgb(117, 216, 52) !important;
 border: none !important;
}

.group-1 {
background-color: #039d69 !important;
}
.group-2 {
background-color: #5265a9 !important;
}
.group-3 {
background-color: #ff6a1f !important;
}
.group-4 {
background-color: #f44177 !important;
}
.group-5 {
background-color: #58c721 !important;
}

.row:nth-of-type(2) {
  display: flex;
  justify-content: space-between;
}

.blue { /* лабуди лабудай */
  background: linear-gradient(to right, rgb(79, 101, 180), rgb(49, 137, 225));
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 75%;
  padding: 5px;
}

.bicycle {
  width: 75%;
  padding: 5px;
  padding-bottom: 15px;
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

.white {
  background: white !important;
  color: #575757;
}

.ad {
  display: flex;
  vertical-align: center;
  justify-content: center;
}

#pad_label {
  padding-left: 20px;
}

.task-icon {
  width: 25px;
  height: 25px;
  object-fit: contain;
}
</style>
