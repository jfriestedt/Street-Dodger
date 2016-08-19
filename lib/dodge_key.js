const ScrollingObject = require('./scrolling_object');

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
