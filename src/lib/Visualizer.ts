import { Level, Network } from "./Network";
import { Vector } from "./Vector";
import { lerp } from "./utils";

export class Visualizer {
  public static drawNetwork(c: CanvasRenderingContext2D, net: Network) {
    const pos = new Vector(50, 50);
    const size = new Vector(c.canvas.width - 50 * 2, c.canvas.height - 50 * 2);
    const lh = size.y / net.levels.length;
    for (let i = 0; i < net.levels.length; i++) {
      const top =
        pos.x +
        lerp(
          size.y - lh,
          0,
          net.levels.length == 1 ? 0.5 : i / (net.levels.length - 1)
        );
      Visualizer.drawLevel(
        c,
        net.levels[i],
        new Vector(pos.x, top),
        new Vector(size.x, lh)
      );
    }
  }

  public static drawLevel(
    c: CanvasRenderingContext2D,
    level: Level,
    pos: Vector,
    size: Vector
  ) {
    const r = 10;
    const { inputs, outputs, weights, biases } = level;
    for (let i = 0; i < inputs.length; i++) {
      for (let j = 0; j < outputs.length; j++) {
        c.beginPath();
        c.strokeStyle = `rgba(${weights[i][j] > 0 ? 255 : 0},${
          weights[i][j] < 0 ? 255 : 0
        },0,${Math.abs(weights[i][j]) + 0.1})`;
        c.moveTo(this.getNodeX(inputs, i, pos.x, size.x), size.y);
        c.lineTo(this.getNodeX(outputs, j, pos.x, size.x), pos.y);
        c.stroke();
        c.closePath();
      }
    }

    for (let i = 0; i < inputs.length; i++) {
      const x = this.getNodeX(inputs, i, pos.x, size.x);
      c.beginPath();
      c.arc(x, size.y, r / inputs.length + r / 2, 0, Math.PI * 2);
      const alpha = Math.abs(inputs[i])+0.1;
      if (inputs[i] > 0) {
        c.fillStyle = `rgba(255,0,0,${alpha})`;
      } else {
        c.fillStyle = `rgba(0,255,0,${alpha})`;
      }
      c.fill();
      c.closePath();
    }
    for (let i = 0; i < outputs.length; i++) {
      const x = this.getNodeX(outputs, i, pos.x, size.x);
      c.beginPath();
      c.arc(x, pos.y, r + 10, 0, Math.PI * 2);
      c.fillStyle = `rgba(0,0,255,${Math.abs(biases[i])})`;
      c.fill();
      c.closePath();

      c.beginPath();
      c.arc(x, pos.y, r, 0, Math.PI * 2);
      c.fillStyle = "red";
      c.fill();
      c.closePath();
    }
  }
  public static getNodeX(nodes: number[], index: number, l: number, r: number) {
    return lerp(l, r, nodes.length == 1 ? 0.5 : index / (nodes.length - 1));
  }
}
