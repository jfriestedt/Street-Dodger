class ScoreCounter {
  constructor (game) {
    this.scoreCount = 0;
    this.game = game;
  }

  addPoints (points) {
    this.scoreCount += points;
  }

  draw (ctx) {
    ctx.font = '30pt sans-serif';
    ctx.textAlign = 'right';
    ctx.fillStyle = "black";
    ctx.fillText(this.scoreCount, 790, 40);
  }

  move () {
  }
}

module.exports = ScoreCounter;
