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
    					<h3>Все результаты <span class="label success">5</span></h3>
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
                  <tr>
                    <td>Джуба</td>
                    <td>State test</td>
                    <td>90%</td>
                  </tr>
                  <tr>
                    <td>Джуба</td>
                    <td>Сложный тест</td>
                    <td>90%</td>
                  </tr>
                  <tr>
                    <td>Джуба</td>
                    <td>Unit test 4</td>
                    <td>90%</td>
                  </tr>
                  <tr>
                    <td>Джуба</td>
                    <td>По_ржатб</td>
                    <td>90%</td>
                  </tr>
                </tbody>
              </table>
    	  		</div>
    			</div>
    		</div>

    		<div class="col-lg-4 col-md-12 col-xl-4">
          <div class="box">
            <div class="box-header">
              <h3>Administrative test</h3>
              <small>Результаты по группе</small>
            </div>
            <div class="box-tool">
            <ul class="nav">
              <li class="nav-item inline dropdown">
                <a class="nav-link" data-toggle="dropdown">
                  <i class="material-icons md-18">&#xe5d4;</i>
                </a>
                <div class="dropdown-menu dropdown-menu-scale pull-right">
                  <a class="dropdown-item" href>Administrative test</a>
                  <a class="dropdown-item" href>Unit 4 test</a>
                  <a class="dropdown-item" href>Джуба</a>
                </div>
              </li>
            </ul>
          </div>
          <div class="box-body">
            <div ui-jp="plot" ui-refresh="app.setting.color" ui-options="
              [
                { data: [[1, 2], [2, 4], [3, 5], [4, 7], [5, 6], [6, 4], [7, 5], [8, 4]] },
                { data: [[1, 2], [2, 3], [3, 2], [4, 5], [5, 4], [6, 3], [7, 4], [8, 2]] }
              ],
              {
                bars: { show: true, fill: true,  barWidth: 0.3, lineWidth: 2, order: 1, fillColor: { colors: [{ opacity: 0.2 }, { opacity: 0.2}] }, align: 'center'},
                colors: ['#0cc2aa','#fcc100'],
                series: { shadowSize: 3 },
                xaxis: { show: true, font: { color: '#ccc' }, position: 'bottom' },
                yaxis:{ show: true, font: { color: '#ccc' }},
                grid: { hoverable: true, clickable: true, borderWidth: 0, color: 'rgba(120,120,120,0.5)' },
                tooltip: true,
                tooltipOpts: { content: '%x.0 is %y.4',  defaultTheme: false, shifts: { x: 0, y: -40 } }
              }
            " style="height:200px" >
            </div>
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
                  <small class="block m-b">15</small>
                </div>
              </div>
              <div class="row-cell p-a dker">
                <div class="inline m-b">
                </div>
                <div>
                  Ожидают выполнения
                  <small class="block m-b">7</small>
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
      wordsLearnt: 0
    }
  },
  computed: {
    token() {
      return jwtDecode(this.$store.getters.userToken)
    },
    user() {
        return this.$store.getters.user
    },
    groups() {
        return this.$store.state.user.groups
    }
  },
  components: {
    'app-header': Header
  },
  http: {
    root: '/api'
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
      });
  }
}
</script>

<style lang="css">
</style>
