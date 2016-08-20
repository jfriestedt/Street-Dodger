// const Misc = require("./misc");
const Pedestrian = require("./pedestrian");
const Player = require("./player");
const DodgeZone = require("./dodge_zone");
const DodgeKey = require("./dodge_key");
const ScoreCounter = require("./score_counter");
const HealthBar = require("./health_bar");
const MissZone = require("./miss_zone");
const Ground = require("./ground");

class Game {
  constructor () {
    this.dodgeKeys = [];
    this.pedestrians = [];
    this.players = [];
    this.dodgeZone = [];
    this.dodgeKeys = [];
    this.scoreCounter = [];
    this.healthBar = [];
    this.missZone = [];
    this.ground = [];

    this.addPlayer();
    this.addMissZone();
    this.addScoreCounter();
    this.addGround();
    this.addHealthBar();
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
    } else if (object instanceof ScoreCounter) {
      this.scoreCounter.push(object);
    } else if (object instanceof HealthBar) {
      this.healthBar.push(object);
    } else if (object instanceof MissZone) {
      this.missZone.push(object);
    } else if (object instanceof Ground) {
      this.ground.push(object);
    }
  }

  addGround () {
    this.add(new Ground({ game: this, pos: [0, 403]}));
    this.add(new Ground({ game: this, pos: [1536, 403]}));
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

  addHealthBar () {
    this.add(new HealthBar(this));
  }

  addMissZone () {
    this.add(new MissZone(this));
  }

  addScoreCounter () {
    this.add(new ScoreCounter(this));
  }

  allObjects () {
    return [].concat(
      this.dodgeKeys,
      this.players,
      this.pedestrians,
      this.dodgeZone,
      this.dodgeKeys,
      this.scoreCounter,
      this.healthBar,
      this.missZone,
      this.ground
    );
  }

  checkCollisions () {
    this.dodgeZone[0].isCollidedWithDodgeKey(this.dodgeKeys);
    this.missZone[0].isCollidedWithDodgeKey(this.dodgeKeys);
  }

  destroyDodgeKey (dodgeKeyToDestroy) {
    this.dodgeKeys.forEach((dodgeKey, index, dodgeKeys) => {
      if (dodgeKey === dodgeKeyToDestroy) {
        dodgeKeys.splice(index, 1);
      }
    });
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

  sendDamage (damage) {
    this.healthBar[0].registerDamage(damage);
  }

  step (delta) {
    this.moveObjects(delta);
    this.checkCollisions();
  }

  updateScore (points) {
    this.scoreCounter[0].addPoints(points);
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
