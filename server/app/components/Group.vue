<template lang="html">
  <div>
    <app-header/>
    <!-- <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8 box">
          <div class="col-lg-3 ava blue vertical-center">
            <h2 class="white-text">{{ group.name }}</h2>
          </div>
          <div class="col-lg-9 userinfo">
            <h2><b>Количество учеников в группе: {{ studentsLength }}</b></h2>
            <button @click="goto(group._id)" class="btn btn-primary"> Создать задание</button>
            <button @click="generateLink(group._id)" class="btn btn-primary" id="codebtn">Код регистрации</button>
            <button @click="sendMsg" class="btn btn-primary">Написать сообщение группе</button>
            <div v-show="showModal" class="ui basic modal group">
              <center>
                <div class="header" v-if="showCode">Код регистрации</div>
                <div class="content" v-if="showCode">
                  <p>Дайте этот код ученикам и они смогут присоединиться к группе!</p>
                  <p><b>{{ groupCode }}</b></p>
                  <div class="actions">
                    <div @click="close" class="ui red basic cancel inverted button">
                      <i class="remove icon"></i>
                      Закрыть
                    </div>
                  </div>
                </div>
                <div class="header" v-if="writeMsg">Сообщение группе</div>
                <div class="content" v-if="writeMsg">
                  <new-msg :group="group"></new-msg>
                  <div class="actions">
                    <div @click="close" class="ui red basic cancel inverted button">
                      <i class="remove icon"></i>
                      Закрыть
                    </div>
                  </div>
                </div>
              </center>
            </div>
          </div>
        </div>
        <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1"></div>
        <div class="col-lg-3 box blue vertical-center">
          <h5 class="white-text"> Полезная статистика </h5><br>
        </div>
      </div>
    </div> -->
    <!-- <div class="container-fluid">
      <div class="box">
        <router-view :group="this.group" :groupid="this.$route.params.id"></router-view>
      </div>
    </div> -->
    <div class="row-col b-b">
    	<div class="row">
    		<div class="padding">
    			<div class="margin">
    				<h5 class="m-b-0 _300">Название группы</h5>
    			</div>
    			<div class="row-col box">
    				<div class="col-sm-12">
    					<div class="box-header">
    						<h3>Меню</h3>
    					</div>
    					<div class="box-body">
    						<p class="text-muted m-b-md">Здесь вы можете создать новое задание или написать сообщение.</p>
    						<a href class="btn btn-sm rounded success">Новое задание</a>
                <a href class="btn btn-sm rounded primary">Новое сообщение</a>
                <a href class="btn btn-sm rounded info">Код регистрации</a>
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
    				        <li class="list-group-item">
    				          <a href="" class="pull-left w-40 m-r"><img src="../assets/images/a4.jpg" class="img-responsive img-circle"></a>
    				          <div class="clear">
    				            <a href="" class="_500 block">Автор</a>
    				            <span class="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
    				          </div>
    				        </li>
    				        <li class="list-group-item">
    				          <a href="" class="pull-left w-40 m-r"><img src="../assets/images/a4.jpg" class="img-responsive img-circle"></a>
    				          <div class="clear">
    				            <a href="" class="_500 block">Автор</a>
    				            <span class="text-muted">Sectetur adipiscing elit</span>
    				          </div>
    				        </li>
    				        <li class="list-group-item">
    				          <a href="" class="pull-left w-40 m-r"><img src="../assets/images/a4.jpg" class="img-responsive img-circle"></a>
    				          <div class="clear">
    				            <a href="" class="_500 block">Автор</a>
    				            <span class="text-muted">Sectetur adipiscing elit</span>
    				          </div>
    				        </li>
    				        <li class="list-group-item">
    				          <a href="" class="pull-left w-40 m-r"><img src="../assets/images/a4.jpg" class="img-responsive img-circle"></a>
    				          <div class="clear">
    				            <a href="" class="_500 block">Автор</a>
    				            <span class="text-muted">Vestibulum ullamcorper sodales nisi nec condimentum</span>
    				          </div>
    				        </li>
    					    </ul>
                  <a href class="btn btn-sm rounded info">Посмотреть все</a>
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
      studentsLength: null,
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
    },
    sendMsg() {
      this.showModal = true;
      $('.ui.dimmer.modals.page').addClass('active visible').show();
      this.writeMsg = true;
      this.showCode = false;
      setTimeout(() => {
        $('.ui.basic.modal.group').modal('show');
      }, 50);
    },
    close() {
      this.showModal = false;
      setTimeout(() => {
        $('.ui.dimmer.modals.page').removeClass('active visible').hide();
      }, 5);
      this.writeMsg = false;
      this.showCode = false;
    },
    generateLink(id) {
      $('.ui.dimmer.modals.page').addClass('active visible').show();
      this.writeMsg = false;
      const body = {
        'groupId': id
      };
      this.$http.post('regcode', body, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.getters.userToken
        }
      }).then(res => {
        this.groupCode = res.body.groupCode;
        this.showModal = true;
        this.showCode = true;
        setTimeout(() => {
          $('.ui.basic.modal.group').modal('show');
        }, 50);
      }).catch(err => {
        throw err
      });
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
    });
  }
}
</script>


<style lang="css" scoped>

</style>
