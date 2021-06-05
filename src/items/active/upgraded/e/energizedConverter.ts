import { CollectibleTypeLabUpgrade } from "../../../../constants";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_ENERGIZEDCONVERTER as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  if (player.GetSoulHearts() > 0) {
    player.AddSoulHearts(-1);
    player.AddMaxHearts(1, true);

    return true;
  }

  return false;
}
