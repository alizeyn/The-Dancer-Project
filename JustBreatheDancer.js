let noiseScale = 0.02;
let mic, fft;

function setup() {
  createCanvas(1000, 800);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.8, 16);
  fft.setInput(mic);
}

function draw() {
  background(235, 20, 50);

  fft.analyze();
  let treble = fft.getEnergy("treble");
  let mid = fft.getEnergy("mid");
  let bass = fft.getEnergy("bass");

  let noiseOffset = map(treble, 0, 255, 0, 1);
  // Increased the range for vertical movement
  let verticalMovement = map(mid, 0, 255, -100, 100);
  let horizontalMovement = map(bass, 0, 255, 0, 100);

  for (let x = 0; x < width; x++) {
    let noiseVal = noise((horizontalMovement + x) * noiseScale, verticalMovement * noiseScale);

    let r = lerp(20, 20, noiseVal);
    let g = lerp(20, 20, noiseVal);
    let b = lerp(20, 250, noiseVal);

    stroke(r, g, b);
    line(x, height / 5 + noiseVal * 4 * verticalMovement, x, height);
  }
}
