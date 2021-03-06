import { CollectibleTypeLabUpgrade } from "../../../../constants";
import { shuffleArray } from "../../../../utils/extMath";
import { spawnPickup } from "../../../../utils/utils";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_D2 as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  _player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  const entities = Isaac.GetRoomEntities();
  shuffleArray(entities, rand);

  for (const entity of entities) {
    if (entity === undefined) {
      continue;
    }

    if (entity.Type !== EntityType.ENTITY_PICKUP) {
      continue;
    }
    if (
      entity.Variant === PickupVariant.PICKUP_BED ||
      entity.Variant === PickupVariant.PICKUP_COLLECTIBLE ||
      entity.Variant === PickupVariant.PICKUP_THROWABLEBOMB ||
      entity.Variant === PickupVariant.PICKUP_TRINKET ||
      entity.Variant === PickupVariant.PICKUP_TROPHY
    ) {
      continue;
    }
    if (
      entity.Variant === PickupVariant.PICKUP_TAROTCARD &&
      entity.SubType === Card.RUNE_JERA
    ) {
      continue;
    }

    if (
      entity.Variant === PickupVariant.PICKUP_BIGCHEST ||
      entity.Variant === PickupVariant.PICKUP_BOMBCHEST ||
      entity.Variant === PickupVariant.PICKUP_CHEST ||
      entity.Variant === PickupVariant.PICKUP_ETERNALCHEST ||
      entity.Variant === PickupVariant.PICKUP_HAUNTEDCHEST ||
      entity.Variant === PickupVariant.PICKUP_LOCKEDCHEST ||
      entity.Variant === PickupVariant.PICKUP_MEGACHEST ||
      entity.Variant === PickupVariant.PICKUP_MIMICCHEST ||
      entity.Variant === PickupVariant.PICKUP_MOMSCHEST ||
      entity.Variant === PickupVariant.PICKUP_OLDCHEST ||
      entity.Variant === PickupVariant.PICKUP_REDCHEST ||
      entity.Variant === PickupVariant.PICKUP_SPIKEDCHEST ||
      entity.Variant === PickupVariant.PICKUP_WOODENCHEST
    ) {
      spawnPickup(
        entity.Position,
        rand,
        entity.Variant,
        ChestSubType.CHEST_CLOSED,
        false,
      );
      spawnPickup(
        entity.Position,
        rand,
        entity.Variant,
        ChestSubType.CHEST_CLOSED,
        false,
      );
    } else {
      spawnPickup(entity.Position, rand, entity.Variant, entity.SubType, false);
      spawnPickup(entity.Position, rand, entity.Variant, entity.SubType, false);
    }
    return true;
  }

  return false;
}
