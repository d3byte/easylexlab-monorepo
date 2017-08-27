<template lang="html">
  <div>
    <app-header />
    <div class="padding">
    	<div class="margin">
    		<h5 class="m-b-0 _300">Статистика</h5>
    		<small class="text-muted">Здесь вы можете посмотреть свой прогресс и статистику</small>
    	</div>
    	<div class="row">
          <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="box-color p-a primary">
              <div class="pull-right m-l">
                <span class="w-40 dker text-center rounded">
                  <i class="material-icons">account_circle</i>
                </span>
              </div>
              <div class="clear">
                <h4 class="m-a-0 text-md"><a>{{ date.num }}<span class="text-sm">{{ date.rest }}</span></a></h4>
                <small class="text-muted">Вы зарегистрировались</small>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="box p-a">
              <div class="pull-left m-r">
                <span class="w-40 warn text-center rounded">
                  <i class="material-icons">feedback</i>
                </span>
              </div>
              <div class="clear">
                <h4 class="m-a-0 text-md"><a>{{ wordsLearnt }} <span class="text-sm">Слов</span></a></h4>
                <small class="text-muted">Выучено за все время</small>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="box-color p-a accent">
              <div class="pull-left m-r">
                <span class="w-40 dker text-center rounded">
                  <i class="material-icons">comment</i>
                </span>
              </div>
              <div class="clear">
                <h4 class="m-a-0 text-md"><span class="text-sm">К</span> <a href>{{ groupsAmount }} <span class="text-sm">группам</span></a></h4>
                <small class="text-muted">Вы присоединились</small>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="box p-a">
              <div class="pull-right m-l">
                <span class="w-40 accent text-center rounded">
                  <i class="material-icons">people</i>
                </span>
              </div>
              <div class="clear">
                <h4 class="m-a-0 text-md"><a href>{{ messsagesAmount }} <span class="text-sm">Сообщений</span></a></h4>
                <small class="text-muted">Было получено</small>
              </div>
            </div>
          </div>
    	</div>

    	<div class="row">
    		<div class="col-lg-8">
    			<div class="box">
    				<div class="box-header">
    					<h3>Все результаты <span class="label success">{{ results.length }}</span></h3>
    				</div>
    				<div class="box-body">
              <table class="table table-striped b-t">
                <thead>
                  <tr>
                    <th>Группа</th>
                    <th>Задание</th>
                    <th>Результат</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="result in results">
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
            <div class="box-header">
              <h3>Выполненные задания</h3>
              <small>Результаты группы по заданию <b>{{ currentTask }}</b></small>
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
          <div class="box-body">
            <pie-chart
              v-if="!noneResults"
              :data="chartData"
              :library="{legend: { alignment: 'center', position: 'top', textStyle: { bold: true } }}"/>
              <h5 v-else><small>Результатов пока нет.</small></h5>
          </div>
        </div>
        <div class="box">
          <div class="box-header">
            <h3>Задания</h3>
            <small>Соотношение завершенных и ожидающих выполнения</small>
          </div>
          <div class="text-center b-t">
            <div class="row-col">
              <div class="row-cell p-a">
                <div class="inline m-b">
                </div>
                <div>
                  Выполнено
                  <small class="block m-b">{{ completedTasks.length }}</small>
                </div>
              </div>
              <div class="row-cell p-a dker">
                <div class="inline m-b">
                </div>
                <div>
                  Ожидают выполнения
                  <small class="block m-b">{{ uncompletedTasks.length }}</small>
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
      currentTask: ''
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
</style>
