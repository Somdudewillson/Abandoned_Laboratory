import { CollectibleTypeLab } from "../../../../constants";

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_TELEPORT4 as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  player.AddSoulHearts(4);

  return true;
}
