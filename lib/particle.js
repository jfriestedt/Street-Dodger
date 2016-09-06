class Particle {
  constructor (game) {
    this.game = game;
    this.opacity = 1;
    this.pos = [170, 240];
    this.size = Particle.SIZES[
      Math.floor(Math.random() * Particle.SIZES.length)
    ];
    this.rgb = Particle.RGBS[
      Math.floor(Math.random() * Particle.RGBS.length)
    ];
    this.vector = [
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    ];
  }

  draw (ctx) {
    this.opacity -= 0.05;
    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
    ctx.fillStyle = `rgba(${this.rgb},${this.opacity})`;
    ctx.fill();
    ctx.closePath();
  }

  move () {
    this.pos[0] += 6 * this.vector[0];
    this.pos[1] += 6 * this.vector[1];
  }
}

Particle.RGBS = [
  `150,186,180`,
  `126,130,249`,
  `13,141,255`
];

Particle.SIZES = [[1, 1], [7, 7], [5, 5], [3, 3]];

module.exports = Particle;
