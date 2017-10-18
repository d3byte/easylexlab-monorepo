import _ from 'lodash';

export default {
  login(state, token) {
    state.logged = true;
    state.token = token;
    localStorage.token = token;
  },
  logout(state) {
    state.user = {};
    state.logged = false;
    state.user.requested = false;
    state.token = '';
    state.currentGroup = {};
    localStorage.token = '';
    localStorage.city = '';
    localStorage.firstName = '';
    localStorage.lastName = '';
    localStorage.img = '';
    localStorage.ext = '';
    localStorage.games = [];
  },
  hideOrShowLogin(state) {
    state.header.showLogin = !state.header.showLogin;
  },
  addTests(state, stack) {
    state.currentGroup._tests = stack;
  },
  showMatching(state) {
    state.games.flashcards.show = false;
    state.games.snake.show = false;
    state.games.matching.show = true;
    state.games.scramble.show = false;
    state.games.typein.show = false;
  },
  showFlashcards(state) {
    state.games.snake.show = false;
    state.games.matching.show = false;
    state.games.flashcards.show = true;
    state.games.scramble.show = false;
    state.games.typein.show = false;
  },
  showSnake(state) {
    state.games.flashcards.show = false;
    state.games.matching.show = false
    state.games.snake.show = true;
    state.games.scramble.show = false;
    state.games.typein.show = false;
  },
  showScramble(state) {
    state.games.flashcards.show = false;
    state.games.matching.show = false
    state.games.snake.show = false;
    state.games.scramble.show = true;
    state.games.typein.show = false;
  },
  showTypein(state){
    state.games.flashcards.show = false;
    state.games.matching.show = false
    state.games.snake.show = false;
    state.games.scramble.show = false;
    state.games.typein.show = true;
  },
  setGames(state, props) {
    state.games.id = props.id;
    state.games.flashcards.attempts = props.attempts.flashcards;
    state.games.matching.attempts = props.attempts.matching;
    state.games.snake.attempts = props.attempts.snake;
    state.games.scramble.attempts = props.attempts.scramble;
    state.games.typein.attempts = props.attempts.typein;
    if(props.attempts.flashcards == 0)
      state.games.flashcards.win = true;
    if(props.attempts.matching == 0)
      state.games.matching.win = true;
    if(props.attempts.snake == 0)
      state.games.snake.win = true;
    if(props.attempts.scramble == 0)
      state.games.scramble.win = true;
    if(props.attempts.typein == 0)
      state.games.typein.win = true;
    var games = JSON.parse(localStorage.games);
    games = games.filter(game => game.games.id != props.id);
    var savedGames = {
      games: state.games
    };
    games.push(savedGames);
    localStorage.games = JSON.stringify(games);
  },
  loadGames(state, props) {
    var myState = JSON.parse(localStorage.games);
    myState.map(game => {
      if(game.games.id == props.id) {
        state.games = game.games;
      }
    });
  },
  hideGames(state) {
    state.games.flashcards.show = false;
    state.games.matching.show = false;
    state.games.scramble.show = false;
    state.games.snake.show = false;
    state.games.typein.show = false;
  },
  showTest(state) {
    state.games.showTest = true;
  },
  hideTest(state) {
    state.games.showTest = false;
  },
  incrementAttempts(state, props) {
    if(props.game == 'matching')
      state.games.matching.done++;
    else if(props.game == 'snake')
      state.games.snake.done++;
    else if(props.game == 'flashcards')
      state.games.flashcards.done++;
    else if(props.game == 'scramble')
      state.games.scramble.done++;
    else if(props.game == 'typein')
      state.games.typein.done++;
    var games = JSON.parse(localStorage.games);
    games.map(game => {
      if (game.games.id == props.id) {
        game.games = state.games;
      }
    })
    localStorage.games = JSON.stringify(games);
  },
  gameFinished(state, props) {
    if(props.game == 'matching')
      state.games.matching.win = true
    else if(props.game == 'snake')
      state.games.snake.win = true;
    else if(props.game == 'flashcards')
      state.games.flashcards.win = true;
    else if(props.game == 'scramble')
      state.games.scramble.win = true;
    else if(props.game == 'typein')
      state.games.typein.win = true;
    var games = localStorage.games;
    var games = JSON.parse(localStorage.games);
    games.map(game => {
      if (game.games.id == props.id) {
        game.games = state.games;
      }
    })
    localStorage.games = JSON.stringify(games);
  },
  zeroAttempts(state) {
    state.games.flashcards.done = 0;
    state.games.snake.done = 0;
    state.games.scramble.done = 0;
    state.games.matching.done = 0;
    state.games.typein.done = 0;
  },
  testAvailable(state) {
    state.games.testAvailable = true;
  },
  testNotAvailable(state) {
    state.games.testAvailable = false;
    state.finishedGames = state.finishedGames.map(game => false);
    state.games.matching.win = false;
    state.games.snake.win = false;
    state.games.flashcards.win = false;
    state.games.scramble.win = false;
    state.games.typein.win = false;
  },
  requestedIsTrue(state) {
    state.user.requested = true;
  },
  userInfo(state, userInfo) {
    _.assign(state.user, userInfo);
    state.requested = true;
  }
}
