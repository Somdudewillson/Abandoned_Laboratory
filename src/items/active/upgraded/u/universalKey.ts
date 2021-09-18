import { CollectibleTypeLabUpgrade } from "../../../../constants";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_UNIVERSALKEY as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  player.UseActiveItem(
    CollectibleType.COLLECTIBLE_DADS_KEY,
    UseFlag.USE_NOANIM,
  );

  const room = Game().GetRoom();
  for (let i = 0; i < room.GetGridSize(); i++) {
    const gridEntity = room.GetGridEntity(i);
    if (gridEntity === undefined) {
      continue;
    }

    if (gridEntity.GetType() === GridEntityType.GRID_LOCK) {
      gridEntity.Destroy(false);
    }
  }

  const entities = Isaac.GetRoomEntities();
  for (const entity of entities) {
    if (entity === undefined) {
      continue;
    }

    if (entity.Type !== EntityType.ENTITY_PICKUP) {
      continue;
    }
    switch (entity.Variant) {
      case PickupVariant.PICKUP_BOMBCHEST:
      case PickupVariant.PICKUP_CHEST:
      case PickupVariant.PICKUP_ETERNALCHEST:
      case PickupVariant.PICKUP_HAUNTEDCHEST:
      case PickupVariant.PICKUP_LOCKEDCHEST:
      case PickupVariant.PICKUP_MEGACHEST:
      case PickupVariant.PICKUP_MIMICCHEST:
      case PickupVariant.PICKUP_MOMSCHEST:
      case PickupVariant.PICKUP_OLDCHEST:
      case PickupVariant.PICKUP_REDCHEST:
      case PickupVariant.PICKUP_SPIKEDCHEST:
      case PickupVariant.PICKUP_WOODENCHEST:
        entity.ToPickup()!.TryOpenChest(player);
        break;
      default:
        break;
    }
  }

  return true;
}
