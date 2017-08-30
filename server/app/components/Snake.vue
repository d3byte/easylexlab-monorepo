<template>
  <div>
    <center>
      <h1>Snake</h1>
      <h3>Пройдено раз: {{ doneAttempts }}/{{ totalAttempts }}</h3>
      <div class="dashboard">
        <button @click="start" class="flat-btn">Перезапуск</button>
        <button class="flat-btn" @click="hideGames">Назад</button>
        <button v-if="win && showTest" @click="tryTest" class="flat-btn">Пройти тест</button>
      </div>
      <div v-if="win && !dead" class="win box">
        <h3 class="text-success">Победа!</h3>
        <h5 @click="start" class="restart">Начать заново?</h5>
      </div>
    </center>
    <center>
      <div v-if="!dead && !win" class="box game">
          <div class="table">
            <table>
              <tr v-for="row in grid">
                <td v-for="cell in row" class="grid-cell"
                    :class="{ snake: cell.snake > 0,
                      'food-0': cell.food.exists && cell.food.index == 0,
                      'food-1': cell.food.exists && cell.food.index == 1,
                      'food-2': cell.food.exists && cell.food.index == 2,
                      'food-3': cell.food.exists && cell.food.index == 3,
                      'food-4': cell.food.exists && cell.food.index == 4,
                      'food-5': cell.food.exists && cell.food.index == 5,
                      'food-6': cell.food.exists && cell.food.index == 6,
                      'food-7': cell.food.exists && cell.food.index == 7,
                      'food-8': cell.food.exists && cell.food.index == 8,
                      'food-9': cell.food.exists && cell.food.index == 9 }">
                </td>
              </tr>
            </table>
          </div>
          <div class="words box">
            <h5>Слово: <i>{{ currentWordGroup.key }}</i></h5>
            <h6 v-for="word in currentWordGroup.words"
                :class="'food food-' + word.index + ' '
                + (word.eaten ? 'eaten ' : '')
                + (word.correct ? 'correct' : '')">

              <b>{{ word.value }}</b>
            </h6>
          </div>
      </div>
    </center>
    <center>
      <div v-if="dead && !win">
        Вы проиграли. <a @click="start">Сыграть снова?</a>
        <button class="flat-btn" @click="hideGames">Назад</button>
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
        if(ticking)
          clearInterval(ticking);
        let size = 25, ms = 140;
        this.grid = new Grid(size, (x, y) => ({ x, y, snake: 0, food: { exists: false, index: null } }));
        this.dead = false;
        this.correct = 0;
        this.win = false;
        userActions = [];
        length = 5;
        ticking = setInterval(this.tick, ms);

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
        let {x, y} = snakePos;
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
        for(let pair of this.currentWordGroup.words) {
          pair.eaten = false;
          pair.correct = false;
        }
      },
      changeStatus(value, correct = false) {
        for(let pair of this.currentWordGroup.words) {
          if(!correct && pair.value == value) {
            pair.eaten = true;
            break;
          }
          else if(correct && pair.value == value) {
            pair.eaten = true;
            pair.correct = true;
            break;
          }
        }
      },
      removeFood() {
        for(let row of this.grid) {
          for(let cell of row) {
            if(cell.food.exists) {
              cell.food.exists = false;
              cell.food.eaten = false;
            }
          }
        }
      },
      changeCurrentWordGroup() {
        this.removeFood();
        let currentIndex = this.wordGroups.indexOf(this.currentWordGroup);
        if(this.wordGroups.length > currentIndex)
          currentIndex++;
        setTimeout(() => {
          this.revertStatus();
          this.currentWordGroup = this.wordGroups[currentIndex];
          this.setFood();
        }, 2000);
      },
      eatFood() {
        if(snakePos && snakePos.food.exists) {
          length++;
          snakeCells.forEach(cell => cell.snake++);
          snakePos.food.exists = false;
          if(snakePos.food.value == this.currentWordGroup.trueValue) {
            this.changeStatus(snakePos.food.value, true);
            this.correct++;
            if(this.correct == this.wordGroups.length) {
              this.win = true;
              clearInterval(ticking);
              this.$store.dispatch('incrementAttempts', 'snake');
              if(this.doneAttempts== this.totalAttempts)
                this.$store.dispatch('gameFinished', 'snake');
              if(this.gamesConditions[0] && this.gamesConditions[1] && this.gamesConditions[2] && this.gamesConditions[3] && this.gamesConditions[4])
                this.$store.dispatch('testAvailable');
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
        for(let i = 0; i < 3; i++) {
          let randomIndex = randomize('0', 1);
          while(oldRandomIndexes.includes(randomIndex)) {
            randomIndex = randomize('0', 1);
          }
          oldRandomIndexes.push(randomIndex);
          let value;
          if(i == 0)
            value = this.currentWordGroup.trueValue;
          if(i == 1)
            value = this.currentWordGroup.value2;
          if(i == 2)
            value = this.currentWordGroup.value3;
          Grid.random(this.grid).food = {
            exists: true,
            value,
            index: randomIndex
          };
          for(let group of this.currentWordGroup.words) {
            if(group.value == value)
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
        for(let i = 0; i < this.words.length; i++) {
          let wordGroup = {};
          wordGroup.words = [];
          for(let pair of _.shuffle(this.words)) {
            pair.eaten = false;
            pair.correct = false;
            if(!wordGroup.key) {
              wordGroup.key = pair.key;
              wordGroup.trueValue = pair.value;
              wordGroup.words.push(pair);
              continue;
            }
            if(!wordGroup.value2) {
              wordGroup.value2 = pair.value;
              wordGroup.words.push(pair);
              continue;
            }
            if(wordGroup.value3)
              break;
            wordGroup.value3 = pair.value;
            wordGroup.words.push(pair);
            wordGroup.words = _.shuffle(wordGroup.words);
          }
          if(i == 0)
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
      for(let task of this.stack.tasks) {
        Array.prototype.push.apply(this.words, task.content);
      }
      this.start();
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

  .grid-cell {
    margin: 0;
    padding: 0;
    height: 12px;
    width: 12px;
    background-color: #f4f4f4;
    border: 1px solid white;
  }

  .food {
    color: white;
  }

  .food-0 {
    background: #DBC0F7;
  }

  .food-1 {
    background: #801096;
  }

  .food-2 {
    background: #8C8C55;
  }

  .food-3 {
    background: #56b0bb;
  }

  .food-4 {
    background: #6D213C;
  }

  .food-5 {
    background: #041389;
  }

  .food-6 {
    background: #7B3E19;
  }

  .food-7 {
    background: #006CB5;
  }

  .food-8 {
    background: #D8918F;
  }

  .food-9 {
    background: #CC9B33;
  }

  .eaten {
    text-decoration: line-through;
    background: #A51C1C;
    color: white;
  }

  .correct {
    background: #307351;
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
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 560px;
  }

  .words {
    min-width: 150px;
  }

  .restart:hover {
    cursor: pointer;
  }
</style>
