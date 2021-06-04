import { CollectibleTypeLabUpgrade } from "../../../../constants";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_SUPERHEATEDSMELTER as number;
}

export function use(
  _type: CollectibleType,
  _rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } {
  const currentTrinkets = [player.GetTrinket(0), player.GetTrinket(1)];
  player.UseActiveItem(CollectibleType.COLLECTIBLE_SMELTER);
  for (const trinket of currentTrinkets) {
    if (trinket <= TrinketType.TRINKET_NULL) {
      continue;
    }
    player.AddTrinket(trinket, false);
  }
  player.UseActiveItem(CollectibleType.COLLECTIBLE_SMELTER);

  return true;
}
