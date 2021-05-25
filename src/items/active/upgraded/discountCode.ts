import { CollectibleTypeLab } from "../../../constants";

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_DISCOUNTCODE as number;
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

  const entities = Game().GetRoom().GetEntities();
  for (let i = 0; i < entities.Size; i++) {
    const entity = entities.Get(i);
    if (entity == null) {
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
  }

  return true;
}

export function postRoom(): void {
  const room = Game().GetRoom();

  let hasChargedDiscount = false;
  for (let p = 0; p < Game().GetNumPlayers(); p++) {
    const player = Isaac.GetPlayer(p);
    if (player == null) {
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
    if (!pickup.IsShopItem()) {
      continue;
    }

    pickup.AutoUpdatePrice = false;
    pickup.Price = Math.floor(pickup.Price / 2.5);
  }
}
