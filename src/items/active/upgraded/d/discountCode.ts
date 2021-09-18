import { CollectibleTypeLabUpgrade } from "../../../../constants";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_DISCOUNTCODE as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  player.UseActiveItem(CollectibleType.COLLECTIBLE_COUPON);

  const entities = Isaac.GetRoomEntities();
  for (const entity of entities) {
    if (entity === undefined) {
      continue;
    }

    if (entity.Type !== EntityType.ENTITY_PICKUP) {
      continue;
    }
    const pickup = entity.ToPickup()!;
    if (!pickup.IsShopItem()) {
      continue;
    }

    pickup.AutoUpdatePrice = true;
    pickup.GetData().discountCode = false;
  }

  return true;
}

export function postRoom(_room: Room, _level: Level): void {
  let hasChargedDiscount = false;
  for (let p = 0; p < Game().GetNumPlayers(); p++) {
    const player = Isaac.GetPlayer(p);
    if (player === undefined) {
      continue;
    }
    if (!player.HasCollectible(ownType())) {
      continue;
    }

    for (let s = 0; s < ActiveSlot.SLOT_POCKET2; s++) {
      if (player.GetActiveItem(s) === ownType()) {
        if (player.GetActiveCharge(s) >= 5) {
          hasChargedDiscount = true;
          break;
        }
      }
    }

    if (hasChargedDiscount) {
      break;
    }
  }

  if (!hasChargedDiscount) {
    return;
  }

  const entities = Isaac.FindByType(EntityType.ENTITY_PICKUP);
  for (const entity of entities) {
    const pickup = entity.ToPickup()!;
    if (!pickup.IsShopItem()) {
      continue;
    }
    if (pickup.GetData().discountCode === true) {
      continue;
    }

    if (pickup.AutoUpdatePrice) {
      pickup.AutoUpdatePrice = false;
      pickup.GetData().discountCode = true;
      pickup.Price = Math.floor(pickup.Price / 2.5);
    }
  }
}
