import { CollectibleTypeLabUpgrade } from "../../../../constants";
import { spawnPickup } from "../../../../utils/utils";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_BLOODSIPHON as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  const baseDamage = player.Damage + 5;

  const entities = Isaac.GetRoomEntities();
  for (const entity of entities) {
    if (entity === undefined) {
      continue;
    }

    if (!entity.IsActiveEnemy(false)) {
      continue;
    }

    entity.TakeDamage(
      baseDamage + entity.MaxHitPoints * 0.15,
      0,
      EntityRef(player),
      0,
    );

    if (rand.RandomFloat() < 0.1) {
      if (rand.RandomFloat() < 0.8) {
        spawnPickup(
          entity.Position,
          rand,
          PickupVariant.PICKUP_HEART,
          HeartSubType.HEART_HALF,
          false,
        );
      } else {
        spawnPickup(
          entity.Position,
          rand,
          PickupVariant.PICKUP_HEART,
          HeartSubType.HEART_HALF_SOUL,
          false,
        );
      }
    }
  }

  return true;
}
