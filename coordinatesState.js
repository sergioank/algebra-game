const subscribers = [];
let coordinates = [];
let correctCoordinates = {};

export function getCoordinates() {
  return coordinates;
}

export function setCoordinates(newCoordinates, newCorrectCoordinates) {
  correctCoordinates = newCorrectCoordinates;
  coordinates = newCoordinates;
  notifySubscribers();
}

export function subscribe(callback) {
  subscribers.push(callback);
}

export function unsubscribe(callback) {
  const index = subscribers.indexOf(callback);
  if (index !== -1) {
    subscribers.splice(index, 1);
  }
}

function notifySubscribers() {
  subscribers.forEach((callback) => {
    callback(coordinates, correctCoordinates);
  });
}