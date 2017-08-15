<template>
  <div>
    <table v-if="!dead">
      <tr v-for="row in grid">
        <td v-for="cell in row" class="grid-cell" :class="{ snake: cell.snake > 0, food: cell.food.exists }">
        </td>
      </tr>
    </table>
    <div v-else>
      You Died. <a @click="start">Play Again?</a>
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
    data() {
      return {
        direction: UP,
        dead: false,
        grid: null,
        foodAmount: null
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
        let size = 50, ms = 65;
        this.grid = new Grid(size, (x, y) => ({x, y, snake: 0, food: {exists: false, index: 0}}));
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
          snakePos.food.exists = false;
          this.foodAmount--;
          if(this.foodAmount == 0)
            this.setFood();
        }
      },
      setFood() {
        for(let i = 1; i <= 3; i++) {
          Grid.random(this.grid).food = {
            exists: true,
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

  .food {
    background-color: #56b0bb;
  }

  .snake {
    background-color: #3e3e3e;
  }
</style>
