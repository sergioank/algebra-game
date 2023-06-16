const myEquation = document.getElementById("myEquation");
const myCoordinates = document.getElementById("myCoordinates");
const myResetButton = document.getElementById("myResetButton");
const fireButton = document.getElementById("fireButton");
const fireInstructions = document.getElementById("fireInstructions");

import { setCoordinates } from './coordinatesState.js';

let coordinates = [];
let coordinatesString = "";
let correctCoordinates = {};

let equation = "";
let x;
let y;
let m;
let b;

function equationCreator() {
  m = getRandomInt(-5, 4);
  b = getRandomInt(-15, 15);
  x = getRandomInt(-15, 15);
  if (m === 0) {
    m = getRandomInt(1, 5);
  }
  equation = `y = ${m}x + ${b}`;

  y = m * x + b;
  x = (y - b) / m;
  coordinates = [];
  const wrongCoordinates = wrongCoordinatesCreator();
  coordinates.push(...wrongCoordinates, { x: x, y: y });
  correctCoordinates = {x:x, y:y}
}

function wrongCoordinatesCreator() {
  let m = getRandomInt(-5, 4);
  const b = getRandomInt(-15, 15);
  if (m === 0) {
    m = getRandomInt(1, 5);
  }
  const wrongCoordinates = [];
  for (let i = 0; i < 2; i++) {
    let x = getRandomInt(-15, 15);
    const y = m * x + b;
    x = (y - b) / m;
    wrongCoordinates.push({ x: x, y: y });
  }
  return wrongCoordinates;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function resetButtonHandler(event) {
  equationCreator();
  const shuffledArray = shuffleArray([...coordinates]);
  coordinatesString = "";
  shuffledArray.forEach((e) => {
    coordinatesString += `(${e.x}, ${e.y})\n`;
  });
  
  setCoordinates(shuffledArray, correctCoordinates);
  myCoordinates.textContent = coordinatesString;
  myEquation.textContent = equation;
  myResetButton.textContent = "Reset";
  changeButtonColor();
}

function changeButtonColor(){
  myResetButton.classList.remove("btn-primary");
  myResetButton.classList.add("btn-success");
  fireButton.classList.add("btn", "btn-danger", "mt-2");
  fireButton.textContent = "Fire";
  fireInstructions.textContent = "Select correct coordinate and fire"
}

myResetButton.addEventListener("click", resetButtonHandler);
