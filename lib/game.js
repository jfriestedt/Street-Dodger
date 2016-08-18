// const Misc = require("./misc");
const Pedestrian = require("./pedestrian");
const Player = require("./player");

class Game {
  constructor () {
    this.dodgeKeys = [];
    this.pedestrians = [];
    this.players = [];

    this.addPlayer();
    this.addPedestrians();
  }

  add (object) {
    if (object instanceof Pedestrian) {
      this.pedestrians.push(object);
    } else if (object instanceof Player) {
      this.players.push(object);
    }
  }

  addPedestrians () {
    this.add(new Pedestrian({ game: this }));
  }

  addPlayer () {
    const player = new Player(this);
    this.add(player);
    return player;
  }

  allObjects () {
    return [].concat(this.dodgeKeys, this.players, this.pedestrians);
  }

  draw (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
  }

  moveObjects (delta) {
    this.allObjects().forEach((object) => {
      object.move(delta);
    });
  }

  step (delta) {
    this.moveObjects(delta);
  }
}

Game.DIM_X = 800;
Game.DIM_Y = 500;
Game.BG_COLOR = "#ccc";

// Game.prototype.draw = function (ctx) {
//   ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
//   ctx.fillStyle = Game.BG_COLOR;
//   ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
//
//   drawPlayer();
//   drawPedestrian();
//
//   colorDodgeWindow();
//   drawDodgeWindow();
//
//   drawDodgeKey();
//
//   dodgeKeyIsCollidedWithWindow();
//
//   pedestrianX += dx;
//   pedestrianY += dy;
//   dodgeKeyX += dx;
//   dodgeKeyY += dy;
//   window.requestAnimationFrame(this.draw);
// }

module.exports = Game;
