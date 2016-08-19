// const Misc = require("./misc");
const Pedestrian = require("./pedestrian");
const Player = require("./player");
const DodgeZone = require("./dodge_zone");
const DodgeKey = require("./dodge_key");

class Game {
  constructor () {
    this.dodgeKeys = [];
    this.pedestrians = [];
    this.players = [];
    this.dodgeZone = [];
    this.dodgeKeys = [];

    this.addPlayer();
    this.addPedestrians();
  }

  add (object) {
    if (object instanceof Pedestrian) {
      this.pedestrians.push(object);
      this.dodgeKeys.push(new DodgeKey({ game: this, pedestrian: object }));
    } else if (object instanceof Player) {
      this.players.push(object);
    } else if (object instanceof DodgeZone) {
      this.dodgeZone.push(object);
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

  addDodgeZone () {
    const dodgeZone = new DodgeZone(this);
    this.add(dodgeZone);
    return dodgeZone;
  }

  allObjects () {
    return [].concat(
      this.dodgeKeys,
      this.players,
      this.pedestrians,
      this.dodgeZone,
      this.dodgeKeys
    );
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
