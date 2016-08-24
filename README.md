# Street Dodger

Street Dodger is an arcade-style timing game built with HTML5 Canvas and JavaScript, inspired by games like Pa-Rappa the Rapper and Guitar Hero.

Live link:
https://jfriestedt.github.io/Street-Dodger/

## Overview

The object of Street Dodger is last as long as you can scoring points by dodging oncoming pedestrians on the sidewalk. Pedestrians are paired with "dodge keys" which, if pressed at the right time, will allow your player to dodge the pedestrian.

![overview]

## Points & Scoring

Successful dodges are scored by calculating the amount of overlap between the "dodge zone" and its overlapping dodge key. A point value is assigned and added to the upper-right score display, and a message is flashed based on your accuracy.

![points]

## Patience

The game ends when the player's patience runs out. Patience is lost when a dodge key is missed, an incorrect key is pressed, or a key is pressed when there is no dodge key present in the dodge zone.

![damage]

## Levels

Levels increment indefinitely over the course of a game. Each levels brings faster pedestrians who spawn at a faster rate.

![levels]

[overview]: ./docs/images/overview.png
[damage]: ./docs/images/Damage.gif
[points]: ./docs/images/Points.gif
[levels]: ./docs/images/Levels.gif
