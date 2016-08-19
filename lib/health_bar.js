class HealthBar {
  constructor (game) {
    this.game = game;
    this.health = 100;
  }

  draw (ctx) {
    ctx.beginPath();
    ctx.rect(20, 400, 30, -300);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(20, 400, 30, (this.health * 3) * -1);
    ctx.fillStyle = "purple";
    ctx.fill();
    ctx.closePath();
  }

  registerDamage (damage) {
    this.health -= damage;
  }

  move () {
  }
}

module.exports = HealthBar;
