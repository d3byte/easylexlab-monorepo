<template>
  <div>
    <h1>Snake</h1>
    <h3>Пройдено раз: {{ $store.getters.attempts }}/{{ this.stack.attempts }}</h3>
    <div class="dashboard">
      <button @click="start" class="flat-btn">Перезапуск</button>
      <button class="flat-btn">Помощь</button>
    </div>
    <div v-if="!dead" class="container-fluid">
      <div class="row">
        <table class="col-lg-4">
          <tr v-for="row in grid">
            <td v-for="cell in row" class="grid-cell"
                :class="{ snake: cell.snake > 0,
                  'food-0': cell.food.exists && cell.food.index == 0,
                  'food-1': cell.food.exists && cell.food.index == 1,
                  'food-2': cell.food.exists && cell.food.index == 2 }">
            </td>
          </tr>
        </table>
        <div class="col-lg-3">
          <h3>Слово: {{ currentWordGroup.key }}</h3>
          <!-- Временная заглушка: -->
          <h3 class="food-0">Вариант 1</h3>
          <h3 class="food-1">Вариант 2</h3>
          <h3 class="food-2">Вариант 3</h3>
        </div>
      </div>
    </div>
    <div v-else>
      Вы проиграли. <a @click="start">Сыграть снова?</a>
    </div>
  </div>
</template>

<script>
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
        direction: UP,
        dead: false,
        grid: null,
        foodAmount: null,
        words: [],
        currentWordGroup: {},
        wordGroups: []
      };
    },
    methods: {
      handleUserAction(key) {
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
        let size = 25, ms = 95;
        this.grid = new Grid(size, (x, y) => ({x, y, snake: 0, food: {exists: false, index: null}}));
        this.dead = false;
        userActions = [];
        length = 5;
        ticking = setInterval(this.tick, ms);

        snakePos = Grid.random(this.grid);
        snakePos.snake = length;
        snakeCells = [snakePos];
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
        let {x, y} = snakePos;
        let [xd, yd] = this.direction;
        snakePos = (this.grid[x + xd] || [])[y + yd];

        if (!snakePos || snakePos.snake) {
          return this.gameOver();
        }

        // shift snake in all cells
        snakeCells.forEach(cell => cell.snake--);
        snakeCells = snakeCells.filter(cell => cell.snake > 0);

        snakePos.snake = length;
        snakeCells.push(snakePos);
      },
      eatFood() {
        if (snakePos && snakePos.food.exists) {
          length++;
          snakeCells.forEach(cell => cell.snake++);
          console.log(snakePos.food);
          snakePos.food.exists = false;
          this.foodAmount--;
          if(this.foodAmount == 0)
            this.setFood();
        }
      },
      setFood() {
        for(let i = 0; i < 3; i++) {
          var value;
          if(i == 0)
            value = this.currentWordGroup.trueValue;
          if(i == 1)
            value = this.currentWordGroup.value2;
          if(i == 2)
            value = this.currentWordGroup.value3;
          Grid.random(this.grid).food = {
            exists: true,
            value,
            index: i
          };
        }
        this.foodAmount = 3;
      },
      gameOver() {
        this.dead = true;
        clearInterval(ticking);
      }
    },
    created() {
      let firstWordGroup = {};
      for(let pair of _.shuffle(this.stack.tasks[0].content)) {
        if(!firstWordGroup.key) {
          firstWordGroup.key = pair.key;
          firstWordGroup.trueValue = pair.value;
          continue;
        }
        if(!firstWordGroup.value2) {
          firstWordGroup.value2 = pair.value;
          continue;
        }
        if(firstWordGroup.value3)
          break;
        firstWordGroup.value3 = pair.value;
      }
      this.currentWordGroup = firstWordGroup;
      for(let task of this.stack.tasks) {
        Array.prototype.push.apply(this.words, task.content);
      }
      for(let i = 0; i < this.words.length; i++) {
        let wordGroup = {};
        for(let pair of _.shuffle(this.words)) {
          if(!wordGroup.key) {
            wordGroup.key = pair.key;
            wordGroup.trueValue = pair.value;
            continue;
          }
          if(!wordGroup.value2) {
            wordGroup.value2 = pair.value;
            continue;
          }
          if(wordGroup.value3)
            break;
          wordGroup.value3 = pair.value;
        }
        this.wordGroups.push(wordGroup);
      }
      this.start();
      window.addEventListener('keydown', event => this.handleUserAction(event.which));
    },
  }
</script>

<style scoped>
  a {
    cursor: pointer;
    color: #006aff;
  }

  table {
    border-collapse: collapse;
  }

  .grid-cell {
    margin: 0;
    padding: 0;
    height: 10px;
    width: 10px;
    background-color: #f4f4f4;
    border: 1px solid white;
  }

  .food-0 {
    background-color: #56b0bb;
  }

  .food-1 {
    background: #6E44FF;
  }

  .food-2 {
    background: #F44444;
  }

  .snake {
    background-color: #3e3e3e;
  }
</style>
