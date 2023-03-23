import { Car } from "./lib/Car";
import { Road } from "./lib/Road";
import { Vector } from "./lib/Vector";
import "./style.css";

const canvas = document.createElement("canvas");
document.body.append(canvas);
canvas.width = 500;
canvas.height = window.innerHeight - 4;
const ctx = canvas.getContext("2d")!;
const road = new Road(new Vector(canvas.width/2, canvas.height/2,0),500-10);
const car = new Car(road.getLaneCenter(3),200, 25, 50);
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  car.update();
  road.draw(ctx);
  car.draw(ctx);
  requestAnimationFrame(animate);
}
animate();
