class Player {
  constructor (game) {
    this.pos = [100, 400];
    this.game = game;
    this.width = 19;
    this.height = 20;
    this.color = "blue";
    this.image = new Image();
    this.image.src = "lib/images/player_walking.png";
    this.currentFrame = 0;
    this.frames = 23;
  }

  draw (ctx) {
    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], this.width, this.height);
    ctx.drawImage(
      this.image,                     // source image object
      this.width * this.currentFrame, // source x
      0,                              // source y
      19,                     // source width
      20,                    // source height
      this.pos[0],                    // destination x
      this.pos[1],                    // destination y
      this.width * 3,                 // destination width
      this.height * 3);               // destination height

    if (this.currentFrame === this.frames) {
      this.currentFrame = 0;
    } else {
      this.currentFrame++;
    }

    ctx.closePath();
    debugger
  }

  move () {

  }
}

module.exports = Player;
