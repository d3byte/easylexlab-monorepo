<template lang="html">
  <div>
    <app-header />
    <div class="row" style="color:white;background:linear-gradient(to right, rgb(56, 155, 180), rgb(121, 101, 190))">
      <div class="container" style="padding-left:50px;">
        <h4 style="margin-top:24px;">
          <img src="../pics/stats.png" width="30px" height="40px" style="padding-bottom:9px">
          <b>Статистика</b>
        </h4>
      </div>
    </div>
    <div class="row" style="background:rgb(65, 90, 175)">
      <div class="container" style="padding-left:50px; margin-top:5px;">
        <small class="text-white"><b>Здесь вы можете посмотреть свой прогресс и статистику</b></small>
      </div>
    </div>
    <div class="container" style="margin-top:15px">
    	<div class="row">
          <div class="col-sm-6 col-md-3 col-lg-3 col-xs-12">
            <div class="box-color p-a no-padding" style="background:rgb(228, 77, 62)">
              <div class="pull-left m-r img-holder">
                  <img src="../pics/tick.png" class="img-responsive">
              </div>
              <div class="clear main-info">
                <h4 class="m-a-0 text-xs" style="word-break:nowrap"><b>{{ date.num }} {{ date.rest }}</b></h4>
                <small class="text-muted" style="font-size:10px"><b>Вы зарегистрировались</b></small>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-3 col-lg-3 col-xs-12">
            <div class="box p-a no-padding" style="background:rgb(246, 175, 60)">
              <div class="pull-left m-r img-holder" style="background: rgb(219, 147, 38);">
                  <img src="../pics/abc.png" class="img-responsive">
              </div>
              <div class="clear main-info">
                <h4 class="m-a-0 text-xs"><b>{{ wordsLearnt }} Слов</b></h4>
                <small class="text-muted" style="font-size:10px"><b>Выучено за всё время</b></small>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-3 col-lg-3 col-xs-12">
            <div class="box p-a no-padding" style="background:rgb(59, 158, 104)">
              <div class="pull-left m-r img-holder" style="background: rgb(28, 114, 69);">
                  <img src="../pics/people.png" class="img-responsive">
              </div>
              <div class="clear main-info">
                <h4 class="m-a-0 text-xs"><b>В {{ groupsAmount }} групп</b></h4>
                <small class="text-muted" style="font-size:10px"><b>Вы вступили</b></small>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-3 col-lg-3 col-xs-12">
            <div class="box p-a no-padding" style="background:rgb(94, 123, 190)">
              <div class="pull-left m-r img-holder" style="background: rgb(13, 89, 164);">
                  <img src="../pics/msg.png" class="img-responsive">
              </div>
              <div class="clear main-info">
                <h4 class="m-a-0 text-xs"><router-link to="/profile/msg"><b>{{ messsagesAmount }} Сообщений</b></router-link></h4>
                <small class="text-muted" style="font-size:10px"><b>Получено</b></small>
              </div>
            </div>
          </div>
    	</div>

    	<div class="row">
    		<div class="col-lg-8">
    			<div class="box" style="background:rgb(143, 198, 247)">
    				<div class="box-header text-center text-white" style="padding:5px">
    					<h3><b>Все результаты <span class="label" style="background:rgb(228, 77, 62)">{{ results.length }}</span></b></h3>
    				</div>
    				<div class="box-body table-responsive no-padding">
              <table class="table table-striped">
                <thead>
                  <tr class="headers">
                    <th>Группа</th>
                    <th>Задание</th>
                    <th>Результат</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="body-row" v-for="result in results">
                    <td>{{ result.groupName }}</td>
                    <td>{{ result.stack.name }}</td>
                    <td>{{ result.result }}%</td>
                  </tr>
                </tbody>
              </table>
    	  		</div>
    			</div>
    		</div>

    		<div class="col-lg-4 col-md-12 col-xl-4">
          <div class="box">
            <div class="box-header" style="border-bottom:1px solid #ccc">
              <h2 style="color: rgb(0, 75, 94)"><b>Статистика</b></h2>
              <small style="color: rgb(0, 75, 94)">Результаты группы по заданию <b>{{ currentTask }}</b></small>
            </div>
            <div class="box-tool">
            <ul class="nav">
              <li class="nav-item inline dropdown">
                <a class="nav-link" data-toggle="dropdown">
                  <i class="material-icons md-18">&#xe5d4;</i>
                </a>
                <div class="dropdown-menu dropdown-menu-scale pull-right">
                  <a v-for="task in completedTasks" class="dropdown-item" @click="setCharData(task)">{{ task.name }}</a>
                </div>
              </li>
            </ul>
          </div>
          <div class="box-body" style="height:240px;overlay:hidden;">
            <pie-chart
              v-if="!noneResults"
              :data="chartData"
              :colors="chartOptions.colors"
              :library="{ height: 200 , legend: { alignment: 'start', position: 'bottom', textStyle: { bold: true, fontSize: 7 } }}"/>
              <h5 v-else><small>Результатов пока нет.</small></h5>
          </div>
        </div>
        <div class="box">
          <div class="box-header" style="background:rgb(60,157,102)">
            <h2 class="text-white"><b>Задания</b></h2>
            <small class="text-white"><b>Соотношение завершенных и ожидающих выполнения</b></small>
          </div>
          <div class="text-center b-t">
            <div class="row-col">
              <div class="row-cell p-a">
                <div class="inline m-b">
                </div>
                <div style="color: rgb(0, 75, 94)">
                  <b>
                    Выполнено
                    <small class="block m-b">{{ completedTasks.length }}</small>
                  </b>
                </div>
              </div>
              <div class="row-cell p-a dker">
                <div class="inline m-b">
                </div>
                <div >
                  <b>
                    Ожидают выполнения
                    <small class="block m-b">{{ uncompletedTasks.length }}</small>
                  </b>
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
import jwtDecode from 'jwt-decode';
import Header from './Header.vue';

