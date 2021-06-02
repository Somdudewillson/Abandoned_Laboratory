import { CollectibleTypeLabUpgrade } from "../../../constants";
import { chargeEffect, isBetter } from "../../../utils";

const REROLL_SIM_COUNT = 5;
const CHARGE_COST_PER_ITEM = 2;

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_ENERGIZEDD6 as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  const room: Room = Game().GetRoom();
  const itemPool = Game().GetItemPool();
  const itemConfig = Isaac.GetItemConfig();
  let itemCount: int = 0;

  // Find all items
  const entities = room.GetEntities();
  for (let i = 0; i < entities.Size; i++) {
    const entity = entities.Get(i);
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
    itemCount++;

    let curTarget: CollectibleType = CollectibleType.COLLECTIBLE_NULL;
    let curInfo = itemConfig.GetCollectible(curTarget);

    // Reroll items
    for (let r = 0; r < REROLL_SIM_COUNT; r++) {
      const newTarget = itemPool.GetCollectible(
        itemPool.GetPoolForRoom(room.GetType(), rand.Next()),
        false,
        rand.Next(),
      );

      const newInfo = itemConfig.GetCollectible(newTarget);
      if (
        curTarget === CollectibleType.COLLECTIBLE_NULL ||
        isBetter(rand, curInfo, newInfo)
      ) {
        curTarget = newTarget;
        curInfo = newInfo;
      }
    }

    pickup.Morph(
      EntityType.ENTITY_PICKUP,
      PickupVariant.PICKUP_COLLECTIBLE,
      curTarget,
      true,
    );
  }

  // Refund charge if item count < 6
  player.SetActiveCharge(
    Math.max(6 - itemCount * CHARGE_COST_PER_ITEM, 0),
    ActiveSlot,
  );
  if (player.GetActiveCharge(ActiveSlot) > 0) {
    chargeEffect(player.Position);
  }

  return { Discharge: false, Remove: false, ShowAnim: true };
}
