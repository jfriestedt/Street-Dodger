const ScrollingObject = require('./scrolling_object');

class DodgeKey extends ScrollingObject {
  constructor(options = {}) {
    let pedestrian = options.pedestrian;

    options.color = "white";
    options.pos = [pedestrian.pos[0] - 20, 250];
    options.speed = pedestrian.speed / 2;
    options.width = 50;
    options.height = 50;
    super(options);
    this.value = ['q', 'w', 'e', 'r'][Math.floor(Math.random() * 4)];
  }
}

module.exports = DodgeKey;
