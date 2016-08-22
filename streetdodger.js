const Game = require("./lib/game");
const LandingPage = require("./lib/landing_page");

window.Game = Game;
window.Pedestrian = require('./lib/pedestrian');

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("sdCanvas");
  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;

  const ctx = canvas.getContext("2d");
  const game = new Game();

  new LandingPage(game, ctx).display();
});
