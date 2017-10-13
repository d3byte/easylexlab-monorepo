 <template lang="html">
  <div>
    <app-header/>
    <div class="gradient">
      <div class="container custom-padding hidden-sm-down">
        <div class="parent">
          <div class="description">
            <span @click="changeName" v-if="!newName" class="hover group-name-span">
              <b>{{ group.name }}</b>
            </span>
            <span class="label label-sm up transparent" v-if="!newName">
              <i class="material-icons" style="font-size:12px;">&#xE254;</i>
            </span>
            <div class="margin input-group" v-if="newName" style="width: 140px;">
              <input type="text" class="form-control" placeholder="Новое имя" id="basic-addon2-input" v-model="name" aria-describedby="basic-addon2">
              <div @click="submitNewName" class="input-group-addon hover primary" id="basic-addon2"><i class="fa fa-check" aria-hidden="true"></i></div>
            </div>
            <br><br>
            <p class="text-muted m-b-sm">Здесь вы можете создать новое задание, написать сообщение, получить код для регистрации учеников и управлять ранее созданными заданиями.</p>
          </div>
        </div>
      </div>
      <div class="hidden-md-up">
        <div class="parent">
          <span @click="changeName" v-if="!newName" class="hover group-name-span">
            <small class="text-muted">Название группы:</small> {{ group.name }}
          </span>
          <span class="label label-sm up transparent" v-if="!newName">
            <i class="material-icons" style="font-size:12px;">&#xE254;</i>
          </span>
          <div class="adaptive-change-name input-group" v-if="newName">
            <input type="text" class="form-control" placeholder="Новое имя" id="basic-addon2-input" v-model="name" aria-describedby="basic-addon2">
            <div @click="submitNewName" class="input-group-addon hover primary" id="basic-addon2"><i class="fa fa-check" aria-hidden="true"></i></div>
          </div>
        </div>
      </div>
    </div>
    <div class="blue">
      <div class="container custom-padding" style="padding-bottom: 0;margin-bottom: 0;">
        <div class="menu">
          <div class="menu-item col-md-3 col-sm-6 col-xs-12" data-toggle="modal" data-target="#newtask">
            <i class="material-icons menu-icon">&#xE148;</i>
            <span>Новое задание</span>
          </div>
          <div class="menu-item col-md-3 col-sm-6 col-xs-12" data-toggle="modal" data-target="#newmsg">
            <i class="material-icons menu-icon">&#xE150;</i>
            <span>Новое сообщение</span>
          </div>
          <div class="menu-item col-md-3 col-sm-6 col-xs-12" data-toggle="modal" data-target="#regcode">
            <i class="material-icons menu-icon">&#xE8D3;</i>
            <span>Код регистрации</span>
          </div>
          <div class="menu-item col-md-3 col-sm-6 col-xs-12" data-toggle="modal" data-target="#history">
            <i class="material-icons menu-icon">&#xE8DE;</i>
            <span>История заданий</span>
          </div>
          <!-- Удаление группы -->
          <!-- <a href class="btn btn-sm rounded danger" data-toggle="modal" data-target="#delete">Удалить группу</a> -->
          <!--  -->
        </div>
      </div>
    </div>
    <div class="row-col b-b padding">
    	<div class="container">
        <div class="row">
      		<div class="padding">
      			<div class="row">
      				<div class="col-sm-6">
      					<div class="box">
      						<div class="box-header msg-header">
      							<small class="text-muted"><b>{{ !!group.messages ? group.messages.length : 0 }}</b> Cообщений</small>
                    <div class="pull-right">

                    </div>
      						</div>
      						<div class="box-body msgs-body" style="background: rgb(200, 237, 246);padding-bottom:0;">
                    <ul class="list-group m-b">
      				        <li v-if="showAll" class="list-group-item msg" v-for="msg in group.messages">
                        <span class="pull-right m-r hover" @click="removeMsg(msg.id)"><i class="material-icons">delete</i></span>
      				          <router-link to="/profile" class="pull-left w-40 m-r"><img :src="msg.pic" class="img-responsive img-circle"></router-link>
      				          <div class="clear">
      				            <a href="" class="_500 block">{{ msg.author }}</a>
      				            <span class="text-muted">{{ msg.text }}</span><br>
                          <span class="text-muted"><small>{{ msg.date }}</small></span>
      				          </div>
      				        </li>
                      <li v-if="!showAll" class="list-group-item msg" v-for="msg in slicedMessages">
                        <span class="pull-right m-r hover" @click="removeMsg(msg.id)"><i class="material-icons">delete</i></span>
      				          <router-link to="/profile" class="pull-left w-40 m-r"><img :src="msg.pic" class="img-responsive img-circle"></router-link>
      				          <div class="clear">
      				            <a href="" class="_500 block">{{ msg.author }}</a>
      				            <span class="text-muted">{{ msg.text }}</span><br>
                          <span class="text-muted"><small>{{ msg.date }}</small></span>
      				          </div>
      				        </li>
                      <li class="list-group-item checkbox">
                        <input type="checkbox" id="padding" v-model="showAll">
                        <label for="padding">Посмотреть все</label>
                      </li>
      					    </ul>
      						</div>
      			    </div>
      				</div>
      				<div class="col-sm-6">
      	        <div class="lt" id="color">
              		<div class="box-header" style="background:white">
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
        	        <div class="box-body" style="background:white;min-height:270px;padding-bottom:0;padding-top:13px;">
                    <pie-chart
                      v-if="!noneResults"
                      :data="chartData"
                      :colors="chartOptions.colors"
                      :library="{backgroundColor: '#fff', legend: { textStyle: { color: 'black' } }}"
                      />
                      <h5 v-else><small>Результатов пока нет.</small></h5>
        	        </div>
      	        </div>
      				</div>
      			</div>
            <div class="row-col">
              <div class="row checkbox">
                <input type="checkbox" class="deleteCheckbox" id="padding_delete" v-model="deleteStudent">
                <label for="padding_delete">Редактировать группу</label>
              </div>
              <div class="table-responsive box">
                <table class="table table-striped table-hover">
                  <thead>
                    <tr class="headers">
                      <th>№</th>
                      <th>Ученик</th>
                      <th v-show="deleteStudent">Удалить ученика</th>
                      <th>Средний результат</th>
                      <th v-for="test in slicedTests">{{ test.name }}</th>
                      <th>
                        <div class="icon-rounded-border">
                          <i @click="nextFiveTests" class="material-icons"><b>&#xE315;</b></i>
                        </div>
                        <div class="icon-rounded-border" v-show="sliceTestIndex >= 5">
                          <i @click="previousFiveTests" class="material-icons"><b>&#xE314;</b></i>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(student, index) in render" class="body-row">
                      <td>{{ index + 1 }}</td>
                      <td>{{ student.name }}</td>
                      <td v-show="deleteStudent"><button class="btn btn-xs rounded danger" @click="deleteStud(student.id)">Удалить</button></td>
                      <td v-if="student.averageRes != '—'">{{ student.averageRes }}%</td>
                      <td v-else>{{ student.averageRes }}</td>
                      <td v-for="(result, i) in student.results">
                        <span v-if="i == result.index">{{ result.result }}%</span>
                        <span v-else> — </span>
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
import {
  EventBus
} from './event';

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
      name: '',
      deleteStudent: false,
      chartOptions: {
        height: 250,
        colors: ['#526A77', '#477C9B', '#6BBFEF', '#074060', '#16A6F9']
      }
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
      this.$router.push({
        path
      });
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
      if (justLoaded) {
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
      for (let result of results) {
        if (result >= 90) {
          newResults.excellent.push(result)
        } else if (result >= 75 && result < 90) {
          newResults.normal.push(result)
        } else if (result >= 50 && result < 75) {
          newResults.bad.push(result)
        } else if (result < 50 && result != undefined) {
          newResults.veryBad.push(result)
        }
      }
      if (!!!newResults.excellent.length && !!!newResults.normal.length && !!!newResults.bad.length && !!!newResults.veryBad.length)
        this.noneResults = true;
      else
        newResults.didNotComplete = this.group._students.length - (newResults.excellent.length + newResults.normal.length + newResults.bad.length + newResults.veryBad.length);
      this.chartData = [
        ['От 90% и выше', newResults.excellent.length],
        ['От 75% до 90%', newResults.normal.length],
        ["От 50% до 75%", newResults.bad.length],
        ["Меньше 50%", newResults.veryBad.length],
        ["Не выполнили", newResults.didNotComplete]
      ];
    },
    prepareRender() {
      if (!!this.slicedTests.length) {
        this.render = this.students.map((student, index) => {
          let newStudent = {
            name: student.firstName + ' ' + student.lastName,
            id: student._id,
            results: [],
            averageRes: 0,
            allTests: 0
          };
          for (let i = 0; i < this.slicedTests.length; i++) {
            newStudent.results.push(i);
          }
          for (let test of this.slicedTests) {
            for (let result of test.results) {
              if (result.userId == student._id) {
                result.index = this.slicedTests.indexOf(test);
                for (let i = 0; i < this.slicedTests.length; i++) {
                  if (newStudent.results[i] == result.index) {
                    newStudent.results[i] = result;
                    break;
                  }
                }
              }
            }
          }
          for (let test of this.group._tests) {
            for (let result of test.results) {
              if (result.userId == student._id) {
                newStudent.averageRes += result.result;
                newStudent.allTests++;
              }
            }
          }
          newStudent.averageRes = parseInt(newStudent.averageRes / newStudent.allTests);
          if (isNaN(newStudent.averageRes)) {
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
        if (this.group._teacher == this.user._id)
          haveThisGroup = true;
        if (!haveThisGroup)
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
      if (this.name != this.group.name) {
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
      if (confirm('Вы действительно хотите удалить сообщение?')) {
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
    },
    deleteStud(id) {
      if(confirm('Вы действительно хотите удалить ученика из группы?')) {
        const body = {
          userId: id,
          groupId: this.$route.params.id
        };
        console.log(body);
        this.$http.post('removestudent', body, {
          headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + this.$store.getters.userToken
          }
        }).then(s => {
          console.log(s);
          this.render = this.render.filter(student => student.id != id);
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
      if (!this.logged)
        this.$router.push('/login');
      if (this.token.permissions != 'teacher')
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

#padding {
  margin-left: 0px;
  width: 10px;
}

#padding_delete {
  margin-left: 0px;
  width: 10px;
}

.deleteCheckbox {
  padding-left: 28px;
}

.icono-caretLeft {
  color: black !important;
}

.icono-cross {
  color: black !important;
}

.checkbox {
  margin-top: 0;
  display: flex;
  justify-content: start;
}

#color {
  background: #484848;
}

.container {
  width: 75%;
}

.headers > th {
  vertical-align: middle;
} .headers:hover {
  background: rgb(98, 171, 242) !important;
  color: white !important;
}

.icon-rounded-border {
  width: 27px;
  height: 27px;
  border: 1px solid white;
  border-radius: 50%;
  vertical-align: middle;
  text-align: center;
} .icon-rounded-border {
  width: 27px;
  height: 27px;
  border: 1px solid white;
  border-radius: 50%;
  vertical-align: middle;
  text-align: center;
} .icon-rounded-border:hover {
  cursor: pointer;
} .icon-rounded-border {
  width: 30px;
  height: 30px;
  border: 2px solid white;
  border-radius: 50%;
  vertical-align: middle;
  text-align: center;
} .icon-rounded-border:nth-child(2) {
  margin-top: 5px;
}

.gradient {
  display: flex;
  justify-content: center;
  background: linear-gradient(to right, rgb(108, 88, 146), rgb(167, 133, 157));
  color: white;
  min-height: 50px;
} .gradient > .container {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 10px 0px;
  padding-bottom: 0;
  margin: 0;
}

#basic-addon2-input {
  height: 38px;
  border-left-radius: 2px;
}

.group-name, .description {
  display: inline-block;
  max-width: 90%;
}

.parent {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
}

.transparent {
  background: transparent;
}

.group-name-span {
  font-size: 20px;
}

.adaptive-change-name {
  padding: 0 10px;
}

.menu {
  padding: 0 25px;
  height: 50px;
  padding-bottom: 0 !important;
}

.blue {
  background: linear-gradient(to right, rgb(79, 101, 180), rgb(49, 137, 225));
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-item {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  height: 50px;
  transition: 0.3s;
} .menu-item:first-child {
  border-top: 3px solid rgb(228, 78, 60);
  border-right: 3px solid rgb(72, 120, 189);
  border-left: 3px solid rgb(80, 112, 189);
} .menu-item:nth-child(2) {
  border-top: 3px solid rgb(234, 168, 59);
  border-right: 3px solid rgb(63, 113, 191);
} .menu-item:nth-child(3) {
  border-top: 3px solid rgb(41, 205, 107);
  border-right: 3px solid rgb(72, 132, 208);
} .menu-item:last-child {
  border-top: 3px solid rgb(37, 198, 218);
  border-right: 3px solid rgb(54, 124, 202);
} .menu-item:hover {
  cursor: pointer;
  background: rgb(48, 84, 157);
}

.menu-icon {
  font-size: 22px;
  margin-right: 5px;
}

.msg-header {
  border-bottom: 3px solid rgb(180, 213, 219);
  background: white;
}

.box-body.msgs-body {
  padding-left: 0;
  padding-right: 0;
}

.list-group-item {
  background: rgb(200, 237, 246);
  border-color: rgb(116, 151, 162) !important;
  border-right: none;
  border-left: none;
  border-bottom: none;
} .list-group-item:first-of-type {
  border-top: none !important;
}
</style>
