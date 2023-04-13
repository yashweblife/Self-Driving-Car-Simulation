import { lerp } from "./utils";

export class Network {
  public levels: Level[] = [];
  constructor(nodeCounts: number[] = []) {
    for (let i = 0; i < nodeCounts.length - 1; i++) {
      this.levels.push(new Level(nodeCounts[i], nodeCounts[i + 1]));
    }
  }
  public static feedForward(inputs: number[], network: Network) {
    let output = Level.feedForward(inputs, network.levels[0]);
    for (let i = 1; i < network.levels.length; i++) {
      output = Level.feedForward(output, network.levels[i]);
    }
    return output;
  }
  public static mutate(network: Network, mag: number = 1) {
    network.levels.forEach((level: Level) => {
      level.biases.forEach((b: number) => {
        b = lerp(b, Math.random() * 2 - 1, mag);
      });
      for (let i = 0; i < level.weights.length; i++) {
        for (let j = 0; j < level.weights[i].length; j++) {
          let w = level.weights[i][j];
          level.weights[i][j] = lerp(w, Math.random() * 2 - 1, mag);
        }
      }
    });
  }
}
export class Level {
  public inputs: number[] = [];
  public outputs: number[] = [];
  public biases: number[] = [];
  public weights: number[][] = [];
  constructor(inputCount: number = 4, outputCount: number = 4) {
    this.inputs = new Array(inputCount);
    this.outputs = new Array(outputCount);
    this.biases = new Array(outputCount);

    for (let i = 0; i < inputCount; i++) {
      this.weights[i] = new Array(outputCount);
    }
    Level.randomize(this);
  }
  private static randomize(level: Level) {
    for (let i = 0; i < level.inputs.length; i++) {
      for (let j = 0; j < level.outputs.length; j++) {
        level.weights[i][j] = Math.random() * 2 - 1;
      }
    }
    for (let i = 0; i < level.biases.length; i++) {
      level.biases[i] = Math.random() * 2 - 1;
    }
  }
  public static feedForward(inputs: number[], level: Level) {
    //Initialize the level inputs
    for (let i = 0; i < level.inputs.length; i++) {
      level.inputs[i] = inputs[i];
    }
    // Calculate the outputs based on weights and inputs
    for (let i = 0; i < level.outputs.length; i++) {
      let sum = 0;
      for (let j = 0; j < level.inputs.length; j++) {
        sum += level.inputs[j] * level.weights[j][i];
      }
      if (sum > level.biases[i]) {
        level.outputs[i] = 1;
      } else {
        level.outputs[i] = 0;
      }
    }
    return level.outputs;
  }
}
