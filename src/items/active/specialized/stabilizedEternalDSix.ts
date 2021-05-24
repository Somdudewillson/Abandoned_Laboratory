import { CollectibleTypeLab } from "../../../constants";

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_STABILIZEDETERNALD6 as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean {
  player.UseActiveItem(CollectibleType.COLLECTIBLE_D6, 0);

  return true;
}
