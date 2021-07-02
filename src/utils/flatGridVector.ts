export type FlatGridVector = number;
export function flattenVector(inVec: Vector): FlatGridVector {
  return Math.round(inVec.X + 2) + Math.round(inVec.Y + 2) * 32;
}
export function expandVector(inVec: FlatGridVector): Vector {
  const Y = math.floor(inVec / 32);
  const X = math.floor(inVec - Y * 32);

  return Vector(X - 2, Y - 2);
}
export function shiftFlat(
  inVec: FlatGridVector,
  deltaX: int,
  deltaY: int,
): FlatGridVector {
  return inVec + Math.round(deltaX) + Math.round(deltaY * 30);
}
