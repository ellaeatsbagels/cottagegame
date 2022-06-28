var myGamePiece;
var myObstacles = [];
var myMusic;
var mySound;
var score = 0;
var step1;
var step2;
var currentStep =  myGamePiece;
var myAudio;
var myAudio2;
function startGame() {
    myGamePiece = new component(60, 100, "images/greg.png", 30,30);
  myAudio = document.createElement("audio");
  myAudio.src = "music/music.mp3";
  myAudio.play();
  myAudio2 = document.createElement("audio");
  myAudio2.src = "music/loseffect.mp3";
  myAudio3 = document.createElement("audio");
  myAudio3.src = "music/wineffect.mp3";
    myGameArea.start();
    alert("Collect 500 points to win!");
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        myBackground = new component(this.canvas.width, this.canvas.height, "images/backdrop.jpg", 0, 0);
        myBackground2 = new component(this.canvas.width, this.canvas.height, "images/backdrop.jpg", this.canvas.width, 0);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }    
}

function component(width, height, color, x, y) {
    this.image = new Image();
    this.image.src = color;
    this.width = width;
    this.height = height; 
    this.x = x;
    this.y = y; 
    this.collected = false;
    this.badThing = false;  
    this.update = function() {
        ctx = myGameArea.context;
        if (this.collected === false) {
          ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        }
    } 
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, y;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            if (myObstacles[i].badThing === true) {
              myAudio2.loop = false;
              myAudio2.play();
              myAudio.pause();
              myGameArea.stop();
               alert('Game over! Your score was: ' + score);
              
              return;
            } else {
              myObstacles[i].collected = true;
              console.log("VIDEO GAMES!");
              score++;
              if(score > 500){
                myGameArea.stop();
                myAudio3.loop = false;
                myAudio3.play();
                myAudio.pause();
                alert("YOU WON! You scored 100 points!");
              }
            }
            
        } 
    }
    myGameArea.clear();

    myBackground.update();
    myBackground2.update();
    myBackground.x--;
    myBackground2.x--;
    if (myBackground.x < -1 * myBackground.width) {
      myBackground.x = myBackground.width - 10;
    }
    if (myBackground2.x < -1 * myBackground2.width) {
      myBackground2.x = myBackground2.width - 10;
    }

    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        y = myGameArea.canvas.height * Math.random();
        let coinFlip = Math.random() * 2;
        if (coinFlip < 1) {
          myObstacles.push(new component(30, 30, "images/book.png", x, y));
          myObstacles[myObstacles.length - 1].badThing = true;
        } else { 
          myObstacles.push(new component(30, 30, "images/controller.png", x, y));
        }
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }  
    myGamePiece.update();
      drawScore();
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}
function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function moveup() {
    myGamePiece.y -= 3; 
}

function movedown() {
    myGamePiece.y += 3; 
}

function moveleft() {
    myGamePiece.x -= 3; 
}

function moveright() {
    myGamePiece.x += 3; 
}

function keyDown(e) {
  if (e.keyCode === 37) {
    moveleft();
  } else if (e.keyCode === 38) {
    moveup();
  } else if (e.keyCode === 39) {
    moveright();
  } else if (e.keyCode === 40) {
    movedown();
  }
}
function restart(){
  startGame();
}



window.addEventListener('keydown', keyDown);
