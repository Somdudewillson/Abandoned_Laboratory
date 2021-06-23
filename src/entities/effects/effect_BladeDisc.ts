import { cardinalized, shuffleArray } from "../../utils/extMath";
import { checkLine, spawnPickup } from "../../utils/utils";

const MAX_BOUNCES = 15;
const SPEED = 25;

export function update(self: EntityEffect): void {
  const room = Game().GetRoom();

  const bouncePos = room.GetClampedPosition(self.Position, 17);
  const bounced = bouncePos.DistanceSquared(self.Position) > 1;

  // Handle bouncing
  if (bounced) {
    if (!doBounce(bouncePos, self, room)) {
      return;
    }
  }

  // Handle entity collision
  doCollision(self, isEven(Isaac.GetFrameCount()));
}

function doBounce(bouncePos: Vector, self: EntityEffect, room: Room): boolean {
  const bounces = self.GetData().bounces as number | null;
  if (bounces == null) {
    self.GetData().bounces = 1;
  } else if (bounces < MAX_BOUNCES) {
    (self.GetData().bounces as number)++;
  } else {
    doDeath(self);
    return false;
  }

  // Pick new target
  let targetingPickup = false;
  let targetVel = cardinalized(bouncePos.sub(self.Position))
    .Rotated(self.GetDropRNG().RandomFloat() * 90 - 45)
    .Resized(SPEED);

  const entities = Isaac.GetRoomEntities();
  shuffleArray(entities, self.GetDropRNG());

  for (const entity of entities) {
    // Verify that it's either an active enemy or a pickup
    if (
      !entity.IsActiveEnemy(false) ||
      !(
        !targetingPickup &&
        entity.Type === EntityType.ENTITY_PICKUP &&
        isValidPickup(entity.ToPickup()!)
      )
    ) {
      continue;
    }

    // Check that it can be reached via straight line
    if (
      !checkLine(
        room,
        bouncePos,
        entity.Position,
        LineCheckMode.EXPLOSION,
        0,
        false,
        true,
      ).clear
    ) {
      continue;
    }

    targetVel = entity.Position.sub(self.Position).Resized(SPEED);
    if (!entity.IsActiveEnemy(false)) {
      targetingPickup = true;
    }
  }
  self.Position = bouncePos;
  self.Velocity = targetVel;

  return true;
}

function doCollision(self: EntityEffect, isEvenFrame: boolean): void {
  if (!isEvenFrame) {
    return;
  }

  const entities = Isaac.FindInRadius(self.Position, 15);
  for (const entity of entities) {
    if (entity.IsEnemy()) {
      doDamage(self, entity);
      continue;
    }

    if (entity.Type === EntityType.ENTITY_PICKUP) {
      doPickup(self, entity.ToPickup()!);
    }
  }
}

function doDamage(self: EntityEffect, target: Entity): void {
  target.TakeDamage(
    self.CollisionDamage,
    DamageFlag.DAMAGE_IGNORE_ARMOR,
    EntityRef(self),
    0,
  );
}

function doPickup(self: EntityEffect, target: EntityPickup): void {
  if (!isValidPickup(target)) {
    return;
  }

  const pickups = self.GetData().pickups as null | int[];
  if (pickups == null) {
    self.GetData().pickups = [packPickup(target)];
  } else {
    pickups.push(packPickup(target));
  }

  target.Remove();
}

function doDeath(self: EntityEffect): void {
  const pickups = self.GetData().pickups as null | int[];

  if (pickups != null && pickups.length > 0) {
    let first = true;
    for (const packedPickup of pickups) {
      if (first) {
        first = false;
        continue;
      }

      unpackPickup(
        packedPickup,
        self.SpawnerEntity!.Position,
        self.GetDropRNG(),
      );
    }
  }

  self.Remove();
}

function isValidPickup(target: EntityPickup): boolean {
  return !(
    target.Variant === PickupVariant.PICKUP_BED ||
    target.Variant === PickupVariant.PICKUP_MOMSCHEST ||
    target.Variant === PickupVariant.PICKUP_NULL ||
    target.Variant === PickupVariant.PICKUP_SHOPITEM ||
    target.Variant === PickupVariant.PICKUP_SPIKEDCHEST ||
    target.Variant === PickupVariant.PICKUP_THROWABLEBOMB ||
    target.Variant === PickupVariant.PICKUP_TROPHY
  );
}

function isEven(n: int): boolean {
  return (n & 1) !== 1;
}

function packPickup(pickup: EntityPickup): int {
  return pickup.Variant * 1000 + pickup.SubType;
}

function unpackPickup(packed: int, position: Vector, rand: RNG): void {
  const variant = Math.floor(packed / 1000);
  spawnPickup(
    position,
    rand,
    variant,
    Math.floor(packed - variant * 1000),
    true,
  );
}
