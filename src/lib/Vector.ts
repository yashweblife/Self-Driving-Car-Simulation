export class Vector {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public z: number = 0
  ) {}
  public add = (v: Vector) => {
    this.x += v.x;
    this.y += v.x;
    this.z += v.x;
  };
  public subtract = (v: Vector) => {
    this.x -= v.x;
    this.y -= v.x;
    this.z -= v.x;
  };
  public multiply = (v: Vector) => {
    this.x *= v.x;
    this.y *= v.x;
    this.z *= v.x;
  };
  public divide = (v: Vector) => {
    this.x /= v.x;
    this.y /= v.x;
    this.z /= v.x;
  };
  public lerp = (v: Vector, t: number) => {
    const x = this.x + (v.x - this.x) * t;
    const y = this.y + (v.y - this.y) * t;
    const z = this.z + (v.z - this.z) * t;
    return new Vector(x, y, z);
  };
  public useLerp = () => {
    return this.x + (this.y - this.x) * this.z;
  };
}
export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
export class Line {
  public points: boolean = false;
  constructor(public start: Vector, public end: Vector) {}
  public findIntersect = (l: Line) => {
    const tTop =
      (l.end.x - l.start.x) * (this.start.y - l.start.y) -
      (l.end.y - l.start.y) * (this.start.x - l.start.x);
    const uTop =
      (l.start.y - this.start.y) * (this.start.x - this.end.x) -
      (l.start.x - this.start.x) * (this.start.y - this.end.y);
    const bottom =
      (l.end.y - l.start.y) * (this.end.x - this.start.x) -
      (l.end.x - l.start.x) * (this.end.y - this.start.y);
    if (bottom != 0) {
      const t = tTop / bottom;
      const u = uTop / bottom;
      if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        return new Vector(
          lerp(this.start.x, this.end.x, t),
          lerp(this.start.y, this.end.y, t),
          t
        );
      }
    }
    return null;
  };
}
