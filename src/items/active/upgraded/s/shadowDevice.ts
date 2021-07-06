import { CollectibleTypeLabUpgrade } from "../../../../constants";
import * as extMath from "../../../../utils/extMath";

const BASE_MAX_CHARGE = Isaac.GetItemConfig().GetCollectible(
  ownType(),
).MaxCharges;
const MAX_CHARGE_ODDS = 0.75;
const MIN_CHARGE_ODDS = 0.25;

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_SHADOWDEVICE as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  ActiveSlot: int,
  _CustomVarData: int,
): boolean {
  triggerEffect(
    player,
    player.HasCollectible(CollectibleType.COLLECTIBLE_CAR_BATTERY),
  );

  player.SetActiveCharge(
    player.GetActiveCharge(ActiveSlot) + (BASE_MAX_CHARGE - 3),
    ActiveSlot,
  );

  return true;
}

export function interceptDamage(
  TookDamage: Entity,
  DamageAmount: float,
  DamageFlags: int,
  _DamageSource: EntityRef,
  _DamageCountdownFrames: int,
): boolean | void {
  if (
    DamageAmount <= 0 ||
    (DamageFlags & DamageFlag.DAMAGE_FAKE) === DamageFlag.DAMAGE_FAKE ||
    (DamageFlags ^
      (DamageFlag.DAMAGE_NO_PENALTIES | DamageFlag.DAMAGE_SPIKES)) ===
      0
  ) {
    return;
  }

  const player = TookDamage.ToPlayer();
  if (player === null) {
    return;
  }

  if (!player.HasCollectible(ownType(), true)) {
    return;
  }
  let charge: int = 0;
  let itemSlot: int = 0;
  for (let slot = 0; slot <= ActiveSlot.SLOT_POCKET2; slot++) {
    // Look for shadow device
    if (
      player.GetActiveItem(slot) === ownType() &&
      player.GetActiveCharge(slot) > charge
    ) {
      itemSlot = slot;
      charge = player.GetActiveCharge(slot);
    }
  }
  const rand: RNG = player.GetCollectibleRNG(ownType());
  const hasCarBattery: boolean = player.HasCollectible(
    CollectibleType.COLLECTIBLE_CAR_BATTERY,
  );

  let triggerOdds: float = extMath.lerp(
    MIN_CHARGE_ODDS,
    MAX_CHARGE_ODDS,
    Math.min(charge / BASE_MAX_CHARGE, 1),
  );
  if (player.GetSoulHearts() + player.GetBlackHearts() >= DamageAmount) {
    triggerOdds /= 2;
  }
  if (
    (DamageFlags & DamageFlag.DAMAGE_CURSED_DOOR) ===
    DamageFlag.DAMAGE_CURSED_DOOR
  ) {
    triggerOdds /= 2;
  }
  if (rand.RandomFloat() < triggerOdds) {
    player.SetActiveCharge(charge - 2, itemSlot);
    triggerEffect(player, hasCarBattery);
    return false;
  }
  if (charge > 0 && player.GetHearts() <= DamageAmount) {
    player.SetActiveCharge(Math.max(charge - 3, 0), itemSlot);
    triggerEffect(player, hasCarBattery);
    return false;
  }
}

function triggerEffect(player: EntityPlayer, hasCarBattery: boolean): void {
  player.UseActiveItem(
    CollectibleType.COLLECTIBLE_BOOK_OF_SHADOWS,
    UseFlag.USE_NOANIM,
  );
  if (hasCarBattery) {
    player.UseActiveItem(
      CollectibleType.COLLECTIBLE_BOOK_OF_SHADOWS,
      (UseFlag.USE_NOANIM as number) + (UseFlag.USE_CARBATTERY as number),
    );
  }
}
