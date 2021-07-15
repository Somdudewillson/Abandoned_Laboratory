import { randomInt, randomOnCircle } from "../../utils/extMath";

const enum SingularityGeneratorAnimKey {
  STARTUP = "Startup",
  ACTIVE_100 = "Active100",
  ACTIVE_75 = "Active75",
  ACTIVE_50 = "Active50",
  ACTIVE_25 = "Active25",
}

const IMPLOSION_DAMAGE = 150;
const IMPLOSION_SIZE = 1.75;

const GRID_MAX_RADIUS = 650;

const GRAVITY_STRENGTH = 35;
const BASE_GRAVITY_DAMAGE = 1;
const IMPLOSION_VELOCITY = 10;

export function update(self: EntityEffect): void {
  const powerPercent = (self.Timeout - Isaac.GetFrameCount()) / self.State;
  const sprite = self.GetSprite();

  // Die on timeout
  if (powerPercent <= 0) {
    doDie(self);
    return;
  }

  // State toggle from STARTUP to ACTIVE_100
  if (sprite.IsFinished(SingularityGeneratorAnimKey.STARTUP)) {
    sprite.Play(SingularityGeneratorAnimKey.ACTIVE_100, false);
  }

  // State toggle from ACTIVE_100 to ACTIVE_75
  if (
    powerPercent <= 0.75 &&
    sprite.IsPlaying(SingularityGeneratorAnimKey.ACTIVE_100)
  ) {
    sprite.Play(SingularityGeneratorAnimKey.ACTIVE_75, true);
  }
  // State toggle from ACTIVE_75 to ACTIVE_50
  if (
    powerPercent <= 0.5 &&
    sprite.IsPlaying(SingularityGeneratorAnimKey.ACTIVE_75)
  ) {
    sprite.Play(SingularityGeneratorAnimKey.ACTIVE_50, true);
  }
  // State toggle from ACTIVE_50 to ACTIVE_25
  if (
    powerPercent <= 0.25 &&
    sprite.IsPlaying(SingularityGeneratorAnimKey.ACTIVE_50)
  ) {
    sprite.Play(SingularityGeneratorAnimKey.ACTIVE_25, true);
  }

  if (!sprite.IsPlaying(SingularityGeneratorAnimKey.STARTUP)) {
    doGravityEffects(self, Game().GetRoom(), powerPercent);
  }
}

function doDie(self: EntityEffect): void {
  const entities = Isaac.FindInRadius(self.Position, 250);

  Game().BombExplosionEffects(
    self.Position,
    IMPLOSION_DAMAGE,
    TearFlags.TEAR_NORMAL,
    Color(0.8, 0.8, 0.8),
    self,
    IMPLOSION_SIZE,
    true,
    false,
  );

  for (const entity of entities) {
    if (entity.Type !== EntityType.ENTITY_PROJECTILE) {
      continue;
    }

    entity.Velocity = Vector.Zero;
    entity.Remove();
  }

  self.Remove();
}

function doGravityEffects(
  self: EntityEffect,
  room: Room,
  powerPercent: float,
): void {
  implodeObstacles(self, room, powerPercent);
  implodeEntities(self);
}

function implodeObstacles(
  self: EntityEffect,
  room: Room,
  powerPercent: float,
): void {
  const curRadius = GRID_MAX_RADIUS * (1 - powerPercent);
  const rand = self.GetDropRNG();

  for (let i = 0; i < room.GetGridSize(); i++) {
    const gridEntity = room.GetGridEntity(i);
    if (gridEntity === null) {
      continue;
    }
    if (gridEntity.CollisionClass === GridCollisionClass.COLLISION_NONE) {
      continue;
    }
    if (!shouldDestroyObstacle(gridEntity.GetType())) {
      if (
        gridEntity.GetType() === GridEntityType.GRID_WALL &&
        rand.RandomFloat() < 0.1 &&
        gridEntity.Position.DistanceSquared(self.Position) <= curRadius ** 2
      ) {
        spawnDebris(1, rand, gridEntity, room);
      } else if (gridEntity.GetType() === GridEntityType.GRID_DOOR) {
        gridEntity.ToDoor()!.TryBlowOpen(true, self);
      }
      continue;
    }

    if (gridEntity.Position.DistanceSquared(self.Position) <= curRadius ** 2) {
      spawnDebris(randomInt(rand, 4, 12), rand, gridEntity, room);
      if (gridEntity.GetType() === GridEntityType.GRID_ROCKB) {
        gridEntity.SetType(GridEntityType.GRID_ROCK);
      }
      gridEntity.Destroy(false);
    }
  }
}

