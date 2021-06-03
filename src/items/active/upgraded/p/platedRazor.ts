import { CollectibleTypeLabUpgrade } from "../../../../constants";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_STRIKEDESIGNATOR as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  if (player.GetNumCoins() < 3) {
    return false;
  }

  if (player.GetNumCoins() < 50) {
    player.AddCoins(2);
    player.UseActiveItem(
      CollectibleType.COLLECTIBLE_GOLDEN_RAZOR,
      UseFlag.USE_NOANIM,
    );
  } else {
    player.UseActiveItem(
      CollectibleType.COLLECTIBLE_GOLDEN_RAZOR,
      UseFlag.USE_NOANIM,
    );
    player.AddCoins(2);
  }

  return true;
}
