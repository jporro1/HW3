let spriteSheet1;
let spriteSheet2;

let walkingAnimation = [];
let walkingAnimation2;
let sprites1 = 3;
let sprites2 = 2;
let sprites = sprites1 + sprites2;

function preload() {
  spriteSheet1 = loadImage("assets/SpelunkyGuy.png");
  spriteSheet2 = loadImage("assets/SpelunkyGal.png");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);

  for (let i = 0; i < sprites1; i++)
  {
    walkingAnimation[i] = new WalkingAnimation(spriteSheet1, 80, 80, Math.random()*350, Math.random()*350, 8);
  }
  for (let i = 0; i < sprites2; i++)
  {
    walkingAnimation[i+sprites1] = new WalkingAnimation(spriteSheet2, 80, 80, Math.random()*350, Math.random()*350, 8);
  }
}

function draw() {
  background(220);

  for (let i = 0; i < sprites; i++)
  {
    walkingAnimation[i].draw();
  }
}

function keyPressed() {
  for (let i = 0; i < sprites; i++)
  {
    walkingAnimation[i].keyPressed(RIGHT_ARROW, LEFT_ARROW);
  }
}

function keyReleased()
{
  for (let i = 0; i < sprites; i++)
  {
    walkingAnimation[i].keyReleased(RIGHT_ARROW, LEFT_ARROW);
  }
}

class WalkingAnimation {
  constructor(spritesheet, sw, sh, dx, dy, animationLength) {
    this.spritesheet = spritesheet;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.u = 0
    this.v = 0;
    this.animationLength = animationLength;
    this.currentFrame = 0;
    this.moving = 0;
    this.xDirection = 1;
    this.offset = 0;
  }

  draw() {
    
    //if (this.moving != 0) {
    //  this.u = currentFrame % animationLength;
    //}
    //else {
    //  this.u = 0;
    //}
    this.u = (this.moving !=0) ? this.currentFrame % this.animationLength : 0;
    push();
    translate(this.dx, this.dy);
    scale(this.xDirection, 1);
    image(this.spritesheet, 0, 0, this.sw, this.sh, this.u*this.sw+this.offset, this.v*this.sh+this.offset, this.sw, this.sh);
    pop();
    if (frameCount % 6 == 0)
    {
      this.currentFrame++;
    }
    if (this.moving)
    {
      this.dx += this.xDirection;
    }
  }
  keyPressed(right, left) {
    
  if (keyCode === right)
    {
      this.moving = 1;
      this.xDirection = 1;
      this.currentFrame = 1;
    }
  else if (keyCode === left)
    {
      this.moving = -1;
      this.xDirection = -1;
      this.currentFrame = 1;
    }
  }
  keyReleased(right, left) {
    
  if (keyCode === right || keyCode === left)
    {
      this.moving = 0;
    }
  }

}
