import { CollectibleTypeLabUpgrade } from "../../../../constants";
import { randomInt } from "../../../../extMath";
import { playSound, spawnHearts, spawnPickup } from "../../../../utils/utils";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_DIGITALFORTUNE as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  const level = Game().GetLevel();
  const itemPool = Game().GetItemPool();

  level.ApplyMapEffect();
  level.ApplyCompassEffect(true);
  level.ApplyBlueMapEffect();

  const dropRoll = rand.RandomFloat();
  if (dropRoll < 0.55) {
    spawnHearts(
      randomInt(rand, 2, 4),
      player.Position,
      rand,
      HeartSubType.HEART_HALF_SOUL,
      true,
      true,
    );
  } else if (dropRoll < 0.95) {
    spawnPickup(
      player.Position,
      rand,
      PickupVariant.PICKUP_TAROTCARD,
      itemPool.GetCard(rand.Next(), true, true, false),
      true,
    );
  } else {
    spawnPickup(
      player.Position,
      rand,
      PickupVariant.PICKUP_TRINKET,
      itemPool.GetTrinket(),
      true,
    );
  }
  playSound(SoundEffect.SOUND_SLOTSPAWN);

  return true;
}
