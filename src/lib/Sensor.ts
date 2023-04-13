import { Car } from "./Car";
import { lerp, Line, Vector } from "./Vector";

export class Sensor {
  public rayCount: number = 30;
  public rayLength: number = 300;
  public raySpread: number = Math.PI /2;
  public rays: Line[] = [];
  public intersections: (Vector | null)[] = [];
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
      this.rays.push(new Line(start, end));
    }
  }
  public checkIntersection = (ray: Line, borders: Line[], traffic:Car[]): Vector | null => {
    let touches = [];
    for (let i = 0; i < borders.length; i++) {
      const touch = ray.findIntersect(borders[i]);
      if (touch) {
        touches.push(touch);
      }
    }
    for(let i=0;i<traffic.length;i++){
      const poly = traffic[i].polygons;
      const lines = []
      for(let j=0;j<poly.length-1;j++){
        lines.push(
          new Line(poly[j], poly[j+1])
        )
      }
      lines.forEach((l:Line)=>{
        const touch = ray.findIntersect(l);
        if(touch){
          touches.push(touch)
        }
      })
    }
    if (touches.length == 0) {
      return null;
    } else {
      let offsets = touches.map((val: Vector) => val.z);
      const minOffset = Math.min(...offsets);
      let output = touches.find((val) => val.z == minOffset);
      if (output) {
        return output;
      }
      return null;
    }
  };
  public update = (borders: Line[] | null, traffic: Car[]) => {
    this.castRays();
    this.intersections = [];
    if (borders) {
      this.rays.forEach((ray: Line) => {
        this.intersections.push(this.checkIntersection(ray, borders, traffic));
      });
    }
  };
  private castRays = () => {
    this.rays = [];
    for (let i = 0; i < this.rayCount; i++) {
      const angle =
        lerp(this.raySpread / 2, -this.raySpread / 2, i / (this.rayCount - 1)) +
        this.car.angle;
      const start = new Vector(this.car.x, this.car.y);
      const end = new Vector(
        this.car.x - Math.sin(angle) * this.rayLength,
        this.car.y - Math.cos(angle) * this.rayLength
      );
      this.rays.push(new Line(start, end));
    }
  };
  public draw = (c: CanvasRenderingContext2D) => {
    for (let i = 0; i < this.rays.length; i++) {
      let r = this.rays[i];
      let end = r.end;
      if (this.intersections[i]) {
        end = this.intersections[i] as Vector;
      }
      c.lineWidth = 2;
      c.strokeStyle = "rgba(255,255,100,1)";
      c.beginPath();
      c.moveTo(r.start.x, r.start.y);
      c.lineTo(end.x, end.y);
      c.stroke();
      c.closePath();

      c.strokeStyle = "rgba(0,0,0,0.3)";
      c.beginPath();
      c.moveTo(end.x, end.y);
      c.lineTo(r.end.x, r.end.y);
      c.stroke();
      c.closePath();
    }
  };
}
