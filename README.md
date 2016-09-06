# Street Dodger

Street Dodger is an arcade-style timing game built with HTML5 Canvas and JavaScript, inspired by games like Pa-Rappa the Rapper and Guitar Hero.

[Live Site][live-site]

## Overview

The object of Street Dodger is last as long as you can scoring points by dodging oncoming pedestrians on the sidewalk. Pedestrians are paired with "dodge keys" which, if pressed at the right time, will allow your player to dodge the pedestrian.

![overview]

## Points & Scoring

Successful dodges are scored by calculating the amount of overlap between the blue "dodge zone" and its overlapping dodge key. A point value is assigned and added to the upper-right score display, and a message is created based on your accuracy.

This feature took a bit of tricky collision case-handling to account for which side of the dodge zone the dodge key is on when a hit is registered, but the result is what makes a game of StreetDodger scoreable and arcade-like:

```javascript
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
```

Once the point value and message have been created, they are sent to the game, which uses them to update the game's total score and display the message to the screen.

![points]

## Patience

The game ends when the player's patience runs out. Patience is lost when a dodge key is missed, an incorrect key is pressed, or a key is pressed when there is no dodge key present in the dodge zone.

![damage]

## Levels

Levels increment indefinitely over the course of a game. Each levels brings faster pedestrians who spawn at a faster rate.

![levels]

## User Feedback

All games face the task of developing a language of interaction with the user, to cue the player on whether they're playing well or poorly. To accomplish this, Street Dodger implements a few features worth highlighting:

### Particles

In addition to messages, 50 particles are generated upon a successful key press. These particles are a assigned a random vector, and a size and color sampled from constants:

```javascript
class Particle {
  constructor (game) {
    this.game = game;
    this.opacity = 1;
    this.pos = [170, 240];
    this.size = Particle.SIZES[
      Math.floor(Math.random() * Particle.SIZES.length)
    ];
    this.rgb = Particle.RGBS[
      Math.floor(Math.random() * Particle.RGBS.length)
    ];
    this.vector = [
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    ];
  }
}
```

After generation, the particles scatter and fade out with each draw call. They do this by incrementing their position according to their vector, and decrementing their opacity to give the appearance of a fade-out:

```javascript
class Particle {
  draw (ctx) {
    this.opacity -= 0.05;
    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
    ctx.fillStyle = `rgba(${this.rgb},${this.opacity})`;
    ctx.fill();
    ctx.closePath();
  }

  move () {
    this.pos[0] += 6 * this.vector[0];
    this.pos[1] += 6 * this.vector[1];
  }
}
```

### Damage Overlay

Invalid key presses or missed key presses trigger the creation of a red damage overlay which occupies the whole screen and disappears very quickly after it is created:

```javascript
class Game {
  sendDamage (damage) {
    this.healthBar[0].registerDamage(damage);
    this.addDamageOverlay();
  }

  addDamageOverlay () {
    this.add(new DamageOverlay(this));
    setTimeout(this.removeDamageOverlay.bind(this), 70);
  }
}
```

[overview]: ./docs/images/Overview.png
[damage]: ./docs/images/Damage.gif
[points]: ./docs/images/Points.gif
[levels]: ./docs/images/Levels.gif
[live-site]: http://jonfriestedt.com/Street-Dodger
