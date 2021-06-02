import { CollectibleTypeLabUpgrade } from "../../../../constants";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_BIGBOXOFSPIDERS as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean {
  player.UseActiveItem(
    CollectibleType.COLLECTIBLE_BOX_OF_SPIDERS,
    UseFlag.USE_NOANIM,
  );
  player.UseActiveItem(
    CollectibleType.COLLECTIBLE_BOX_OF_SPIDERS,
    UseFlag.USE_NOANIM,
  );

  return true;
}
