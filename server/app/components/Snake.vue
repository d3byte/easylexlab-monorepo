<template>
<div>
  <center>
    <div class="name">
      <img src="../pics/snake.png">
      <h2><b>Змейка</b></h2>
    </div>
    <h3>Пройдено раз: {{ doneAttempts }}/{{ totalAttempts }}</h3>
    <div class="box help" v-if="help">
      <p>Змейка должна собрать квадрат того цвета, которым обозначен правильный перевод слова, показанного в меню справа.</p>
      <p>Управление змейкой производится нажатием на кнопки:</p>
      <div class="btns">
        <button class="btn rounded controls">
            <i class="material-icons">&#xE316;</i>
            <b>W</b> - <span class="text-muted">вверх</span>
          </button>
        <button class="btn rounded controls">
            <i class="material-icons">&#xE313;</i>
            <b>S</b> - <span class="text-muted">вниз</span>
          </button>
        <button class="btn rounded controls">
            <i class="material-icons">&#xE314;</i>
            <b>A</b> - <span class="text-muted">влево</span>
          </button>
        <button class="btn rounded controls">
            <i class="material-icons">&#xE315;</i>
            <b>D</b> - <span class="text-muted">вправо</span>
          </button>
      </div>
      <div class="level">
        <div class="labeled-select">
          <div class="label">
            Уровень сложности
          </div>
          <select class="select" v-model="ms">
                <option value="400">Легкий</option>
                <option value="300">Средний</option>
                <option value="200">Тяжелый</option>
              </select>
        </div>
      </div>
    </div>
    <button v-if="help" class="btn" style="padding-left:50px;padding-right:50px;background:rgb(252, 105, 33);box-shadow:none;color:white;" @click="start">Начать</button>
    <div v-if="win && !dead && !help" @click="show()" class="box done">
      <div class="done-header">
        <h3 class="text-bold">Победа!</h3>
      </div>
      <div class="done-body">
        <br>
        <button id="restart" class="btn btn-sm rounded" @click="start">Перезапуск</button>
        <br />
        <button id="changediff" class="btn btn-sm rounded" @click="help = true">Сменить уровень сложности</button>
        <!-- <a @click="start"><b>Сыграйте еще раз</b></a> или смените <a @click="help = true"><b>уровень сложности</b>.</a> -->
      </div>
    </div>
  </center>
  <center>
    <h5 v-if="!dead && !win && !help && waitForKey" class="text-muted">Нажмите любую клавишу, чтобы начать</h5>
    <div v-if="!dead && !win && !help" class="box game">
      <div class="table">
        <table style="margin:0">
          <tr v-for="row in grid">
            <td v-for="cell in row" class="grid-cell" :class="{ snake: cell.snake > 0,
                    'food-0': cell.food.exists && cell.food.index == 0,
                    'food-1': cell.food.exists && cell.food.index == 1,
                    'food-2': cell.food.exists && cell.food.index == 2 }">
            </td>
          </tr>
        </table>
      </div>
      <div class="words" style="padding:0 20px">
        <h5 style="margin-bottom:10px">Слово: {{ currentWordGroup.key }}</h5>
        <div class="row" v-for="word in currentWordGroup.words">
          <button style="box-shadow:none;text-transform:none;border:none;width:100%;margin-bottom:10px;border-radius:10px;" class="btn rounded" :class="'food food-' + word.index + ' '
              + (word.eaten ? 'eaten ' : '')
              + (word.correct ? 'correct' : '')">

            <b>{{ word.value }}</b>
          </button>
        </div>
      </div>
    </div>
  </center>
  <center>
    <div v-if="dead && !win && !help" class="box done">
      <div class="lose-header">
        <h3 class="text-bold">Вы проиграли.</h3>
      </div>
      <div class="done-body">
        <button id="restart" class="btn btn-sm rounded" @click="start">Перезапуск</button>
        <br />
        <button id="changediff" class="btn btn-sm rounded" @click="help = true">Сменить уровень сложности</button>
        <!-- <a @click="start"><b>Сыграйте еще раз</b></a> или смените <a @click="help = true"><b>уровень сложности</b>.</a> -->
      </div>
    </div>
  </center>
</div>
</template>

<script>
import randomize from 'randomatic';
import Grid from '../classes/Grid';

const UP = [-1, 0],
  DOWN = [1, 0],
  LEFT = [0, -1],
  RIGHT = [0, 1];

let keyMap = {
  "65": LEFT,
  "87": UP,
  "68": RIGHT,
  "83": DOWN
};

let snakePos, snakeCells, length, ticking, userActions = [];