export default {
  data() {
    return {
      date: {
        num: '',
        rest: ''
      },
      groupsAmount: 0,
      messsagesAmount: 0,
      wordsLearnt: 0,
      results: [],
      noneResults: true,
      chartData: {},
      completedTasks: [],
      uncompletedTasks: [],
      currentTask: '',
      chartOptions: {
        colors: ['rgb(41, 205, 107)', 'rgb(37, 198, 218)', 'rgb(49, 137, 225)', 'rgb(234, 168, 59)', 'rgb(228, 78, 60)']
      }
    }
  },
  computed: {
    token() {
      return jwtDecode(this.$store.getters.userToken)
    },
    user() {
      return this.$store.getters.user
    },
    currentGroup() {
      return this.$store.getters.currentGroup
    }
  },
  methods: {
    formResults() {
      for(let group of this.user._groups) {
        let results = [];
        for(let test of group._tests) {
          let newResults = test.results.filter(res => res.userId == this.user._id);
          results = results.concat(newResults);
        }
        this.results = this.results.concat(results);
      }
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
    sortTasks() {
      this.completedTasks = [];
      this.uncompletedTasks = [];
      for(let group of this.user._groups) {
        for (var test of group._tests) {
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
          }
        }
      }
    }
  },
  components: {
    'app-header': Header
  },
  http: {
    root: '//ealapi.tw1.ru/api'
    // root: '/api'
  },
  created() {
    if(!this.$store.getters.loginState)
      this.$router.push('/');
    else if(this.token.permissions != 'student')
      this.$router.push('/profile');
      this.$http.post('user', {}, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.getters.userToken
        }
      }).then(res => {
        this.$store.dispatch('userInfo', res.body.user);
        this.$store.dispatch('changeCurrentGroup', res.body.user._groups[0]);
        this.date.num = this.user.createdAt[1] == ' ' ? this.user.createdAt.slice(0, 2) : this.user.createdAt.slice(0, 2);
        this.date.rest = this.user.createdAt[1] == ' ' ? this.user.createdAt.slice(3) : this.user.createdAt.slice(2);
        this.groupsAmount = this.user._groups.length;
        this.wordsLearnt = this.user.wordsLearnt;
        let messsagesAmount = 0;
        this.user._groups.map(group => messsagesAmount += group.messages.length);
        this.messsagesAmount = messsagesAmount;
        this.formResults();
        this.sortTasks();
        this.setCharData(this.completedTasks[0]);
      });
      this.$store.dispatch('hideGames');
      this.$store.dispatch('zeroAttempts');
      this.$store.dispatch('testNotAvailable');
      this.$store.dispatch('hideTest');
  }
}
</script>

<style lang="css">
.no-padding {
  padding: 0 !important;
  overflow: hidden;
}

.img-holder {
  display: flex !important;
  flex-direction: column;
  padding: 10px;
} .img-holder img {
  width: 40px;
  height: 40px;
  object-fit: contain;
} .img-holder:nth-of-type(1) {
  background: rgb(194, 55, 40);
}

.main-info {
  padding: 10px;
  color: white;
}

.label {
  border-radius: 5px;
  vertical-align: middle !important;
  padding: 5px;
}


.container {
  width: 75%;
  margin-bottom: 10px;
  padding: 5px 40px;
}


h5 {
  margin: 0 !important;
}

.m-r {
  margin-right: 5px !important;
}

</style>
