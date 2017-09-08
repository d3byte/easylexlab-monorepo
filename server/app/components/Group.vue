<template lang="html">
  <div>
    <app-header/>
    <div class="row-col b-b padding">
    	<div class="row">
    		<div class="padding">
    			<div class="margin">
            <h3 @click="changeName" v-if="!newName" class="hover">
              {{ group.name }}
              <i class="fa fa-pencil" aria-hidden="true" style="font-size: 12px;vertical-align: top"></i>
            </h3>
    			</div>
          <div class="margin input-group" v-if="newName" style="width: 150px;">
            <input type="text" class="form-control" placeholder="Новое имя" v-model="name" aria-describedby="basic-addon2">
            <span @click="submitNewName" class="input-group-addon hover success" id="basic-addon2"><i class="fa fa-check" aria-hidden="true"></i></span>
          </div>
    			<div class="row-col box">
    				<div class="col-sm-12">
    					<div class="box-header">
    						<h3>Меню</h3>
    					</div>
    					<div class="box-body">
    						<p class="text-muted m-b-md">Здесь вы можете создать новое задание, написать сообщение, получить код для регистрации учеников и управлять ранее созданными заданиями.</p>
    						<div class="row hidden-sm-down">
                  <a href class="btn btn-sm rounded success text-white" data-toggle="modal" data-target="#newtask">Новое задание</a>
                  <a href class="btn btn-sm rounded primary" data-toggle="modal" data-target="#newmsg">Новое сообщение</a>
                  <a href class="btn btn-sm rounded info" data-toggle="modal" data-target="#regcode">Код регистрации</a>
                  <a href class="btn btn-sm rounded accent" data-toggle="modal" data-target="#history">История заданий</a>
                  <a href class="btn btn-sm rounded danger" data-toggle="modal" data-target="#delete">Удалить группу</a>
    						</div>
                <div class="row hidden-sm-up">
                  <a href style="margin-bottom: 10px;" class="btn btn-sm rounded success text-white col-xs-12" data-toggle="modal" data-target="#newtask">Новое задание</a>
                  <a href style="margin-bottom: 10px;" class="btn btn-sm rounded primary col-xs-12" data-toggle="modal" data-target="#newmsg">Новое сообщение</a>
                  <a href style="margin-bottom: 10px;" class="btn btn-sm rounded info col-xs-12" data-toggle="modal" data-target="#regcode">Код регистрации</a>
                  <a href style="margin-bottom: 10px;" class="btn btn-sm rounded accent col-xs-12" data-toggle="modal" data-target="#history">История заданий</a>
                  <a href style="margin-bottom: 10px;" class="btn btn-sm rounded danger col-xs-12" data-toggle="modal" data-target="#delete">Удалить группу</a>
    						</div>
                <div class="row hidden-md-up hidden-xs-down">
                  <div class="col-sm-6" style="margin-bottom: 10px;">
                    <a href class="btn btn-sm rounded success text-white col-sm-12" data-toggle="modal" data-target="#newtask">Новое задание</a>
                  </div>
                  <div class="col-sm-6" style="margin-bottom: 10px;">
                    <a href class="btn btn-sm rounded primary col-sm-12" data-toggle="modal" data-target="#newmsg">Новое сообщение</a>
                  </div>
                  <div class="col-sm-6" style="margin-bottom: 10px;">
                    <a href class="btn btn-sm rounded info col-sm-12" data-toggle="modal" data-target="#regcode">Код регистрации</a>
                  </div>
                  <div class="col-sm-6" style="margin-bottom: 10px;">
                    <a href class="btn btn-sm rounded accent col-sm-12" data-toggle="modal" data-target="#history">История заданий</a>
                  </div>
                  <div class="col-sm-6" style="margin-bottom: 10px;">
                    <a href class="btn btn-sm rounded danger" data-toggle="modal" data-target="#delete">Удалить группу</a>
                  </div>
    						</div>
    					</div>
            </div>
    	    </div>
    			<div class="row" style="margin-bottom: 20px;">
    				<div class="col-sm-6">
    					<div class="box">
    						<div class="box-header">
    							<h3>Последние отправленные сообщения</h3>
    						</div>
    						<div class="box-body">
                  <ul class="list-group no-border m-b">
                    <li class="list-group-item checkbox">
                      <input type="checkbox" id="padding" v-model="showAll">
                      <label for="padding" id="nope">Посмотреть все</label>
                    </li>
    				        <li v-show="showAll" class="list-group-item" v-for="msg in group.messages">
                      <span class="pull-right m-r hover" @click="removeMsg(msg.id)"><i class="material-icons">delete</i></span>
    				          <router-link to="/profile" class="pull-left w-40 m-r"><img :src="msg.pic" class="img-responsive img-circle"></router-link>
    				          <div class="clear">
    				            <a href="" class="_500 block">{{ msg.author }}</a>
    				            <span class="text-muted">{{ msg.text }}</span><br>
                        <span class="text-muted"><small>{{ msg.date }}</small></span>
    				          </div>
    				        </li>
                    <li v-show="!showAll" class="list-group-item" v-for="msg in slicedMessages">
                      <span class="pull-right m-r hover" @click="removeMsg(msg.id)"><i class="material-icons">delete</i></span>
    				          <router-link to="/profile" class="pull-left w-40 m-r"><img :src="msg.pic" class="img-responsive img-circle"></router-link>
    				          <div class="clear">
    				            <a href="" class="_500 block">{{ msg.author }}</a>
    				            <span class="text-muted">{{ msg.text }}</span><br>
                        <span class="text-muted"><small>{{ msg.date }}</small></span>
    				          </div>
    				        </li>
    					    </ul>
    						</div>
    			    </div>
    				</div>
    				<div class="col-sm-6">
    	        <div class="grey lt" id="color">
            		<div class="box-header">
      	          <h3>Статистика</h3>
      	          <small>Результаты за {{ currentTask }}</small>
      	        </div>
                <div class="box-tool">
                <ul class="nav">
                  <li class="nav-item inline dropdown">
                    <a class="nav-link" data-toggle="dropdown">
                      <i class="material-icons md-18">&#xe5d4;</i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-scale pull-right">
                      <a v-for="task in group._tests" class="dropdown-item" @click="setCharData(task)">{{ task.name }}</a>
                    </div>
                  </li>
                </ul>
              </div>
      	        <div class="box-body">
                  <pie-chart
                    v-if="!noneResults"
                    :data="chartData"
                    :library="{backgroundColor: '#484848', legend: { textStyle: { color: 'white' } }}"
                    />
                    <h5 v-else><small>Результатов пока нет.</small></h5>
      	        </div>
    	        </div>
    				</div>
    			</div>
          <div class="row-col">
            <div class="p-a table-responsive box">
              <table class="table table-striped b-t b-b">
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Ученик</th>
                    <th>Средний результат</th>
                    <th v-for="test in slicedTests">{{ test.name }}</th>
                    <th>
                      <a @click="previousFiveTests" v-show="sliceTestIndex >= 5"><i class="fa fa-angle-left btn-sm primary"></i></a>
                      <a @click="nextFiveTests"><i class="fa fa-angle-right btn-sm primary"></i></a>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(student, index) in render">
                    <td>{{ index + 1 }}</td>
                    <td>{{ student.name }}</td>
                    <td v-if="student.averageRes != '—'">{{ student.averageRes }}%</td>
                    <td v-else>{{ student.averageRes }}</td>
                    <td v-for="(result, i) in student.results">
                      <span v-if="i == result.index">{{ result.result }}%</span>
                      <span v-else> — </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
    		</div>
    	</div>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue';
