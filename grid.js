const canvasGrid = document.getElementById("myGridCanvas");
const fireButton = document.getElementById("fireButton");
const redDotHitMiss = document.getElementById("redDotHitMiss");
const contextGrid = canvasGrid.getContext("2d");
const coordinatesDisplay = document.getElementById("coordinatesDisplay");
import { getCoordinates, subscribe } from './coordinatesState.js';


const canvasGridWidth = canvasGrid.width;
const canvasGridHeight = canvasGrid.height;

let coorArray = [];
let correctCoor = {};
let clickedCoordinates = {};

function coordinatesChangeHandler(coordinates, correctCoordinates){
    correctCoor = correctCoordinates;
    coorArray = coordinates;
    coordinateLimits();
    drawPointsOnPlane();
    drawCoordinatePlane();
    drawPointsOnPlane();
}

subscribe(coordinatesChangeHandler);

// Initialize the coordinate limits
let xMin = -10;
let xMax = 10;
let yMin = -10;
let yMax = 10;

// Function to convert x-coordinate to canvasGrid x-coordinate
function convertX(x) {
  const canvasGridX = ((x - xMin) / (xMax - xMin)) * canvasGridWidth;
  return canvasGridX;
}

// Function to convert y-coordinate to canvasGrid y-coordinate
function convertY(y) {
  const canvasGridY = canvasGridHeight - ((y - yMin) / (yMax - yMin)) * canvasGridHeight;
  return canvasGridY;
}

// Function to update the coordinate limits based on the given x and y coordinates
function updateCoordinateLimits(x, y) {
  xMin = Math.min(xMin, x - 5);
  xMax = Math.max(xMax, x + 5);
  yMin = Math.min(yMin, y - 5);
  yMax = Math.max(yMax, y + 5)
}

// Function to draw the coordinate plane
function drawCoordinatePlane() {
  // Clear the canvasGrid
  contextGrid.clearRect(0, 0, canvasGridWidth, canvasGridHeight);

  // Draw the x-axis
  const xStart = convertX(xMin);
  const xEnd = convertX(xMax);
  const xAxis = convertY(0);
  contextGrid.strokeStyle = "white";
  contextGrid.lineWidth = 2;
  contextGrid.beginPath();
  contextGrid.moveTo(xStart, xAxis);
  contextGrid.lineTo(xEnd, xAxis);
  contextGrid.stroke();

  // Draw the y-axis
  const yStart = convertY(yMax);
  const yEnd = convertY(yMin);
  const yAxis = convertX(0);
  contextGrid.beginPath();
  contextGrid.moveTo(yAxis, yStart);
  contextGrid.lineTo(yAxis, yEnd);
  contextGrid.stroke();

  // Draw the grid lines
  contextGrid.strokeStyle = "green";
  contextGrid.lineWidth = 1;

  for (let x = Math.ceil(xMin); x < xMax; x++) {
    const xCoord = convertX(x);
    contextGrid.beginPath();
    contextGrid.moveTo(xCoord, yStart);
    contextGrid.lineTo(xCoord, yEnd);
    contextGrid.stroke();
  }

  for (let y = Math.ceil(yMin); y < yMax; y++) {
    const yCoord = convertY(y);
    contextGrid.beginPath();
    contextGrid.moveTo(xStart, yCoord);
    contextGrid.lineTo(xEnd, yCoord);
    contextGrid.stroke();
  }
}

drawCoordinatePlane();

const redDots = [];

// Update the coordinate limits based on the array of coordinates
function coordinateLimits() {
  coorArray.forEach(({ x, y }) => {
    updateCoordinateLimits(x, y);
  });
}

coordinateLimits();

// Draw the points on the coordinate plane
function drawPointsOnPlane(){
    coorArray.forEach(({ x, y }) => {
    const canvasGridPointX = convertX(x);
    const canvasGridPointY = convertY(y);
    contextGrid.fillStyle = "red";
    contextGrid.beginPath();
    contextGrid.arc(canvasGridPointX, canvasGridPointY, 5, 0, 2 * Math.PI);
    contextGrid.fill();
  
    // Store the coordinates of the red dots
    redDots.push({ xCanvas: canvasGridPointX, yCanvas: canvasGridPointY, xPlane: x, yPlane: y });
  });
}

drawPointsOnPlane();

// Add click event listener to div with id of #myGridCanvas
canvasGrid.addEventListener("click", handleCanvasGridClick);

// Function to handle canvasGrid click events
function handleCanvasGridClick(event) {
  const rect = canvasGrid.getBoundingClientRect();
  const canvasGridX = event.clientX - rect.left;
  const canvasGridY = event.clientY - rect.top;

  // Define the tolerance radius for the click area
  const clickToleranceRadius = 7; 

  // Check if the click falls within the vicinity of any red dot
  const clickedDot = redDots.find(({ xCanvas, yCanvas }) => {
    const dx = xCanvas - canvasGridX;
    const dy = yCanvas - canvasGridY;
    const distanceSquared = dx * dx + dy * dy;
    const toleranceSquared = clickToleranceRadius * clickToleranceRadius;
    return distanceSquared <= toleranceSquared;
  });
  
  if (clickedDot) {
    // Get the plane coordinates from the clickedDot object in the redDot array
    const clickedX = clickedDot.xPlane;
    const clickedY = clickedDot.yPlane;
    clickedCoordinates = {x:clickedX, y:clickedY}

    // Display the clicked coordinates in the div
    coordinatesDisplay.textContent = `Coordinates: (${clickedX}, ${clickedY})`;
  }
}

//Function to handler the fire button click event
function fireButtonHandler() {
  if(clickedCoordinates.x === correctCoor.x && clickedCoordinates.y === correctCoor.y){
    redDotHitMiss.textContent = "Hit!";
  } else {
    redDotHitMiss.textContent = "Miss!";
  }
}

fireButton.addEventListener("click", fireButtonHandler);




