import { Car } from "./lib/Car";
import { Network } from "./lib/Network";
import { Road } from "./lib/Road";
import { Vector } from "./lib/Vector";
import { Visualizer } from "./lib/Visualizer";
import "./style.css";

const canvas = document.createElement("canvas");
const networkCanvas = document.createElement("canvas");
document.body.append(canvas);
document.body.append(networkCanvas);
canvas.width = 500;
canvas.height = window.innerHeight - 4;
networkCanvas.width = 500;
networkCanvas.height = 500;
const ctx = canvas.getContext("2d")!;
const ctx1 = networkCanvas.getContext("2d")!;
const road = new Road(
  new Vector(canvas.width / 2, canvas.height / 2, 0),
  500 - 10
);
// const car = new Car(road.getLaneCenter(1), 200, 25, 50, "AI", 4);
const cars = generateCars(50);
let bestCar = cars[0];
if (localStorage.getItem("bestBrain")) {
  cars.forEach((c: Car) => {
    c.brain = JSON.parse(localStorage.getItem("bestBrain")!);
    Network.mutate(c.brain!, 0.9);
  });
}

document.querySelector("#save-button")!.addEventListener("click", () => {
  saveData();
});
document.querySelector("#delete-button")!.addEventListener("click", () => {
  discardData();
});

const traffic: Car[] = [];
for (let i = 0; i < 50; i++) {
  traffic.push(
    new Car(
      road.getLaneCenter(Math.floor(Math.random() * 4)),
      Math.random() * -3000,
      25,
      50,
      "DUMMY"
    )
  );
}
function generateCars(n: number) {
  const cars: Car[] = [];
  for (let i = 0; i < n - 1; i++) {
    cars.push(new Car(road.getLaneCenter(1), 200, 25, 50, "AI", 4));
  }
  const car = new Car(road.getLaneCenter(1), 200, 25, 50, "AI", 4);
  car.color = "blue";
  car.drawSensor = true;
  cars.push(car);
  return cars;
}
function saveData() {
  localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}
function discardData() {
  localStorage.removeItem("bestBrain");
}

function animate() {
  ctx1.fillStyle = "black";
  ctx1.fillRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bestCar = cars.find((c: Car) => c.y == Math.min(...cars.map((c) => c.y)))!;
  bestCar.color = "blue";
  bestCar.drawSensor = true;
  for (let i = 0; i < cars.length; i++) {
    cars[i].update(road.borders, traffic);
    cars[i].drawSensor = false;
  }
  bestCar = cars.find((c: Car) => c.y == Math.min(...cars.map((c) => c.y)))!;
  bestCar.color = "blue";
  bestCar.drawSensor = true;
  ctx.translate(0, -bestCar.y + canvas.height * 0.8);
  road.draw(ctx);

  traffic.forEach((c: Car) => {
    c.update(road.borders, [bestCar]);
    c.draw(ctx);
  });
  for (let i = 0; i < cars.length; i++) {
    cars[i].draw(ctx);
  }
  ctx.restore();
  Visualizer.drawNetwork(ctx1, bestCar.brain!);
  requestAnimationFrame(animate);
}
animate();
