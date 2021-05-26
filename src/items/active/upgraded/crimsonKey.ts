import { CollectibleTypeLab } from "../../../constants";

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_CRIMSONKEY as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  player.UseCard(
    Card.CARD_SOUL_CAIN,
    UseFlag.USE_NOANIM | UseFlag.USE_NOANNOUNCER,
  );

  return true;
}
