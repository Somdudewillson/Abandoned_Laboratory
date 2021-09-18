export const SPIDER_ENTITYTYPE = 85;

export const enum SpiderEntityVariant {
  SMART_SPIDERBOT = 56,
}

export function update(self: EntityNPC): boolean | void {
  if (self.Variant !== SpiderEntityVariant.SMART_SPIDERBOT) {
    return;
  }
  const curTimeout = self.GetData().timeout as number | undefined;
  // Update timeout
  if (curTimeout !== undefined && curTimeout > 0) {
    self.GetData().timeout = curTimeout - 1;
  }
  if (curTimeout !== undefined && curTimeout - 1 > 0) {
    return;
  }

  const nearTears = Isaac.FindInRadius(
    self.Position,
    100,
    EntityPartition.TEAR,
  );
  let nearestTear;
  let nearestDist = 0;
  for (const tear of nearTears) {
    const tearDist = self.Position.DistanceSquared(tear.Position);

    if (nearestTear === undefined || tearDist < nearestDist) {
      nearestTear = tear;
      nearestDist = tearDist;
    }
  }

  if (nearestTear !== undefined) {
    const tearDir = nearestTear.Velocity.Normalized();
    const fireLineToSpiderPosBase = nearestTear.Position.add(
      self.Position.sub(nearestTear.Position).mul(tearDir).mul(tearDir),
    );
    nearestDist = math.sqrt(nearestDist);
    let evadeVelocity = self.Position.sub(fireLineToSpiderPosBase);
    if (nearestDist <= 15 && self.GetDropRNG().RandomFloat() < 0.5) {
      evadeVelocity = evadeVelocity.mul(Vector(-1, -1));
    }
    const dodgeStrength = 1 - nearestDist / 100;

    self.AddVelocity(evadeVelocity.Resized(dodgeStrength * 15));
    self.GetData().timeout = Math.round(dodgeStrength * 15);
  }
}

export function interceptDamage(
  tookDamage: Entity,
  _damageAmount: float,
  _damageFlags: int,
  damageSource: EntityRef,
  _damageCountdownFrames: int,
): boolean | void {
  if (tookDamage.Variant !== SpiderEntityVariant.SMART_SPIDERBOT) {
    return;
  }

  if (damageSource.Type === EntityType.ENTITY_FIREPLACE) {
    return false;
  }
}