export default {
  props: ['stack'],
  data() {
    return {
      help: true,
      waitForKey: true,
      ms: 300,
      direction: UP,
      dead: false,
      win: false,
      grid: null,
      correct: 0,
      words: [],
      currentWordGroup: {},
      wordGroups: []
    };
  },
  computed: {
    showTest() {
      return this.$store.getters.testAvailable
    },
    doneAttempts() {
      return this.$store.getters.games.snake.done
    },
    totalAttempts() {
      return this.$store.getters.games.snake.attempts
    },
    gamesConditions() {
      return this.$store.getters.finishedGames
    }
  },
  methods: {
    handleUserAction(key) {
      if (this.waitForKey) {
        this.waitForKey = false;
        ticking = setInterval(this.tick, parseInt(this.ms));
      }
      let direction = keyMap[key];
      if (direction) {
        userActions.push(() => {
          if (direction[0] + this.direction[0] === 0 && direction[1] + this.direction[1] === 0) {
            return; // ignore opposite direction presses
          }
          this.direction = direction
        });
      }
    },
    start() {
      if (ticking)
        clearInterval(ticking);
      this.waitForKey = true;
      this.help = false;
      let size = 25;
      this.grid = new Grid(size, (x, y) => ({
        x,
        y,
        snake: 0,
        food: {
          exists: false,
          index: null
        }
      }));
      this.dead = false;
      this.correct = 0;
      this.win = false;
      userActions = [];
      length = 5;
      snakePos = Grid.random(this.grid);
      snakePos.snake = length;
      snakeCells = [snakePos];
      this.setWordGroups();
      this.setFood();
    },
    tick() {
      let userAction;
      if (userAction = userActions.shift()) {
        userAction();
      }
      this.moveSnake();
      this.eatFood();
    },
    moveSnake() {
      let {
        x,
        y
      } = snakePos;
      let [xd, yd] = this.direction;
      snakePos = (this.grid[x + xd] || [])[y + yd];
      if (!snakePos || snakePos.snake) {
        return this.gameOver();
      }
      snakeCells.forEach(cell => cell.snake--);
      snakeCells = snakeCells.filter(cell => cell.snake > 0);

      snakePos.snake = length;
      snakeCells.push(snakePos);
    },
    revertStatus() {
      for (let pair of this.currentWordGroup.words) {
        pair.eaten = false;
        pair.correct = false;
      }
    },
    changeStatus(value, correct = false) {
      for (let pair of this.currentWordGroup.words) {
        if (!correct && pair.value == value) {
          pair.eaten = true;
          break;
        } else if (correct && pair.value == value) {
          pair.eaten = true;
          pair.correct = true;
          break;
        }
      }
    },
    removeFood() {
      for (let row of this.grid) {
        for (let cell of row) {
          if (cell.food.exists) {
            cell.food.exists = false;
            cell.food.eaten = false;
          }
        }
      }
    },
    changeCurrentWordGroup() {
      this.removeFood();
      let currentIndex = this.wordGroups.indexOf(this.currentWordGroup);
      if (this.wordGroups.length > currentIndex)
        currentIndex++;
      setTimeout(() => {
        this.revertStatus();
        this.currentWordGroup = this.wordGroups[currentIndex];
        this.setFood();
      }, 2000);
    },
    eatFood() {
      if (snakePos && snakePos.food.exists) {
        length++;
        snakeCells.forEach(cell => cell.snake++);
        snakePos.food.exists = false;
        if (snakePos.food.value == this.currentWordGroup.trueValue) {
          this.changeStatus(snakePos.food.value, true);
          this.correct++;
          if (this.correct == this.wordGroups.length) {
            this.win = true;
            clearInterval(ticking);
            const props = {
              game: 'snake',
              id: this.$route.params.id
            };
            this.$store.dispatch('incrementAttempts', props);
            if (this.doneAttempts == this.totalAttempts)
              this.$store.dispatch('gameFinished', props);
            if (this.$store.state.games.flashcards.win && this.$store.state.games.matching.win && this.$store.state.games.typein.win && this.$store.state.games.snake.win && this.$store.state.games.scramble.win) {
              this.$store.dispatch('testAvailable');
              setTimeout(() => {
                $('#testavailable').modal('show');
              }, 50)
            }
            return;
          }
          this.changeCurrentWordGroup();
        } else {
          this.changeStatus(snakePos.food.value);
        }
      }
    },
    setFood() {
      let oldRandomIndexes = [];
      for (let i = 0; i < 3; i++) {
        let randomIndex = randomize('0', 1);
        while (oldRandomIndexes.includes(randomIndex) || randomIndex > 2) {
          randomIndex = randomize('0', 1);
        }
        oldRandomIndexes.push(randomIndex);
        let value;
        if (i == 0)
          value = this.currentWordGroup.trueValue;
        if (i == 1)
          value = this.currentWordGroup.value2;
        if (i == 2)
          value = this.currentWordGroup.value3;
        Grid.random(this.grid).food = {
          exists: true,
          value,
          index: randomIndex
        };
        for (let group of this.currentWordGroup.words) {
          if (group.value == value)
            group.index = randomIndex;
        }
      }
    },
    gameOver() {
      this.dead = true;
      clearInterval(ticking);
    },
    setWordGroups() {
      this.wordGroups = [];
      for (let i = 0; i < this.words.length; i++) {
        let wordGroup = {};
        wordGroup.words = [];
        for (let pair of _.shuffle(this.words)) {
          pair.eaten = false;
          pair.correct = false;
          if (!wordGroup.key) {
            wordGroup.key = pair.key;
            wordGroup.trueValue = pair.value;
            wordGroup.words.push(pair);
            continue;
          }
          if (!wordGroup.value2) {
            wordGroup.value2 = pair.value;
            wordGroup.words.push(pair);
            continue;
          }
          if (wordGroup.value3)
            break;
          wordGroup.value3 = pair.value;
          wordGroup.words.push(pair);
          wordGroup.words = _.shuffle(wordGroup.words);
        }
        if (i == 0)
          this.currentWordGroup = wordGroup;
        this.wordGroups.push(wordGroup);
      }
    },
    tryTest() {
      this.$store.dispatch('hideGames');
      this.$store.dispatch('showTest');
    },
    hideGames() {
      this.$store.dispatch('hideGames');
    }
  },
  created() {
    for (let task of this.stack.tasks) {
      Array.prototype.push.apply(this.words, task.content);
    }
    window.addEventListener('keydown', event => this.handleUserAction(event.which));
  }
}
</script>

