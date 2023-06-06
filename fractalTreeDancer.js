let mic;
let fft;
let bgColor;
let lineColor;

function setup() {
  createCanvas(800, 800);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  angleMode(DEGREES);
  bgColor = color(64, 224, 208);
  lineColor = color(255);
}

function draw() {
  let vol = mic.getLevel();
  let baseBranchLen = map(vol, 0, 1, 20, 200) * 5;
  let spectrum = fft.analyze();
  let centroid = fft.getCentroid();

  if(centroid < 2000) { // Increased from 1000 to 2000
    bgColor = color(0, 71, 171); // Cobalt blue
  } else {
    bgColor = color(64, 224, 208); // Turquoise
  }

  if(centroid > 3000) { // Decreased from 5000 to 3000
    lineColor = color(255, 0, 0); // Solid red
  } else {
    lineColor = color(255); // White
  }

  background(bgColor);
  stroke(lineColor);
  strokeWeight(2);

  let angle = map(centroid, 0, width / 2, 0, 90);

  translate(width / 2, height / 2);

  for(let i = 0; i < 7; i++) {
    push();
    rotate(i * 360 / 7);
    branch(baseBranchLen, angle);
    pop();
  }

  for(let i = 0; i < 7; i++) {
    push();
    rotate(i * 360 / 7);
    branch(baseBranchLen * 0.25, angle);
    pop();
  }
}

function branch(len, angle) {
  line(0, 0, 0, -len);
  if(len < 2) {
    return;
  } else {
    push();
    translate(0, -len);
    rotate(angle);
    branch(len * 0.67, angle);
    pop();

    push();
    translate(0, -len);
    rotate(-angle);
    branch(len * 0.67, angle);
    pop();
  }
}
