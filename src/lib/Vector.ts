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
