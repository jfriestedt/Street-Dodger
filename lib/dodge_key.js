const ScrollingObject = require('./scrolling_object');

class DodgeKey extends ScrollingObject {
  constructor(options = {}) {
    let pedestrian = options.pedestrian;

    options.color = "green";
    options.pos = [pedestrian.pos[0] - 20, 50];
    options.speed = -1.5;
    options.width = 50;
    options.height = 50;
    super(options);
  }
}

module.exports = DodgeKey;
