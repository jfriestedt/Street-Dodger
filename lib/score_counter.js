class ScoreCounter {
  constructor (game) {
    this.scoreCount = 0;
    this.game = game;
  }

  addPoints (points) {
    this.scoreCount += points;
  }

  draw (ctx) {
    ctx.font = '20pt arcade';
    ctx.textAlign = 'right';
    ctx.fillStyle = "#fc2d1c";
    ctx.fillText(this.scoreCount, 790, 40);
  }

  move () {
  }
}

module.exports = ScoreCounter;
