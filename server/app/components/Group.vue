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
    						<a href class="btn btn-sm rounded success text-white" data-toggle="modal" data-target="#newtask">Новое задание</a>
                <a href class="btn btn-sm rounded primary" data-toggle="modal" data-target="#newmsg">Новое сообщение</a>
                <a href class="btn btn-sm rounded info" data-toggle="modal" data-target="#regcode">Код регистрации</a>
    					</div>
            </div>
    	    </div>
    			<div class="row">
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
                    <li v-show="!showAll" class="list-group-item" v-for="msg in splicedMessages">
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
      	          <small>Результаты за последний модуль</small>
      	        </div>
      	        <div class="box-body">
      	            Гистограмма
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
                  <th>Результат 1</th>
                  <th>Результат 2</th>
                  <th>Результат 3</th>
                  <th>Результат 4</th>
                  <th>Результат 5</th>
                  <th><a class="btn-sm rounded primary text-white">-></a></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <th>Савтыра Сергей</th>
                  <th>99%</th>
                  <th>99%</th>
                  <th>99%</th>
                  <th>99%</th>
                  <th>100%</th>
                </tr>
                <tr>
                  <th>1</th>
                  <th>Дмитрий Никулин</th>
                  <th>99%</th>
                  <th>99%</th>
                  <th>99%</th>
                  <th>99%</th>
                  <th>100%</th>
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

export default {
  data() {
    return {
      group: {},
      groupCode: '',
      splicedMessages: [],
      studentsLength: null,
      showAll: false,
      showModal: false,
      showCode: false,
      writeMsg: false
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
    }
  },
  http: {
    root: '/api'
  },
  components: {
    'app-header': Header,
    'new-msg': NewMsg
  },
  created() {
    if (!this.logged)
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
      this.splicedMessages = this.group.messages.reverse().slice(0, 4);
    });
  }
}
</script>


<style lang="css" scoped>
#nope {
  padding-left: 0;
}
</style>
