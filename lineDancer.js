let mic;
let points = [];
const numPoints = 1000;
const micThreshold = 0.01;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start();

  // Initialize points along the line
  for(let i = 0; i < numPoints; i++){
    let point = {
      pos: createVector(map(i, 0, numPoints-1, width * 0.1, width * 0.9), height / 2),
      col: color(random(255), random(255), random(255))
    };
    points.push(point);
  }
}

function draw() {
  background(0);

  // Get the volume (amplitude) from the mic input
  let micLevel = mic.getLevel();

  // If micLevel exceeds threshold, displace a random point vertically
  if(micLevel > micThreshold) {
    let randomIndex = floor(random(points.length));
    let displacement = map(micLevel, 0, 1, -200, 200);
    // Add a random direction (up or down) for the displacement
    points[randomIndex].pos.y += random() > 0.5 ? displacement : -displacement;
  }

  // Draw the points and lines
  strokeWeight(2);

  for(let i = 0; i < points.length-1; i++){
    stroke(points[i].col);
    line(points[i].pos.x, points[i].pos.y, points[i+1].pos.x, points[i+1].pos.y);

    // Slowly return points to their initial positions
    let targetY = height / 2;
    points[i].pos.y = lerp(points[i].pos.y, targetY, 0.01);
  }

  // Make sure to also update the last point
  points[points.length-1].pos.y = lerp(points[points.length-1].pos.y, height / 2, 0.01);
}

// Adjust the canvas size dynamically
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // Reset points for the new window size
  points = [];
  for(let i = 0; i < numPoints; i++){
    let point = {
      pos: createVector(map(i, 0, numPoints-1, width * 0.1, width * 0.9), height / 2),
      col: color(random(255), random(255), random(255))
    };
    points.push(point);
  }
}
