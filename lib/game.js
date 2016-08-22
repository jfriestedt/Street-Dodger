// const Misc = require("./misc");
const Pedestrian = require("./pedestrian");
const Player = require("./player");
const DodgeZone = require("./dodge_zone");
const DodgeKey = require("./dodge_key");
const ScoreCounter = require("./score_counter");
const HealthBar = require("./health_bar");
const MissZone = require("./miss_zone");
const Ground = require("./ground");
const Skyline = require("./skyline");
const Sky = require("./sky");

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
    this.skyline = [];
    this.sky = [];
    this.pedestrianSpeed = 2;
    this.levelPedestrianCount = 0;
    this.levelNumber = 1;
    this.over = false;

    this.addPlayer();
    this.addMissZone();
    this.addScoreCounter();
    this.addGround();
    this.addSkyline();
    this.addSky();
    this.addHealthBar();
    this.spawnPedestrians();
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
    } else if (object instanceof Skyline) {
      this.skyline.push(object);
    } else if (object instanceof Sky) {
      this.sky.push(object);
    }
  }

  addGround () {
    this.add(new Ground({ game: this, pos: [0, 403]}));
    this.add(new Ground({ game: this, pos: [1536, 403]}));
  }

  spawnPedestrians () {
    if (this.levelPedestrianCount > 20) {
      this.pedestrianSpeed++;
      this.levelPedestrianCount = 0;
      this.levelNumber++;
      console.log(`Level ${this.levelNumber}`);
    }
    let delay = Game.INTERVALS[Math.floor(Math.random() * 4)];
    window.setTimeout(this.addPedestrian.bind(this), delay);
    window.clearTimeout();
    this.levelPedestrianCount++;
    window.setTimeout(this.spawnPedestrians.bind(this), delay);
  }

  addPedestrian (game) {
    this.add(new Pedestrian({ game: this, speed: this.pedestrianSpeed * -1 }));
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

  addSky () {
    this.add(new Sky({ game: this, pos: [0, 0]}));
    this.add(new Sky({ game: this, pos: [832, 0]}));
  }

  addSkyline () {
    this.add(new Skyline({ game: this, pos: [0, 340]}));
    this.add(new Skyline({ game: this, pos: [832, 340]}));
  }

  allObjects () {
    return [].concat(
      this.sky,
      this.skyline,
      this.ground,
      this.dodgeKeys,
      this.players,
      this.pedestrians,
      this.dodgeZone,
      this.dodgeKeys,
      this.scoreCounter,
      this.healthBar,
      this.missZone
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

  endGame () {
    this.over = true;
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
    if (this.over) {
      console.log("game over!");
    } else {
      this.moveObjects(delta);
      this.checkCollisions();
    }
  }

  updateScore (points) {
    this.scoreCounter[0].addPoints(points);
  }
}

Game.DIM_X = 800;
Game.DIM_Y = 500;
Game.BG_COLOR = "#ccc";
Game.INTERVALS = [500, 1000, 1500, 2000];

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
