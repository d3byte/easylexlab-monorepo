<template lang="html">
  <center>
    <table>
      <tr>
        <th>№</th>
        <th>Имя</th>
        <th>Задание 1</th>
        <th>Задание 2</th>
        <th>Задание 3</th>
      </tr>
      <tr v-for="(student, index) in group._students">
        <td>{{ index + 1 }}</td>
        <td>{{ student.username }}</td>
        <td>100%</td>
        <td>70%</td>
        <td>Лох</td>
      </tr>
    </table>
  </center>
</template>

<script>
export default {
  props: ['group']
}
</script>

<style lang="css">
</style>
