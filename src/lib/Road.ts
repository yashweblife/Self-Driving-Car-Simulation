import { Vector } from "./Vector";

export class Road {
  public pos: Vector = new Vector();
  public size: Vector = new Vector();
  public width: number = 500;
  public laneCount: number = 3;
  constructor(origin: Vector, width: number = 250) {
    this.pos = origin;
    this.width = width;
    this.size.x = this.pos.x - width / 2;
    this.size.y = this.pos.x + width / 2;
  }
  public getLaneCenter = (index: number) => {
    let laneWidth = this.width / this.laneCount;
    return (
      this.size.x +
      laneWidth / 2 +
      Math.min(index, this.laneCount - 1) * laneWidth
    );
  };
  public draw = (c: CanvasRenderingContext2D) => {
    c.lineWidth = 5;
    c.strokeStyle = "rgba(255,0,0,0.9)";
    c.beginPath();
    c.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2);
    c.fill();
    c.closePath();
    for (let i = 0; i <= this.laneCount; i++) {
      this.size.z = i / this.laneCount;
      let val = this.size.useLerp();
      if (i == 0 || i == this.laneCount) {
        c.setLineDash([]);
      } else {
        c.setLineDash([20, 20]);
      }
      c.beginPath();
      c.moveTo(val, -100000);
      c.lineTo(val, 100000);
      c.stroke();
      c.closePath();
    }
  };
}
