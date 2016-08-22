const ScrollingObject = require('./scrolling_object');

class Pedestrian extends ScrollingObject {
  constructor(options = {}) {
    options.color = "red";
    options.pos = options.pos || [820, 364];
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
      (this.width * this.currentFrame) + 2, // source x
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
