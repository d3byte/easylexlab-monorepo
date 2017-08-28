<template lang="html">
  <div>
    <app-header/>
    <div class="row-col b-b">
    	<div class="row">
    		<div class="padding">
    			<div class="margin">
    				<h5 class="m-b-0 _300">{{ group.name }}</h5>
    			</div>
    			<div class="row-col box">
    				<div class="col-sm-12">
    					<div class="box-header">
    						<h3>Меню</h3>
    					</div>
    					<div class="box-body">
    						<p class="text-muted m-b-md">Здесь вы можете создать новое задание или написать сообщение.</p>
    						<a href class="btn btn-sm rounded success text-white" data-toggle="modal" data-target="#newtask">Новый модуль</a>
                <a href class="btn btn-sm rounded primary" data-toggle="modal" data-target="#newmsg">Новое сообщение</a>
                <a href class="btn btn-sm rounded info" data-toggle="modal" data-target="#regcode">Код регистрации</a>
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
    				          <router-link to="/profile" class="pull-left w-40 m-r"><img :src="msg.pic" class="img-responsive img-circle"></router-link>
    				          <div class="clear">
    				            <a href="" class="_500 block">{{ msg.author }}</a>
    				            <span class="text-muted">{{ msg.text }}</span><br>
                        <span class="text-muted"><small>{{ msg.date }}</small></span>
    				          </div>
    				        </li>
                    <li v-show="!showAll" class="list-group-item" v-for="msg in slicedMessages">
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
    	        <div class="grey lt">
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
                    :library="{backgroundColor: '#424242', legend: { textStyle: { color: 'white' } }}"
                    />
                    <h5 v-else><small>Результатов пока нет.</small></h5>
      	        </div>
    	        </div>
    				</div>
    			</div>
          <div class="row-col">
            <table class="table table-striped b-t b-b box">
              <thead>
                <tr>
                  <th>№</th>
                  <th>Ученик</th>
                  <th v-for="test in slicedTests">{{ test.name }}</th>
                  <th>
                    <a @click="previousFiveTests" v-show="sliceTestIndex >= 5" class="btn-sm rounded primary text-white"><-</a>
                    <a @click="nextFiveTests" class="btn-sm rounded primary text-white">-></a>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(student, index) in render">
                  <td>{{ index + 1 }}</td>
                  <td>{{ student.name }}</td>
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
</template>

<script>
import Header from './Header.vue';
import NewMsg from './NewMsg.vue';
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
      currentTask: ''
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    logged() {
      return this.$store.getters.loginState
    }
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
    setCharData(test) {
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
      this.chartData = [['От 90% и выше', newResults.excellent.length], ['От 75% до 90%', newResults.normal.length], ["От 50% до 75%", newResults.bad.length], ["Меньше 50%", newResults.veryBad.length]];
    },
    prepareRender() {
      if(!!this.slicedTests.length) {
        this.render = this.students.map((student, index) => {
          let newStudent = {
            name: student.firstName + ' ' + student.lastName,
            results: []
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
    EventBus.$once('requested', () => {
      if(!this.logged)
        this.$router.push('/');
      if(this.user.permissions != 'teacher')
        this.$router.push('/profile');
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
        if(this.group._students)
          this.studentsLength = this.group._students.length;
        var haveThisGroup = false;
        for(let group of this.user._groups) {
          if(group.code == this.group.code) {
            haveThisGroup = true;
            break;
          }
        }
        if(!haveThisGroup)
          this.$router.push('/profile');
        this.slicedMessages = this.group.messages.reverse().slice(0, 3);
        this.group._tests = this.group._tests.reverse();
        this.slicedTests = this.group._tests.slice(0, 5);
        this.students = this.group._students;
        this.prepareRender();
        this.setCharData(this.slicedTests[0]);
      });
    });
  }
}
</script>


<style lang="css" scoped>
#nope {
  padding-left: 0;
}
</style>
