import { CollectibleTypeLab } from "../../../constants";

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_TRIPLOPIA as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  player.UseActiveItem(
    CollectibleType.COLLECTIBLE_DIPLOPIA,
    UseFlag.USE_NOANNOUNCER | UseFlag.USE_NOANIM,
  );

  player.RemoveCollectible(ownType(), true, ActiveSlot);
  player.AddCollectible(
    CollectibleType.COLLECTIBLE_DIPLOPIA,
    0,
    false,
    ActiveSlot,
  );

  return true;
}
