export const SPIDER_ENTITYTYPE = 85;

export const enum SpiderEntityVariant {
  SMART_SPIDERBOT = 56,
}

export function update(self: EntityNPC): boolean | null {
  if (self.Variant !== SpiderEntityVariant.SMART_SPIDERBOT) {
    return null;
  }
  const curTimeout = self.GetData().timeout as number | null;
  // Update timeout
  if (curTimeout != null && curTimeout > 0) {
    self.GetData().timeout = curTimeout - 1;
  }
  if (curTimeout != null && curTimeout - 1 > 0) {
    return null;
  }

  const nearTears = Isaac.FindInRadius(
    self.Position,
    100,
    EntityPartition.TEAR,
  );
  let nearestTear = null;
  let nearestDist = 0;
  for (const tear of nearTears) {
    const tearDist = self.Position.DistanceSquared(tear.Position);

    if (nearestTear == null || tearDist < nearestDist) {
      nearestTear = tear;
      nearestDist = tearDist;
    }
  }

  if (nearestTear != null) {
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

  return null;
}

export function interceptDamage(
  tookDamage: Entity,
  _damageAmount: float,
  _damageFlags: int,
  damageSource: EntityRef,
  _damageCountdownFrames: int,
): boolean | null {
  if (tookDamage.Variant !== SpiderEntityVariant.SMART_SPIDERBOT) {
    return null;
  }

  Isaac.DebugString(`Took damage from: ${damageSource.Type}`);
  if (damageSource.Type === EntityType.ENTITY_FIREPLACE) {
    return false;
  }
  return null;
}
