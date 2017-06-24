<template>
  <div>
    <center>
      <table>
        <tr>
          <th>Название</th>
          <th>Класс</th>
          <th>Ученики</th>
          <th>Подробнее</th>
        </tr>
        <tr v-for="group in groups">
          <td>{{ group.name }}</td>
          <td>{{ group.grade }}</td>
          <td>{{ group._students.length }}</td>
          <td>
            <span class="link" @click="goto(group._id)">Посмотреть</span>
          </td>
        </tr>
      </table>
    </center>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode';

export default {
  data() {
    return {
      user: jwtDecode(this.$store.getters.userToken),
      token: this.$store.getters.userToken,
      groups: []
    }
  },
  http: {
    root: '/api'
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
      this.groups = res.body.data;
    }).catch(err => {
      throw err;
    });
  }
}
</script>

<style lang="css">
table {
  color: #293132;
} th {
  margin-bottom: 5px;
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid black;
} td {
  padding: 10px;
  text-align: center;
}

.link {
  transition: 0.3s;
} .link:hover {
  cursor: pointer;
  color: #5688C7;
}
</style>
