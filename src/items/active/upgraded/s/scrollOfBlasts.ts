import { CollectibleTypeLabUpgrade } from "../../../../constants";

const options: CollectibleType[] = [
  CollectibleType.COLLECTIBLE_ANARCHIST_COOKBOOK,
  CollectibleType.COLLECTIBLE_BEST_FRIEND,
  CollectibleType.COLLECTIBLE_BOBS_ROTTEN_HEAD,
  CollectibleType.COLLECTIBLE_DOCTORS_REMOTE,
  CollectibleType.COLLECTIBLE_MR_BOOM,
];

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_SCROLLOFBLASTS as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  player.UseActiveItem(options[rand.RandomInt(options.length)]);

  return true;
}
