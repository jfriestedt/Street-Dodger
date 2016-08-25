/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const LandingPage = __webpack_require__(19);
	
	window.Game = Game;
	window.Pedestrian = __webpack_require__(14);
	
	document.addEventListener("DOMContentLoaded", function () {
	  const canvas = document.getElementById("sdCanvas");
	  canvas.width = Game.DIM_X;
	  canvas.height = Game.DIM_Y;
	
	  const ctx = canvas.getContext("2d");
	  const game = new Game();
	
	  new LandingPage(game, ctx).display();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const DodgeKey = __webpack_require__(2);
	const DodgeZone = __webpack_require__(4);
	const GameOver = __webpack_require__(6);
	const Ground = __webpack_require__(7);
	const HealthBar = __webpack_require__(8);
	const HitOverlay = __webpack_require__(9);
	const LevelBanner = __webpack_require__(10);
	const Message = __webpack_require__(11);
	const MissZone = __webpack_require__(12);
	const Particle = __webpack_require__(13);
	const Pedestrian = __webpack_require__(14);
	const Player = __webpack_require__(15);
	const ScoreCounter = __webpack_require__(16);
	const Sky = __webpack_require__(17);
	const Skyline = __webpack_require__(18);
	
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
	      console.log(`Level ${this.levelNumber}`);
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const ScrollingObject = __webpack_require__(3);
	
	class DodgeKey extends ScrollingObject {
	  constructor(options = {}) {
	    let pedestrian = options.pedestrian;
	
	    options.color = "white";
	    options.pos = [pedestrian.pos[0] - 20, 220];
	    options.speed = pedestrian.speed / 2;
	    options.width = 50;
	    options.height = 50;
	    super(options);
	    this.value = ['q', 'w', 'e', 'r'][Math.floor(Math.random() * 4)];
	  }
	}
	
	module.exports = DodgeKey;


/***/ },
/* 3 */
/***/ function(module, exports) {

	class ScrollingObject {
	  constructor (options) {
	    this.pos = options.pos;
	    this.speed = options.speed;
	    this.width = options.width;
	    this.height = options.height;
	    this.color = options.color;
	    this.game = options.game;
	  }
	
	  draw (ctx) {
	    let text = this.value ? this.value.toUpperCase() : "";
	
	    ctx.beginPath();
	    ctx.rect(this.pos[0], this.pos[1], this.width, this.height);
	
	    ctx.fillStyle = this.color;
	    ctx.fill();
	
	    ctx.font = "25px arcade";
	    ctx.textAlign = 'right';
	    ctx.fillStyle = "black";
	    ctx.fillText(text, this.pos[0] + 39, this.pos[1] + 37);
	
	    ctx.strokeStyle = "black";
	    ctx.stroke();
	    ctx.closePath();
	  }
	
	  move() {
	    this.pos = [this.pos[0] + this.speed, this.pos[1]];
	  }
	}
	
	const NORMAL_FRAME_TIME_DELTA = 1000/60;
	
	module.exports = ScrollingObject;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const GameView = __webpack_require__(5);
	
	class DodgeZone {
	  constructor (game) {
	    this.game = game;
	    this.pos = [150, 220];
	    this.activated = false;
	    this.collidedDodgeKey = null;
	  }
	
	  activate (key) {
	    this.activated = true;
	    this.checkHit(key);
	  }
	
	  checkHit (key) {
	    if (this.isCollidedWithDodgeKey(this.game.dodgeKeys)) {
	      if (this.collidedDodgeKey.value === key) {
	        this.scoreHit();
	        this.game.destroyDodgeKey(this.collidedDodgeKey);
	        return true;
	      } else {
	        this.game.sendDamage(10);
	        this.game.destroyDodgeKey(this.collidedDodgeKey);
	        return false;
	      }
	    } else {
	      this.game.sendDamage(5);
	      return false;
	    }
	  }
	
	  deactivate () {
	    this.activated = false;
	  }
	
	  draw (ctx) {
	    ctx.beginPath();
	    ctx.rect(this.pos[0], this.pos[1], 50, 50);
	    ctx.strokeStyle = this.strokeColor();
	    ctx.stroke();
	    ctx.closePath();
	  }
	
	  isCollidedWithDodgeKey (dodgeKeys) {
	    let collision = false;
	    let collidedDodgeKey;
	
	    dodgeKeys.forEach((dodgeKey) => {
	      if (
	        this.pos[0] + 50 > dodgeKey.pos[0] &&
	        this.pos[0] < (dodgeKey.pos[0] + 50)
	      ) {
	        collision = true;
	        this.collidedDodgeKey = dodgeKey;
	      }
	    });
	
	    if (collision) {
	      return true;
	    } else {
	      this.collidedDodgeKey = null;
	      return false;
	    }
	  }
	
	  move () {
	  }
	
	  scoreHit () {
	    let dodgeZoneMin = this.pos[0];
	    let dodgeZoneMax = this.pos[0] + 50;
	    let dodgeKeyMin = this.collidedDodgeKey.pos[0];
	    let dodgeKeyMax = this.collidedDodgeKey.pos[0] + 50;
	
	    let overlap;
	
	    if (dodgeKeyMin >= dodgeZoneMin) {
	      overlap = dodgeZoneMax - dodgeKeyMin;
	    } else {
	      overlap = dodgeKeyMax - dodgeZoneMin;
	    }
	
	    let points = overlap * 10;
	    let message;
	
	    if (points < 100) {
	      message = "LAME!";
	    } else if (points < 200) {
	      message = "OK!";
	    } else if (points < 300) {
	      message = "GOOD!";
	    } else if (points < 400) {
	      message = "GREAT!";
	    } else if (points <= 500) {
	      message = "EXCELLENT!";
	    }
	
	    this.game.updateScore(points, message);
	  }
	
	  strokeColor () {
	    if (this.activated) {
	      return "yellow";
	    } else {
	      return "blue";
	    }
	  }
	}
	
	module.exports = DodgeZone;


/***/ },
/* 5 */
/***/ function(module, exports) {

	class GameView {
	  constructor(game, ctx) {
	    this.ctx = ctx;
	    this.game = game;
	    this.dodgeZone = this.game.addDodgeZone();
	    this.keyPresses = {
	      q: false,
	      w: false,
	      e: false,
	      r: false
	    };
	  }
	
	  animate (time) {
	    const timeDelta = time - this.lastTime;
	    this.game.step(timeDelta);
	    this.game.draw(this.ctx);
	    this.lastTime = time;
	
	    if (!this.game.over) {
	      requestAnimationFrame(this.animate.bind(this));
	    }
	  }
	
	  bindKeyHandlers () {
	    document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
	    document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
	  }
	
	  keyDownHandler (e) {
	    switch (e.keyCode) {
	      case 81:
	      this.keyPresses["q"] = true;
	      this.game.players[0].dodge();
	      break;
	      case 87:
	      this.keyPresses["w"] = true;
	      this.game.players[0].dodge();
	      break;
	      case 69:
	      this.keyPresses["e"] = true;
	      this.game.players[0].dodge();
	      break;
	      case 82:
	      this.keyPresses["r"] = true;
	      this.game.players[0].dodge();
	      break;
	    }
	    this.updateDodgeZone();
	  }
	
	  keyUpHandler (e) {
	    switch (e.keyCode) {
	      case 81:
	      this.keyPresses["q"] = false;
	      break;
	      case 87:
	      this.keyPresses["w"] = false;
	      break;
	      case 69:
	      this.keyPresses["e"] = false;
	      break;
	      case 82:
	      this.keyPresses["r"] = false;
	      break;
	    }
	    this.updateDodgeZone();
	
	  }
	  start () {
	    this.bindKeyHandlers();
	    this.lastTime = 0;
	    this.game.spawnPedestrians();
	    requestAnimationFrame(this.animate.bind(this));
	  }
	
	  updateDodgeZone () {
	    let keyPressed = false;
	
	    Object.keys(this.keyPresses).forEach( (key) => {
	      if (this.keyPresses[key]) {
	        this.dodgeZone.activate(key);
	        keyPressed = true;
	      }
	    });
	
	    if (!keyPressed) { this.dodgeZone.deactivate(); }
	  }
	}
	
	module.exports = GameView;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const GameView = __webpack_require__(5);
	const Game = __webpack_require__(1);
	
	class GameOver {
	  constructor (newGame) {
	    const canvas = document.getElementById("sdCanvas");
	    this.ctx = canvas.getContext("2d");
	    this.width = 800;
	    this.height = 500;
	    this.image = new Image();
	    this.image.src = "lib/images/game_over.png";
	    this.game = newGame;
	  }
	
	  bindKeyHandlers () {
	    this.enterListener = document.addEventListener(
	      "keydown", this.keyDownHandler.bind(this), false
	    );
	  }
	
	  display () {
	    this.bindKeyHandlers();
	    setInterval(function () {this.draw(this.ctx);}.bind(this), 1);
	  }
	
	  draw (ctx) {
	    ctx.beginPath();
	    ctx.rect(0, 0, this.width, this.height);
	    ctx.drawImage(
	      this.image,
	      0,
	      0,
	      this.width,
	      this.height,
	      0,
	      0,
	      this.width,
	      this.height
	    );
	    ctx.closePath();
	  }
	
	  keyDownHandler (e) {
	    switch (e.keyCode) {
	      case 13:
	        this.startGame();
	        document.removeEventListener("keydown", this.enterListener);
	        break;
	    }
	  }
	
	  startGame () {
	    if (!this.gameView) {
	      this.gameView = new GameView(this.game, this.ctx);
	      this.gameView.start();
	    }
	  }
	}
	
	module.exports = GameOver;


/***/ },
/* 7 */
/***/ function(module, exports) {

	class Ground {
	  constructor (options) {
	    this.game = options.game;
	    this.pos = options.pos;
	    this.width = 1536;
	    this.height = 112;
	    this.image = new Image();
	    this.image.src = "lib/images/ground-alt.png";
	  }
	
	  draw (ctx) {
	    ctx.beginPath();
	    ctx.rect(this.pos[0], this.pos[1], this.width, this.height);
	    ctx.drawImage(
	      this.image,
	      0,
	      0,
	      this.width,
	      this.height,
	      this.pos[0],
	      this.pos[1],
	      this.width,
	      this.height
	    );
	    ctx.closePath();
	  }
	
	  move () {
	    this.pos = [this.pos[0] - 1.0, this.pos[1]];
	    this.wrap();
	  }
	
	  wrap () {
	    if (this.pos[0] < -1536) {
	      this.pos[0] += 3072;
	    }
	  }
	}
	
	module.exports = Ground;


/***/ },
/* 8 */
/***/ function(module, exports) {

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
	
	    ctx.font = "18px arcade";
	    ctx.textAlign = 'left';
	    ctx.fillStyle = "black";
	    ctx.fillText("PATIENCE", 20, 70);
	
	    ctx.closePath();
	
	    ctx.beginPath();
	    ctx.rect(20, 380, 30, (this.health * 3) * -1);
	    ctx.fillStyle = "rgba(255,45,28,0.8)";
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


/***/ },
/* 9 */
/***/ function(module, exports) {

	class HitOverlay {
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
	
	module.exports = HitOverlay;


/***/ },
/* 10 */
/***/ function(module, exports) {

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


/***/ },
/* 11 */
/***/ function(module, exports) {

	class Message {
	  constructor (message, game) {
	    this.game = game;
	    this.message = message;
	    this.pos = [0, 180];
	    this.width = 100;
	    this.height = 50;
	    this.transparency = 1;
	  }
	
	  move () {
	    this.pos[1] -= 1;
	  }
	
	  draw (ctx) {
	    this.transparency = this.transparency - 0.04;
	
	    ctx.beginPath();
	    ctx.rect(this.pos[0], this.pos[1], this.width, this.height);
	
	    ctx.font = "18px arcade";
	    ctx.fontStyle="bold";
	    ctx.fillStyle = `rgba(252,45,28,${this.transparency})`;
	    ctx.fillText(this.message, this.pos[0] + 150, this.pos[1] + 20);
	
	    ctx.strokeStyle = "black";
	    ctx.closePath();
	  }
	}
	
	module.exports = Message;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	const GameView = __webpack_require__(5);
	
	class MissZone {
	  constructor (game) {
	    this.game = game;
	    this.pos = [35, 220];
	    this.collidedDodgeKey = null;
	  }
	
	  draw (ctx) {
	    ctx.beginPath();
	    ctx.rect(this.pos[0], this.pos[1], 50, 50);
	    // ctx.strokeStyle = "red";
	    // ctx.stroke();
	    ctx.closePath();
	  }
	
	  isCollidedWithDodgeKey (dodgeKeys) {
	    let collision = false;
	    let collidedDodgeKey;
	
	    dodgeKeys.forEach((dodgeKey) => {
	      if (
	        this.pos[0] + 50 > dodgeKey.pos[0] &&
	        this.pos[0] < (dodgeKey.pos[0] + 50)
	      ) {
	        collision = true;
	        this.collidedDodgeKey = dodgeKey;
	      }
	    });
	
	    if (collision) {
	      this.game.destroyDodgeKey(this.collidedDodgeKey);
	      this.game.sendDamage(10);
	      return true;
	    } else {
	      this.collidedDodgeKey = null;
	      return false;
	    }
	  }
	
	  move () {
	  }
	
	}
	
	module.exports = MissZone;


/***/ },
/* 13 */
/***/ function(module, exports) {

	class Particle {
	  constructor (game) {
	    this.game = game;
	    this.pos = [170, 240];
	    this.direction = [
	      Math.random() * 2 - 1,
	      Math.random() * 2 - 1
	    ];
	    this.size = Particle.SIZES[
	      Math.floor(Math.random() * Particle.SIZES.length)
	    ];
	    this.opacity = 1;
	    this.RGBS = [
	      `150,186,180`,
	      `126,130,249`,
	      `13,141,255`
	    ];
	    // red,  blue, yellow
	    this.rgbs = this.RGBS[
	      Math.floor(Math.random() * this.RGBS.length)
	    ];
	    this.opacity = 1;
	  }
	
	  move () {
	    this.pos[0] += 6 * this.direction[0];
	    this.pos[1] += 6 * this.direction[1];
	  }
	
	  reassignColor () {
	    this.color = this.color;
	  }
	
	  draw (ctx) {
	    this.opacity -= 0.05;
	    ctx.beginPath();
	    ctx.rect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
	    ctx.fillStyle = `rgba(${this.rgbs},${this.opacity})`;
	    ctx.fill();
	    ctx.closePath();
	  }
	}
	
	Particle.SIZES = [[1, 1], [7, 7], [5, 5], [3, 3]];
	
	module.exports = Particle;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	const ScrollingObject = __webpack_require__(3);
	
	class Pedestrian extends ScrollingObject {
	  constructor(options = {}) {
	    options.color = "red";
	    options.pos = options.pos || [820, 384];
	    options.speed = options.speed;
	    options.width = 60;
	    options.height = 60;
	    super(options);
	
	    this.image = new Image();
	    this.image.src = Pedestrian.randomImage();
	    this.currentFrame = 0;
	    this.frames = 7;
	    this.frameOccurrences = 0;
	  }
	
	  draw (ctx) {
	    ctx.beginPath();
	    ctx.rect(this.pos[0], this.pos[1], this.width, this.height);
	    ctx.drawImage(
	      this.image,                     // source image object
	      (this.width * this.currentFrame) + 4, // source x
	      0,                              // source y
	      60,                             // source width
	      60,                             // source height
	      this.pos[0],                    // destination x
	      this.pos[1],                    // destination y
	      this.width,                 // destination width
	      this.height);               // destination height
	
	    if (this.currentFrame === this.frames) {
	      this.currentFrame = 0;
	    } else {
	      if (this.frameOccurrences < 3) {
	        this.frameOccurrences++;
	      } else {
	        this.frameOccurrences = 0;
	        this.currentFrame++;
	      }
	    }
	    ctx.closePath();
	  }
	}
	
	Pedestrian.randomImage = () => {
	  return [
	    "lib/images/pedestrian1_walking.png",
	    "lib/images/pedestrian2_walking.png",
	    "lib/images/pedestrian3_walking.png",
	    "lib/images/pedestrian4_walking.png",
	    "lib/images/pedestrian5_walking.png",
	  ][Math.floor(Math.random() * 5)];
	};
	
	module.exports = Pedestrian;


/***/ },
/* 15 */
/***/ function(module, exports) {

	class Player {
	  constructor (game) {
	    this.pos = [100, 384];
	    this.game = game;
	    this.width = 60;
	    this.height = 60;
	    this.image = new Image();
	    this.image.src = "lib/images/player_walking_alt.png";
	    this.currentFrame = 0;
	    this.frames = 7;
	    this.frameOccurences = 0;
	    this.dodging = false;
	  }
	
	  checkDodging () {
	    if (this.dodging === true) {
	      if (this.width < 68) {
	        this.width += 2;
	        this.height += 2;
	        this.pos[0] -= 2;
	        this.pos[1] += 2;
	      }
	    } else {
	      if (this.width > 60) {
	        this.width -= 2;
	        this.height -= 2;
	        this.pos[0] += 2;
	        this.pos[1] -= 2;
	      }
	    }
	  }
	
	  dodge () {
	    window.clearTimeout(this.timeout);
	    this.dodging = true;
	    // debugger
	    this.timeout = window.setTimeout(this.resetDodging.bind(this), 1000);
	  }
	
	  resetDodging () {
	    this.dodging = false;
	  }
	
	  draw (ctx) {
	    this.checkDodging();
	
	    ctx.beginPath();
	    ctx.rect(this.pos[0], this.pos[1], this.width, this.height);
	    ctx.drawImage(
	      this.image,                     // source image object
	      (60 * this.currentFrame) + 2, // source x
	      0,                              // source y
	      60,                             // source width
	      60,                             // source height
	      this.pos[0],                    // destination x
	      this.pos[1],                    // destination y
	      this.width,                 // destination width
	      this.height);               // destination height
	
	    if (this.currentFrame === this.frames) {
	      this.currentFrame = 0;
	    } else {
	      if (this.frameOccurrences < 3) {
	        this.frameOccurrences++;
	      } else {
	        this.frameOccurrences = 0;
	        this.currentFrame++;
	      }
	    }
	    ctx.closePath();
	  }
	
	  move () {
	
	  }
	}
	
	module.exports = Player;


/***/ },
/* 16 */
/***/ function(module, exports) {

	class ScoreCounter {
	  constructor (game) {
	    this.scoreCount = 0;
	    this.game = game;
	  }
	
	  addPoints (points) {
	    this.scoreCount += points;
	  }
	
	  draw (ctx) {
	    ctx.font = '20pt arcade';
	    ctx.textAlign = 'right';
	    ctx.fillStyle = "#fc2d1c";
	    ctx.fillText(this.scoreCount, 790, 40);
	  }
	
	  move () {
	  }
	}
	
	module.exports = ScoreCounter;


/***/ },
/* 17 */
/***/ function(module, exports) {

	class Sky {
	  constructor (options) {
	    this.game = options.game;
	    this.pos = options.pos;
	    this.width = 832;
	    this.height = 360;
	    this.image = new Image();
	    this.image.src = "lib/images/sky.png";
	  }
	
	  draw (ctx) {
	    ctx.beginPath();
	    ctx.rect(this.pos[0], this.pos[1], this.width, this.height);
	    ctx.drawImage(
	      this.image,
	      0,
	      0,
	      this.width,
	      this.height,
	      this.pos[0],
	      this.pos[1],
	      this.width,
	      this.height
	    );
	    ctx.closePath();
	  }
	
	  move () {
	    this.pos = [this.pos[0] - 0.2, this.pos[1]];
	    this.wrap();
	  }
	
	  wrap () {
	    if (this.pos[0] < -832) {
	      this.pos[0] += 1664;
	    }
	  }
	}
	
	module.exports = Sky;


/***/ },
/* 18 */
/***/ function(module, exports) {

	class Skyline {
	  constructor (options) {
	    this.game = options.game;
	    this.pos = options.pos;
	    this.width = 1664;
	    this.height = 128;
	    this.image = new Image();
	    this.image.src = "lib/images/skyline.png";
	  }
	
	  draw (ctx) {
	    ctx.beginPath();
	    ctx.rect(this.pos[0], this.pos[1], this.width, this.height);
	    ctx.drawImage(
	      this.image,
	      0,
	      0,
	      this.width,
	      this.height,
	      this.pos[0],
	      this.pos[1],
	      this.width,
	      this.height
	    );
	    ctx.closePath();
	  }
	
	  move () {
	    this.pos = [this.pos[0] - 0.5, this.pos[1]];
	    this.wrap();
	  }
	
	  wrap () {
	    if (this.pos[0] < -1664) {
	      this.pos[0] += 3328;
	    }
	  }
	}
	
	module.exports = Skyline;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	const GameView = __webpack_require__(5);
	
	class LandingPage {
	  constructor (game, ctx) {
	    this.ctx = ctx;
	    this.game = game;
	    this.width = 800;
	    this.height = 500;
	    this.image = new Image();
	    this.image.src = "lib/images/landing_page.png";
	    this.gameStarted = false;
	  }
	
	  bindKeyHandlers () {
	    document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
	  }
	
	  draw (ctx) {
	    ctx.beginPath();
	    ctx.rect(0, 0, this.width, this.height);
	    ctx.drawImage(
	      this.image,
	      0,
	      0,
	      this.width,
	      this.height,
	      0,
	      0,
	      this.width,
	      this.height
	    );
	    ctx.closePath();
	  }
	
	  display () {
	    this.bindKeyHandlers();
	    this.landingPageDisplay = setInterval(
	      function () {this.draw(this.ctx);}.bind(this), 10
	    );
	  }
	
	  keyDownHandler (e) {
	    switch (e.keyCode) {
	      case 13:
	        if (!this.isRunning) { this.startGame(); }
	        break;
	    }
	  }
	
	  startGame () {
	    if (!this.gameView) {
	      this.gameView = new GameView(this.game, this.ctx);
	      this.gameView.start();
	    }
	    window.clearInterval(this.landingPageDisplay);
	  }
	}
	
	module.exports = LandingPage;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map