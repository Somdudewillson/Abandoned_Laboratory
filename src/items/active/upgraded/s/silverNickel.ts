import { CollectibleTypeLabUpgrade } from "../../../../constants";
import * as extMath from "../../../../extMath";
import { spawnCoins } from "../../../../utils/utils";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_SILVERNICKEL as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean {
  if (rand.RandomFloat() < 0.75) {
    let amt: int = extMath.randomInt(rand, 1, 5);
    if (rand.RandomFloat() < 0.1) {
      amt = extMath.randomInt(rand, 5, 10);
      if (rand.RandomFloat() < 0.1) {
        amt = extMath.randomInt(rand, 10, 15);
      }
    }
    spawnCoins(amt, player.Position, rand, true, true);
  }

  return true;
}
