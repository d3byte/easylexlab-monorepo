<template lang="html">
  <center>
    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th>Номер ученика</th>
        <th>Имя ученика</th>
        <th v-for="test in tests">{{ test.name }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(student, index) in group._students">
        <td>{{ index + 1 }}</td>
        <td>{{ student.username }}</td>
        <!-- <td></td> -->
      </tr>
    </tbody>
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
