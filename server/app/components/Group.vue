<template lang="html">
  <div>
    <app-header style="margin-bottom: 80px;" />
    <div class="container-fluid">
      <div class="box">
      <div class="row">
        <div class="col-lg-12">
          <center>
            <h3>Страница группы</h3>
            <h1 class="name">{{ this.group.name }}</h1>
          </center>
        </div>
      </div>
      <div class="row fl">
        <center>
        <div class="col-lg-4">
          <button v-if="!showCode" @click="generateLink(group._id)" class="btn btn-first" name="reg"> Ссылка на регистрацию</button>
          <p v-if="showCode" class="groupCode">{{ groupCode }}</p>
        </div>
        <div class="col-lg-4">
          <button @click="goto(group._id)" class="btn" name="newtask"> Создать задание</button>
        </div>
        <div class="col-lg-4">
          <button class="btn" name="newmember"> Добавить участника </button>
        </div>
      </center>
      </div>
      <hr>
      <br>
    </div>
  </div>
  <br>
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
      this.$http.post('reglink', body, {
        headers: {
          'Content-type' : 'application/json',
          'Authorization': 'Bearer ' + this.$store.getters.userToken
        }
      }).then(res => {
        this.groupCode = res.body.groupCode;
        this.showCode = true;
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
    }).catch(err => {
      throw err;
    });
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

  .groupCode, .btn-first {
    margin-right: 50px;
  }

  .box {
    background-color:#fff;
    min-height:300px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23), 0 7px 6px rgba(0,0,0,0.23) ;
    border-radius: 2px;
  }
</style>