<style scoped>
a {
  cursor: pointer;
  color: #006aff;
}

table {
  margin: 0;
  border-collapse: collapse;
}

.table {
  width: auto;
  padding-left: 0;
  padding-right: 10px;
}

.grid-cell {
  margin: 0;
  padding: 0;
  height: 12px;
  width: 12px;
  background-color: #d3dff8;
  border: 1px solid white;
}

.food {
  color: white;
}

.food-0 {
  background: rgb(252, 105, 33);
  color: white;
}

.food-1 {
  background: rgb(15, 123, 59);
  color: white;
}

.food-2 {
  background: rgb(51, 136, 223);
  color: white;
}

.eaten {
  text-decoration: line-through;
  background: #A51C1C;
  color: white;
}

.correct {
  background: rgb(242, 210, 48);
  text-decoration: none;
  color: white;
}

.snake {
  background-color: #3e3e3e;
}

.win.box {
  width: 300px;
  height: 150px;
}

.game {
  padding: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 530px;
  border-top: 5px solid #5ee6af;
  border-radius: 5px;
}

.words {
  min-width: 150px;
  margin-top: 10px;
  margin-left: 10px;
}

.restart:hover {
  cursor: pointer;
}

.name {
  display: flex;
  justify-content: center;
  align-items: center;
}

.name img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  margin-bottom: 10px;
}

.name h2 {
  margin: 0;
}

.help {
  width: 560px;
  padding: 15px;
  border-top: 5px solid #5ee6af;
  border-radius: 5px;
}

.btns {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 30px;
  margin-bottom: 10px;
}

.btns button {
  font-size: 14px;
  padding: 5px 10px;
  background: rgb(200, 230, 253);
  text-transform: none !important;
  box-shadow: none;
  vertical-align: middle;
}

.btns button i {
  font-size: 20px;
  color: rgb(227, 167, 40);
  font-weight: bold;
}

.level {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 30px;
}

.labeled-select {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
}

.label {
  float: left;
  margin: 0;
  background: rgb(175, 176, 230);
  color: rgb(84, 84, 91);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  padding: 5px 10px;
  width: 40%;
}

.select {
  display: block;
  margin: 0;
  background: rgb(221, 222, 244);
  color: rgb(102, 102, 107);
  font-size: 16px;
  padding: 1px 20%;
  width: 60%;
  text-align: center;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.select:hover {
  cursor: pointer;
}

.done {
  display: inline-block;
  min-width: 300px;
  border-radius: 4px;
} .done-header {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(34, 166, 69);
  border-top: 5px solid rgb(17, 131, 47);
  padding: 10px;
  color: white;
  font-weight: bold;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
} .done-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
} .done-body h5 {
  margin-bottom: 10px !important;
}.lose-header {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #d62a2a;
  border-top: 5px solid #991e1e;
  padding: 10px;
  color: white;
  font-weight: bold;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

#restart {
  background: rgb(207, 233, 254);
  box-shadow: none;
  text-transform: none !important;
}

#changediff {
  margin-top: 10px;
  background: rgb(207, 233, 254);
  box-shadow: none;
  text-transform: none !important;
}
</style>
