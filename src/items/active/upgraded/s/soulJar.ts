import { CollectibleTypeLabUpgrade } from "../../../../constants";
import { playSound, spawnHearts } from "../../../../utils";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_SOULJAR as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  spawnHearts(4, player.Position, rand, HeartSubType.HEART_SOUL, false, true);

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
  const player = Collider.ToPlayer()!;

  if (!player.HasFullHearts()) {
    return null;
  }

  // Calculated added charge
  let addVal = 0;
  switch (pickup.SubType) {
    default:
      return null;
    case HeartSubType.HEART_DOUBLEPACK:
      addVal = 4;
      break;
    case HeartSubType.HEART_FULL:
      addVal = 2;
      break;
    case HeartSubType.HEART_HALF:
      addVal = 1;
      break;
  }

  if (!player.HasCollectible(ownType())) {
    return null;
  }

  // Detect current slot of item
  let slot = -1;
  if (
    player.GetActiveItem(ActiveSlot.SLOT_PRIMARY) === ownType() &&
    player.GetActiveCharge(ActiveSlot.SLOT_PRIMARY) < 12
  ) {
    slot = ActiveSlot.SLOT_PRIMARY;
  } else if (
    player.GetActiveItem(ActiveSlot.SLOT_POCKET) === ownType() &&
    player.GetActiveCharge(ActiveSlot.SLOT_POCKET) < 12
  ) {
    slot = ActiveSlot.SLOT_POCKET;
  }

  // Add charge
  if (slot !== -1) {
    const activeCharge = player.GetActiveCharge(slot);
    player.SetActiveCharge(math.min(activeCharge + addVal, 12), slot);

    playSound(SoundEffect.SOUND_BATTERYCHARGE);
    pickup.Remove();
    return true;
  }

  return null;
}
