const ORBIT_SPEED = 5;
const ORBIT_DISTANCE = Vector(15, 0);
const ORBIT_HEIGHT = -15;

export function update(self: EntityEffect): void {
  const parent = self.Parent;
  if (parent === undefined) {
    self.Remove();
    return;
  }

  // Calculate position
  const newOffset = ORBIT_DISTANCE.Rotated(
    Isaac.GetFrameCount() * ORBIT_SPEED + self.State,
  );
  newOffset.Y /= 2;
  if (newOffset.Y > 0) {
    self.RenderZOffset = 1000;
  } else {
    self.RenderZOffset = 0;
  }
  newOffset.Y += ORBIT_HEIGHT;

  self.ParentOffset = newOffset;
}
