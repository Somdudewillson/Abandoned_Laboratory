import { CollectibleTypeLabUpgrade } from "../../../../constants";

const options: CollectibleType[] = [
  CollectibleType.COLLECTIBLE_ANARCHIST_COOKBOOK,
  CollectibleType.COLLECTIBLE_BEST_FRIEND,
  CollectibleType.COLLECTIBLE_BOBS_ROTTEN_HEAD,
  CollectibleType.COLLECTIBLE_BOOK_OF_BELIAL,
  CollectibleType.COLLECTIBLE_BOOK_OF_SHADOWS,
  CollectibleType.COLLECTIBLE_CRACK_THE_SKY,
  CollectibleType.COLLECTIBLE_DOCTORS_REMOTE,
  CollectibleType.COLLECTIBLE_GAMEKID,
  CollectibleType.COLLECTIBLE_HOURGLASS,
  CollectibleType.COLLECTIBLE_FREE_LEMONADE,
  CollectibleType.COLLECTIBLE_MOMS_BRA,
  CollectibleType.COLLECTIBLE_MOMS_PAD,
  CollectibleType.COLLECTIBLE_MONSTROS_TOOTH,
  CollectibleType.COLLECTIBLE_MY_LITTLE_UNICORN,
  CollectibleType.COLLECTIBLE_THE_NAIL,
  CollectibleType.COLLECTIBLE_NECRONOMICON,
  CollectibleType.COLLECTIBLE_PINKING_SHEARS,
  CollectibleType.COLLECTIBLE_SHOOP_DA_WHOOP,
  CollectibleType.COLLECTIBLE_SPIDER_BUTT,
  CollectibleType.COLLECTIBLE_TAMMYS_HEAD,
  CollectibleType.COLLECTIBLE_TELEPATHY_BOOK,
];

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_SCROLLOFAGGRESSION as number;
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
