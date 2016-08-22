class Player {
  constructor (game) {
    this.pos = [100, 364];
    this.game = game;
    this.width = 60;
    this.height = 60;
    this.image = new Image();
    this.image.src = "lib/images/player_walking_alt.png";
    this.currentFrame = 0;
    this.frames = 7;
    this.frameOccurences = 0;
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

  move () {

  }
}

module.exports = Player;
