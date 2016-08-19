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
	const GameView = __webpack_require__(3);
	
	window.Game = Game;
	window.Pedestrian = __webpack_require__(2);
	
	document.addEventListener("DOMContentLoaded", function () {
	  const canvas = document.getElementById("sdCanvas");
	  canvas.width = Game.DIM_X;
	  canvas.height = Game.DIM_Y;
	
	  const ctx = canvas.getContext("2d");
	  const game = new Game();
	  new GameView(game, ctx).start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// const Misc = require("./misc");
	const Pedestrian = __webpack_require__(2);
	const Player = __webpack_require__(5);
	const DodgeZone = __webpack_require__(6);
	const DodgeKey = __webpack_require__(7);
	
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
	
	  checkCollisions () {
	    this.dodgeZone[0].isCollidedWithDodgeKey(this.dodgeKeys);
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
	    this.checkCollisions();
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const ScrollingObject = __webpack_require__(4);
	
	const DEFAULTS =  {
	  COLOR: "red",
	};
	
	class Pedestrian extends ScrollingObject {
	  constructor(options = {}) {
	    options.color = DEFAULTS.COLOR;
	    options.pos = options.pos || [820, 400];
	    options.speed = options.speed || -3;
	    options.width = 30;
	    options.height = 50;
	    super(options);
	  }
	
	  collideWith(otherObject) {
	    console.log(`Pedestrian collided with ${otherObject}`);
	    return true;
	  }
	}
	
	module.exports = Pedestrian;


/***/ },
/* 3 */
/***/ function(module, exports) {

	class GameView {
	  constructor(game, ctx) {
	    this.ctx = ctx;
	    this.game = game;
	    this.dodgeZone = this.game.addDodgeZone();
	    this.keyPresses = {
	      qPressed: false,
	      wPressed: false,
	      ePressed: false,
	      rPressed: false
	    };
	  }
	
	  bindKeyHandlers () {
	    document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
	    document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
	  }
	
	  start () {
	    this.bindKeyHandlers();
	    this.lastTime = 0;
	    requestAnimationFrame(this.animate.bind(this));
	  }
	
	  animate (time) {
	    const timeDelta = time - this.lastTime;
	    this.game.step(timeDelta);
	    this.game.draw(this.ctx);
	    this.lastTime = time;
	
	    requestAnimationFrame(this.animate.bind(this));
	  }
	
	  updateDodgeZone () {
	    let keyPressed = false;
	
	    Object.keys(this.keyPresses).forEach( (key) => {
	      if (this.keyPresses[key]) {
	        this.dodgeZone.activate();
	        keyPressed = true;
	      }
	    });
	
	    if (!keyPressed) { this.dodgeZone.deactivate(); }
	  }
	
	  keyDownHandler (e) {
	    switch (e.keyCode) {
	      case 81:
	        this.keyPresses["qPressed"] = true;
	        break;
	      case 87:
	        this.keyPresses["wPressed"] = true;
	        break;
	      case 69:
	        this.keyPresses["ePressed"] = true;
	        break;
	      case 82:
	        this.keyPresses["rPressed"] = true;
	        break;
	    }
	    this.updateDodgeZone();
	  }
	
	  keyUpHandler (e) {
	    switch (e.keyCode) {
	      case 81:
	        this.keyPresses["qPressed"] = false;
	        break;
	      case 87:
	        this.keyPresses["wPressed"] = false;
	        break;
	      case 69:
	        this.keyPresses["ePressed"] = false;
	        break;
	      case 82:
	        this.keyPresses["rPressed"] = false;
	        break;
	    }
	    this.updateDodgeZone();
	  }
	}
	
	module.exports = GameView;


/***/ },
/* 4 */
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
	
	  collideWith (otherObject) {
	    
	  }
	
	  draw (ctx) {
	    ctx.beginPath();
	    ctx.rect(this.pos[0], this.pos[1], this.width, this.height);
	    ctx.fillStyle = this.color;
	    ctx.fill();
	    ctx.closePath();
	  }
	
	  move() {
	    this.pos = [this.pos[0] + this.speed, this.pos[1]];
	  }
	}
	
	const NORMAL_FRAME_TIME_DELTA = 1000/60;
	
	module.exports = ScrollingObject;


/***/ },
/* 5 */
/***/ function(module, exports) {

	class Player {
	  constructor (game) {
	    this.pos = [100, 400];
	    this.game = game;
	    this.width = 30;
	    this.height = 50;
	    this.color = "blue";
	  }
	
	  draw (ctx) {
	    ctx.beginPath();
	    ctx.rect(this.pos[0], this.pos[1], this.width, this.height);
	    ctx.fillStyle = this.color;
	    ctx.fill();
	    ctx.closePath();
	  }
	
	  move () {
	    
	  }
	}
	
	module.exports = Player;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const GameView = __webpack_require__(3);
	
	class DodgeZone {
	  constructor (game) {
	    this.game = game;
	    this.pos = [150, 50];
	    this.activated = false;
	  }
	
	  activate () {
	    this.activated = true;
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
	    dodgeKeys.forEach((dodgeKey) => {
	      if (
	        this.pos[0] + 50 > dodgeKey.pos[0] &&
	        this.pos[0] < (dodgeKey.pos[0] + 50)
	      ) {
	        console.log('collision!');
	        return true;
	      }
	    });
	
	  }
	
	  move () {
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const ScrollingObject = __webpack_require__(4);
	
	class DodgeKey extends ScrollingObject {
	  constructor(options = {}) {
	    let pedestrian = options.pedestrian;
	
	    options.color = "green";
	    options.pos = [pedestrian.pos[0] - 20, 50];
	    options.speed = (pedestrian.speed / 2);
	    options.width = 50;
	    options.height = 50;
	    super(options);
	  }
	
	  // isCollidedWithDodgeZone (dodgeZone) {
	  //   if (this.pos[0] > dodgeZone.pos[0] - 50 && this.pos[0] < (dodgeZone.pos[0] + 50)) {
	  //     console.log('collision!');
	  //     return true;
	  //   }
	  // }
	}
	
	module.exports = DodgeKey;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map