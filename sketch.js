let SERVER_ADDRESS = "http://10.10.81.104/data";
let interval = 0; 

let colors = {
  bg: [0, 0, 0, 60],
  fireworks: [
      "#bcc6e6",
      "#96a8e2",
      "#bbfefe",
  ]
};

let stars = [];

let maxVx = 1;
let g = 0.04; 

let APDS9960_LEFT = 3;
let APDS9960_RIGHT = 4;

class Particle {
  constructor(x, y, color, size, vx, vy, life) {
      this.active = true;
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.color = color;
      this.size = size;
      this.defaultSize = size;
      this.life = life*1.5;
      this.defaultLife = life;
  }

  draw() {
      push();
      fill(this.color);
      drawingContext.shadowBlur = 24;
      drawingContext.shadowColor = color(this.color);
      circle(this.x, this.y, this.size);
      pop();
  }

  move() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += g;

      if (this.life <= 0) {
          this.active = false;
      }
      this.size = this.defaultSize * this.life / this.defaultLife;

      this.life -= 1;
  }
}

class FireWorkBall extends Particle {
  constructor(x, y, color, size, vx = random(-maxVx, maxVx), vy = -random((windowHeight * g) ** 0.5, (windowHeight * g * 1.5) ** 0.5)) {
      super(x, y, color, size, vx, vy, 1);
  }

  move() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += g;

      if (this.vy >= 0) {
          this.explode();
      }
  }

  explode() {
      for (let i = 0; i < 200; i++) {
          const vec = p5.Vector.random2D().mult(random(2, 5));
          const color = colors.fireworks[i % 3]; // color
          particles.push(new Particle(
              this.x,
              this.y,
              color,
              10,
              vec.x,
              vec.y,
              random(60, 100) * random(0.7, 1.3)
          ));
      }
      this.active = false;
  }
}

let particles = [];
let fireworks = [];


function parseData(res) {
  console.log("Received data:", res);
  let data = res.data;

  // Update firework colors based on the maximum color value detected
  if (data.red > data.green && data.red > data.blue) {
    // R 
    colors.fireworks = ["#fed3de", "#de8696", "#9a203d"];
  } else if (data.green > data.red && data.green > data.blue) {
    // G 
    colors.fireworks = ["#c0e891", "#008d5c", "#a0ad5d"];
  } else if (data.blue > data.red && data.blue > data.green) {
    // B 
    colors.fireworks = ["#bcc6e6", "#96a8e2", "#bbfefe"];
  }

  if (data.gesture) {
    let gesture = data.gesture;

      triggerFirework(gesture);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setInterval(requestData, interval); 
  noStroke();

  for (let i = 0; i < 200; i++) {
    let x = random(width);
    let y = random(height);
    let star_size = random(1, 3);
    stars.push(new Star(x, y, star_size));
  }// stars
}

function draw() {
  background(...colors.bg); 

  for (const particle of particles) {
    particle.draw();
    particle.move();
}
for (const firework of fireworks) {
    firework.draw();
    firework.move();
}

particles = particles.filter(p => p.active);
fireworks = fireworks.filter(f => f.active);

for (let star of stars) {
  star.twinkle();
  star.display();
}//star
}

function requestData() {
  loadJSON(SERVER_ADDRESS, parseData, function(err) {
    if (err) {
      console.error("Error loading JSON: ", err);
    }
  });
}

class Star {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.alpha = random(200, 255);
  }

  twinkle() {
    if (random(1) < 0.5) {
      this.alpha = random(200, 255);
    }
  }

  display() {
    fill(255, this.alpha);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

function triggerFirework(direction) {
  let distanceToCenter;
  if(direction === APDS9960_LEFT){
   distanceToCenter = (windowWidth * 0.25) - (windowWidth / 2);
  } 
  if(direction === APDS9960_RIGHT){
     distanceToCenter = (windowWidth * 0.75) - (windowWidth / 2);
  }
  let vx = distanceToCenter / windowWidth * maxVx * 6;

  fireworks.push(new FireWorkBall(
      windowWidth / 2,
      windowHeight,
      colors.fireworks[Math.floor(random() * colors.fireworks.length)],
      10,
      vx,
  ));
}