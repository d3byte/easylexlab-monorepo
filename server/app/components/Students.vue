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
import _ from 'lodash';

export default {
  props: ['group'],
  data() {
    return {
      tests: [],
      results: [{
        test: {},
        user: {},
        result
      }]
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

    for(let test of this.tests) {
      for(let result of test.results) {
        this.results.push(
          {
            user: _.find(this.group._students, user => {
              return user.username == result.username
            }),
            test: {
              id: test._id
            },
            result: result.result
          }
        );
      }
    }
  }
}
</script>

<style lang="css">
</style>
