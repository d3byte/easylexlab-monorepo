export default {
   userToken(state) {
     return state.token
   },
   loginState(state) {
     return state.logged
   },
   currentGroup(state) {
     return state.currentGroup
   },
   user(state) {
     return state.user
   },
   showTest(state) {
     return state.games.showTest
   },
   games(state) {
     return state.games
   },
   attempts(state) {
     return state.games.attempts
   },
   finishedGames(state) {
     var gamesConditions = [];
      gamesConditions.push(state.games.matching.win);
      gamesConditions.push(state.games.flashcards.win);
      gamesConditions.push(state.games.snake.win);
      gamesConditions.push(state.games.scramble.win);
     return gamesConditions
   },
   testAvailable(state) {
     return state.games.testAvailable
   },
   requested(state) {
     return state.requested
   }
}
