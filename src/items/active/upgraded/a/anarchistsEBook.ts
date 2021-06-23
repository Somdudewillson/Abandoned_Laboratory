import {
  CollectibleTypeLabUpgrade,
  FireplaceVariant,
} from "../../../../constants";
import * as extMath from "../../../../extMath";
import { spawnPickupCluster } from "../../../../utils/utils";

const BOMB_COUNT = 6;

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_ANARCHISTEBOOK as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean {
  const room: Room = Game().GetRoom();

  const targets: Vector[] = [];

  // Add all enemies, stone chests, and blue/purple fireplaces as targets
  const entities = room.GetEntities();
  for (let i = 0; i < entities.Size; i++) {
    const entity = entities.Get(i);
    if (entity == null) {
      continue;
    }

    if (entity.IsVulnerableEnemy()) {
      // If this is an enemy entity, assign enough bombs to kill it
      for (
        let l = 0;
        l < Math.ceil(entity.HitPoints / 100 + Math.round(rand.RandomFloat()));
        l++
      ) {
        targets.push(
          entity.Position.__add(
            Vector(
              20 * extMath.randomSign(rand),
              20 * extMath.randomSign(rand),
            ),
          ),
        );
      }
    } else if (
      entity.Type === EntityType.ENTITY_PICKUP &&
      entity.Variant === PickupVariant.PICKUP_BOMBCHEST
    ) {
      targets.push(entity.Position);
    } else if (
      entity.Type === EntityType.ENTITY_FIREPLACE &&
      (entity.Variant === FireplaceVariant.FIREPLACE_BLUE ||
        entity.Variant === FireplaceVariant.FIREPLACE_PURPLE)
    ) {
      targets.push(entity.Position);
    }
  }

  // Add tinted rocks as targets
  for (let g = 0; g < room.GetGridSize(); g++) {
    const gridEnt = room.GetGridEntity(g);
    if (gridEnt == null) {
      continue;
    }

    if (
      gridEnt.GetType() === GridEntityType.GRID_ROCKT ||
      gridEnt.GetType() === GridEntityType.GRID_ROCK_SS
    ) {
      targets.push(room.GetGridPosition(g));
    }
  }

  // Shuffle all targets
  if (targets.length > 0) {
    extMath.shuffleArray(targets, rand);
  }

  for (let s = 0; s < BOMB_COUNT; s++) {
    if (targets.length > 0) {
      Isaac.Spawn(
        EntityType.ENTITY_PICKUP,
        PickupVariant.PICKUP_BOMB,
        BombSubType.BOMB_TROLL,
        targets.pop()!,
        Vector.Zero,
        null,
      );
    } else {
      spawnPickupCluster(
        Math.floor((BOMB_COUNT - s) / 3),
        player.Position,
        rand,
        PickupVariant.PICKUP_BOMB,
        BombSubType.BOMB_NORMAL,
        true,
      );
      break;
    }
  }

  return true;
}
