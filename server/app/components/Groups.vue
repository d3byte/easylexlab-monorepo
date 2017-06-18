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
            <router-link to="profile/group/ + group._id">Посмотреть</router-link>
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
</style>
