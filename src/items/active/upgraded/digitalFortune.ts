import { CollectibleTypeLab } from "../../../constants";
import { randomInt, tanh } from "../../../extMath";
import { playSound, spawnHearts, spawnPickup } from "../../../utils";

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_DIGITALFORTUNE as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  const luck = Math.max(player.Luck, 0);
  const itemPool = Game().GetItemPool();

  if (rand.RandomFloat() < tanh(luck / 10 + 0.49)) {
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
  } else {
    playSound(SoundEffect.SOUND_THUMBS_DOWN);
  }

  return true;
}
