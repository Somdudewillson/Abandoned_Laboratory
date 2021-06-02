import { CollectibleTypeLabUpgrade } from "../../../../constants";

const options: CollectibleType[] = [
  CollectibleType.COLLECTIBLE_BOOK_OF_REVELATIONS,
  CollectibleType.COLLECTIBLE_BOOK_OF_SIN,
  CollectibleType.COLLECTIBLE_CRYSTAL_BALL,
  CollectibleType.COLLECTIBLE_DECK_OF_CARDS,
  CollectibleType.COLLECTIBLE_MOMS_BOTTLE_OF_PILLS,
  CollectibleType.COLLECTIBLE_MONSTER_MANUAL,
  CollectibleType.COLLECTIBLE_PRAYER_CARD,
  CollectibleType.COLLECTIBLE_WE_NEED_TO_GO_DEEPER,
  CollectibleType.COLLECTIBLE_WOODEN_NICKEL,
  CollectibleType.COLLECTIBLE_YUM_HEART,
];

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_SCROLLOFUTILITY as number;
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
