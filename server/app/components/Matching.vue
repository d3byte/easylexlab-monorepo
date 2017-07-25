<template>
  <div class="col-lg-12">
    <center>
    <h1>Matching</h1>
    <br>
    <div class="row">
      <div v-for="(pair, index) in pairs" class="col-lg-3">
        <div class="box"
             :class="selected.first == pair.index ||
                     selected.second == pair.index
                     ? 'selected' : ''"
             @click="select(pair.index)">
          <h2 v-if="index % 2 == 0">{{ pair.key }}</h2>
          <h2 v-else>{{ pair.value }}</h2>
        </div>
        <div class="box"
             :class="selected.first == ++pair.index ||
                 selected.second == ++pair.index
                 ? 'selected' : ''"
             @click="select(++pair.index)">
          <h2 v-if="index % 2 == 0">{{ pair.value }}</h2>
          <h2 v-else>{{ pair.key }}</h2>
        </div>
      </div>
    </div>
    <div class="row">
    <button class="btn btn-primary" @click="hideGames">Закончить игру</button>
  </div>
  <br>
  <div class="row">
    <button class="btn btn-primary" @click="hideGames">Назад</button>
  </div>
    </center>
  </div>
</template>

<script>
import _ from 'lodash';
import randomize from 'randomatic';

export default {
  props: ['stack'],
  data() {
    return {
      pairs: [],
      selected: {
        first: null,
        second: null
      }
    }
  },
  methods: {
    hideGames() {
      this.$store.dispatch('hideGames');
    },
    showMatching() {
      this.$store.dispatch('showMatching');
    },
    showFlashcards() {
      this.$store.dispatch('showFlashcards');
    },
    select(index) {
      console.log(index);
      this.selected.first ?
        this.selected.second = index :
        this.selected.first = index;
    }
  },
  created() {
    while(this.pairs.length < 8) {
      for(let task of this.stack.tasks) {
        task.content = _.shuffle(task.content);
        if(this.pairs.length == 8)
          break;
        Array.prototype.push.apply(this.pairs, task.content);
      }
    }
    if(this.pairs.length % 8 != 0)
      this.pairs.splice(8, this.pairs.length - 8);
    for(let pair of this.pairs) {
      pair.index = randomize('0', 10);
    }
  },
  mounted() {
    $('.ui.dropdown').dropdown();
  }
}
</script>

<style lang="css" scoped>
  .box {
    height: 50px;
  }

  .selected {
    background: #1DA1F2;
  }
</style>
