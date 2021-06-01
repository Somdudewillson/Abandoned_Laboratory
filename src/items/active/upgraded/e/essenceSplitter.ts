import { CollectibleTypeLab } from "../../../../constants";

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_ESSENCESPLITTER as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  if (player.GetMaxHearts() >= 2) {
    player.AddMaxHearts(-2, false);

    player.AddCollectible(CollectibleType.COLLECTIBLE_CUBE_OF_MEAT);
    player.AddCollectible(CollectibleType.COLLECTIBLE_BALL_OF_BANDAGES);

    return true;
  }

  return false;
}
