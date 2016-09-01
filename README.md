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

[overview]: ./docs/images/Overview.png
[damage]: ./docs/images/Damage.gif
[points]: ./docs/images/Points.gif
[levels]: ./docs/images/Levels.gif
[live-site]: http://jonfriestedt.com/Street-Dodger
