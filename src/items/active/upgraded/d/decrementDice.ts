import { CollectibleTypeLabUpgrade } from "../../../../constants";
import { isBetter } from "../../../../utils/utils";

const DECREMENT_SIM_COUNT = 5;

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_DECREMENTDICE as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  _player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  const itemConfig = Isaac.GetItemConfig();

  // Find all items
  const entities = Isaac.GetRoomEntities();
  for (const entity of entities) {
    if (entity == null) {
      continue;
    }

    if (entity.Type !== EntityType.ENTITY_PICKUP) {
      continue;
    }
    const pickup = entity.ToPickup()!;
    if (
      pickup.Variant !== PickupVariant.PICKUP_COLLECTIBLE ||
      pickup.SubType === CollectibleType.COLLECTIBLE_NULL
    ) {
      continue;
    }

    let curTarget: CollectibleType = CollectibleType.COLLECTIBLE_NULL;
    let lastTarget = entity.SubType;
    let curInfo = itemConfig.GetCollectible(curTarget);

    // Reroll items
    for (let r = 0; r < DECREMENT_SIM_COUNT; r++) {
      const newTarget = decrement(itemConfig, lastTarget);
      if (newTarget < 1) {
        break;
      }

      const newInfo = itemConfig.GetCollectible(newTarget);
      if (
        curTarget === CollectibleType.COLLECTIBLE_NULL ||
        isBetter(rand, curInfo, newInfo)
      ) {
        curTarget = newTarget;
        curInfo = newInfo;
      }

      lastTarget = newTarget;
    }

    if (curTarget > 0) {
      pickup.Morph(
        EntityType.ENTITY_PICKUP,
        PickupVariant.PICKUP_COLLECTIBLE,
        curTarget,
        true,
      );
    } else {
      pickup.Remove();
    }
  }

  return true;
}

function decrement(itemConfig: ItemConfig, itemID: int): int {
  let selectedID = itemID - 1;
  let selectedInfo = itemConfig.GetCollectible(selectedID);

  while (
    selectedID > 0 ||
    !selectedInfo.IsCollectible() ||
    selectedInfo.Hidden
  ) {
    selectedID--;
    selectedInfo = itemConfig.GetCollectible(--selectedID);
  }

  return selectedID;
}
