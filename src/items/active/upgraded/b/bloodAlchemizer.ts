import { CollectibleTypeLabUpgrade } from "../../../../constants";
import { randomInt } from "../../../../utils/extMath";
import { playSound, spawnCoins } from "../../../../utils/utils";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_BLOODALCHEMIZER as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  if (player.GetRottenHearts() > 0) {
    player.AddRottenHearts(-1);
  } else if (player.GetHearts() > 0) {
    player.AddHearts(-1);
  } else if (player.GetSoulHearts() > 0) {
    player.AddSoulHearts(-1);
  } else if (player.GetBoneHearts() > 0) {
    player.AddBoneHearts(-1);
  }
  playSound(SoundEffect.SOUND_BLOODBANK_TOUCHED);

  if (
    player.GetPlayerType() === PlayerType.PLAYER_KEEPER ||
    player.GetPlayerType() === PlayerType.PLAYER_KEEPER_B
  ) {
    player.AddBlueFlies(randomInt(rand, 2, 4), player.Position, undefined);
  } else {
    spawnCoins(randomInt(rand, 1, 3), player.Position, rand, true, true);
  }

  return true;
}
