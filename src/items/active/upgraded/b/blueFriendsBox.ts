import { CollectibleTypeLabUpgrade } from "../../../../constants";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_BLUEFRIENDSBOX as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  player.UseActiveItem(
    CollectibleType.COLLECTIBLE_BOX_OF_FRIENDS,
    UseFlag.USE_NOANIM,
  );
  player.UseActiveItem(
    CollectibleType.COLLECTIBLE_BOX_OF_SPIDERS,
    UseFlag.USE_NOANIM,
  );
  player.UseActiveItem(
    CollectibleType.COLLECTIBLE_GUPPYS_HEAD,
    UseFlag.USE_NOANIM,
  );

  return true;
}
