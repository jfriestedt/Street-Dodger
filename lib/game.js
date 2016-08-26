const DodgeKey = require("./dodge_key");
const DodgeZone = require("./dodge_zone");
const GameOver = require("./game_over");
const Ground = require("./ground");
const HealthBar = require("./health_bar");
const HitOverlay = require("./hit_overlay");
const LevelBanner = require("./level_banner");
const Message = require("./message");
const MissZone = require("./miss_zone");
const Particle = require("./particle");
const Pedestrian = require("./pedestrian");
const Player = require("./player");
const ScoreCounter = require("./score_counter");
const Sky = require("./sky");
const Skyline = require("./skyline");

class Game {
  constructor () {
    this.dodgeKeys = [];
    this.pedestrians = [];
    this.players = [];
    this.dodgeZone = [];
    this.dodgeKeys = [];
    this.scoreCounter = [];
    this.healthBar = [];
    this.hitOverlay = [];
    this.levelBanners = [];
    this.message = [];
    this.missZone = [];
    this.ground = [];
    this.particles = [];
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
    } else if (object instanceof HitOverlay) {
      this.hitOverlay.push(object);
    } else if (object instanceof Message) {
      this.message.push(object);
    } else if (object instanceof LevelBanner) {
      this.levelBanners.push(object);
    } else if (object instanceof Particle) {
      this.particles.push(object);
    }
  }

  addDodgeZone () {
    const dodgeZone = new DodgeZone(this);
    this.add(dodgeZone);
    return dodgeZone;
  }

  addGround () {
    this.add(new Ground({ game: this, pos: [0, 387]}));
    this.add(new Ground({ game: this, pos: [1536, 387]}));
  }

  addHealthBar () {
    this.add(new HealthBar(this));
  }

  addHitOverlay () {
    this.add(new HitOverlay(this));
    window.setTimeout(this.removeHitOverlay.bind(this), 70);
  }

  addLevelBanner () {
    this.add(new LevelBanner(this));
  }

  addMessage (message) {
    window.clearTimeout(this.messageTimeout);
    this.add(new Message(message, this));
    this.messageTimeout = window.setTimeout(this.removeMessage.bind(this), 500);
  }

  addMissZone () {
    this.add(new MissZone(this));
  }

  addParticles () {
    window.clearTimeout(this.particlesTimeout);
    let particles = 0;

    while (particles < 50) {
      this.add(new Particle(this));
      particles ++;
    }

    this.particlesTimeout = setTimeout(this.removeParticles.bind(this), 1000);
  }

  addPedestrian (game) {
    this.add(new Pedestrian({ game: this, speed: this.pedestrianSpeed * -1 }));
  }

  addPlayer () {
    const player = new Player(this);
    this.add(player);
    return player;
  }

  addScoreCounter () {
    this.add(new ScoreCounter(this));
  }

  addSky () {
    this.add(new Sky({ game: this, pos: [0, 0]}));
    this.add(new Sky({ game: this, pos: [832, 0]}));
  }

  addSkyline () {
    this.add(new Skyline({ game: this, pos: [0, 300]}));
    this.add(new Skyline({ game: this, pos: [1664, 300]}));
  }

  allObjects () {
    return [].concat(
      this.sky,
      this.skyline,
      this.ground,
      this.levelBanners,
      this.dodgeKeys,
      this.pedestrians,
      this.players,
      this.particles,
      this.dodgeZone,
      this.dodgeKeys,
      this.scoreCounter,
      this.healthBar,
      this.missZone,
      this.message,
      this.hitOverlay
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

    if (this.over) {
      let newGame = new Game();
      new GameOver(newGame).display();
    } else {
      this.allObjects().forEach((object) => {
        object.draw(ctx);
      });
    }
  }

  endGame () {
    this.over = true;
  }

  moveObjects (delta) {
    this.allObjects().forEach((object) => {
      object.move(delta);
    });
  }

  removeHitOverlay () {
    this.hitOverlay = [];
  }

  removeMessage () {
    this.message.shift();
  }

  removeLevelBanner () {
    this.levelBanners.shift();
  }

  removeParticles () {
    this.particles = [];
  }

  spawnPedestrians () {
    let levelTransition = false;

    if (this.levelPedestrianCount > 20) {
      this.pedestrianSpeed++;
      this.levelPedestrianCount = 0;
      this.levelNumber++;
      levelTransition = true;
      this.addLevelBanner();
    }

    let delay;
    if (levelTransition) {
      delay = 10000 - (this.pedestrianSpeed * 300);
    } else {
      delay = (
        Game.INTERVALS[Math.floor(Math.random() * 4)]
      ) / this.pedestrianSpeed;
    }

    window.setTimeout(this.addPedestrian.bind(this), delay);
    window.clearTimeout();
    this.levelPedestrianCount++;
    if (!this.over) {
      window.setTimeout(this.spawnPedestrians.bind(this), delay);
    }
  }

  sendDamage (damage) {
    this.healthBar[0].registerDamage(damage);
    this.addHitOverlay();
  }

  step (delta) {
    if (!this.over) {
      this.moveObjects(delta);
      this.checkCollisions();
    }
  }

  updateScore (points, message) {
    this.addMessage(message);
    this.addParticles();
    this.scoreCounter[0].addPoints(points);
  }
}

Game.DIM_X = 800;
Game.DIM_Y = 500;
Game.BG_COLOR = "#ccc";
Game.INTERVALS = [1500, 2500, 3500, 4500];

module.exports = Game;
