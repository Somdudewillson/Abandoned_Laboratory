export type FlatGridVector = number;
export function flattenVector(inVec: Vector): FlatGridVector {
  return Math.round(inVec.X + 1) + Math.round(inVec.Y + 1) * 30;
}
export function expandVector(inVec: FlatGridVector): Vector {
  const Y = math.floor(inVec / 30);
  const X = math.floor(inVec - Y * 30);

  return Vector(X - 1, Y - 1);
}
export function shiftFlat(
  inVec: FlatGridVector,
  deltaX: int,
  deltaY: int,
): FlatGridVector {
  return inVec + Math.round(deltaX) + Math.round(deltaY * 30);
}
