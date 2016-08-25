class LevelBanner {
  constructor (game) {
    this.game = game;
    this.message = `LEVEL ${this.game.levelNumber}`;
    this.pos = [2000, 100];
    this.width = 200;
    this.height = 70;
  }

  move () {
    this.pos[0] -= (this.game.pedestrianSpeed);
  }

  removeSelfIfOffscreen () {
    if (this.pos[0] < -800) {
      this.game.removeLevelBanner();
    }
  }

  draw (ctx) {
    this.removeSelfIfOffscreen();

    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], this.width, this.height);
    ctx.fillStyle = "#444";
    ctx.fill();

    ctx.font = "25px arcade";
    ctx.textAlign = 'center';
    ctx.fillStyle = "white";
    ctx.fillText(this.message, this.pos[0] + 100, this.pos[1] + 40);

    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
  }
}

module.exports = LevelBanner;
