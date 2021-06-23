import { CollectibleTypeLabUpgrade } from "../../../../constants";
import * as extMath from "../../../../utils/extMath";

const STRIKE_COUNT: int = 7;

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_STRIKEDESIGNATOR as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  const room = Game().GetRoom();
  const targets: Vector[] = [];

  // Add all enemies as targets
  const entities = Isaac.GetRoomEntities();
  for (const entity of entities) {
    if (entity == null) {
      continue;
    }

    if (!entity.IsVulnerableEnemy()) {
      continue;
    }
    // If this is an enemy entity, assign beams proportional to health
    const attackRadius: int = Math.floor(entity.Size * 0.75);
    for (let l = 0; l < Math.ceil(entity.HitPoints / 50); l++) {
      targets.push(
        entity.Position.__add(
          Vector(
            extMath.randomInt(rand, 0, attackRadius * 2) - attackRadius,
            extMath.randomInt(rand, 0, attackRadius * 2) - attackRadius,
          ),
        ),
      );
    }
  }

  // Add tinted/super-secret rocks as targets
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

    targets.push(gridEntity.Position);
  }

  // Add secret rooms as targets
  for (let i = 0; i < DoorSlot.NUM_DOOR_SLOTS; i++) {
    const door = room.GetDoor(i);
    if (door == null) {
      continue;
    }
    if (
      !door.IsRoomType(RoomType.ROOM_SECRET) &&
      !door.IsRoomType(RoomType.ROOM_SUPERSECRET)
    ) {
      continue;
    }
    if (door.IsOpen()) {
      continue;
    }

    targets.push(door.Position);
  }

  // Shuffle all targets
  if (targets.length > 0) {
    extMath.shuffleArray(targets, rand);
  }

  for (let s = 0; s < STRIKE_COUNT; s++) {
    let targetPos: Vector = Vector.Zero;
    if (targets.length > 0) {
      targetPos = targets.pop()!;
    } else {
      break;
    }

    const newStrike = Isaac.Spawn(
      EntityType.ENTITY_EFFECT,
      EffectVariant.ROCKET,
      0,
      targetPos,
      Vector.Zero,
      player,
    ).ToEffect()!;

    newStrike.SetTimeout(15);
    newStrike.SetDamageSource(EntityType.ENTITY_PLAYER);
    newStrike.Update();
  }

  return true;
}
