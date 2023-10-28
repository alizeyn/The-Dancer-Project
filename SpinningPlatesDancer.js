let mic;
let fft;
let len = 200;
let depth = 4;
let angle = 0;
let direction = 1;

function setup() {
  createCanvas(800, 800);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.9, 128);
  fft.setInput(mic);
}

function draw() {
  fft.analyze();
  let bass = fft.getEnergy("bass");
  let treble = fft.getEnergy("treble");
  let mid = fft.getEnergy("mid");

  let rotationSpeed = map(bass, 0, 255, 0.01, 0.2);
  let changeDirection = map(treble, 0, 255, 300, 100);

  // More intense bouncing based on mid frequencies
  let newLen = map(mid, 0, 255, 50, 800);

  if (frameCount % int(changeDirection) === 0) {
    direction *= -1;
  }

  angle += rotationSpeed * direction;

  // Dynamic background color transitions based on bass frequencies
  let colorCycle = int(bass) % 3;
  if (colorCycle === 0) {
    background(255, 0, 0); // Red
  } else if (colorCycle === 1) {
    background(0, 255, 0); // Green
  } else {
    background(0, 0, 255); // Blue
  }

  stroke(255);
  fill(255);

  translate(width / 2, height / 2);
  rotate(angle);

  drawPolygon(0, 0, 8, newLen, depth);
}

function drawPolygon(x, y, sides, len, depth) {
  beginShape();
  for (let j = 0; j < TWO_PI; j += TWO_PI / sides) {
    let x0 = x + cos(j) * len;
    let y0 = y + sin(j) * len;
    vertex(x0, y0);
    
    if (depth > 0) {
      drawPolygon(x0, y0, sides, len / 3, depth - 1);
    }
  }
  endShape(CLOSE);
}
