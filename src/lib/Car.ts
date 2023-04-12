import { Controls } from "./Controls";
import { Sensor } from "./Sensor";
import { Line, Vector } from "./Vector";

export class Car {
  public controls: Controls = new Controls();
  public x: number = 0;
  public y: number = 0;
  public vy: number = 0;
  public vx: number = 0;
  public ax: number = 2;
  public ay: number = 2;
  public angle: number = 0;
  public friction: number = 0.05;
  public maxSpeed: number = 3;
  public sensor: Sensor = new Sensor(this);
  public polygons: Vector[] = [];
  public damaged: boolean = false;
  constructor(x: number, y: number, public w: number, public h: number) {
    this.x = x;
    this.y = y;
    this.polygons = this.createPolygon();
  }
  public draw(c: CanvasRenderingContext2D) {
    this.sensor.draw(c);
    c.beginPath();
    c.moveTo(this.polygons[0].x, this.polygons[0].y);
    for (let i = 1; i < this.polygons.length; i++) {
      c.lineTo(this.polygons[i].x, this.polygons[i].y);
    }
    c.closePath();
    if(this.damaged){
      c.fillStyle = "red"
    }else{
      c.fillStyle = "black";
    }
    c.fill();
  }
  public update = (borders: Line[]) => {
    this.accessDamage(borders);
    if(this.damaged) return
    this.sensor.update(borders);
    this.polygons = this.createPolygon();
    if (this.controls.forward) {
      this.vy += this.ay;
    }
    if (this.controls.back) {
      this.vy -= this.ay;
    }

    if (this.vy != 0) {
      const flip = this.vy > 0 ? 1 : -1;
      if (this.controls.left) {
        this.angle += 0.03 * flip;
      }
      if (this.controls.right) {
        this.angle -= 0.03 * flip;
      }
    }
    //Speed Limiter
    if (this.vy > this.maxSpeed) {
      this.vy = this.maxSpeed;
    }
    if (this.vy < -this.maxSpeed) {
      this.vy = -this.maxSpeed;
    }
    //Dampner
    if (this.vy > 0) {
      this.vy -= this.friction;
    }
    if (this.vy < 0) {
      this.vy += this.friction;
    }
    //Error Correction
    this.x -= Math.sin(this.angle) * this.vy;
    this.y -= Math.cos(this.angle) * this.vy;
  };
  public accessDamage = (borders: Line[]) => {
    this.damaged = polyIntersect(this.polygons, borders);
  };
  private createPolygon = () => {
    const points = [];
    const rad = Math.hypot(this.w, this.h) / 2;
    const alpha = Math.atan2(this.w, this.h);
    points.push(
      new Vector(
        this.x - Math.sin(this.angle - alpha) * rad,
        this.y - Math.cos(this.angle - alpha) * rad
      )
    );
    points.push(
      new Vector(
        this.x - Math.sin(this.angle + alpha) * rad,
        this.y - Math.cos(this.angle + alpha) * rad
      )
    );

    points.push(
      new Vector(
        this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
        this.y - Math.cos(Math.PI + this.angle - alpha) * rad
      )
    );
    points.push(
      new Vector(
        this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
        this.y - Math.cos(Math.PI + this.angle + alpha) * rad
      )
    );
    return points;
  };
}

function polyIntersect(p1: Vector[], l2: Line[]) {
  let l1 = [];
  for (let i = 0; i < p1.length - 1; i++) {
    l1.push(new Line(p1[i], p1[i + 1]));
  }
  for (let i = 0; i < l1.length; i++) {
    for (let j = 0; j < l2.length; j++) {
      let touch = l1[i].findIntersect(l2[j]);
      if (touch) {
        return true;
      }
    }
  }
  return false;
}
