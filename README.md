# Street Dodger

[Heroku link][heroku]

<!-- TODO: Add heroku link -->
[heroku]:

## Minimum Viable Product

Street Dodger is a rhythm challenge game where the player must dodge incoming pedestrian traffic on the streets of NYC by pressing specific keys at the right times. Street Dodger is built using HTML5 Canvas, CSS3, and JavaScript. By the end of Week 10, this app will, at a minimum, satisfy the following criteria:

- [ ] Hosting on Heroku
- [ ] A production README, replacing this README
- [ ] A landing page with obvious, clear instructions
- [ ] Visual representation of game elements using HTML5 Canvas
- [ ] Endless side scrolling
- [ ] A player element which remains stationary on the left side of the screen
- [ ] Pedestrian elements for the player to dodge who walk from right to left
- [ ] A health bar which gets depleted by pedestrian collisions
- [ ] A timing bar on the top of the screen indicating which key to press at the right time
- [ ] A scoring system
- [ ] Sufficient art assets to represent a city sidewalk with pedestrians

## Technologies, Libraries, APIs

I plan to use HTML5 Canvas, CSS3, and JavaScript to build this app. I anticipate challenges in determining the best object inheritance patterns for this game and in translating the concept of the game into JavaScript code with objects that interact, especially as I did not get particularly far on the Asteroids project and am less familiar with canvas and rendered OOP JS games than I would like to be. I plan on overcoming that challenge by doing a significant amount of planning and experimentation at the beginning of each phase or sub-phase before I go about building anything into the final product.

## Design Docs
* [View Wireframes][views]

[views]: docs/view.md

## Implementation Timeline

### Phase 1: Project setup, game stepping, basic OOP and Canvas setup (1 day, W 6pm)

**Objective:** Functioning GameView with HTML Canvas elements on the screen. Enemy pedestrian object appear at screen right and travel toward screen left.
- [ ] Set up core game objects
  - [ ] GameView
  - [ ] DodgeWindow
  - [ ] ScrollingObject
    - [ ] Pedestrian
    - [ ] DodgeKey
    - [ ] Background
  - [ ] Util
  - [ ] Player
- [ ] Set up background wrapping
- [ ] Set up animation using requestAnimationFrame

### Phase 2: Game Logic - Collisions, pedestrian interactions, scoring, and points (1 day, R 6pm)

**Objective:** The rules of the game are up and running. Badly timed key presses, when a DodgeKey is not enough aligned with the DodgeWindow, will result in either loss of health or failure to gain points.
- [ ] Set up remaining objects
  - [ ] PointsDisplay
  - [ ] HealthBar
  - [ ] YellText
- [ ] Write collision logic for players & pedestrians.
- [ ] Write yell logic (enemies yell phrases from a collection of possible phrases)

### Phase 3: Polish and styling (1 day, F 6pm)
**Objective:** Game looks presentable. Art assets are created and included into the project.
- [ ] Implement player and pedestrian avatars
- [ ] Implement walking animation for player and pedestrians
- [ ] Create and add background art assets
- [ ] Implement better game object styling
  - [ ] Health bar
  - [ ] Points display
  - [ ] Dodge Window
  - [ ] Dodge keys

### Bonus
- [ ] Particle explosion effect for good and badly timed key presses
- [ ] Player animations for collisions and dodging
- [ ] Pedestrian animations for yelling
- [ ] Sound effects
- [ ] Music
- [ ] Steadily increasing approach speed of oncoming pedestrians
