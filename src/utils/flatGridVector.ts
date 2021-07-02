export type FlatGridVector = number;
export function flattenVector(inVec: Vector): FlatGridVector {
  return Math.round(inVec.X + 1) + Math.round(inVec.Y + 1) * 28;
}
export function expandVector(inVec: FlatGridVector): Vector {
  const X = math.floor(inVec / 28);
  const Y = math.floor(inVec - X * 28);
  return Vector(X - 1, Y - 1);
}
export function shiftFlat(
  inVec: FlatGridVector,
  deltaX: int,
  deltaY: int,
): FlatGridVector {
  return inVec + Math.round(deltaX) + Math.round(deltaY * 28);
}