import NewMsg from './NewMsg.vue';
import jwtDecode from 'jwt-decode';
import { EventBus } from './event';

export default {
  data() {
    return {
      group: {},
      groupCode: '',
      slicedMessages: [],
      slicedTests: [],
      sliceTestIndex: 0,
      render: [],
      students: [],
      studentsLength: null,
      showAll: false,
      showModal: false,
      showCode: false,
      writeMsg: false,
      chartData: {},
      noneResults: false,
      currentTask: '',
      newName: false,
      name: ''
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    logged() {
      return this.$store.getters.loginState
    },
    token() {
      return jwtDecode(this.$store.getters.userToken)
    },
  },
  methods: {
    goto(id) {
      const path = '/group/' + id + '/newtask';
      this.$router.push({ path });
    },
    nextFiveTests() {
      this.sliceTestIndex += 5;
      this.slicedTests = this.group._tests.slice(this.sliceTestIndex, this.sliceTestIndex + 5);
      this.prepareRender();
    },
    previousFiveTests() {
      this.sliceTestIndex -= 5;
      this.slicedTests = this.group._tests.slice(this.sliceTestIndex, this.sliceTestIndex + 5);
      this.prepareRender();
    },
    setCharData(test, justLoaded = false) {
      if(justLoaded) {
        this.noneResults = true;
        return;
      }
      this.noneResults = false;
      this.currentTask = test.name;
      let results = test.results.map(result => result.result);
      let newResults = {
        excellent: [],
        normal: [],
        bad: [],
        veryBad: []
      };
      for(let result of results) {
        if(result >= 90) {
          newResults.excellent.push(result)
        } else if(result >= 75 && result < 90) {
          newResults.normal.push(result)
        } else if(result >= 50 && result < 75) {
          newResults.bad.push(result)
        } else if(result < 50 && result != undefined){
          newResults.veryBad.push(result)
        }
      }
      if(!!!newResults.excellent.length && !!!newResults.normal.length && !!!newResults.bad.length && !!!newResults.veryBad.length)
        this.noneResults = true;
      else
        newResults.didNotComplete = this.group._students.length - (newResults.excellent.length + newResults.normal.length + newResults.bad.length + newResults.veryBad.length);
      this.chartData = [['От 90% и выше', newResults.excellent.length], ['От 75% до 90%', newResults.normal.length], ["От 50% до 75%", newResults.bad.length], ["Меньше 50%", newResults.veryBad.length], ["Не выполнили", newResults.didNotComplete]];
    },
    prepareRender() {
      if(!!this.slicedTests.length) {
        this.render = this.students.map((student, index) => {
          let newStudent = {
            name: student.firstName + ' ' + student.lastName,
            results: [],
            averageRes: 0,
            allTests: 0
          };
          for(let i = 0; i < this.slicedTests.length; i++) {
            newStudent.results.push(i);
          }
          for(let test of this.slicedTests) {
            for(let result of test.results) {
              if(result.userId == student._id) {
                result.index = this.slicedTests.indexOf(test);
                for(let i = 0; i < this.slicedTests.length; i++) {
                  if(newStudent.results[i] == result.index) {
                    newStudent.results[i] = result;
                    break;
                  }
                }
              }
            }
          }
          for(let test of this.group._tests) {
            for(let result of test.results) {
              if(result.userId == student._id) {
                newStudent.averageRes += result.result;
                newStudent.allTests++;
              }
            }
          }
          newStudent.averageRes = parseInt(newStudent.averageRes / newStudent.allTests);
          if(isNaN(newStudent.averageRes)) {
            newStudent.averageRes = '—';
          }
          return newStudent;
        });
      } else {
        this.render = this.students.map((student, index) => {
          return {
            name: student.firstName + ' ' + student.lastName,
            results: []
          }
        });
      }
    },
    fetchData() {
      const body = {
        'groupId': this.$route.params.id
      };
      this.$http.post('getgroup', body, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.getters.userToken
        }
      }).then(res => {
        this.group = res.body.group;
        this.studentsLength = this.group._students.length;
        this.name = this.group.name;
        var haveThisGroup = false;
        if(this.group._teacher == this.user._id)
          haveThisGroup = true;
        if(!haveThisGroup)
          this.$router.push('/profile');
        this.slicedMessages = this.group.messages.reverse().slice(0, 3);
        this.group._tests = this.group._tests.reverse();
        this.slicedTests = this.group._tests.slice(0, 5);
        this.students = this.group._students;
        this.prepareRender();
        this.setCharData(this.slicedTests[0]);
      });
    },
    changeName() {
      this.newName = true;
    },
    submitNewName() {
      if(this.name != this.group.name) {
        const body = {
          groupId: this.group._id,
          name: this.name
        };
        this.$http.patch('changename', body, {
          headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + this.$store.getters.userToken
          }
        }).then(res => {
          this.group.name = this.name;
          this.newName = false;
        });
      } else {
        this.newName = false;
      }
    },
    removeMsg(id) {
      if(confirm('Вы действительно хотите удалить сообщение?')) {
        const body = {
          groupId: this.group._id,
          msgId: id
        };
        this.$http.post('deletemsg', body, {
          headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + this.$store.getters.userToken
          }
        }).then(s => {
          this.slicedMessages = this.slicedMessages.filter(item => item.id != id);
          this.group.messages = this.group.messages.filter(item => item.id != id);
        })
      }
    }
  },
  http: {
    root: '//ealapi.tw1.ru/api'
  },
  components: {
    'app-header': Header,
    'new-msg': NewMsg
  },
  created() {
    this.setCharData(null, true);
    EventBus.$once('requested-header', () => {
      if(!this.logged)
        this.$router.push('/login');
      if(this.token.permissions != 'teacher')
        this.$router.push('/profile');
      this.fetchData();
    });
  }
}
</script>


<style lang="css" scoped>
#groupname {
  border-width: 0 !important;
  border: none !important;
  border-bottom: none !important;
}

#nope {
  padding-left: 0;
}

.icono-caretLeft {
  color: black !important;
}

#color {
  background: #484848;
}
</style>
