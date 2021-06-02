import { CollectibleTypeLab } from "../../../../constants";
import { randomInt } from "../../../../extMath";

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_ROTTINGHEART as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  player.AddRottenHearts(2);
  player.AddBlueFlies(randomInt(rand, 1, 5), player.Position, null);

  return true;
}