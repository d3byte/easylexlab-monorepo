<template>
  <div>
    <div class="container margin hidden-sm-down">
      <center><i v-if="showPreloader" class="material-icons preloader">cached</i></center>
      <center>
        <div class="table-responsive box">
          <table class="table table-striped table-hover" v-if="!showPreloader">
            <thead>
              <tr class="headers">
                <th>Название</th>
                <th>Класс</th>
                <th>Ученики</th>
                <th>Подробнее</th>
              </tr>
            </thead>
            <tbody>
              <tr class="body-row" v-for="group in groups">
                <td>{{ group.name }}</td>
                <td>{{ group.grade }}</td>
                <td>{{ group._students.length }}</td>
                <td>
                  <span class="link" @click="goto(group._id)">Посмотреть</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </center>
    </div>
    <div class="container-sm-xs margin hidden-md-up">
      <center><i v-if="showPreloader" class="material-icons preloader">cached</i></center>
      <center>
        <div class="table-responsive box">
        <table class="table table-striped table-hover" v-if="!showPreloader">
          <thead>
            <tr class="headers">
              <th>Название</th>
              <th>Класс</th>
              <th>Ученики</th>
              <th>Подробнее</th>
            </tr>
          </thead>
          <tbody>
            <tr class="body-row" v-for="group in groups">
              <td>{{ group.name }}</td>
              <td>{{ group.grade }}</td>
              <td>{{ group._students.length }}</td>
              <td>
                <span class="link" @click="goto(group._id)">Посмотреть</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </center>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: this.$store.getters.user,
      token: this.$store.getters.userToken,
      groups: [],
      showPreloader: true
    }
  },
  http: {
    root: '//ealapi.tw1.ru/api'
  },
  methods: {
    goto(id) {
      const path = '/group/' + id;
      this.$router.push({ path, alias: '/group' });
    }
  },
  created() {
    this.$http.post('getgroups', {'id': this.user.id},
    {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      }
    }).then(res => {
      this.showPreloader = false;
      this.groups = res.body.data;
      Array.prototype.push.apply(this.$store.state.user._groups, this.groups);
    }).catch(err => {
      throw err;
    });
  }
}
</script>

<style lang="css" scoped>
table {
  color: #293132;
} th {
  margin-bottom: 5px;
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid black;
  color: white;
} td {
  padding: 10px;
  text-align: center;
  color: rgb(70, 107, 121);
} .body-row:nth-child(even) {
  background: rgb(234, 244, 245);
} .body-row:nth-child(odd) {
  background: white;
} .body-row:hover {
  border: 1px solid rgb(233, 103, 44) !important;
} .body-row:hover td {
  color: rgb(233, 103, 44);
}

.link {
  transition: 0.3s;
} .link:hover {
  cursor: pointer;
  color: #5688C7;
}

.margin {
  margin-top: 20px;
}

.preloader {
  color: black;
}

.container {
  width: 60%;
}

.container-sm-xs {
  display: flex;
  justify-content: center;
}

.table-responsive.box {
  border-top: 5px solid rgb(144, 197, 246);
  border-bottom: 5px solid rgb(211, 215, 217);
  border-radius: 5px;
}

.headers {
  background: rgb(98, 171, 242);
} .headers:hover {
  background: rgb(98, 171, 242) !important;
  color: white !important;
}
</style>
