const Misc = () => {
  // Variable delarations & Assignments
  //
  var pedestrianX = 820;
  var pedestrianY = 400;

  var playerX = 100;
  var playerY = 400;

  var dodgeKeyX = 800;
  var dodgeKeyY = 50;

  var dodgeZoneX = 150;
  var dodgeZoneY = 50;

  var dx = -3;
  var dy = 0;



  var dodgeZoneColor = "blue";
  //

  function colorDodgeWindow () {
    for (var key in keyPresses) {
      if (keyPresses.hasOwnProperty(key)) {
        if (keyPresses[key] === true) {
          dodgeZoneColor = "yellow";
          return;
        }
      }
    }

    dodgeZoneColor = "blue";
  }
  //

  // Element Draw Logic
  //
  const walkerWidth = 30;
  const walkerHeight = 50;

  function drawPedestrian () {
    ctx.beginPath();
    ctx.rect(pedestrianX, pedestrianY, walkerWidth, walkerHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }

  function drawPlayer () {
    ctx.beginPath();
    ctx.rect(playerX, playerY, walkerWidth, walkerHeight);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
  }

  function drawDodgeKey () {
    ctx.beginPath();
    ctx.rect(dodgeKeyX, dodgeKeyY, 50, 50);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
  }

  function drawDodgeWindow () {
    ctx.beginPath();
    ctx.rect(dodgeZoneX, dodgeZoneY, 50, 50);
    ctx.strokeStyle = dodgeZoneColor;
    ctx.stroke();
    ctx.closePath();
  }
  //

  // Collision Detection
  //
  function dodgeKeyIsCollidedWithWindow () {
    if (dodgeKeyX > dodgeZoneX - 50 && dodgeKeyX < (dodgeZoneX + 50)) {
      console.log('collision!')
      return true;
    }
  }

  // Master Draw Logic
  //
  function draw () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawPedestrian();

    colorDodgeWindow();
    drawDodgeWindow();

    drawDodgeKey();

    dodgeKeyIsCollidedWithWindow();

    pedestrianX += dx;
    pedestrianY += dy;
    dodgeKeyX += dx;
    dodgeKeyY += dy;
    window.requestAnimationFrame(this.draw);
  }
  //

  // Animation
  //
  draw();
  //
};

module.exports = Misc;
