import { shuffleArray } from "../../extMath";

const enum KineticImpactorAnimKey {
  IDLE = "Idle",
  ATTACK_SLOW = "AttackSlow",
  ATTACK_FAST = "AttackFast",
  EVENT_STRIKE = "Strike",
}

const FAST_ATTACKS = 2;
const FAST_ATTACK_BURSTS = 3;

export function update(self: EntityEffect): void {
  const sprite = self.GetSprite();
  const room = Game().GetRoom();

  // State toggle from ATTACK_SLOW to IDLE
  if (sprite.IsFinished(KineticImpactorAnimKey.ATTACK_SLOW)) {
    sprite.Play(KineticImpactorAnimKey.IDLE, false);
    self.GetData().timeout = 90;
  }

  // State toggle from ATTACK_FAST to IDLE or ATTACK_FAST
  if (sprite.IsFinished(KineticImpactorAnimKey.ATTACK_FAST)) {
    const attacks = self.GetData().attacksRemaining as null | number;

    if (attacks == null || attacks <= 0) {
      sprite.Play(KineticImpactorAnimKey.IDLE, false);
      self.GetData().timeout = 45;
    } else {
      sprite.Play(KineticImpactorAnimKey.ATTACK_FAST, true);
    }
  }

  // Perform attacks
  if (sprite.IsEventTriggered(KineticImpactorAnimKey.EVENT_STRIKE)) {
    doShockwave(self);
    const entities = Isaac.GetRoomEntities();
    shuffleArray(entities);

    // Fire light attacks at random enemies, tinted/super-secret rocks, or secret rooms
    if (sprite.GetAnimation() === KineticImpactorAnimKey.ATTACK_FAST) {
      let attackCount = 0;
      for (const entity of entities) {
        if (entity == null) {
          continue;
        }
        if (!entity.IsVulnerableEnemy()) {
          continue;
        }
        if (self.Position.DistanceSquared(entity.Position) < 0.1) {
          continue;
        }

        doFastAttack(
          entity.Position.add(entity.Velocity.mul(Vector(15, 15))),
          self,
        );
        attackCount++;
        if (attackCount >= FAST_ATTACKS) {
          break;
        }
      }

      // If no enemies are left, fire at tinted/super-secret rocks
      if (attackCount < FAST_ATTACKS) {
        for (let i = 0; i < room.GetGridSize(); i++) {
          const gridEntity = room.GetGridEntity(i);
          if (gridEntity == null) {
            continue;
          }
          if (
            gridEntity.GetType() !== GridEntityType.GRID_ROCKT &&
            gridEntity.GetType() !== GridEntityType.GRID_ROCK_SS
          ) {
            continue;
          }
          if (gridEntity.CollisionClass === GridCollisionClass.COLLISION_NONE) {
            continue;
          }

          doFastAttack(gridEntity.Position, self);
          attackCount++;
        }
      }

      (self.GetData().attacksRemaining as number)--;
    } else {
      // Fire heavy attacks at random bosses

      for (const entity of entities) {
        if (entity == null) {
          continue;
        }
        if (!entity.IsBoss()) {
          continue;
        }
        if (entity.IsDead()) {
          continue;
        }
        if (self.Position.DistanceSquared(entity.Position) < 0.1) {
          continue;
        }

        doSlowAttack(entity, self);
        break;
      }
    }
  }

  // Update timeout
  const curTimeout = self.GetData().timeout as number | null;
  if (curTimeout != null && curTimeout > 0) {
    self.GetData().timeout = curTimeout - 1;
  } else if (
    sprite.GetAnimation() === KineticImpactorAnimKey.IDLE &&
    targetsPresent(room)
  ) {
    // Trigger attack
    if (Isaac.CountBosses() > 0) {
      sprite.Play(KineticImpactorAnimKey.ATTACK_SLOW, true);
    } else {
      sprite.Play(KineticImpactorAnimKey.ATTACK_FAST, true);
      self.GetData().attacksRemaining = FAST_ATTACK_BURSTS;
    }
  }
}

function doFastAttack(target: Vector, self: EntityEffect): void {
  const targetDir = target.sub(self.Position);
  const targetVelocity = Vector(targetDir.X / 15, targetDir.Y / 15);

  const targetMagnitude = targetVelocity.LengthSquared();
  if (targetMagnitude < 7.5 * 7.5) {
    targetVelocity.Resize(7.5);
  } else if (targetMagnitude > 25 * 25) {
    targetVelocity.Resize(25);
  }

  const rockWave = Isaac.Spawn(
    EntityType.ENTITY_EFFECT,
    EffectVariant.MOTHER_SHOCKWAVE,
    0,
    self.Position,
    targetVelocity,
    self,
  ).ToEffect()!;

  rockWave.Parent = self.SpawnerEntity;
}

function doSlowAttack(target: Entity, self: EntityEffect): void {
  const targetDir = target.Position.sub(self.Position);
  const targetVelocity = Vector(targetDir.X / 20, targetDir.Y / 20);

  const targetMagnitude = targetVelocity.LengthSquared();
  if (targetMagnitude < 3 * 3) {
    targetVelocity.Resize(3);
  } else if (targetMagnitude > 10 * 10) {
    targetVelocity.Resize(10);
  }

  for (let i = 0; i < 6; i++) {
    const rockWave = Isaac.Spawn(
      EntityType.ENTITY_EFFECT,
      EffectVariant.MOTHER_SHOCKWAVE,
      0,
      self.Position,
      targetVelocity.Rotated(self.GetDropRNG().RandomFloat() * 25 - 12.5),
      self,
    ).ToEffect()!;
    rockWave.Parent = self.SpawnerEntity;
  }
}

function doShockwave(self: EntityEffect, sizeMul = 1): void {
  Isaac.Spawn(
    EntityType.ENTITY_EFFECT,
    EffectVariant.RIPPLE_POOF,
    0,
    self.Position,
    Vector.Zero,
    self,
  ).Size *= 3 * sizeMul;
}

function targetsPresent(room: Room): boolean {
  if (Isaac.CountEnemies() > 0) {
    return true;
  }

  for (let i = 0; i < room.GetGridSize(); i++) {
    const gridEntity = room.GetGridEntity(i);
    if (gridEntity == null) {
      continue;
    }
    if (
      gridEntity.GetType() !== GridEntityType.GRID_ROCKT &&
      gridEntity.GetType() !== GridEntityType.GRID_ROCK_SS
    ) {
      continue;
    }
    if (gridEntity.CollisionClass === GridCollisionClass.COLLISION_NONE) {
      continue;
    }

    return true;
  }

  return false;
}
