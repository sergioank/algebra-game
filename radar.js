let canvas = document.getElementById("myRadarCanvas");
let context = canvas.getContext("2d");

let centerX = canvas.width / 2;
let centerY = canvas.height;
let angle = 0;

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  context.beginPath();
  context.moveTo(centerX, centerY); // Start at the center of the canvas

  let x = centerX + Math.sin(angle) * 450;
  let y = centerY - Math.cos(angle) * 450;

  // Draw the main line
  context.lineTo(x, y);
  context.strokeStyle = "green";
  context.lineWidth = 2;
  context.stroke();

  // Draw the delayed lines
  for (let i = 0; i < 40; i++) {
    context.beginPath();
    context.moveTo(centerX, centerY);
    let xx = centerX + Math.sin(angle - (i * Math.PI / 60)) * (400 + (i * 20));
    let yy = centerY - Math.cos(angle - (i * Math.PI / 60)) * (400 + (i * 20));
    context.lineTo(xx, yy);
    context.lineWidth = .6;
    context.strokeStyle = "rgba(255, 255, 255, " + (0.8 - i * 0.08) + ")";
    context.stroke();
  }

  // Increment the angle by 1 degree
  angle += Math.PI / 180;

  // Call the draw function again
  requestAnimationFrame(draw);
}

// Start the animation loop
draw();