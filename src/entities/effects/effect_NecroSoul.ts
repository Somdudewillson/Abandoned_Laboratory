/** Entity Data Usage:
 * Target = Destination grave
 * MaxRadius = initial distance to grave
 * CollisionDamage = max health of the entity this soul was spawned from
 */

const enum NecroSoulAnimKey {
  IDLE = "Idle",
  PERISH = "Perish",
}

const MOVE_SPEED = 5;
const ARC_PEAK = 25;
const ABSORB_DIST = 25;

export function update(self: EntityEffect): void {
  const target = self.Target;
  if (target == null) {
    self.Remove();
    return;
  }
  const sprite = self.GetSprite();
  const curDistance = self.Position.Distance(target.Position);

  // If dying, skip everything else
  const isPerished = sprite.IsFinished(NecroSoulAnimKey.PERISH);
  if (sprite.IsPlaying(NecroSoulAnimKey.PERISH) || isPerished) {
    if (isPerished) {
      const grave = self.Target!.ToEffect()!;

      grave.State += self.CollisionDamage;
      self.Remove();
    }
    return;
  }

  // Do grave collision
  if (doTargetCollision(curDistance, sprite)) {
    self.Velocity = Vector.Zero;
    return;
  }

  // Move toward grave
  const newVelocity = target.Position.sub(self.Position);
  if (curDistance > MOVE_SPEED) {
    newVelocity.Resize(MOVE_SPEED);
  }
  self.Velocity = newVelocity;

  // Handle z arc
  self.SpriteOffset = Vector(
    0,
    -math.sin(((curDistance - ABSORB_DIST) / self.MaxRadius) * Math.PI) *
      ARC_PEAK,
  );
}

function doTargetCollision(distance: number, sprite: Sprite): boolean {
  if (distance <= ABSORB_DIST) {
    sprite.Play(NecroSoulAnimKey.PERISH, true);
    return true;
  }

  return false;
}
