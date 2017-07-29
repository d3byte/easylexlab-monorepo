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
        <td>{{ student.name }}</td>
        <td v-for="result in student._results">{{ result.result }}%</td>
      </tr>
    </tbody>
    </table>
  </center>
</template>

<script>
import _ from 'lodash';

export default {
  props: ['group'],
  data() {
    return {
      tests: [],
      results: []
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
    });
  }
}
</script>

<style lang="css">
</style>
