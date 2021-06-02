import { CollectibleTypeLab } from "../../../../constants";
import { playSound, spawnHearts, spawnPickup } from "../../../../utils";

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_SOULREACTOR as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  const itemPool = Game().GetItemPool();

  spawnHearts(2, player.Position, rand, HeartSubType.HEART_SOUL, false, true);
  spawnPickup(
    player.Position,
    rand,
    PickupVariant.PICKUP_COLLECTIBLE,
    itemPool.GetCollectible(ItemPoolType.POOL_ANGEL, true, rand.Next()),
    true,
  );

  return true;
}

export function prePickupCollide(
  pickup: EntityPickup,
  Collider: Entity,
  _Low: boolean,
): boolean | null {
  if (Collider.Type !== EntityType.ENTITY_PLAYER) {
    return null;
  }

  // Calculated added charge
  let addVal = 0;
  switch (pickup.SubType) {
    default:
      return null;
    case HeartSubType.HEART_SOUL:
    case HeartSubType.HEART_BLACK:
      addVal = 2;
      break;
    case HeartSubType.HEART_HALF_SOUL:
      addVal = 1;
      break;
  }

  const player = Collider.ToPlayer()!;
  if (!player.HasCollectible(ownType())) {
    return null;
  }

  // Detect current slot of item
  let slot = -1;
  if (
    player.GetActiveItem(ActiveSlot.SLOT_PRIMARY) === ownType() &&
    player.GetActiveCharge(ActiveSlot.SLOT_PRIMARY) < 16
  ) {
    slot = ActiveSlot.SLOT_PRIMARY;
  } else if (
    player.GetActiveItem(ActiveSlot.SLOT_POCKET) === ownType() &&
    player.GetActiveCharge(ActiveSlot.SLOT_POCKET) < 16
  ) {
    slot = ActiveSlot.SLOT_POCKET;
  }

  // Add charge
  if (slot !== -1) {
    const activeCharge = player.GetActiveCharge(slot);

    if (activeCharge === 15 && addVal === 2) {
      player.SetActiveCharge(16, slot);
      // Refund
      if (pickup.SubType === HeartSubType.HEART_BLACK) {
        player.AddBlackHearts(1);
      } else {
        player.AddSoulHearts(1);
      }
    } else {
      player.SetActiveCharge(math.min(activeCharge + addVal, 16), slot);
    }

    playSound(SoundEffect.SOUND_BATTERYCHARGE);
    pickup.Remove();
    return true;
  }

  return null;
}