function spawnDebris(
  amount: int,
  rand: RNG,
  source: GridEntity,
  room: Room,
): void {
  let debrisVariant = EffectVariant.EFFECT_NULL;
  let colorShift: null | Color = null;
  switch (source.GetType()) {
    case GridEntityType.GRID_ROCK_GOLD:
    case GridEntityType.GRID_ROCK:
    case GridEntityType.GRID_ROCK_ALT:
    case GridEntityType.GRID_ROCK_ALT2:
    case GridEntityType.GRID_ROCK_BOMB:
    case GridEntityType.GRID_ROCK_SPIKED:
    case GridEntityType.GRID_ROCK_SS:
    case GridEntityType.GRID_PILLAR:
    case GridEntityType.GRID_ROCKB:
      debrisVariant = EffectVariant.ROCK_PARTICLE;
      break;
    case GridEntityType.GRID_ROCKT:
      debrisVariant = EffectVariant.ROCK_PARTICLE;
      colorShift = Color(0.204, 0.475, 0.648);
      break;
    case GridEntityType.GRID_POOP:
      debrisVariant = EffectVariant.POOP_PARTICLE;
      break;
    case GridEntityType.GRID_FIREPLACE:
      debrisVariant = EffectVariant.WOOD_PARTICLE;
      break;
    case GridEntityType.GRID_WALL:
      if (room.GetBackdropType() === BackdropType.DARKROOM) {
        return;
      }
      debrisVariant = EffectVariant.ROCK_POOF;
      colorShift = Color(1, 1, 1, 0.5);
      break;
    default:
      return;
  }

  for (let d = 0; d < amount; d++) {
    const newDebris = Isaac.Spawn(
      EntityType.ENTITY_EFFECT,
      debrisVariant,
      0,
      source.Position,
      randomOnCircle(rand, rand.RandomFloat() * 5 + 5),
      null,
    );
    if (colorShift !== null) {
      newDebris.SetColor(colorShift, -1, 1);
    }
  }
}

function implodeEntities(self: EntityEffect): void {
  const entities = Isaac.GetRoomEntities();
  for (const entity of entities) {
    if (!shouldImplodeEntity(entity)) {
      continue;
    }

    entity.TakeDamage(
      implosionDamage(self, entity),
      DamageFlag.DAMAGE_IGNORE_ARMOR,
      EntityRef(self),
      0,
    );
    const distSq = entity.Position.DistanceSquared(self.Position);
    if (entity.Type === EntityType.ENTITY_PROJECTILE && distSq <= 5 ** 2) {
      entity.Remove();
      continue;
    }

    let velocityShift = Vector.Zero;

    if (entity.Type === EntityType.ENTITY_PROJECTILE && distSq <= 250 ** 2) {
      velocityShift = self.Position.sub(entity.Position.add(entity.Velocity));
      if (velocityShift.LengthSquared() > 5 * 5) {
        velocityShift.Resize(5);
      }
    } else {
      velocityShift = self.Position.sub(entity.Position).Resized(
        IMPLOSION_VELOCITY,
      );
    }
    entity.AddVelocity(velocityShift);
  }
}

function shouldDestroyObstacle(type: int): boolean {
  return !(
    type === GridEntityType.GRID_DOOR ||
    type === GridEntityType.GRID_GRAVITY ||
    type === GridEntityType.GRID_NULL ||
    type === GridEntityType.GRID_PIT ||
    type === GridEntityType.GRID_PRESSURE_PLATE ||
    type === GridEntityType.GRID_SPIKES ||
    type === GridEntityType.GRID_SPIKES_ONOFF ||
    type === GridEntityType.GRID_STAIRS ||
    type === GridEntityType.GRID_STATUE ||
    type === GridEntityType.GRID_TELEPORTER ||
    type === GridEntityType.GRID_TRAPDOOR ||
    type === GridEntityType.GRID_WALL
  );
}

function shouldImplodeEntity(target: Entity): boolean {
  if (target.Type === EntityType.ENTITY_PLAYER) {
    return false;
  }
  if (
    target.Parent !== null &&
    target.Parent.Type === EntityType.ENTITY_PLAYER
  ) {
    return false;
  }
  if (
    target.SpawnerEntity !== null &&
    target.SpawnerEntity.Type === EntityType.ENTITY_PLAYER
  ) {
    return false;
  }

  return true;
}

function implosionDamage(self: EntityEffect, target: Entity): float {
  return (
    (GRAVITY_STRENGTH /
      (self.Position.Distance(target.Position) / (target.IsBoss() ? 2 : 1))) *
    (BASE_GRAVITY_DAMAGE * (target.IsBoss() ? 1.75 : 1))
  );
}
