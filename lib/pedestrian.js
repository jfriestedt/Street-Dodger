const ScrollingObject = require('./scrolling_object');

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
