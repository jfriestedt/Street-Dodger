class HealthBar {
  constructor (game) {
    this.game = game;
    this.health = 100;
  }

  draw (ctx) {
    ctx.beginPath();
    ctx.rect(20, 380, 30, -300);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(20, 380, 30, (this.health * 3) * -1);
    ctx.fillStyle = "purple";
    ctx.fill();
    ctx.closePath();
  }

  registerDamage (damage) {
    this.health -= damage;

    if (this.health <= 0) {
      this.health = 0;
      this.game.endGame();
    }
  }

  move () {

  }
}

module.exports = HealthBar;
