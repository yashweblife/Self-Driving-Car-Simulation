import { Car } from "./Car";
import { lerp, Line, Vector } from "./Vector";

export class Sensor {
  public rayCount: number = 4;
  public rayLength: number = 100;
  public raySpread: number = Math.PI / 4;
  public rays: any[] = [];
  constructor(public car: Car) {
    for (let i = 0; i < this.rayCount; i++) {
      const angle = lerp(
        this.raySpread / 2,
        -this.raySpread / 2,
        i / (this.rayCount - 1)
      );
      const start = new Vector(this.car.x, this.car.y);
      const end = new Vector(
        this.car.x - Math.sin(angle) * this.rayLength,
        this.car.y - Math.cos(angle) * this.rayLength
      );
      this.rays.push(new Line(start,end));
    }
  }
  public draw = (c:CanvasRenderingContext2D)=>{
    this.rays.forEach((r)=>{
        c.lineWidth=2;
        c.strokeStyle="red",
        c.beginPath()
        c.moveTo(r.start.x, r.start.y)
        c.lineTo(r.end.x, r.end.y);
        c.stroke();
        c.closePath();
    })
  }
}
