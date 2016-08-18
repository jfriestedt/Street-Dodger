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
	
	class Game {
	  constructor () {
	    this.dodgeKeys = [];
	    this.pedestrians = [];
	
	    this.addPedestrians();
	  }
	
	  add (object) {
	    if (object instanceof Pedestrian) {
	      this.pedestrians.push(object);
	    }
	  }
	
	  addPedestrians () {
	    this.add(new Pedestrian({ game: this }));
	  }
	
	  allObjects () {
	    return [].concat(this.dodgeKeys, this.pedestrians);
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const ScrollingObject = __webpack_require__(4);
	
	const DEFAULTS =  {
	  COLOR: "red",
	  SPEED: 4
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
	  }
	
	  bindKeyHandlers () {
	    document.addEventListener("keydown", this.keyDownHandler, false);
	    document.addEventListener("keyup", this.keyUpHandler, false);
	  }
	
	  keyDownHandler (e) {
	    switch (e.keyCode) {
	      case 81:
	        GameView.keyPresses["qPressed"] = true;
	        break;
	      case 87:
	        GameView.keyPresses["wPressed"] = true;
	        break;
	      case 69:
	        GameView.keyPresses["ePressed"] = true;
	        break;
	      case 82:
	        GameView.keyPresses["rPressed"] = true;
	        break;
	    }
	  }
	
	  keyUpHandler (e) {
	    switch (e.keyCode) {
	      case 81:
	        GameView.keyPresses["qPressed"] = false;
	        break;
	      case 87:
	        GameView.keyPresses["wPressed"] = false;
	        break;
	      case 69:
	        GameView.keyPresses["ePressed"] = false;
	        break;
	      case 82:
	        GameView.keyPresses["rPressed"] = false;
	        break;
	    }
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
	}
	
	GameView.keyPresses = {
	  qPressed: false,
	  wPressed: false,
	  ePressed: false,
	  rPressed: false
	};
	
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
	
	  move(timeDelta) {
	    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
	
	    this.pos = [this.pos[0] + this.speed, this.pos[1]];
	    console.log(this.pos);
	  }
	}
	
	const NORMAL_FRAME_TIME_DELTA = 1000/60;
	
	module.exports = ScrollingObject;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map