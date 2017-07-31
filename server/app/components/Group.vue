<template lang="html">
  <div>
    <app-header style="margin-bottom: 80px;" />
  <template>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8 box">
          <div class="col-lg-3 ava blue vertical-center">
            <h2 class="white-text">{{ this.group.name }}</h2>
          </div>
          <div class="col-lg-9 userinfo">
            <h2><b>Количество учеников в группе: </b></h2>
            <h3><b>Кем создана группа:</b></h3>
            <button @click="goto(group._id)" class="btn btn-primary" name="newtask"> Создать задание</button>
            <button v-if="!showCode" @click="generateLink(group._id)" class="btn btn-primary" id="codebtn" name="reg">Код регистрации</button>
            <p v-if="showCode" class="groupCode">{{ groupCode }}</p>
            <!-- <div v-if="showCode" class="ui basic modal groupCode">
  <div class="header">Header</div>
  <div class="content">
    <p>Дайте этот код ученикам и они смогут присоединиться к группе!</p>
    <p>{{ groupCode }}</p>
    <p></p>
  </div>
</div> -->
<!-- Если сюда встроить basic modal, то будет топ! -->


          </div>
        </div>
        <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1"></div>
        <div class="col-lg-3 box blue vertical-center">
          <h5 class="white-text"> Ближайший день сдачи </h5><br>
          <!-- <h1 class="number white-text">{{ date.slice(0, 2) }}</h1>
          <h1 class="month white-text">{{ date.slice(2) }}</h1> -->
        </div>
      </div>
      <!-- <router-view></router-view> -->
    </div>
  </template>
  <div class="container-fluid">
    <div class="box">
    <router-view :group="this.group" :groupid="this.$route.params.id"></router-view>
  </div>
  </div>
</div>
</template>

<script>
import Header from './Header.vue';
export default {
  data() {
    return {
      group: {},
      groupCode: '',
      showCode: ''
    }
  },
  methods: {
    goto(id) {
      const path = '/group/' + id + '/newtask';
      this.$router.push({ path });
    },
    generateLink(id) {
      const body = {
        'groupId': id
      };
      this.$http.post('regcode', body, {
        headers: {
          'Content-type' : 'application/json',
          'Authorization': 'Bearer ' + this.$store.getters.userToken
        }
      }).then(res => {
        this.groupCode = res.body.groupCode;
        this.showCode = true;
        // this.getElementById("codebtn").style.display = "none";
      }).catch(err => {throw err});
    }
  },
  http: {
    root: '/api'
  },
  components: {
    'app-header': Header
  },
  created() {
    if(!this.$store.getters.loginState)
      this.$router.push('/login');
    const body = {
      'groupId': this.$route.params.id
    };
    this.$http.post('getgroup', body, {
      headers: {
        'Content-type' : 'application/json',
        'Authorization': 'Bearer ' + this.$store.getters.userToken
      }
    }).then(res => {
      this.group = res.body.group;
    });
  },
  mounted(){
    $('.ui.basic.modal').modal('show');
  }
}
</script>


<style lang="css" scoped>
  .row {
    vertical-align: middle;
  }

  .fl{
    display: flex;
    justify-content: space-around;
  }

  .col-lg-8 {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .btn-first {
    margin-right: 50px;
  }

  .groupCode{
    /*margin-right: 30px; */
  }

  .box {
    background-color:#fff;
    min-height:300px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23), 0 7px 6px rgba(0,0,0,0.23) ;
    border-radius: 2px;
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
</style>
