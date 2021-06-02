import { CollectibleTypeLabUpgrade } from "../../../../constants";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_CHESTOFSIN as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean {
  player.UseActiveItem(
    CollectibleType.COLLECTIBLE_BOOK_OF_SIN,
    UseFlag.USE_NOANIM,
  );
  player.UseActiveItem(
    CollectibleType.COLLECTIBLE_BOOK_OF_SIN,
    UseFlag.USE_NOANIM,
  );
  if (rand.RandomFloat() < 0.75) {
    player.UseActiveItem(
      CollectibleType.COLLECTIBLE_BOOK_OF_SIN,
      UseFlag.USE_NOANIM,
    );
  }

  return true;
}
