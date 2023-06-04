let mic;
let fft;

function setup() {
  createCanvas(800, 800);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  angleMode(DEGREES);
}

function draw() {
  background(64, 224, 208); // set the background to turquoise
  let vol = mic.getLevel();

  // Calculate the base branch length based on the sound volume
  let baseBranchLen = map(vol, 0, 1, 20, 200) * 5;

  // Calculate the branch angle based on the centroid of the frequency spectrum
  let spectrum = fft.analyze();
  let centroid = fft.getCentroid();
  let angle = map(centroid, 0, width / 2, 0, 90);

  // Draw seven trees equally spaced around the center of the canvas
  translate(width / 2, height / 2);
  stroke(255); // set the line color to white
  strokeWeight(2); // increase the line thickness by one level

  for(let i = 0; i < 7; i++) {
    push(); // Save the current state of transformation
    rotate(i * 360 / 7); // Rotate to draw each tree in a different direction
    branch(baseBranchLen, angle); // Draw the tree
    pop(); // Restore the state of transformation
  }

  // Draw seven smaller trees in the center
  for(let i = 0; i < 7; i++) {
    push(); // Save the current state of transformation
    rotate(i * 360 / 7); // Rotate to draw each tree in a different direction
    branch(baseBranchLen * 0.25, angle); // Draw the tree
    pop(); // Restore the state of transformation
  }
}

function branch(len, angle) {
  // Draw the branch
  line(0, 0, 0, -len);

  if(len < 2) { // decrease this value to allow more levels of recursion
    // Base case: if the branch is too short, don't draw any more branches
    return;
  } else {
    // Recursive case: draw two smaller branches at the end of this one

    // First branch
    push(); // Save the current state of transformation
    translate(0, -len); // Move to the end of the branch
    rotate(angle); // Rotate by a certain angle
    branch(len * 0.67, angle); // Draw a smaller branch
    pop(); // Restore the state of transformation

    // Second branch
    push(); // Save the current state of transformation
    translate(0, -len); // Move to the end of the branch
    rotate(-angle); // Rotate by a negative angle
    branch(len * 0.67, angle); // Draw a smaller branch
    pop(); // Restore the state of transformation
  }
}
