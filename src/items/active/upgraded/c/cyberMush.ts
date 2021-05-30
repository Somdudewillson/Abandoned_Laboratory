import { CollectibleTypeLab } from "../../../../constants";

export function ownType(): number {
  return CollectibleTypeLab.COLLECTIBLE_CYBERMUSH as number;
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
    CollectibleType.COLLECTIBLE_MEGA_MUSH,
    UseFlag.USE_NOANIM,
  );
  player.SetColor(Color(0.3, 0.3, 0.25), 30 * 30, 1);

  return true;
}
