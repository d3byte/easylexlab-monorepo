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
export default {
  data() {
    return {
      user: this.$store.getters.user,
      token: this.$store.getters.userToken,
      groups: []
    }
  },
  http: {
    root: '/api'
  },
  methods: {
    goto(id) {
      const path = '/profile/group/' + id;
      this.$router.push({ path, alias: '/watch' });
    }
  },
  created() {
    this.$http.post('getgroups', {'id': this.user.id},
    {headers: { 'Authorization': 'Bearer ' + this.token }}).then(res => {
      this.groups = res.body.data;
    }).catch(err => {
      throw err;
    });
  }
}
</script>

<style lang="css">
table {
  color: white;
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
  color: #FCA311;
}
</style>
