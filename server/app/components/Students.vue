<template lang="html">
  <center>
    <table>
      <tr>
        <th>№</th>
        <th>Имя</th>
        <th v-for="test in tests">{{ test.name }}</th>
      </tr>
      <tr v-for="(student, index) in group._students">
        <td>{{ index + 1 }}</td>
        <td>{{ student.username }}</td>
      </tr>
    </table>
  </center>
</template>

<script>
export default {
  props: ['group'],
  data() {
    return {
      tests: []
    }
  },
  http: {
    root: '/api'
  },
  created() {
    const body = {
      'groupId': this.$route.params.id
    };
    this.$http.post('gettests', body, {
      headers: {
        'Content-type' : 'application/json',
        'Authorization': 'Bearer ' + this.$store.getters.userToken
      }
    }).then(res => {
      this.tests = res.body.stacks;
      console.log(res);
    }).catch(err => {
      throw err;
    });
  }
}
</script>

<style lang="css">
</style>
