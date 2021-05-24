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
