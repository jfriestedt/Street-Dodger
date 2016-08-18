const Game = require("./lib/game");
const GameView = require("./lib/game_view");

window.Game = Game;
window.Pedestrian = require('./lib/pedestrian');

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("sdCanvas");
  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;

  const ctx = canvas.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();
});
