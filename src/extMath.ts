/**
 * Simple in-place shuffle algorithm.
 * @param array The array to be shuffled.
 */
export function shuffleArray<Type>(array: Type[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function lerp(a: number, b: number, pos: float): number {
  return a + (b - a) * pos;
}

export function tanh(x: number): number {
  return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
}

export function randomInt(rand: RNG, min: int, max: int): int {
  return Math.floor(rand.RandomFloat() * (max - min + 1)) + min;
}

/** Rounds in such a way as to approximate non-integer values over many calls.
 * Functions by randomly rounding up or down with a probability equal to the trailing decimal.
 * Only supports positive numbers.
 */
export function randRound(num: float, rand: RNG): int {
  const trailing = num - math.floor(num);
  if (rand.RandomFloat() < trailing) {
    return math.ceil(num);
  }
  return math.floor(num);
}

export function randomSign(rand: RNG): int {
  if (rand.RandomFloat() < 0.5) {
    return -1;
  }
  return 1;
}

export function randomOnCircle(rand: RNG, radius: float = 1): Vector {
  const theta = math.pi * 2 * rand.RandomFloat();

  return Vector(Math.cos(theta) * radius, Math.sin(theta) * radius);
}

/*
export function numberOfSetBits(i: int): int {
  i -= (i >>> 1) & 0x55555555; // add pairs of bits
  i = (i & 0x33333333) + ((i >>> 2) & 0x33333333); // quads
  i = (i + (i >>> 4)) & 0x0f0f0f0f; // groups of 8
  return (i * 0x0101010101010101) >>> 56; // horizontal sum of bytes
} */

export function numberOfSetBits(value: int): int {
  let count: int = 0;
  while (value > 0) {
    // until all bits are zero
    if ((value & 1) === 1)
      // check lower bit
      count++;
    value >>>= 1; // shift bits, removing lower bit
  }
  return count;
}

export function sign(n: float): int {
  if (n > 0) {
    return 1;
  }
  if (n < 0) {
    return -1;
  }
  return 0;
}

export function parseInt(val: string): int {
  let out = 0;

  let signMul = 1;
  if (val.charAt(0) === "-") {
    signMul = -1;
  }

  for (let i = signMul === 1 ? 0 : 1; i < val.length; i++) {
    out +=
      parseIntChar(val.charAt(i)) *
      10 ** (val.length - i - (signMul === 1 ? 1 : 0));
  }

  return out * signMul;
}

export function parseIntChar(char: string): int {
  switch (char) {
    default:
    case "0":
      return 0;
    case "1":
      return 1;
    case "2":
      return 2;
    case "3":
      return 3;
    case "4":
      return 4;
    case "5":
      return 5;
    case "6":
      return 6;
    case "7":
      return 7;
    case "8":
      return 8;
    case "9":
      return 9;
  }
}

/** Convert a `Vector` to the nearest of `(1,0)`,`(-1,0)`,`(0,1)`,`(0,-1)` */
export function cardinalized(inVec: Vector): Vector {
  if (Math.abs(inVec.X) > Math.abs(inVec.Y)) {
    return Vector(1 * sign(inVec.X), 0);
  }
  return Vector(0, 1 * sign(inVec.Y));
}

/** Convert a `Vector` to the nearest `Direction` */
export function cardinalizedDirection(inVec: Vector): Direction {
  if (Math.abs(inVec.X) > Math.abs(inVec.Y)) {
    if (inVec.X > 0) {
      return Direction.RIGHT;
    }
    return Direction.LEFT;
  }

  if (inVec.Y > 0) {
    return Direction.DOWN;
  }
  return Direction.UP;
}
