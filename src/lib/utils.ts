import { Line, Vector } from "./Vector";

export function polyIntersect(p1: Vector[], l2: Line[]) {
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
export function polyPolyIntersect(p1: Vector[], p2: Vector[]) {
  let l1 = [];
  let l2 = [];
  for (let i = 0; i < p1.length - 1; i++) {
    l1.push(new Line(p1[i], p1[i + 1]));
  }
  for (let i = 0; i < p2.length - 1; i++) {
    l2.push(new Line(p2[i], p2[i + 1]));
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
