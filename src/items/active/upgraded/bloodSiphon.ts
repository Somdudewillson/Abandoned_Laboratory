import { CollectibleTypeLab } from "../../../constants";
import { spawnPickup } from "../../../utils";

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_BLOODSIPHON as number;
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

  const entities = Game().GetRoom().GetEntities();
  for (let i = 0; i < entities.Size; i++) {
    const entity = entities.Get(i);
    if (entity == null) {
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

    if (rand.RandomFloat() < 0.05) {
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
