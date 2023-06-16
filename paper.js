const paperCanvas = document.getElementById('paperCanvas');
const paperCanvasReset = document.getElementById('paperCanvasReset');
const contextPaper = paperCanvas.getContext('2d');

let isDrawing = false;
let isDrawingStarted = false;

paperCanvas.addEventListener('mousedown', startDrawingPaper);
paperCanvas.addEventListener('mousemove', drawPaper);
paperCanvas.addEventListener('mouseup', stopDrawingPaper);
paperCanvas.addEventListener('mouseout', stopDrawingPaper);

function startDrawingPaper(e) {
  isDrawing = true;
  drawPaper(e);
}

function drawPaper(e) {

  if (!isDrawing) return;
  
  contextPaper.strokeStyle = 'black';
  contextPaper.lineWidth = 2;

  // Start a new path if it's the beginning of a new drawing
  if (!isDrawingStarted) {
    contextPaper.beginPath();
    contextPaper.moveTo(e.offsetX, e.offsetY);
    isDrawingStarted = true;
  } else {
    // Draw a line from the previous position to the current position
    contextPaper.lineTo(e.offsetX, e.offsetY);
    contextPaper.stroke();
  }
}

function stopDrawingPaper() {
  isDrawing = false;
  isDrawingStarted = false;
}

// Reset the canvas
function resetCanvasPaper() {
    // Clear the entire canvas
    contextPaper.clearRect(0, 0, canvas.width, canvas.height);
    stopDrawingPaper();
}

paperCanvasReset.addEventListener("click", resetCanvasPaper);
