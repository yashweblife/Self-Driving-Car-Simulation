import { Car } from "./lib/Car";
import "./style.css";

const canvas = document.createElement("canvas")
document.body.append(canvas);
canvas.width=500;
canvas.height=window.innerHeight-4;
const ctx = canvas.getContext('2d')!;


const car = new Car(canvas.width/2,canvas.height-100,25,50);
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  car.update();  
  car.draw(ctx);
  requestAnimationFrame(animate);
}
animate();