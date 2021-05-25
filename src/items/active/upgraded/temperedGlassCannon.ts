import { CollectibleTypeLab } from "../../../constants";

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_TEMPEREDGLASSCANNON as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  player.UseActiveItem(CollectibleType.COLLECTIBLE_GLASS_CANNON);

  return true;
}
