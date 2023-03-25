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
const car = new Car(road.getLaneCenter(1),200, 25, 50);
function animate() {
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  car.update(road.borders);
  ctx.translate(0, -car.y+canvas.height*0.8)
  road.draw(ctx);
  car.draw(ctx);
  ctx.restore()
  requestAnimationFrame(animate);
}
animate();
