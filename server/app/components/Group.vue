<template lang="html">
  <div>
    <app-header style="margin-bottom: 80px;" />
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-4">
            <h5>Страница группы</h5>
            <h3 class="name">{{ this.group.name }}</h3>
        </div>
        <div class="col-lg-8">
          <button @click="generateLink(group._id)" class="btn" name="reg"><i class="fa fa-plug" aria-hidden="true"></i> Ссылка на регистрацию</button>
          <button @click="goto(group._id)" class="btn" name="newtask"><i class="fa fa-pencil" aria-hidden="true"></i> Создать задание</button>
        </div>
      </div>
      <hr>
      <router-view :group="this.group" :groupid="this.$route.params.id"></router-view>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue';
export default {
  data() {
    return {
      group: {}
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
      }).then(res => console.log(res)).catch(err => {throw err});
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

  .col-lg-8 {
    text-align: center;
  } .col-lg-8 > button:first-of-type {
    margin-right: 50px;
  }
</style>
