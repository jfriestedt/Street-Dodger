class DamageOverlay {
  constructor (game) {
    this.game = game;
    this.pos = [0, 0];
    this.width = 800;
    this.height = 500;
    this.image = new Image();
    this.image.src = "lib/images/hit_overlay.png";
  }

  move () {}

  draw (ctx) {
    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], this.width, this.height);
    ctx.fillStyle = "rgba(255,0,0,0.5)";
    ctx.fill();
    ctx.closePath();
  }
}

module.exports = DamageOverlay;
