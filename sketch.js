let SERVER_ADDRESS = "http://192.168.1.174/data";
let interval = 5000; // 请求数据的时间间隔（毫秒）

let colors = {
  bg: [0, 0, 0, 60],
  fireworks: [
      "#bcc6e6",
      "#96a8e2",
      "#bbfefe",
  ]
};

let maxVx = 1;
let g = 0.04;

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
          const color = colors.fireworks[i % 3]; // 交替选择两种颜色
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

  // 根据检测到的最大颜色值更新烟花颜色
  if (data.red > data.green && data.red > data.blue) {
    // R 最大
    colors.fireworks = ["#fed3de", "#de8696", "#9a203d"];
  } else if (data.green > data.red && data.green > data.blue) {
    // G 最大
    colors.fireworks = ["#c0e891", "#008d5c", "#a0ad5d"];
  } else if (data.blue > data.red && data.blue > data.green) {
    // B 最大
    colors.fireworks = ["#bcc6e6", "#96a8e2", "#bbfefe"];
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setInterval(requestData, interval); // 每隔一定时间请求数据
}

function draw() {
  background(0,0,0,60); // 使用固定的黑色背景

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
}

function requestData() {
  loadJSON(SERVER_ADDRESS, parseData, function(err) {
    if (err) {
      console.error("Error loading JSON: ", err);
    }
  });
}

function mousePressed() {
  let distanceToCenter = mouseX - windowWidth / 2;
  let vx = distanceToCenter / windowWidth * maxVx * 6;

  fireworks.push(new FireWorkBall(
      windowWidth / 2,
      windowHeight,
      colors.fireworks[Math.floor(random() * colors.fireworks.length)],
      10,
      vx,
  ));
}