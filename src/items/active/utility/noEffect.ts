export function use(
  _type: CollectibleType,
  _rand: RNG,
  _player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  return { Discharge: false, Remove: false, ShowAnim: false };
}
