import { CollectibleTypeLabUpgrade } from "../../../../constants";
import { randomInt, tanh } from "../../../../extMath";
import {
  playSound,
  spawnCoins,
  spawnHearts,
  spawnPickup,
} from "../../../../utils";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_VENDINGMACHINE as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  if (player.GetNumCoins() < 2) {
    return false;
  }
  player.AddCoins(-2);

  const luck = Math.max(player.Luck, 0);

  if (rand.RandomFloat() < tanh(luck / 10 + 0.75)) {
    const dropRoll = rand.RandomFloat();

    if (dropRoll < 0.29) {
      // 29% chance hearts
      spawnHearts(
        randomInt(rand, 2, 4),
        player.Position,
        rand,
        HeartSubType.HEART_HALF,
        true,
        true,
      );
    } else if (dropRoll < 0.29 + 0.24) {
      // 24% chance bomb
      spawnPickup(
        player.Position,
        rand,
        PickupVariant.PICKUP_BOMB,
        BombSubType.BOMB_NORMAL,
        true,
      );
    } else if (dropRoll < 0.29 + 0.24 + 0.23) {
      // 23% chance key
      spawnPickup(
        player.Position,
        rand,
        PickupVariant.PICKUP_KEY,
        KeySubType.KEY_NORMAL,
        true,
      );
    } else if (dropRoll < 0.29 + 0.24 + 0.23 + 0.2) {
      // 20% chance 3 coins
      spawnCoins(3, player.Position, rand, false, true);
    } else {
      // 3% chance pretty fly
      player.AddPrettyFly();
    }
    playSound(SoundEffect.SOUND_SLOTSPAWN);
  } else {
    playSound(SoundEffect.SOUND_THUMBS_DOWN);
  }

  return true;
}
